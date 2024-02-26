import prisma from '../../../services/db'
import { create, all } from 'mathjs'
import { getBest } from '../../../function/topsis'
import { getToken } from 'next-auth/jwt'

export default async function handler(req, res) {
  // console.log('asdwadad')
  const { method } = req

  if (method === 'GET') {
    const users = await prisma.task.findMany()
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
      duedate,
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
      arrayUser,
      arrayMitra,
      arrayBebanPegawai,
      arrayBebanMitra,
      templateTable,
      deadLaneAwal
    } = req.body

    const project = await prisma.project.update({
      where: {
        id: Number(projectId)
      },
      data: {
        enddate: deadLaneAwal
      }
    })

    try {
      if (jenisKeg == 65 || jenisKeg == 67 || jenisKeg == 70) {
        const task = await prisma.task.create({
          data: {
            title,
            jenisKeg,
            target: targetTotal,
            unitTarget,
            duedate,
            description,
            realisasi,
            jenisSample,
            month,
            year,
            notes,
            projectId: Number(projectId),
            userId
          }
        })
        if (jenisSample === 1) {
          if (jenisKeg == 65 || jenisKeg == 67) {
            // ini misal sample perusahaam
            participants.map(async participant => {
              if (participant.checked) {
                const tpp = await prisma.TaskPerusahaanProduksi.create({
                  data: {
                    taskId: task.id,
                    perusahaanId: participant.id,
                    nama: templateTable == 5 || templateTable == 6 || templateTable == 7 ? participant.nama : '',
                    desa: participant.desa,
                    namadesa: participant.namaDesa,
                    kecamatan: participant.kecamatan,
                    namaKec: participant.namaKec,
                    alamat: templateTable == 5 ? participant.alamat : '',
                    target: 0,
                    realisasi: 0,
                    hasilPencacahan: '',
                    duedate: participant.tanggal,
                    pmlId: 0,
                    pclId: 0,
                    gajiPml: gaji,
                    gajiPcl: gaji,
                    idSls: '',
                    nbs: '',
                    nks: '',
                    nus: templateTable == 6 ? participant.nus : '',
                    idSbr: templateTable == 7 ? participant.idSbr : '',
                    templateTable: templateTable.toString()
                  }
                })
              }
            })

            // buat add peserta disini

            peserta.map(async peserta => {
              const tp = await prisma.TaskPeserta.create({
                data: {
                  taskId: task.id,
                  mitraId: peserta.id
                }
              })
            })

            persertaOrganik.map(async peserta => {
              // console.log(peserta.id)
              const to = await prisma.TaskOrganik.create({
                data: {
                  taskId: task.id,
                  organikId: peserta.id
                }
              })
            })
          }
        } else if (jenisSample == 0) {
          // ini misal sample non perusahaam
          if (jenisKeg == 65 || jenisKeg == 67) {
            participants.map(async participant => {
              const tnp = await prisma.TaskPerusahaanProduksi.create({
                data: {
                  // taskId: task.id,
                  // perusahaanId: 9999999,
                  // nama: '',
                  // desa: participant.kodeDesa.toString(),
                  // namadesa: participant.namaDesa,
                  // kecamatan: participant.kodeKecamatan.toString(),
                  // namaKec: participant.namaKecamatan,
                  // alamat: fungsi == 4 || fungsi == 5 ? participant.alamat : '',
                  // target: 0,
                  // realisasi: 0,
                  // hasilPencacahan: '',
                  // duedate: new Date(),
                  // pmlId: 0,
                  // pclId: 0,
                  // gajiPml: 0,
                  // gajiPcl: 0,
                  // idSls: fungsi == 6 || fungsi == 7 ? participant.idSls : '',
                  // nbs: fungsi == 6 || fungsi == 7 || fungsi == 3 ? participant.nbs : '',
                  // nks: fungsi == 3 ? participant.nks : '',
                  // idSbr: '',
                  // nus: ''
                  taskId: task.id,
                  perusahaanId: 9999999,
                  nama: '',
                  desa: participant.kodeDesa.toString(),
                  namadesa: participant.namaDesa,
                  kecamatan: participant.kodeKecamatan.toString(),
                  namaKec: participant.namaKecamatan,
                  alamat: '',
                  target: 0,
                  realisasi: 0,
                  hasilPencacahan: '',
                  duedate: new Date(),
                  pmlId: 0,
                  pclId: 0,
                  gajiPml: 0,
                  gajiPcl: 0,
                  idSls: templateTable == 4 ? participant.idSls : '',
                  nbs: templateTable == 3 || templateTable == 4 ? participant.nbs : '',
                  nks: templateTable == 3 ? participant.nks : '',
                  idSbr: '',
                  nus: '',
                  templateTable: templateTable.toString()
                }
              })
            })

            peserta.map(async peserta => {
              // console.log(peserta.id)
              const tp = await prisma.TaskPeserta.create({
                data: {
                  taskId: task.id,
                  mitraId: peserta.id
                }
              })
            })

            persertaOrganik.map(async peserta => {
              // console.log(peserta.id)
              const to = await prisma.TaskOrganik.create({
                data: {
                  taskId: task.id,
                  organikId: peserta.id
                }
              })
            })
          }
        } else {
          console.log('nothing return or connect')
        }
      } else if (jenisKeg == 63) {
        const task = await prisma.task.create({
          data: {
            title,
            jenisKeg,
            target: 1,
            unitTarget: '-',
            duedate,
            description,
            realisasi: 0,
            jenisSample: 0,
            month,
            year,
            notes,
            projectId: Number(projectId),
            userId
          }
        })
      }

      // topsis
      const config = {}
      const math = create(all, config)

      // pegawai
      let m = math.matrix(arrayUser)
      let w = arrayBebanPegawai
      let ia = ['min', 'min']
      let result = getBest(m, w, ia)

      console.log(result)
      result.map(async peserta => {
        // console.log(peserta.id)
        const beban_pegawai = await prisma.beban_kerja_pegawai.update({
          where: {
            id: peserta.index + 1
          },
          data: {
            bebanKerja: 1 - peserta.ps
          }
        })
      })

      // mitra
      let mm = math.matrix(arrayMitra)
      let wm = arrayBebanMitra
      let iam = ['min', 'min']
      let resultm = getBest(mm, wm, iam)

      console.log(resultm)
      resultm.map(async mitra => {
        // console.log(mitra.id)
        const beban_pegawai = await prisma.beban_kerja_mitra.update({
          where: {
            id: mitra.index + 1
          },
          data: {
            bebanKerja: 1 - mitra.ps
          }
        })
      })

      return res.status(201).json({ success: true })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
