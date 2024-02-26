import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'
import PeopleDetailGajiViews from 'src/views/people-views/PeopleDetailGajiViews'

const People = ({ data }) => {
  const [user, setUser] = useState(JSON.parse(data))
  // console.log(user)
  // console.log('asd')
  return (
    <>
      <PeopleDetailGajiViews data={user.user} dataTpp={user.perusahaanTask}></PeopleDetailGajiViews>
    </>
  )
}

export async function getServerSideProps(context) {
  let user

  user = await prisma.user.findMany({
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

export default People
