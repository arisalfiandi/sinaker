import prisma from '../../../../services/db'
// update tarel di taskdetail
export default async function handler(req, res) {
  const id = req.query.id

  const { method } = req
  //console.log('udah ke api')
  if (method === 'GET') {
    //console.log('udah ke api')
    const dataTarelGet = await prisma.data_target_realisasi.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (!dataTarelGet) {
      return res.status(400).json({ success: false, message: 'Perusahaan not found' })
    }

    return res.status(200).json({ success: true, data: dataTarelGet })
  } else if (method === 'PUT') {
    console.log('udah ke api put')
    const {
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
      namaKec
    } = req.body

    try {
      const dataTarel = await prisma.data_target_realisasi.update({
        where: {
          id: Number(id)
        },
        data: {
          target: Number(target),
          realisasi: Number(realisasi),
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
          namaKec
        }
      })

      return res.status(200).json({ success: true, data: dataTarel })
    } catch (error) {
      //console.log(error.message)
      return res.status(400).json({ success: false })
    }
  } else if (method === 'DELETE') {
    console.log('masukKe delet')
    console.log(id)
    console.log('ini id')
    console.log(id)
    console.log('ini id')
    console.log(id)
    console.log('ini id')
    try {
      const dataTarelDel = await prisma.data_target_realisasi.delete({
        where: {
          id: Number(id)
        }
      })

      return res.status(200).json({ success: true, message: 'row deleted' })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, message: 'row not found, error' })
    }
  }
}
