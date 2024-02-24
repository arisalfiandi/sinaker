import * as React from 'react'
import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import TaskManageEditViews from 'src/views/task-views/TaskManageEditViews'

const TaskManageEdit = ({ data }) => {
  const [task, setTask] = useState(JSON.parse(data))
  return (
    <>
      <TaskManageEditViews data={task}></TaskManageEditViews>
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

  return {
    props: {
      data: JSON.stringify(task)
    }
  }
}

export default TaskManageEdit
