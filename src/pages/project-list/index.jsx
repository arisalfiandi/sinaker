// view
import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import ProjectListViews from 'src/views/project-views/ProjectListViews'

const ProjectList = ({ data }) => {
  const [projects, setProjects] = useState(JSON.parse(data))
  console.log(projects)
  // useEffect(() => {
  //   setProjects(JSON.parse(data))
  //   setTimeout(() => {
  //     console.log(projects)
  //     console.log('asd')
  //   }, [1000])
  // }, [data])
  return (
    <>
      <ProjectListViews data={projects} />
    </>
  )
}
export async function getServerSideProps(context) {
  let projects

  projects = await prisma.userProject.findMany({
    select: {
      project: {
        select: {
          id: true,
          title: true,
          rentangWaktu: true,
          startdate: true,
          enddate: true,
          description: true,
          isArchived: true,
          projectLeader: true,
          projectLeaderId: true,
          fungsi: true,
          UserProject: true,
          Task: true,
          createdById: true
        }
      }
    }
  })

  // projects = await prisma.project.findMany({
  //   select: {
  //     id: true,
  //     title: true,
  //     rentangWaktu: true,
  //     startdate: true,
  //     enddate: true,
  //     description: true,
  //     isArchived: true,
  //     createdById: true,
  //     projectLeaderId: true
  //   }
  // })

  return {
    props: {
      data: JSON.stringify(projects)
    }
  }
}

export default ProjectList
