import prisma from '../../../services/db'

// addperusahaan di daftar perusahaan
export default async function handler(req, res) {
  const { method } = req

  if (method === 'GET') {
    const users = await prisma.perusahaan.findMany()
    if (!users) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: users })
  }

  if (method === 'POST') {
    const { kip, nama, desa, kecamatan, namaDesa, namaKec, alamat } = req.body

    try {
      const companies = await prisma.perusahaan.create({
        data: {
          kip: Number(kip),
          nama,
          desa,
          kecamatan,
          namaDesa,
          namaKec,
          alamat,
          kegiatan: ''
        }
      })

      return res.status(201).json({ success: true, data: companies })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
