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
    const { nama, fungsi, sample } = req.body

    try {
      console.log(nama)
      // const groupperusahaan = await prisma.groupPerusahaan.create({
      //   data: {
      //     nama,
      //     fungsi
      //   }
      // })

      if (fungsi == 7 || fungsi == 6) {
        sample.map(async nbsSls => {
          console.log(nbsSls.kodeDesa)
          const sampleNbsSls = await prisma.nbs_idsls.create({
            data: {
              desa: String(nbsSls.kodeDesa),
              kecamatan: String(nbsSls.kodeKecamatan),
              namadesa: nbsSls.namaDesa,
              namaKec: nbsSls.namaKecamatan,
              nbs: Number(nbsSls.nbs),
              id_sls: Number(nbsSls.idSls)
            }
          })
        })
      } else if (fungsi === 3) {
        sample.map(async nbsNks => {
          console.log('ini nks:' + nbsNks.nks)
          const sampleNbsNks = await prisma.nbs_nks.create({
            data: {
              desa: String(nbsNks.kodeDesa),
              kecamatan: String(nbsNks.kodeKecamatan),
              namadesa: nbsNks.namaDesa,
              namaKec: nbsNks.namaKecamatan,
              nbs: Number(nbsNks.nbs),
              nks: Number(nbsNks.nks)
            }
          })
        })
      }

      //   sample.map(async participant => {
      //     const pkNew = await prisma.perusahaanGroup.create({
      //       data: {
      //         perusahaanId: companies.id,
      //         groupPerusahaanId: groupperusahaan.id
      //       }
      //     })
      //   })

      return res.status(201).json({ success: true })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
