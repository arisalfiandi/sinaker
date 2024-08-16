import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import TimelineViews from 'src/views/timeline-views/TimelineViews'
const Timeline = ({ data }) => {
  const [dataTimeline, setDataTimeline] = useState(JSON.parse(data))
  console.log(dataTimeline)
  return (
    <>
      <TimelineViews dataRapat={dataTimeline.rapat} data={dataTimeline.tasks}></TimelineViews>
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

  tasks = await prisma.sub_kegiatan.findMany({
    include: {
      project: true
    }
  })

  let rapat
  rapat = await prisma.meet.findMany({})

  const data = {
    tasks,
    rapat
  }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default Timeline
