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
