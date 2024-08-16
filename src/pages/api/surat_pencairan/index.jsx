import prisma from '../../../services/db'
// groupperusahaan
export default async function handler(req, res) {
  const { method } = req

  if (method === 'POST') {
    const { data_surat } = req.body

    try {
      data_surat.map(async surat => {
        const pencairan = await prisma.surat_pencairan.create({
          data: {
            pencairanId: surat.id,
            jenisId: surat.jenis,
            lokasi: surat.lokasi
          }
        })
      })

      return res.status(201).json({ success: true })
    } catch (error) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
