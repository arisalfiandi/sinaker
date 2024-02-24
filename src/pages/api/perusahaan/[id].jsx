import prisma from '../../../services/db'
// update tarel di taskdetail
export default async function handler(req, res) {
  const id = req.query.id

  const { method } = req

  if (method === 'GET') {
    const taskPerusahaanProduksi = await prisma.taskPerusahaanProduksi.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (!taskPerusahaanProduksi) {
      return res.status(400).json({ success: false, message: 'Perusahaan not found' })
    }

    return res.status(200).json({ success: true, data: taskPerusahaanProduksi })
  } else if (method === 'PUT') {
    const {
      target,
      realisasi,
      duedate,
      hasilPencacahan,
      pmlId,
      gajiPml,
      pclId,
      gajiPcl,
      idSls,
      nbs,
      nks,
      idSbr,
      nus,
      nama,
      desa,
      namadesa,
      kecamatan,
      namaKec,
      alamat
    } = req.body
    // console.log('bukan wo yg pasti' + pclId)

    // console.log('ini Bulan : ' + bulan)
    try {
      console.log(target, realisasi, duedate, hasilPencacahan, gajiPcl, pclId)
      const taskPerusahaanProduksi = await prisma.taskPerusahaanProduksi.update({
        where: {
          id: Number(id)
        },
        data: {
          target: Number(target),
          realisasi: Number(realisasi),
          hasilPencacahan,
          pmlId,
          gajiPml,
          pclId,
          gajiPcl,
          duedate,
          idSls,
          nbs,
          nks,
          idSbr,
          nus,
          nama,
          desa,
          namadesa,
          kecamatan,
          namaKec,
          alamat
        }
      })

      // const pesertaGaji = await prisma.pesertaGaji.update({
      //   where: {
      //     id: Number(id)
      //   },
      //   data: {
      //     mitraId: pclId,
      //     gaji: gajiPcl,
      //     dateGaji: bulan,
      //     taskPerusahaanProduksi: id
      //   }
      // })

      return res.status(200).json({ success: true, data: taskPerusahaanProduksi })
    } catch (error) {
      console.log(error.message)
      return res.status(400).json({ success: false })
    }
  } else if (method === 'DELETE') {
    try {
      const taskPerusahaanProduksi = await prisma.taskPerusahaanProduksi.delete({
        where: {
          id: Number(id)
        }
      })

      return res.status(200).json({ success: true, message: 'Project deleted' })
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Project not found' })
    }
  }
}
