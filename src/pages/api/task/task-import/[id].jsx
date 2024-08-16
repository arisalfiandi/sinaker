import prisma from '../../../../services/db'

export default async function handler(req, res) {
  const id = req.query.id

  const { method } = req

  if (method === 'GET') {
    const task = await prisma.sub_kegiatan.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (!task) {
      return res.status(400).json({ success: false, message: 'Task not found' })
    }

    return res.status(200).json({ success: true, data: task })
  } else if (method === 'POST') {
    const {
      unitTarget,
      jenisSample,
      participants,
      honorPetugas1,
      honorPetugas2,
      templateTable,
      duedate,
      kolomLP,
      importStatus,
      month
    } = req.body

    try {
      participants.map(async participant => {
        // insert ke table perusahaan
        console.log('dah masuk api')
        console.log(participant[kolomLP.kol1])
        // console.log(kolomLP)

        const tpp = await prisma.data_target_realisasi.create({
          data: {
            taskId: Number(id),
            target: participant.target ? participant.target : 0,
            realisasi: 0,
            pmlId: 0,
            pclId: 0,
            gajiPml: honorPetugas1,
            gajiPcl: honorPetugas2,
            desa: participant.kodeDesa.toString(),
            namadesa: participant.namaDesa,
            kecamatan: participant.kodeKecamatan.toString(),
            namaKec: participant.namaKecamatan,
            hasilPencacahan: '',
            kol1: participant[kolomLP.kol1].toString(),
            kol2: participant[kolomLP.kol2].toString(),
            templateTable: templateTable.toString(),
            duedate: new Date(duedate),
            month: parseInt(month)
          }
        })
      })

      const task = await prisma.sub_kegiatan.update({
        where: {
          id: Number(id)
        },
        data: {
          jenisSample,
          unitTarget,
          importStatus
        }
      })

      console.log(res.message)
      console.log(task)
      return res.status(200).json({ success: true, data: task })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, message: error })
    }
  } else if (method === 'DELETE') {
    try {
      const task = await prisma.sub_kegiatan.delete({
        where: {
          id: Number(id)
        }
      })

      return res.status(200).json({ success: true, message: 'Sub Kegiatan Dihapus' })
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Sub Kegiatan Dihapus' })
    }
  }
}
