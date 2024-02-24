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
      target,
      realisasi,
      hasilPencacahan,
      perusahaanId,
      duedate,
      taskId,
      kip,
      nama,
      desa,
      namadesa,
      kecamatan,
      namaKec,
      alamat,
      pmlId,
      gajiPml,
      pclId,
      gajiPcl,
      nbs,
      idSls,
      idSbr,
      nks,
      nus
    } = req.body

    console.log('masuk ke wdb')
    try {
      // const companies = await prisma.perusahaan.create({
      //   data: {
      //     kip: Number(kip),
      //     nama,
      //     desa,
      //     kecamatan,
      //     namaDesa: namadesa,
      //     namaKec,
      //     alamat,
      //     kegiatan: ''
      //   }
      // })

      const tpp = await prisma.TaskPerusahaanProduksi.create({
        data: {
          taskId: taskId,
          target: Number(target),
          realisasi: Number(realisasi),
          hasilPencacahan: hasilPencacahan,
          perusahaanId,
          duedate: duedate,
          nama,
          desa,
          namadesa,
          kecamatan,
          namaKec,
          alamat,
          pmlId,
          gajiPml,
          pclId,
          gajiPcl,
          nbs,
          idSls,
          idSbr,
          nks,
          nus
        }
      })

      // const pesertaGaji = await prisma.pesertaGaji.create({
      //   data: {
      //     mitraId: pclId,
      //     gaji: gajiPcl,
      //     dateGaji: duedate,
      //     taskPerusahaanProduksi: id
      //   }
      // })

      return res.status(201).json({ success: true, data: tpp })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
