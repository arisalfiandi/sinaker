import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import TaskViews from 'src/views/task-views/TaskViews'

const Task = ({ data }) => {
  const [task, setTask] = useState(JSON.parse(data))

  return (
    <>
      <TaskViews data={task} />
    </>
  )
}
export async function getServerSideProps(context) {
  let tasks

  tasks = await prisma.task.findMany({
    include: {
      project: true
    }
  })
  return {
    props: {
      data: JSON.stringify(tasks)
    }
  }
}

export default Task
