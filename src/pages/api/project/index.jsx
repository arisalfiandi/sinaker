import prisma from '../../../services/db'

export default async function handler(req, res) {
  console.log('asdwadad')
  const { method } = req

  if (method === 'GET') {
    const projects = await prisma.project.findMany()
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
      jumlahKegiatan
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

    console.log('asdwadad')
    console.log(bulanKegiatan)
    console.log('asdwadad')
    console.log(jumlahKegiatan)
    try {
      let rent = 1
      bulanKegiatan.map(async bulan => {
        const project = await prisma.project.create({
          data: {
            title: title + ' ' + rentang[rentangWaktu].waktu + ' ' + rent,
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

        const isLeader_leader = await prisma.userProject.create({
          data: {
            isLeader: 1,
            userId: projectLeaderId,
            projectId: project.id
          }
        })

        // const isLeader_member = await prisma.userProject_member.create({
        //   data: {
        //     isLeader: 1,
        //     userId: projectLeaderId,
        //     projectId: project.id
        //   }
        // })

        anggotaTimId.map(async anggota => {
          const usP = await prisma.userProject_member.create({
            data: {
              userId: anggota,
              projectId: project.id,
              isLeader: 0
            }
          })
        })

        return project
      })
      // const project = await prisma.project.create({
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

      // const userProject = await prisma.userProject.create({

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
