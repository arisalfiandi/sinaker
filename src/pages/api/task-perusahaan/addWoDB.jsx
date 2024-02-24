import prisma from '../../../services/db'

export default async function handler(req, res) {
  const { method } = req

  if (method === 'GET') {
    const tpp = await prisma.taskPerusahaanProduksi.findMany()
    if (!tpp) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: tpp })
  }

  if (method === 'POST') {
    console.log('dah sampe post')
    const {
      taskId,
      realisasi,
      target,
      duedate,
      hasilPencacahan,
      nama,
      desa,
      namadesa,
      kecamatan,
      namaKec,
      alamat,
      kip,
      pmlId,
      pclId,
      gajiPml,
      gajiPcl,
      nbs,
      idSls,
      idSbr,
      nks,
      nus
    } = req.body
    console.log('masuk ke wodb')
    try {
      const companies = await prisma.perusahaan.create({
        data: {
          kip: Number(kip),
          nama,
          desa,
          kecamatan,
          namaDesa: namadesa,
          namaKec,
          alamat,
          kegiatan: ''
        }
      })

      const tpp = await prisma.TaskPerusahaanProduksi.create({
        data: {
          taskId: taskId,
          perusahaanId: companies.id,
          nama,
          desa,
          namadesa,
          kecamatan,
          namaKec,
          alamat,
          pmlId,
          pclId,
          gajiPml,
          gajiPcl,
          target: Number(target),
          realisasi: Number(realisasi),
          hasilPencacahan: hasilPencacahan,
          duedate: duedate,
          nbs,
          idSls,
          idSbr,
          nks,
          nus
        }
      })

      return res.status(201).json({ success: true, data: tpp })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
