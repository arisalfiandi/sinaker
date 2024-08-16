// view
import CreateTimKerjaViews from 'src/views/tim-kerja-views/CreateTimKerjaViews'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

const CreateKegiatanPerusahaan = ({ data }) => {
  const [user, setUser] = useState(JSON.parse(data))
  return (
    <>
      <CreateTimKerjaViews
        data={user.user}
        dataTpp={user.perusahaanTask}
        dataKriteria={user.kriteria}
      ></CreateTimKerjaViews>
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
  let user

  user = await prisma.user.findMany({
    where: {
      id: {
        not: 99
      }
    },
    include: {
      TimKerjaPegawai: true,
      pekerjaan_harian: {
        include: {
          task: true
        }
      }
    }
  })

  const perusahaanTask = await prisma.data_target_realisasi.findMany({
    // include: {
    //   perusahaan: true,
    //   task: true
    // }
  })

  const kriteria = await prisma.kriteria_beban_kerja_pegawai.findUnique({
    where: { id: 1 }
  })

  const data = {
    perusahaanTask,
    kriteria,
    user
  }
  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}
export default CreateKegiatanPerusahaan
