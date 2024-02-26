// view
import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import TimKerjaViews from 'src/views/tim-kerja-views/TimKerjaViews'

const ListGroupPerusahaan = ({ data }) => {
  const [TimKerja, setTimKerja] = useState(JSON.parse(data))
  console.log(TimKerja)
  // useEffect(() => {
  //   setProjects(JSON.parse(data))
  //   setTimeout(() => {
  //     console.log(projects)
  //     console.log('asd')
  //   }, [1000])
  // }, [data])
  return (
    <>
      <TimKerjaViews data={TimKerja} />
    </>
  )
}
export async function getServerSideProps(context) {
  let timkerja

  timkerja = await prisma.TimKerja.findMany({
    select: {
      id: true,
      timKerjaPegawai: {
        select: {
          id: true,
          userId_fkey: true
        }
      },
      nama: true,
      fungsi: true,
      userId_fkey: true
    }
  })

  return {
    props: {
      data: JSON.stringify(timkerja)
    }
  }
}

export default ListGroupPerusahaan
