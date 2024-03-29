import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import PeopleEditViews from 'src/views/people-views/PeopleEditViews'

const PeopleEdit = ({ data }) => {
  const [pegawai, setPegawai] = useState(JSON.parse(data))
  return (
    <>
      <PeopleEditViews data={pegawai}></PeopleEditViews>
    </>
  )
}

export async function getServerSideProps(context) {
  const users = await prisma.user.findUnique({
    where: {
      id: parseInt(context.params.id)
    },
    include: {
      UserProject: true,
      taskToDo: true
    }
  })

  return {
    props: {
      data: JSON.stringify(users)
    }
  }
}

export default PeopleEdit
