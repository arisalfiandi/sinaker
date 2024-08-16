import prisma from '../../../services/db'
// groupperusahaan
export default async function handler(req, res) {
  const { method } = req

  if (method === 'GET') {
    const gP = await prisma.template_table.findMany()
    if (!gP) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: gP })
  }

  if (method === 'POST') {
    const { nama, jenisSample, kolom1, kolom2 } = req.body

    try {
      const templateTable = await prisma.template_table.create({
        data: {
          nama,
          jenisSample
        }
      })

      const templateTableKolom1 = await prisma.template_table_kolom.create({
        data: {
          kolomTable: kolom1,
          templateTableId: templateTable.id
        }
      })
      const templateTableKolom2 = await prisma.template_table_kolom.create({
        data: {
          kolomTable: kolom2,
          templateTableId: templateTable.id
        }
      })

      return res.status(201).json({ success: true, data: templateTable })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
