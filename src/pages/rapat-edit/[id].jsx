import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import RapatEditViews from 'src/views/rapat-views/RapatEditViews'

const PeopleEdit = ({ data }) => {
  const [rapatEdit, setRapatEdit] = useState(JSON.parse(data))
  return (
    <>
      <RapatEditViews
        dataRapatEdit={rapatEdit.meetData}
        dataUser={rapatEdit.user}
        dataPesertaRapat={rapatEdit.userRapat}
      ></RapatEditViews>
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
  const meetData = await prisma.meet.findUnique({
    where: {
      id: parseInt(context.params.id)
    },
    include: {
      createdBy: true
    }
  })
  const user = await prisma.user.findMany({
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

  const userRapat = await prisma.user_meet.findMany({
    where: {
      meetId: parseInt(context.params.id)
    },
    include: {
      user: true
    }
  })

  const data = {
    user,
    meetData,
    userRapat
  }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default PeopleEdit
