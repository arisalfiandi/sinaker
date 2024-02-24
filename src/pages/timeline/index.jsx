import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import TimelineViews from 'src/views/timeline-views/TimelineViews'
const Timeline = ({ data }) => {
  return (
    <>
      <TimelineViews data={JSON.parse(data)}></TimelineViews>
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

export default Timeline
