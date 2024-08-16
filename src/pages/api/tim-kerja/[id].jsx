import prisma from '../../../services/db'

export default async function handler(req, res) {
  const id = req.query.id

  const { method } = req

  if (method === 'GET') {
    const gP = await prisma.TimKerja.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (!gP) {
      return res.status(400).json({ success: false, message: 'Tim Kerja Tidak Ditemukan' })
    }

    return res.status(200).json({ success: true, data: project })
  } else if (method === 'DELETE') {
    try {
      const gP = await prisma.TimKerja.delete({
        where: {
          id: Number(id)
        }
      })

      return res.status(200).json({ success: true, message: 'Tim Kerja Telah Dihapus' })
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Tim Kerja Tidak Ditemukan' })
    }
  } else if (method === 'PUT') {
    const { namaChange, nama, ketuaChange, ketuaTim, daftarTambah, daftarHapus } = req.body

    try {
      if (ketuaChange) {
        const timkerjaKetua = await prisma.TimKerja.update({
          data: {
            ketuaTim
          },
          where: {
            id: Number(id)
          }
        })
      }

      if (namaChange) {
        const timKerjaNama = await prisma.TimKerja.update({
          data: {
            nama
          },
          where: {
            id: Number(id)
          }
        })
      }

      daftarTambah.map(async participant => {
        const dt = await prisma.TimKerjaPegawai.create({
          data: {
            userId: participant.id,
            timKerjaId: Number(id)
          }
        })
      })

      daftarHapus.map(async participant => {
        const dh = await prisma.TimKerjaPegawai.deleteMany({
          where: {
            userId: participant.userId,
            timKerjaId: Number(id)
          }
        })
      })

      return res.status(201).json({ success: true, message: 'Tim Kerja Telah Diubah' })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }
  }
}
