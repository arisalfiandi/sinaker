import prisma from '../../../services/db'
// groupperusahaan
export default async function handler(req, res) {
  const { method } = req

  if (method === 'GET') {
    const gP = await prisma.groupperusahaan.findMany()
    if (!gP) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: gP })
  }

  if (method === 'POST') {
    const { nama, fungsi, participants } = req.body

    try {
      console.log(nama)
      const groupperusahaan = await prisma.groupPerusahaan.create({
        data: {
          nama,
          fungsi
        }
      })

      participants.map(async participant => {
        if (participant.checked) {
          const pk = await prisma.perusahaanGroup.create({
            data: {
              perusahaanId: participant.id,
              groupPerusahaanId: groupperusahaan.id
            }
          })
        }
      })

      return res.status(201).json({ success: true, data: groupperusahaan })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
