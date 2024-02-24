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
    const { nik, name, jenisKelamin, tanggalLahir, umur, pendidikan, email, status } = req.body

    try {
      const mitras = await prisma.mitra.create({
        data: {
          nik,
          name,
          jenisKelamin,
          tanggalLahir,
          umur,
          pendidikan,
          email,
          status
        }
      })

      return res.status(201).json({ success: true, data: mitras })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
