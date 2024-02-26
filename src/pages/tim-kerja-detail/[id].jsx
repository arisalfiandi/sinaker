import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'
import TimKerjaDetailViews from 'src/views/tim-kerja-views/TimKerjaDetailViews'

const TimKerjaDetail = ({ data }) => {
  const [timKerja, setTimKerja] = useState(JSON.parse(data))
  // console.log(TimKerja)
  return (
    <>
      <TimKerjaDetailViews data={timKerja.timkerja} dataUser={timKerja.user} dataTpp={timKerja.perusahaanTask} />
    </>
  )
}

export async function getServerSideProps(context) {
  let timkerja

  timkerja = await prisma.timKerja.findUnique({
    where: {
      id: parseInt(context.params.id)
    },
    include: {
      timKerjaPegawai: {
        select: {
          id: true,
          userId_fkey: {
            include: {
              UserProject: true,
              taskToDo: true,
              beban_kerja_pegawai: {
                select: {
                  bebanKerja: true
                }
              }
            }
          }
        }
      },
      userId_fkey: true
    }
  })

  let user

  user = await prisma.user.findMany({
    where: {
      id: {
        not: 99
      }
    },
    include: {
      UserProject: true,
      taskToDo: true
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
    user,
    timkerja
  }
  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default TimKerjaDetail
