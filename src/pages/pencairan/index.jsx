// view
import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import ListProject from 'src/views/pencairan-views/ListProject'

const ProjectList = ({ data }) => {
  const [projects, setProjects] = useState(JSON.parse(data))
  // useEffect(() => {
  //   setProjects(JSON.parse(data))
  //   setTimeout(() => {
  //     console.log(projects)
  //     console.log('asd')
  //   }, [1000])
  // }, [data])
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

  // let projects

  // projects = await prisma.userProject.findMany({
  //   select: {
  //     project: {
  //       select: {
  //         id: true,
  //         title: true,
  //         rentangWaktu: true,
  //         startdate: true,
  //         enddate: true,
  //         description: true,
  //         isArchived: true,
  //         projectLeader: true,
  //         projectLeaderId: true,
  //         fungsi: true,
  //         UserProject: true,
  //         Task: true,
  //         createdById: true
  //       }
  //     }
  //   },
  //   where: {
  //     project: {
  //       enddate: {
  //         lte: new Date()
  //       }
  //     }
  //   }
  // })

  let tasks

  tasks = await prisma.sub_kegiatan.findMany({
    include: {
      project: {
        select: {
          id: true,
          title: true,
          rentangWaktu: true,
          startdate: true,
          enddate: true,
          projectLeader: true,
          projectLeaderId: true
        }
      },
      TaskPeserta: true,
      pencairan: {
        select: {
          id: true,
          status: true,
          tahapanId: true,
          tahapan: true
        }
      }
    },
    where: {
      OR: [
        {
          duedate: {
            lte: new Date()
          }
        },
        {
          target: {
            equals: prisma.sub_kegiatan.fields.realisasi
          }
        }
      ],
      NOT: [
        {
          target: {
            equals: 0
          }
        },
        // pelatihan
        {
          jenisKeg: {
            equals: 63
          }
        },
        // persiapan
        {
          jenisKeg: {
            equals: 64
          }
        },
        // listing
        {
          jenisKeg: {
            equals: 71
          }
        },
        {
          jenisKeg: {
            equals: 66
          }
        },
        // diseminasi
        {
          jenisKeg: {
            equals: 69
          }
        },
        // evaluasi
        {
          jenisKeg: {
            equals: 68
          }
        }
      ]
    }
  })

  return {
    props: {
      data: JSON.stringify(tasks)
    }
  }
}

export default ProjectList
