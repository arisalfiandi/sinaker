import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'
import PerusahaanViews from 'src/views/perusahaan-views/PerusahaanViews'

const Perusahaan = ({ data }) => {
  const [perusahaan, setPerusahaan] = useState(JSON.parse(data))

  return (
    <>
      <PerusahaanViews data={perusahaan}></PerusahaanViews>
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
  let perusahaans

  perusahaans = await prisma.perusahaan.findMany({
    select: {
      id: true,
      kip: true,
      nama: true,
      desa: true,
      kecamatan: true,
      kegiatan: true,
      alamat: true,
      namaDesa: true,
      namaKec: true
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
      data: JSON.stringify(perusahaans)
    }
  }
}

export default Perusahaan
