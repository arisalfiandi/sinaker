import prisma from '../../../services/db'
// groupperusahaan
export default async function handler(req, res) {
  const { method } = req

  if (method === 'PUT') {
    // update info pencairan seperti tahapanId, status, tanggal selesai
    const { data_surat_edit } = req.body
    try {
      // const pencairan = await prisma.surat_pencairan.updateMany({
      //   data: {
      //     lokasi
      //   },
      //   where: {
      //     pencairanId: Number(pencairanId),
      //     jenisId: Number(jenisId)
      //   }
      // })

      data_surat_edit.map(async surat => {
        const pencairan = await prisma.surat_pencairan.updateMany({
          data: {
            lokasi: surat.lokasi
          },
          where: {
            pencairanId: surat.id,
            jenisId: surat.jenis
          }
        })
      })

      return res.status(201).json({ success: true })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: gP })
  }
}
