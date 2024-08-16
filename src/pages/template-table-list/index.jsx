// view
import TemplateTableListViews from 'src/views/template-table-views/TemplateTableListViews'
import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

const TemplateTable = ({ data }) => {
  return (
    <>
      <TemplateTableListViews dataTemplateTable={JSON.parse(data)}></TemplateTableListViews>
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
  let templateTable

  templateTable = await prisma.template_table.findMany({
    select: {
      id: true,
      nama: true,
      jenisSample: true
    }
  })

  return {
    props: {
      data: JSON.stringify(templateTable)
    }
  }
}

export default TemplateTable
