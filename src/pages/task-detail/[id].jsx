import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'
import { useSession } from 'next-auth/react'

import TaskDetailViews from 'src/views/task-views/TaskDetailViews'

const TaskDetail = ({ data }) => {
  const [task, setTask] = useState(JSON.parse(data))
  const arrayOfIds = task.mitraTask.map(task => task.id)
  // //console.log(arrayOfIds)
  //console.log(task.mitraLimitHonor)
  return (
    <>
      <TaskDetailViews
        data={task.task}
        dataPerusahaan={task.perusahaanTask}
        dataMitra={task.mitraTask}
        dataPML={task.pegawai}
        dataPH={task.pekerjaanHarian}
        dataMitraLimit={task.mitraLimitHonor}
        dataT={task.template}
        dataTK={task.templateKolom}
      ></TaskDetailViews>
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

  const perusahaanTask = await prisma.taskPerusahaanProduksi.findMany({
    where: {
      taskId: parseInt(context.params.id)
    },
    include: {
      perusahaan: true
    }
  })

  const mitraTask = await prisma.sub_kegiatan_mitra.findMany({
    where: {
      taskId: parseInt(context.params.id)
    },
    include: {
      mitra: true
    }
  })
  // const mitraTask = await prisma.mitra.findMany({
  //   where: {
  //     id: {
  //       not: 0
  //     }
  //   }
  // })

  // mitra = await prisma.mitra.findMany({
  //   where: {
  //     id: {
  //       not: 0
  //     }
  //   }
  // })

  const pegawai = await prisma.sub_kegiatan_user.findMany({
    where: {
      taskId: parseInt(context.params.id)
    },
    include: {
      organik: true
    }
  })

  const arrayOfIds = mitraTask.map(task => task.mitraId) // Mengakses ID dari setiap objek dalam mitraTask

  const mitraLimitHonor = []

  for (const id of arrayOfIds) {
    // const result = await prisma.taskPerusahaanProduksi.findMany({
    const result = await prisma.data_target_realisasi.findMany({
      where: {
        OR: [{ pmlId: parseInt(id) }, { pclId: parseInt(id) }]
      },
      select: {
        id: true,
        pmlId: true,
        pclId: true,
        gajiPml: true,
        gajiPcl: true,
        task: true
      }
    })
    //console.log(result)

    //console.log('result')

    if (result.length > 0) {
      // Cek apakah id sudah ada di mitraLimitHonor
      //console.log('masuk ke if result')

      for (const res of result) {
        //console.log('masuk ke for result')
        const existingEntry = mitraLimitHonor.find(entry => entry.id === res.id)

        if (!existingEntry) {
          mitraLimitHonor.push(res)
        } else {
          // Jika tidak ada hasil, tambahkan entri dengan nilai default
          mitraLimitHonor.push({
            id,
            pmlId: parseInt(id),
            pclId: parseInt(id),
            gajiPml: 0,
            gajiPcl: 0
          })
        }
      }
    } else {
      //console.log('masuk ke else result')
      mitraLimitHonor.push({
        id,
        pmlId: parseInt(id),
        pclId: parseInt(id),
        gajiPml: 0,
        gajiPcl: 0
      })
    }
  }

  // const mitraLimitHonor = await prisma.taskPerusahaanProduksi.findMany({
  //   where: {
  //     OR: arrayOfIds.flatMap(id => [{ pmlId: parseInt(id) }, { pclId: parseInt(id) }])
  //   },
  //   select: {
  //     id: true,
  //     pmlId: true,
  //     pclId: true,
  //     gajiPml: true,
  //     gajiPcl: true,
  //     task: true
  //   }
  // })

  const template = await prisma.template_table.findMany({})
  const templateKolom = await prisma.template_table_kolom.findMany({})

  const data = {
    task,
    perusahaanTask,
    mitraTask,
    pegawai,
    pekerjaanHarian,
    mitraLimitHonor,
    templateKolom,
    template
  }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}
export default TaskDetail
