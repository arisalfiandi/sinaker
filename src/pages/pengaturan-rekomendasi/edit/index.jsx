// view
import EditBobotKriteria from 'src/views/pengaturan-rekomendasi-views/EditBobotKriteria'
import { useState, useEffect } from 'react'
import prisma from '../../../services/db'
import { getToken } from 'next-auth/jwt'

const CreateKegiatanPerusahaan = ({ data }) => {
  const [beban, setUser] = useState(JSON.parse(data))
  return (
    <>
      <EditBobotKriteria dataPegawai={beban.kriteriaPegawai} dataMitra={beban.kriteriaMitra}></EditBobotKriteria>
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

  const kriteriaPegawai = await prisma.kriteria_beban_kerja_pegawai.findUnique({
    where: { id: 1 }
  })

  const kriteriaMitra = await prisma.kriteria_beban_kerja_mitra.findUnique({
    where: { id: 1 }
  })

  const data = {
    kriteriaPegawai,
    kriteriaMitra
  }
  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}
export default CreateKegiatanPerusahaan
