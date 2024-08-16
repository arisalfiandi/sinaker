// view
import CreateTemplateTableViews from 'src/views/template-table-views/CreateTemplateTableViews'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

const CreateTemplateTable = ({ data }) => {
  const [dataCreate, setDataCerate] = useState(JSON.parse(data))
  return (
    <>
      <CreateTemplateTableViews data={dataCreate.user} dataTim={dataCreate.timkerja}></CreateTemplateTableViews>
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
        not: 0
      }
    },
    include: {
      UserProject: true,
      taskToDo: true
    }
  })

  let timkerja

  timkerja = await prisma.TimKerja.findMany({
    include: {
      userId_fkey: true,
      timKerjaPegawai: true
    }
  })

  const data = {
    user,
    timkerja
  }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}
export default CreateTemplateTable
