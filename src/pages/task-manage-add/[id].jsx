import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import TaskManageAddViews from 'src/views/task-views/TaskManageAddViews'

const TaskManageAdd = ({ data }) => {
  const [project, setProject] = useState(JSON.parse(data))
  // console.log(project)
  return (
    <>
      <TaskManageAddViews
        data={project.project}
        dataPerusahaan={project.companies}
        dataAllPerusahaan={project.perusahaans}
        dataMitra={project.mitras}
        dataTaskPerusahaan={project.perusahaanTask}
        dataOrganik={project.oraganik}
        dataTimKerja={project.timkerja}
        dataBobotMitra={project.kriteriaMitra}
        dataBobotPegawai={project.kriteriaPegawai}
        dataOrganikProject_member={project.oraganikProject_member}
      ></TaskManageAddViews>
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

  const project = await prisma.project.findUnique({
    where: {
      id: parseInt(context.params.id)
    },
    include: {
      Task: {
        include: {
          user: true,
          project: true
        }
      },
      projectLeader: true,
      UserProject: {
        include: {
          user: true
        }
      }
    }
  })

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
      fungsi: true
    }
  })

  let perusahaans

  perusahaans = await prisma.perusahaan.findMany({
    select: {
      id: true,
      kip: true,
      nama: true,
      desa: true,
      namaDesa: true,
      kecamatan: true,
      namaKec: true,
      alamat: true
    }
  })

  const perusahaanTask = await prisma.taskPerusahaanProduksi.findMany({
    include: {
      task: true,
      perusahaan: true
    }
  })

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
      },
      beban_kerja_mitra: {
        select: {
          bebanKerja: true
        }
      }
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
      UserProject: {
        select: {
          id: true,
          project: true
        }
      },
      TaskOrganik: {
        select: {
          id: true,
          task: true
        }
      },
      TimKerjaPegawai: true,
      taskToDo: true,
      beban_kerja_pegawai: {
        select: {
          bebanKerja: true
        }
      }
    }
  })

  let kriteriaPegawai = await prisma.kriteria_beban_kerja_pegawai.findUnique({
    where: { id: 1 }
  })

  let kriteriaMitra = await prisma.kriteria_beban_kerja_mitra.findUnique({
    where: { id: 1 }
  })

  let oraganikProject_member
  oraganikProject_member = await prisma.userProject_member.findMany({
    where: {
      projectId: parseInt(context.params.id)
    }
  })

  const data = {
    project,
    companies,
    perusahaans,
    mitras,
    perusahaanTask,
    oraganik,
    timkerja,
    oraganikProject_member,
    kriteriaMitra,
    kriteriaPegawai
  }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default TaskManageAdd
