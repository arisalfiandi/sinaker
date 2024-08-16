// view
import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import ListProject from 'src/views/pencairan-views/ListProject'

const ProjectList = ({ data }) => {
  const [projects, setProjects] = useState(JSON.parse(data))
  return (
    <>
      <ListProject data={projects} />
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

  let tasks

  tasks = await prisma.TaskOrganik.findMany({
    include: {
      task: {
        select: {}
      }
    },
    where: {
      duedate: {
        gte: new Date()
      }
    }
  })

  return {
    props: {
      data: JSON.stringify(tasks)
    }
  }
}

export default ProjectList
