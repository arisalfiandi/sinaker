import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import MitraEditViews from 'src/views/mitra-views/MitraEditViews'
const MitraEdit = ({ data }) => {
  const [mitra, setMira] = useState(JSON.parse(data))

  return (
    <>
      <MitraEditViews data={mitra}></MitraEditViews>
    </>
  )
}

export default MitraEdit

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
  const mitras = await prisma.mitra.findUnique({
    where: {
      id: parseInt(context.params.id)
    }
  })

  return {
    props: {
      data: JSON.stringify(mitras)
    }
  }
}
