import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import MitraDetailGajiViews from 'src/views/mitra-views/MitraDetailGajiViews'
const Mitra = ({ data }) => {
  const [mitra, setMitra] = useState(JSON.parse(data))
  return (
    <>
      <MitraDetailGajiViews
        dataKolom={mitra.templateKolom}
        data={mitra.mitra}
        dataTpp={mitra.perusahaanTask}
        dataHonorTetap={mitra.honorTetap}
      ></MitraDetailGajiViews>
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
  let mitra

  mitra = await prisma.mitra.findMany({
    where: {
      id: parseInt(context.params.id)
    }
  })

  // const perusahaanTask = await prisma.taskPerusahaanProduksi.findMany({
  //   include: {
  //     perusahaan: true,
  //     task: true
  //   }
  // })
  const perusahaanTask = await prisma.data_target_realisasi.findMany({
    include: {
      task: true
    }
  })

  const honorTetap = await prisma.sub_kegiatan_mitra.findMany({
    where: {
      mitraId: parseInt(context.params.id)
    },
    select: {
      task: {
        select: {
          duedate: true
        }
      },
      honor: true,
      taskId: true,
      mitraId: true
    }
  })

  const template = await prisma.template_table.findMany({})
  const templateKolom = await prisma.template_table_kolom.findMany({})
  const data = {
    perusahaanTask,
    mitra,
    template,
    templateKolom,
    honorTetap
  }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default Mitra
