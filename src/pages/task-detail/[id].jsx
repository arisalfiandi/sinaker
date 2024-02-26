import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import TaskDetailViews from 'src/views/task-views/TaskDetailViews'

const TaskDetail = ({ data }) => {
  const [task, setTask] = useState(JSON.parse(data))
  // console.log(task.mitraTask)
  return (
    <>
      <TaskDetailViews
        data={task.task}
        dataPerusahaan={task.perusahaanTask}
        dataMitra={task.mitraTask}
        dataPML={task.pegawai}
      ></TaskDetailViews>
    </>
  )
}

export async function getServerSideProps(context) {
  const task = await prisma.task.findUnique({
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

  const perusahaanTask = await prisma.taskPerusahaanProduksi.findMany({
    where: {
      taskId: parseInt(context.params.id)
    },
    include: {
      perusahaan: true
    }
  })

  const mitraTask = await prisma.taskPeserta.findMany({
    where: {
      taskId: parseInt(context.params.id)
    },
    include: {
      mitra: true
    }
  })

  const pegawai = await prisma.TaskOrganik.findMany({
    where: {
      taskId: parseInt(context.params.id)
    },
    include: {
      organik: true
    }
  })

  const data = {
    task,
    perusahaanTask,
    mitraTask,
    pegawai
  }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}
export default TaskDetail
