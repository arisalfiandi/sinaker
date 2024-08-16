import prisma from '../../../services/db'
// groupperusahaan
export default async function handler(req, res) {
  const { method } = req

  if (method === 'GET') {
    const gP = await prisma.pencairan.findMany()
    if (!gP) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: gP })
  }

  if (method === 'POST') {
    const { taskId, tahapanId, status, tanggalMulai, tanggalSPM, tanggalSelesai } = req.body

    try {
      const pencairan = await prisma.pencairan.create({
        data: {
          sub_kegiatanId: taskId,
          tahapanId,
          status,
          tanggalMulai,
          tanggalSelesai,
          tanggalSPM
        }
      })

      return res.status(201).json({ success: true })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
