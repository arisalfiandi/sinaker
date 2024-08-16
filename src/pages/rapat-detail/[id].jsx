import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'
import RapatDetailViews from 'src/views/rapat-views/RapatDetailViews'

const RapatDetail = ({ data }) => {
  const [dataR, setDataR] = useState(JSON.parse(data))
  return (
    <>
      <RapatDetailViews
        dataUndanganPersetujuan={dataR.undangan_rapat}
        dataPesertaRapat={dataR.userRapat}
        dataRapat={dataR.rapat}
        dataDokumen={dataR.dokumen}
      />
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
  const rapat = await prisma.meet.findUnique({
    where: {
      id: parseInt(context.params.id)
    },
    include: {
      undangan_file: true
    }
  })
  const userRapat = await prisma.user_meet.findMany({
    where: {
      meetId: parseInt(context.params.id)
    },
    select: {
      id: true,
      user: true
    }
  })

  const dokumen = await prisma.notulensi_meet.findMany({
    where: {
      meetId: parseInt(context.params.id)
    }
  })

  const undangan_rapat = await prisma.undangan_persetujuan_meet.findMany({
    where: {
      meetId: parseInt(context.params.id)
    }
  })
  console.log(undangan_rapat)
  const data = { rapat, userRapat, dokumen, undangan_rapat }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default RapatDetail
