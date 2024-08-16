import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'
import AccountViews from 'src/views/account-views/AccountViews'

const Account = ({ data }) => {
  const [user, setUser] = useState(JSON.parse(data))
  console.log(user)
  console.log('asd')
  return (
    <>
      <AccountViews data={user.user} dataTpp={user.perusahaanTask}></AccountViews>
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

  user = await prisma.user.findUnique({
    where: {
      id: parseInt(context.params.id)
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
    user
  }
  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default Account
