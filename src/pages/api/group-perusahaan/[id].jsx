import prisma from '../../../services/db'

export default async function handler(req, res) {
  const id = req.query.id

  const { method } = req

  if (method === 'GET') {
    const gP = await prisma.project.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (!gP) {
      return res.status(400).json({ success: false, message: 'Group Perusahaan not found' })
    }

    return res.status(200).json({ success: true, data: project })
  } else if (method === 'DELETE') {
    try {
      const gP = await prisma.groupPerusahaan.delete({
        where: {
          id: Number(id)
        }
      })

      return res.status(200).json({ success: true, message: 'Group Perusahaan deleted' })
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Group Perusahaan not found' })
    }
  }
}
