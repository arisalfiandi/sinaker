import prisma from '../../../services/db'
// groupperusahaan
export default async function handler(req, res) {
  const { method } = req

  if (method === 'GET') {
    const mitras = await prisma.mitra.findMany()
    if (!mitras) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: mitras })
  }

  if (method === 'POST') {
    const { participants } = req.body

    try {
      participants.map(async participant => {
        const mitraImport = await prisma.mitra.create({
          data: {
            name: participant.name,
            nik: participant.nik,
            jenisKelamin: participant.jenisKelamin,
            tanggalLahir: new Date(participant.tanggalLahir),
            umur: Number(participant.umur),
            pendidikan: participant.pendidikan,
            email: participant.email,
            status: participant.status
          }
        })
      })
      return res.status(201).json({ success: true })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
