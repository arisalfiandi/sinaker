import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import RapatApproveList from 'src/views/rapat-views/RapatApproveList'
const RapatAjuanList = ({ data }) => {
  const [dataTimeline, setDataTimeline] = useState(JSON.parse(data))
  return (
    <>
      <RapatApproveList dataUndanganPersetujuan={dataTimeline.undangan_rapat} dataRapat={dataTimeline.rapat}></RapatApproveList>
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

  let rapat
  rapat = await prisma.meet.findMany({
    include: {
      createdBy: true
    }
  })

  const undangan_rapat = await prisma.undangan_persetujuan_meet.findMany({})

  const data = {
    rapat,
    undangan_rapat
  }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default RapatAjuanList
