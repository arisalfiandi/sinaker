import prisma from '../../../services/db'
// groupperusahaan
export default async function handler(req, res) {
  const { method } = req

  if (method === 'PUT') {
    // update info pencairan seperti tahapanId, status, tanggal selesai
    const { pencairanId, tahapanId, resolve } = req.body
    try {
      const pencairan = await prisma.pesan_pencairan.updateMany({
        data: {
          resolve
        },
        where: {
          pencairanId: Number(pencairanId),
          tahapanId: Number(tahapanId)
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
