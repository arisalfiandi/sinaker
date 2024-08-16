import prisma from '../../../services/db'
import { create, all } from 'mathjs'
import { getBest } from '../../../function/topsis'

// addperusahaan di daftar perusahaan
export default async function handler(req, res) {
  const { method } = req

  if (method === 'GET') {
    const users = await prisma.kegiatan_harian.findMany()
    if (!users) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: users })
  }

  if (method === 'POST') {
    const { namaKegiatan, durasi, userId, taskId, tanggalSubmit, arrayUser, arrayUserId, arrayBebanPegawai } = req.body

    try {
      const kh = await prisma.pekerjaan_harian.create({
        data: {
          namaKegiatan,
          durasi,
          userId,
          taskId,
          tanggalSubmit
        }
      })

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

      // // topsis
      // const config = {}
      // const math = create(all, config)

      // // pegawai
      // let m = math.matrix(arrayUser)
      // let w = arrayBebanPegawai
      // let ia = ['min', 'min']
      // let id = arrayUserId
      // console.log(m)
      // let result = getBest(m, w, ia, id)

      // const resultBaru = result.map(item => {
      //   return { id: item.index, userId: item.petugasId, bebanKerja: item.ps }
      // })

      // await prisma.$transaction(async tx => {
      //   const deleteBebanPegawai = await tx.beban_kerja_pegawai.deleteMany({})
      //   const createMany = await tx.beban_kerja_pegawai.createMany({
      //     data: resultBaru
      //   })
      // })

      return res.status(201).json({ success: true, data: kh })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
