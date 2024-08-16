import prisma from '../../../services/db'

export default async function handler(req, res) {
  console.log('asdwadad')
  const { method } = req

  if (method === 'GET') {
    const projects = await prisma.kegiatan.findMany()
    if (!projects) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: projects })
  }

  if (method === 'POST') {
    const {
      title,
      startdate,
      enddate,
      description,
      projectLeaderId,
      createdById,
      fungsi,
      rentangWaktu,
      anggotaTimId,
      bulanKegiatan,
      jumlahKegiatan,
      jumlahSubKeg,
      subKeg
    } = req.body

    const rentang = {
      59: { waktu: 'Bulan', color: 'warning' },
      60: { waktu: 'Triwulan', color: 'warning' },
      61: { waktu: 'Semester', color: 'warning' },
      62: { waktu: 'Tahunan', color: 'warning' },
      70: { waktu: 'SubRound', color: 'warning' },
      80: { waktu: 'Ad-Hok', color: 'warning' },
      321: { waktu: 'Belum Ditentukan', color: 'warning' }
    }

    try {
      let rent = 1
      bulanKegiatan.map(async bulan => {
        const project = await prisma.kegiatan.create({
          data: {
            title: title + ' ' + rentang[rentangWaktu].waktu,
            startdate: bulan.firstDate,
            enddate: bulan.lastDate,
            description,
            isArchived: 1,
            projectLeaderId,
            fungsi,
            rentangWaktu,
            createdById
          }
        })
        rent = rent + 1
        // console.log('woi masalah gini doang : ' + rent)

        const isLeader_leader = await prisma.kegiatan_user_leader.create({
          data: {
            isLeader: 1,
            userId: projectLeaderId,
            projectId: project.id
          }
        })

        // const isLeader_member = await prisma.kegiatan_user_member.create({
        //   data: {
        //     isLeader: 1,
        //     userId: projectLeaderId,
        //     projectId: project.id
        //   }
        // })

        anggotaTimId.map(async anggota => {
          const usP = await prisma.kegiatan_user_member.create({
            data: {
              userId: anggota,
              projectId: project.id,
              isLeader: 0
            }
          })
        })

        subKeg.map(async task => {
          console.log('aswaswasw')
          console.log(task)
          const dataTask = await prisma.sub_kegiatan.create({
            data: {
              title: task + ' ' + title,
              jenisKeg:
                task === 'pelatihan'
                  ? 63
                  : task === 'persiapan'
                  ? 64
                  : task === 'listing'
                  ? 71
                  : task === 'pencacahan'
                  ? 65
                  : task === 'pengolahanEntri'
                  ? 67
                  : task === 'pengolahanValidasi'
                  ? 70
                  : task === 'diseminasi'
                  ? 68
                  : task === 'evaluasi'
                  ? 69
                  : 0,
              target: 1,
              unitTarget: '-',
              duedate: new Date(bulan.lastDate),
              startDate: new Date(bulan.firstDate),
              description: ' ',
              realisasi: 0,
              jenisSample: 0,
              month: new Date(bulan.firstDate).getMonth(),
              year: new Date(bulan.firstDate).getFullYear(),
              notes: ' ',
              projectId: Number(project.id),
              userId: 99,
              importStatus: 0
            }
          })
        })

        return project
      })

      // const project = await prisma.kegiatan.create({
      //   data: {
      //     title,
      //     startdate,
      //     enddate,
      //     description,
      //     isArchived: false,
      //     projectLeaderId,
      //     fungsi,
      //     rentangWaktu,
      //     createdById
      //   }
      // })

      // const userProject = await prisma.kegiatan_user_leader.create({

      //   data: {
      //     userId: projectLeaderId,
      //     projectId: project.id,

      //   }
      // })

      return res.status(201).json({ success: true })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
