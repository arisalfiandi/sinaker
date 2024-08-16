import prisma from '../../../../services/db'
// update tarel di taskdetail
export default async function handler(req, res) {
  const { method } = req
  //console.log('udah ke api')
  if (method === 'GET') {
    //console.log('udah ke api')
    const dataTarelGet = await prisma.data_target_realisasi.findMany({})
    if (!dataTarelGet) {
      return res.status(400).json({ success: false, message: 'Perusahaan not found' })
    }

    return res.status(200).json({ success: true, data: dataTarelGet })
  } else if (method === 'POST') {
    console.log('udah ke api post')
    const {
      taskId,
      target,
      realisasi,
      duedate,
      hasilPencacahan,
      pmlId,
      gajiPml,
      pclId,
      gajiPcl,
      kol1,
      kol2,
      desa,
      namadesa,
      kecamatan,
      namaKec,
      templateTable,
      month
    } = req.body

    try {
      const dataTarelPost = await prisma.data_target_realisasi.create({
        data: {
          target: Number(target),
          realisasi: Number(realisasi),
          taskId,
          duedate,
          hasilPencacahan,
          pmlId,
          gajiPml,
          pclId,
          gajiPcl,
          kol1,
          kol2,
          desa,
          namadesa,
          kecamatan,
          templateTable,
          namaKec,
          month
        }
      })

      return res.status(200).json({ success: true, data: dataTarelPost })
    } catch (error) {
      console.log(error.message)
      return res.status(400).json({ success: false })
    }
  }
}
