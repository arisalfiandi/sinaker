import * as React from 'react'
import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import TaskManageEditViews from 'src/views/task-views/TaskManageEditViews'

const TaskManageEdit = ({ data }) => {
  const [dataEdit, setDataEdit] = useState(JSON.parse(data))
  return (
    <>
      <TaskManageEditViews
        data={dataEdit.task}
        dataT={dataEdit.template}
        dataTK={dataEdit.templateKolom}
        dataPerusahaan={dataEdit.perusahaanTask}
        dataMitra={dataEdit.mitraTask}
        dataPML={dataEdit.pegawai}
        dataPH={dataEdit.pekerjaanHarian}
        // dataMitraLimit={dataEdit.mitraLimitHonor}
        dataTpp={dataEdit.pekerjaanBulanIni}
        dataLimitHonorTetap={dataEdit.limitHonorTetap}
        dataKriteriaP={dataEdit.kriteriaPegawai}
        dataKriteriaM={dataEdit.kriteriaMitra}
        dataResultTotalGaji={dataEdit.resultTotalGaji}
        dataHonorTetap={dataEdit.honorTetap}
      ></TaskManageEditViews>
    </>
  )
}

export async function getServerSideProps(context) {
  const token = await getToken({ req: context.req, secret: process.env.JWT_SECRET })

  if (!token) {
    return {
      redirect: {
        destination: '/pages/login',
        permanent: false
      }
    }
  }

  const now = new Date()
  const currentMonth = now.getMonth()
  const task = await prisma.sub_kegiatan.findUnique({
    where: {
      id: parseInt(context.params.id)
    },
    include: {
      project: {
        include: {
          UserProject: {
            include: {
              user: true
            }
          }
        }
      },
      user: true
    }
  })
  let mitras

  // mitras = await prisma.mitra.findMany({
  //   where: {
  //     id: {
  //       not: 0
  //     }
  //   },
  //   include: {
  //     TaskPeserta: {
  //       select: {
  //         id: true,
  //         task: true
  //       }
  //     },
  //     beban_kerja_mitra: {
  //       select: {
  //         bebanKerja: true
  //       }
  //     }
  //   }
  // })

  const pegawai = await prisma.user.findMany({
    where: {
      id: {
        not: 99
      }
    },
    select: {
      id: true,
      name: true,
      UserProject: {
        select: {
          id: true,
          project: true
        }
      },
      TaskOrganik: {
        select: {
          id: true,
          task: true
        }
      },
      TimKerjaPegawai: true,
      taskToDo: true,
      beban_kerja_pegawai: {
        select: {
          bebanKerja: true
        }
      },
      pekerjaan_harian: {
        include: {
          task: true
        }
      }
    }
    // include: {
    //   UserProject: {
    //     select: {
    //       id: true,
    //       project: true
    //     }
    //   },
    //   TaskOrganik: {
    //     select: {
    //       id: true,
    //       task: true
    //     }
    //   },
    //   TimKerjaPegawai: true,
    //   taskToDo: true,
    //   beban_kerja_pegawai: {
    //     select: {
    //       bebanKerja: true
    //     }
    //   },
    //   pekerjaan_harian: true
    // }
  })

  const template = await prisma.template_table.findMany({})
  const templateKolom = await prisma.template_table_kolom.findMany({})

  const perusahaanTask = await prisma.data_target_realisasi.findMany({
    where: {
      taskId: parseInt(context.params.id)
    }
  })

  const kriteriaPegawai = await prisma.kriteria_beban_kerja_pegawai.findUnique({
    where: { id: 1 }
  })

  const kriteriaMitra = await prisma.kriteria_beban_kerja_mitra.findUnique({
    where: { id: 1 }
  })

  const honorTetap = await prisma.sub_kegiatan_mitra.findMany({
    where: {
      taskId: parseInt(context.params.id)
    },
    select: {
      honor: true,
      taskId: true,
      mitraId: true,
      mitra: {
        select: {
          name: true
        }
      }
    }
  })

  const nowMonth = new Date().getMonth() // Mendapatkan bulan saat ini (mulai dari 1 untuk Januari)

  const limitHonorTetap = await prisma.sub_kegiatan_mitra.findMany({
    where: {
      task: {
        month: nowMonth // Mencocokkan bulan saat ini dengan kolom bulan
      }
    },
    select: {
      honor: true,
      mitraId: true,
      mitra: {
        select: {
          name: true
        }
      }
    }
  })

  const mitraTask = await prisma.mitra.findMany({
    where: {
      id: {
        not: 0
      }
    },
    select: {
      id: true,
      name: true
    }
  })

  // const organik = await prisma.sub_kegiatan_user.findMany({
  //   where: {
  //     taskId: parseInt(context.params.id)
  //   },
  //   include: {
  //     organik: true
  //   }
  // })

  // const arrayOfIds = mitraTask.map(mitra => mitra.id)

  const mitraLimitHonor = []

  const pekerjaanBulanIni = await prisma.data_target_realisasi.findMany({
    where: {
      month: currentMonth
    },
    select: {
      id: true,
      pmlId: true,
      pclId: true,
      gajiPml: true,
      gajiPcl: true
    }
  })

  let gajiMap = {}

  pekerjaanBulanIni.forEach(pekerjaan => {
    if (pekerjaan.pmlId !== null) {
      if (!gajiMap[pekerjaan.pmlId]) {
        gajiMap[pekerjaan.pmlId] = 0
      }
      gajiMap[pekerjaan.pmlId] += pekerjaan.gajiPml || 0
    }

    if (pekerjaan.pclId !== null) {
      if (!gajiMap[pekerjaan.pclId]) {
        gajiMap[pekerjaan.pclId] = 0
      }
      gajiMap[pekerjaan.pclId] += pekerjaan.gajiPcl || 0
    }
  })

  const resultTotalGaji = mitraTask.map(user => {
    return {
      mitraId: user.id,
      nama: user.name,
      totalGaji: gajiMap[user.id] || 0
    }
  })

  // console.log(arrayOfIds)
  // for (const id of arrayOfIds) {
  //   const result = await prisma.data_target_realisasi.findMany({
  //     where: {
  //       OR: [{ pmlId: parseInt(id) }, { pclId: parseInt(id) }]
  //     },
  //     select: {
  //       id: true,
  //       pmlId: true,
  //       pclId: true,
  //       gajiPml: true,
  //       gajiPcl: true
  //       // task: true
  //     }
  //   })

  //   if (result.length > 0) {
  //     for (const res of result) {
  //       const existingEntry = mitraLimitHonor.find(entry => entry.id === res.id)

  //       if (!existingEntry) {
  //         // console.log(res)
  //         mitraLimitHonor.push(res)
  //       } else {
  //         mitraLimitHonor.push({
  //           id: res.id,
  //           pmlId: parseInt(id),
  //           pclId: parseInt(id),
  //           gajiPml: 0,
  //           gajiPcl: 0
  //         })
  //       }
  //     }
  //   } else {
  //     mitraLimitHonor.push({
  //       id: result.id,
  //       pmlId: parseInt(id),
  //       pclId: parseInt(id),
  //       gajiPml: 0,
  //       gajiPcl: 0
  //     })
  //   }
  // }

  // const ada993 = mitraLimitHonor.find(entry => entry.pclId === 993)

  // console.log(ada993)
  const pekerjaanHarian = await prisma.pekerjaan_harian.findMany({
    where: {
      taskId: parseInt(context.params.id)
    },
    select: {
      id: true,
      namaKegiatan: true,
      durasi: true,
      userId: true
    }
  })

  const data = {
    task,
    template,
    templateKolom,
    perusahaanTask,
    mitraTask,
    pegawai,
    pekerjaanHarian,
    pekerjaanBulanIni,
    // mitraLimitHonor,
    limitHonorTetap,
    honorTetap,
    kriteriaMitra,
    kriteriaPegawai,
    resultTotalGaji
  }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default TaskManageEdit
