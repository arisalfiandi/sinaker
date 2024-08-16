import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'
import ProjectDetailsViews from 'src/views/project-views/ProjectDetailsViews'

const ProjectDetail = ({ data }) => {
  const [dataPd, setDataPd] = useState(JSON.parse(data))
  // console.log(project)
  return (
    <>
      <ProjectDetailsViews data={dataPd.project} dataUpm={dataPd.upm} />
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
          user: true
        }
      },
      projectLeader: true,
      UserProject: {
        include: {
          user: true
        }
      },
      UserProject_member: {
        include: {
          user: true
        }
      }
    }
  })

  const upm = await prisma.kegiatan_user_member.findMany({
    where: {
      projectId: parseInt(context.params.id)
    }
  })

  const dataPd = { project, upm }

  return {
    props: {
      data: JSON.stringify(dataPd)
    }
  }
}

export default ProjectDetail
