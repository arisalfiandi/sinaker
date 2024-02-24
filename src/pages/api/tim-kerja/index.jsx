import prisma from '../../../services/db'
// groupperusahaan
export default async function handler(req, res) {
  const { method } = req

  if (method === 'GET') {
    const gP = await prisma.timkerja.findMany()
    if (!gP) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: gP })
  }

  if (method === 'POST') {
    const { nama, participants, ketuaTim } = req.body

    try {
      console.log(nama)
      const timkerja = await prisma.TimKerja.create({
        data: {
          nama,
          // fungsi
          ketuaTim
        }
      })

      participants.map(async participant => {
        if (participant.checked) {
          const pk = await prisma.TimKerjaPegawai.create({
            data: {
              userId: participant.id,
              timKerjaId: timkerja.id
            }
          })
        }
      })

      return res.status(201).json({ success: true, data: timkerja })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
