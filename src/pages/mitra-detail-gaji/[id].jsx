import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import MitraDetailGajiViews from 'src/views/mitra-views/MitraDetailGajiViews'
const Mitra = ({ data }) => {
  const [mitra, setMitra] = useState(JSON.parse(data))
  return (
    <>
      <MitraDetailGajiViews data={mitra.mitra} dataTpp={mitra.perusahaanTask}></MitraDetailGajiViews>
    </>
  )
}

export async function getServerSideProps(context) {
  let mitra

  mitra = await prisma.mitra.findMany({
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
    mitra
  }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default Mitra
