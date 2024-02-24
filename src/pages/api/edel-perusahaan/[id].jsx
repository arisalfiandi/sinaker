import prisma from '../../../services/db'
// edel di daftar perusahaan
export default async function handler(req, res) {
  const id = req.query.id

  const { method } = req

  if (method === 'GET') {
    const companies = await prisma.perusahaan.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (!companies) {
      return res.status(400).json({ success: false, message: 'perusahaan not found' })
    }

    return res.status(200).json({ success: true, data: task })
  } else if (method === 'PUT') {
    const { kip, nama, desa, kecamatan, namaDesa, namaKec, alamat } = req.body

    try {
      const companies = await prisma.perusahaan.update({
        where: {
          id: Number(id)
        },
        data: {
          kip: Number(kip),
          nama,
          desa,
          kecamatan,
          namaDesa,
          namaKec,
          alamat,
          kegiatan: '-'
        }
      })

      console.log(res.message)
      return res.status(200).json({ success: true, data: companies })
    } catch (error) {
      return res.status(400).json({ success: false })
    }
  } else if (method === 'DELETE') {
    try {
      const companies = await prisma.perusahaan.delete({
        where: {
          id: Number(id)
        }
      })

      return res.status(200).json({ success: true, data: companies })
    } catch (error) {
      return res.status(400).json({ success: false, message: error })
    }
  }
}
