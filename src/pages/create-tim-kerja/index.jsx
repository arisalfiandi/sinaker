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
      <CreateTimKerjaViews data={user.user} dataTpp={user.perusahaanTask}></CreateTimKerjaViews>
    </>
  )
}
export async function getServerSideProps(context) {
  let user

  user = await prisma.user.findMany({
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

  const perusahaanTask = await prisma.taskPerusahaanProduksi.findMany({
    include: {
      perusahaan: true,
      task: true
    }
  })

  const data = {
    perusahaanTask,
    user
  }
  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}
export default CreateKegiatanPerusahaan
