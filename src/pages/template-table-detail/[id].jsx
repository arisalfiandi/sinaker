import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'
import TemplateTableDetailViews from 'src/views/template-table-views/TemplateTableDetailViews'

const TemplateTableDetail = ({ data }) => {
  const [dataTmp, setDataTmp] = useState(JSON.parse(data))
  return (
    <>
      <TemplateTableDetailViews dataTemplate={dataTmp.templateTable} />
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

  templateTable = await prisma.template_table.findUnique({
    where: {
      id: parseInt(context.params.id)
    },
    include: {
      template_table_kolom: {
        select: {
          id: true,
          kolomTable: true
        }
      }
    }
  })

  const data = {
    templateTable
  }
  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default TemplateTableDetail
