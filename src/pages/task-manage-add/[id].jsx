import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import TaskManageAddViews from 'src/views/task-views/TaskManageAddViews'

const TaskManageAdd = ({ data }) => {
  const [project, setProject] = useState(JSON.parse(data))
  // console.log(project)
  return (
    <>
      <TaskManageAddViews
        data={project.project}
        dataMitra={project.mitras}
        dataTaskPerusahaan={project.perusahaanTask}
        dataOrganik={project.oraganik}
        dataBobotMitra={project.kriteriaMitra}
        dataBobotPegawai={project.kriteriaPegawai}
        dataOrganikProject_member={project.oraganikProject_member}
        dataT={project.template}
        dataTK={project.templateKolom}
      ></TaskManageAddViews>
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

  const project = await prisma.kegiatan.findUnique({
    where: {
      id: parseInt(context.params.id)
    },
    include: {
      Task: {
        include: {
          user: true,
          project: true
        }
      },
      projectLeader: true,
      UserProject: {
        include: {
          user: true
        }
      }
    }
  })

  let companies

  // let timkerja

  // timkerja = await prisma.TimKerja.findMany({
  //   select: {
  //     id: true,
  //     timKerjaPegawai: {
  //       select: {
  //         id: true,
  //         userId_fkey: true
  //       }
  //     },
  //     nama: true,
  //     fungsi: true
  //   }
  // })

  let perusahaans

  const perusahaanTask = await prisma.taskPerusahaanProduksi.findMany({
    include: {
      task: true,
      perusahaan: true
    }
  })

  let mitras

  mitras = await prisma.mitra.findMany({
    where: {
      id: {
        not: 0
      }
    },
    include: {
      TaskPeserta: {
        select: {
          id: true,
          task: true
        }
      },
      beban_kerja_mitra: {
        select: {
          bebanKerja: true
        }
      }
    }
  })

  let oraganik

  oraganik = await prisma.user.findMany({
    where: {
      id: {
        not: 99
      }
    },
    include: {
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
      pekerjaan_harian: true
    }
  })

  let kriteriaPegawai = await prisma.kriteria_beban_kerja_pegawai.findUnique({
    where: { id: 1 }
  })

  let kriteriaMitra = await prisma.kriteria_beban_kerja_mitra.findUnique({
    where: { id: 1 }
  })

  let oraganikProject_member
  oraganikProject_member = await prisma.kegiatan_user_member.findMany({
    where: {
      projectId: parseInt(context.params.id)
    }
  })

  const template = await prisma.template_table.findMany({})
  const templateKolom = await prisma.template_table_kolom.findMany({})

  const data = {
    project,
    mitras,
    perusahaanTask,
    oraganik,
    oraganikProject_member,
    kriteriaMitra,
    kriteriaPegawai,
    template,
    templateKolom
  }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default TaskManageAdd
