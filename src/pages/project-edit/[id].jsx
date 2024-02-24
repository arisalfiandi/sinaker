// ** MUI Imports

// ** Third Party Styles Imports

import 'react-datepicker/dist/react-datepicker.css'
import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'
// view
import ProjectEditViews from 'src/views/project-views/ProjectEditViews'

const ProjectEdit = ({ data }) => {
  const [project, setProject] = useState(JSON.parse(data))
  return <ProjectEditViews data={project} />
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
  const project = await prisma.project.findUnique({
    where: {
      id: Number(context.params.id)
    },
    include: {
      UserProject: true
    }
  })

  const user = await prisma.user.findMany({
    where: {
      id: {
        not: 99
      }
    },
    include: {
      UserProject: true,
      taskToDo: true
    }
  })

  const data = {
    project,
    user
  }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default ProjectEdit
