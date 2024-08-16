import prisma from '../../../services/db'
// groupperusahaan
export default async function handler(req, res) {
  const { method } = req

  if (method === 'POST') {
    const { pencairanId, tahapanId, pesan, resolve } = req.body

    try {
      const pencairan = await prisma.pesan_pencairan.create({
        data: {
          tahapanId,
          pencairanId,
          pesan,
          resolve
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
