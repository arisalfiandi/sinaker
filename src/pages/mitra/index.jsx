import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import MitraListViews from 'src/views/mitra-views/MitraListViews'
const Mitra = ({ data }) => {
  const [mitra, setMitra] = useState(JSON.parse(data))
  return (
    <>
      <MitraListViews
        data={mitra.mitra}
        dataHonorTetap={mitra.honorTetap}
        dataTpp={mitra.perusahaanTask}
      ></MitraListViews>
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
      id: {
        not: 0
      }
    },
    include: {
      TaskPeserta: {
        select: {
          id: true,
          task: true
        }
      },
      beban_kerja_mitra: {
        select: {
          bebanKerja: true
        }
      }
    }
  })

  const perusahaanTask = await prisma.data_target_realisasi.findMany({
    include: {
      task: true
    }
  })

  const honorTetap = await prisma.sub_kegiatan_mitra.findMany({
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

  const data = {
    perusahaanTask,
    mitra,
    honorTetap
  }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default Mitra
