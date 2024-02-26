import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'
import PeopleViews from 'src/views/people-views/PeopleViews'

const People = ({ data }) => {
  const [user, setUser] = useState(JSON.parse(data))
  // console.log(user)
  // console.log('asd')
  return (
    <>
      <PeopleViews data={user.user} dataTpp={user.perusahaanTask}></PeopleViews>
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

export default People
