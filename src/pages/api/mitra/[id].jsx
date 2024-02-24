import prisma from '../../../services/db'

export default async function handler(req, res) {
  const id = req.query.id

  const { method } = req

  if (method === 'GET') {
    const mitra = await prisma.mitra.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (!mitra) {
      return res.status(400).json({ success: false, message: 'Mitra not found' })
    }

    return res.status(200).json({ success: true, data: mitra })
  } else if (method === 'PUT') {
    const { nik, name, jenisKelamin, tanggalLahir, umur, pendidikan, email, status } = req.body

    try {
      const mitras = await prisma.mitra.update({
        where: {
          id: Number(id)
        },
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

      return res.status(200).json({ success: true, data: mitras })
    } catch (error) {
      console.log(error.message)
      return res.status(400).json({ success: false })
    }
  } else if (method === 'DELETE') {
    try {
      const mitras = await prisma.mitra.delete({
        where: {
          id: Number(id)
        }
      })

      return res.status(200).json({ success: true, message: 'Mitra deleted' })
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Mitra not found' })
    }
  }
}
