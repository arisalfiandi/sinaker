// view
import CreateBobotKriteria from 'src/views/pengaturan-rekomendasi-views/CreateBobotKriteria'
import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

const CreateKegiatanPerusahaan = ({ data }) => {
  const [beban, setUser] = useState(JSON.parse(data))
  return (
    <>
      <CreateBobotKriteria dataPegawai={beban.kriteriaPegawai} dataMitra={beban.kriteriaMitra}></CreateBobotKriteria>
    </>
  )
}
export async function getServerSideProps(context) {
  const token = await getToken({ req: context.req, secret: process.env.JWT_SECRET })

  if (!token) {
    return true
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
