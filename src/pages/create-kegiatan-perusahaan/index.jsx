// view
import CreateKegiatanPerusahaanViews from 'src/views/perusahaan-views/CreateKegiatanPerusahaanViews'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

const CreateKegiatanPerusahaan = ({ data }) => {
  const [perusahaan, setPerusahaan] = useState(JSON.parse(data))
  return (
    <>
      <CreateKegiatanPerusahaanViews data={perusahaan}></CreateKegiatanPerusahaanViews>
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

  companies = await prisma.perusahaan.findMany({
    where: {
      id: {
        not: 0
      }
    }
  })
  return {
    props: {
      data: JSON.stringify(companies)
    }
  }
}
export default CreateKegiatanPerusahaan
