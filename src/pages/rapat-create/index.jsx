import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'
import RapatCreateViews from 'src/views/rapat-views/RapatCreateViews'
const RapatCreate = ({ data }) => {
  const [dataCreate, setDataCerate] = useState(JSON.parse(data))

  return (
    <>
      <RapatCreateViews data={dataCreate.user} dataTim={dataCreate.timkerja}></RapatCreateViews>
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
  let user

  user = await prisma.user.findMany({
    where: {
      id: {
        not: 0
      }
    },
    include: {
      UserProject: true,
      taskToDo: true
    }
  })

  let timkerja

  timkerja = await prisma.TimKerja.findMany({
    include: {
      userId_fkey: true,
      timKerjaPegawai: true
    }
  })

  const data = {
    user,
    timkerja
  }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default RapatCreate
