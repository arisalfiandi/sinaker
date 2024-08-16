import prisma from '../../../services/db'
import { create, all } from 'mathjs'
import { getBest } from '../../../function/topsis'
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
      alamat,
      isUpdateBebanKerja,
      arrayUser,
      arrayMitra,
      arrayUserId,
      arrayMitraId,
      arrayBebanPegawai,
      arrayBebanMitra
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

      if (isUpdateBebanKerja == 1) {
        // topsis
        const config = {}
        const math = create(all, config)

        // pegawai
        let m = math.matrix(arrayUser)
        let w = arrayBebanPegawai
        let ia = ['min', 'min']
        let id = arrayUserId
        console.log(m)
        let result = getBest(m, w, ia, id)

        // result.map(async peserta => {
        //   // console.log(peserta.id)
        //   const beban_pegawai = await prisma.beban_kerja_pegawai.update({
        //     where: {
        //       id: peserta.index + 1
        //     },
        //     data: {
        //       bebanKerja: 1 - peserta.ps
        //     }
        //   })
        // })

        // const deleteBebanPegawai = await prisma.beban_kerja_pegawai.deleteMany({})

        const resultBaru = result.map(item => {
          return { id: item.index, userId: item.petugasId, bebanKerja: item.ps }
        })
        // console.log(resultBaru)
        // const createMany = await prisma.beban_kerja_pegawai.createMany({
        //   data: resultBaru
        // })

        await prisma.$transaction(async tx => {
          const deleteBebanPegawai = await tx.beban_kerja_pegawai.deleteMany({})
          const createMany = await tx.beban_kerja_pegawai.createMany({
            data: resultBaru
          })
        })

        // mitra
        let mm = math.matrix(arrayMitra)
        let wm = arrayBebanMitra
        let iam = ['min', 'min', 'min']
        let idm = arrayMitraId
        console.log(mm)
        let resultm = getBest(mm, wm, iam, idm)

        // console.log(resultm)
        // resultm.map(async mitra => {
        //   // console.log(mitra.id)
        //   const beban_mitra = await prisma.beban_kerja_mitra.update({
        //     where: {
        //       id: mitra.index + 1
        //     },
        //     data: {
        //       bebanKerja: 1 - mitra.ps
        //     }
        //   })
        // })

        // const deleteBebanMitra = await prisma.beban_kerja_mitra.deleteMany({})
        const resultmBaru = resultm.map(item => {
          return { id: item.index, mitraId: item.petugasId, bebanKerja: item.ps }
        })
        // // console.log(resultmBaru)
        // const createMMany = await prisma.beban_kerja_mitra.createMany({
        //   data: resultmBaru
        // })
        // await transfer(resultmBaru)

        await prisma.$transaction(async tx => {
          const deleteBebanMitra = await prisma.beban_kerja_mitra.deleteMany({})
          const createMMany = await prisma.beban_kerja_mitra.createMany({
            data: resultmBaru
          })
        })
      }

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
