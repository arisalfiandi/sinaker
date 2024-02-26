// view
import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import GroupPerusahaanViews from 'src/views/perusahaan-views/GroupPerusahaanViews'

const ListGroupPerusahaan = ({ data }) => {
  const [groupPerusahaan, setgroupPerusahaan] = useState(JSON.parse(data))
  console.log(groupPerusahaan)
  // useEffect(() => {
  //   setProjects(JSON.parse(data))
  //   setTimeout(() => {
  //     console.log(projects)
  //     console.log('asd')
  //   }, [1000])
  // }, [data])
  return (
    <>
      <GroupPerusahaanViews data={groupPerusahaan} />
    </>
  )
}
export async function getServerSideProps(context) {
  let companies

  companies = await prisma.groupPerusahaan.findMany({
    select: {
      id: true,
      Perusahaangroup: {
        select: {
          id: true,
          perusahaan: true
        }
      },
      nama: true,
      fungsi: true
    }
  })

  return {
    props: {
      data: JSON.stringify(companies)
    }
  }
}

export default ListGroupPerusahaan
