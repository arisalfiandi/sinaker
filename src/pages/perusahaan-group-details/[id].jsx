import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'
import PerusahaanDetailsViews from 'src/views/perusahaan-views/PerusahaanDetailsViews'

const PerusahaanDetails = ({ data }) => {
  const [perusahaan, setPerusahaan] = useState(JSON.parse(data))
  // console.log(perusahaan)
  return (
    <>
      <PerusahaanDetailsViews data={perusahaan} />
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

  let companies

  companies = await prisma.groupPerusahaan.findMany({
    where: {
      id: parseInt(context.params.id)
    },
    include: {
      Perusahaangroup: {
        select: {
          id: true,
          perusahaan: true
        }
      }
    }
  })

  return {
    props: {
      data: JSON.stringify(companies)
    }
  }
}

export default PerusahaanDetails
