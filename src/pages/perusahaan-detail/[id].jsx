import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'
import PerusahaanDetailViews from 'src/views/perusahaan-views/PerusahaanDetailViews'

const PerusahaanDetail = ({ data }) => {
  const [perusahaan, setPerusahaan] = useState(JSON.parse(data))
  // console.log(user)
  // console.log('asd')
  return (
    <>
      <PerusahaanDetailViews data={perusahaan.perusahaan} dataTpp={perusahaan.perusahaanTask}></PerusahaanDetailViews>
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
  let perusahaan

  perusahaan = await prisma.perusahaan.findMany({
    where: {
      id: parseInt(context.params.id)
    }
  })

  const perusahaanTask = await prisma.taskPerusahaanProduksi.findMany({
    include: {
      perusahaan: true,
      task: true
    }
  })

  const data = {
    perusahaanTask,
    perusahaan
  }
  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default PerusahaanDetail
