import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'
import PencairanDetailViews from 'src/views/pencairan-views/PencairanDetailViews'

const ProjectDetail = ({ data }) => {
  const [dataPd, setDataPd] = useState(JSON.parse(data))
  // console.log(project)
  return (
    <>
      <PencairanDetailViews data={dataPd.task} dataMitra={dataPd.mitraTask} dataTpp={dataPd.perusahaanTask} />
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
  const task = await prisma.sub_kegiatan.findUnique({
    where: {
      id: parseInt(context.params.id)
    },
    include: {
      project: {
        select: {
          id: true,
          title: true,
          rentangWaktu: true,
          startdate: true,
          enddate: true,
          projectLeader: true,
          projectLeaderId: true
        }
      },
      TaskPeserta: true,
      pencairan: {
        select: {
          id: true,
          status: true,
          tahapanId: true,
          tahapan: true,
          tanggalMulai: true,
          tanggalSPM: true,
          pesan_pencairan: true,
          surat_pencairan: true
        }
      }
    }
  })

  const perusahaanTask = await prisma.data_target_realisasi.findMany({
    where: {
      taskId: parseInt(context.params.id)
    }
  })

  // const upm = await prisma.usertask_member.findMany({
  //   where: {
  //     projectId: parseInt(context.params.id)
  //   }
  // })

  const mitraTask = await prisma.sub_kegiatan_mitra.findMany({
    where: {
      taskId: parseInt(context.params.id)
    },
    include: {
      mitra: true
    }
  })

  const dataPd = { task, mitraTask, perusahaanTask }

  return {
    props: {
      data: JSON.stringify(dataPd)
    }
  }
}

export default ProjectDetail
