import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import BebanKerjaViews from 'src/views/beban-kerja-views/BebanKerjaViews'

const BebanKerja = ({ data }) => {
  const [project, setProject] = useState(JSON.parse(data))
  // console.log(project)
  return (
    <>
      <BebanKerjaViews
        dataMitra={project.mitras}
        dataOrganik={project.oraganik}
        dataTpp={project.perusahaanTask}
        dataKriteriaP={project.kriteriaPegawai}
        dataKriteriaM={project.kriteriaMitra}
      ></BebanKerjaViews>
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

  let mitras

  mitras = await prisma.mitra.findMany({
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
      }
      // beban_kerja_mitra: {
      //   select: {
      //     bebanKerja: true
      //   }
      // }
    }
  })

  let oraganik

  oraganik = await prisma.user.findMany({
    where: {
      id: {
        not: 99
      }
    },
    include: {
      // UserProject: {
      //   select: {
      //     id: true,
      //     project: true
      //   }
      // },
      // TaskOrganik: {
      //   select: {
      //     id: true,
      //     task: true
      //   }
      // },
      // TimKerjaPegawai: true,
      // taskToDo: true,
      // beban_kerja_pegawai: {
      //   select: {
      //     bebanKerja: true
      //   }
      // },

      // semua jenis kegiatan
      pekerjaan_harian: {
        include: {
          task: true
        }
      }
    }
  })

  const perusahaanTask = await prisma.data_target_realisasi.findMany({})

  const kriteriaPegawai = await prisma.kriteria_beban_kerja_pegawai.findUnique({
    where: { id: 1 }
  })

  const kriteriaMitra = await prisma.kriteria_beban_kerja_mitra.findUnique({
    where: { id: 1 }
  })

  const data = {
    kriteriaMitra,
    kriteriaPegawai,
    perusahaanTask,
    mitras,
    oraganik
  }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default BebanKerja
