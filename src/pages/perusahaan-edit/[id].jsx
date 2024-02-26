import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import PerusahaanEditViews from 'src/views/perusahaan-views/PerusahaanEditViews'

const PeopleEdit = ({ data }) => {
  const [perusahaan, setPerusahaan] = useState(JSON.parse(data))
  return (
    <>
      <PerusahaanEditViews data={perusahaan}></PerusahaanEditViews>
    </>
  )
}

export async function getServerSideProps(context) {
  const companies = await prisma.perusahaan.findUnique({
    where: {
      id: parseInt(context.params.id)
    }
  })

  return {
    props: {
      data: JSON.stringify(companies)
    }
  }
}

export default PeopleEdit
