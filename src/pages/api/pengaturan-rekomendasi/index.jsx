import prisma from '../../../services/db'
// groupperusahaan
export default async function handler(req, res) {
  const { method } = req

  if (method === 'GET') {
    const gP = await prisma.kriteria_beban_kerja_pegawai.findMany()
    if (!gP) {
      return res.status(400).json({ success: false })
    }
    const gM = await prisma.kriteria_beban_kerja_mitra.findMany()
    if (!gM) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: [gP, gM] })
  }

  if (method === 'POST') {
    const { kriteria1P, kriteria2P, kriteria1M, kriteria2M, kriteria3M } = req.body

    try {
      const bebanPegawai = await prisma.kriteria_beban_kerja_pegawai.update({
        where: { id: 1 },
        data: {
          kriteria1: kriteria1P,
          kriteria2: kriteria2P
        }
      })

      const bebanMitra = await prisma.kriteria_beban_kerja_mitra.update({
        where: { id: 1 },
        data: {
          kriteria1: kriteria1M,
          kriteria2: kriteria2M,
          kriteria3: kriteria3M
        }
      })

      return res.status(201).json({ success: true })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
