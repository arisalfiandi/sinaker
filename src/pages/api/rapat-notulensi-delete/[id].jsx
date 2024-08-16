import prisma from '../../../services/db'

export default async function handler(req, res) {
  const id = req.query.id

  const { method } = req

  if (method === 'GET') {
    const rapat = await prisma.meet_notulensi.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (!rapat) {
      return res.status(400).json({ success: false, message: 'rapat not found' })
    }

    return res.status(200).json({ success: true, data: project })
  } else if (method === 'DELETE') {
    try {
      const rapat = await prisma.notulensi_meet.delete({
        where: {
          id: Number(id)
        }
      })

      return res.status(200).json({ success: true, message: 'Dokumen deleted' })
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Dokumen not found' })
    }
  }
}
