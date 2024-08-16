import prisma from '../../../services/db'
// groupperusahaan
export default async function handler(req, res) {
  const { method } = req
  const id = req.query.id

  if (method === 'PUT') {
    // update info pencairan seperti tahapanId, status, tanggal selesai
    const { role } = req.body
    try {
      const pencairan = await prisma.user.update({
        data: {
          role
        },
        where: {
          id: Number(id)
        }
      })

      return res.status(201).json({ success: true })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: gP })
  }
}
