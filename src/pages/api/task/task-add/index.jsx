import prisma from '../../../../services/db'
import { create, all } from 'mathjs'
import { getBest } from '../../../../function/topsis'
import { getToken } from 'next-auth/jwt'

export default async function handler(req, res) {
  // console.log('asdwadad')
  const { method } = req

  if (method === 'GET') {
    const users = await prisma.sub_kegiatan.findMany()
    if (!users) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: users })
  }

  if (method === 'POST') {
    // console.log('dah sampe post')
    const {
      title,
      jenisKeg,
      targetTotal,
      unitTarget,
      description,
      realisasi,
      jenisSample,
      month,
      fungsi,
      year,
      projectId,
      userId,
      notes,
      participants,
      peserta,
      persertaOrganik,
      gaji,
      startDate,
      deadLaneAwal,
      templateTable,
      duedate,
      kolomLP
    } = req.body

    try {
      const project = await prisma.kegiatan.update({
        where: {
          id: Number(projectId)
        },
        data: {
          enddate: deadLaneAwal
        }
      })
      if (jenisKeg == 65 || jenisKeg == 67) {
        console.log('ini tanggal mulai : ' + new Date(startDate))
        console.log('ini tanggal berakhir : ' + new Date(duedate))
        const duedateObj = new Date(duedate)
        const startDateObj = new Date(startDate)

        // Menambahkan 1 hari ke duedate
        duedateObj.setUTCDate(duedateObj.getUTCDate() + 1)

        // Menambahkan 1 hari ke startDate
        startDateObj.setUTCDate(startDateObj.getUTCDate() + 1)

        console.log('ini tanggal mulai || setelah ditambah satu hari: ' + new Date(startDateObj))
        console.log('ini tanggal berakhir || setelah ditambah satu hari : ' + new Date(duedateObj))

        const task = await prisma.sub_kegiatan.create({
          data: {
            title,
            jenisKeg,
            target: targetTotal,
            unitTarget,
            duedate: duedateObj,
            startDate: startDateObj,
            description,
            realisasi,
            jenisSample,
            month,
            year,
            notes,
            projectId: Number(projectId),
            userId,
            importStatus: 1
          }
        })
        if (jenisKeg == 65 || jenisKeg == 67) {
          console.log('disini buat 65 67/pngolahan input /pencacahan dan Non perusahaan')
          console.log(participants)
          participants.map(async participant => {
            // insert ke table perusahaan
            console.log('dah masuk api')
            console.log(participant[kolomLP.kol1])
            // console.log(kolomLP)

            const tpp = await prisma.data_target_realisasi.create({
              data: {
                taskId: Number(task.id),
                target: participant.target ? participant.target : 0,
                realisasi: 0,
                pmlId: 0,
                pclId: 0,
                gajiPml: jenisSample == 1 ? gaji : 0,
                gajiPcl: jenisSample == 1 ? gaji : 0,
                desa: participant.kodeDesa.toString(),
                namadesa: participant.namaDesa,
                kecamatan: participant.kodeKecamatan.toString(),
                namaKec: participant.namaKecamatan,
                hasilPencacahan: '',
                kol1: participant[kolomLP.kol1].toString(),
                kol2: participant[kolomLP.kol2].toString(),
                templateTable: templateTable.toString(),
                duedate: new Date(duedate),
                month
              }
            })
            if (tpp) {
              const statusImportTarel = await prisma.sub_kegiatan.update({
                where: {
                  id: Number(task.id)
                },
                data: {
                  importStatus: 1
                }
              })
            }
          })

          peserta.map(async peserta => {
            const tp = await prisma.sub_kegiatan_mitra.create({
              data: {
                taskId: task.id,
                mitraId: peserta.id
              }
            })
          })

          persertaOrganik.map(async peserta => {
            // console.log(peserta.id)
            const to = await prisma.sub_kegiatan_user.create({
              data: {
                taskId: task.id,
                organikId: peserta.id
              }
            })
          })
        }
      } else {
        const task = await prisma.sub_kegiatan.create({
          data: {
            title,
            jenisKeg,
            target: 1,
            unitTarget: '-',
            duedate: new Date(duedate),
            startDate: new Date(startDate),
            description,
            realisasi: 0,
            jenisSample: 0,
            month,
            year,
            notes,
            projectId: Number(projectId),
            userId,
            importStatus: 1,
            month
          }
        })
      }

      // // topsis
      // const config = {}
      // const math = create(all, config)

      // // pegawai
      // let m = math.matrix(arrayUser)
      // let w = arrayBebanPegawai
      // let ia = ['min', 'min']
      // let id = arrayUserId
      // let result = getBest(m, w, ia, id)

      // const deleteBebanPegawai = await prisma.beban_kerja_pegawai.deleteMany({})

      // const resultBaru = result.map(item => {
      //   return { id: item.index, userId: item.petugasId, bebanKerja: item.ps }
      // })
      // // console.log(resultBaru)
      // const createMany = await prisma.beban_kerja_pegawai.createMany({
      //   data: resultBaru
      // })

      // // mitra
      // let mm = math.matrix(arrayMitra)
      // let wm = arrayBebanMitra
      // let iam = ['min', 'min', 'min']
      // let idm = arrayMitraId
      // let resultm = getBest(mm, wm, iam, idm)

      // // console.log(resultm)
      // // resultm.map(async mitra => {
      // //   // console.log(mitra.id)
      // //   const beban_mitra = await prisma.beban_kerja_mitra.update({
      // //     where: {
      // //       id: mitra.index + 1
      // //     },
      // //     data: {
      // //       bebanKerja: 1 - mitra.ps
      // //     }
      // //   })
      // // })

      // const deleteBebanMitra = await prisma.beban_kerja_mitra.deleteMany({})
      // const resultmBaru = resultm.map(item => {
      //   return { id: item.index, mitraId: item.petugasId, bebanKerja: item.ps }
      // })
      // // console.log(resultmBaru)
      // const createMMany = await prisma.beban_kerja_mitra.createMany({
      //   data: resultmBaru
      // })

      return res.status(201).json({ success: true })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
