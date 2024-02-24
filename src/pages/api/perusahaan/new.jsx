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

      if (fungsi == 4 || fungsi == 5) {
        const groupperusahaan = await prisma.groupPerusahaan.create({
          data: {
            nama,
            fungsi
          }
        })
        sample.map(async company => {
          console.log(company.kodeDesa)
          const companies = await prisma.perusahaan.create({
            data: {
              kip: 88787,
              nama: company.namaPerusahaan,
              desa: String(company.kodeDesa),
              kecamatan: String(company.kodeKecamatan),
              namaDesa: company.namaDesa,
              namaKec: company.namaKecamatan,
              alamat: company.alamat,
              kegiatan: ''
            }
          })

          const pkNew = await prisma.perusahaanGroup.create({
            data: {
              perusahaanId: companies.id,
              groupPerusahaanId: groupperusahaan.id
            }
          })
        })
      } else if (fungsi == 7) {
        sample.map(async sbrPerusahaan => {
          console.log(sbrPerusahaan.kodeDesa)
          const sampleSbrPerusahaan = await prisma.idsbr_perusahaan.create({
            data: {
              desa: String(sbrPerusahaan.kodeDesa),
              kecamatan: String(sbrPerusahaan.kodeKecamatan),
              namadesa: sbrPerusahaan.namaDesa,
              namaKec: sbrPerusahaan.namaKecamatan,
              idSbr: Number(sbrPerusahaan.idSbr),
              namaPerusahaan: Number(sbrPerusahaan.idSls)
            }
          })
        })
      } else if (fungsi == 6) {
        sample.map(async nusDinas => {
          console.log(nusDinas.kodeDesa)
          const sampleNusDinas = await prisma.nus_dinas.create({
            data: {
              desa: String(nusDinas.kodeDesa),
              kecamatan: String(nusDinas.kodeKecamatan),
              namadesa: nusDinas.namaDesa,
              namaKec: nusDinas.namaKecamatan,
              nus: Number(nusDinas.nus),
              dinas: nusDinas.namaPerusahaan
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
