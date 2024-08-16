import prisma from '../../../services/db'

export default async function handler(req, res) {
  const id = req.query.id

  const { method } = req

  if (method === 'GET') {
    const rapat = await prisma.meet.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (!rapat) {
      return res.status(400).json({ success: false, message: 'rapat not found' })
    }

    return res.status(200).json({ success: true, data: project })
  } else if (method === 'PUT') {
    const {
      namaRapat,
      meetDate,
      startTime,
      endTIme,
      duration,
      tempatRapat,
      description,
      createdById,
      pesertaRapatId,
      nomor,
      lampiran,
      perihal,
      ditujukan
    } = req.body

    try {
      const rapat = await prisma.meet.update({
        where: {
          id: Number(id)
        },
        data: {
          namaRapat,
          meetDate,
          startTime,
          endTIme,
          duration,
          tempatRapat,
          description,
          nomor,
          lampiran,
          perihal,
          ditujukan
        }
      })

      const hapusUserMeet = await prisma.user_meet.deleteMany({
        where: {
          meetId: Number(id)
        }
      })

      pesertaRapatId.map(async anggota => {
        const pri = await prisma.user_meet.create({
          data: {
            userId: anggota,
            meetId: Number(id)
          }
        })
      })

      return res.status(200).json({ success: true, data: rapat })
    } catch (error) {
      console.log(error.message)
      return res.status(400).json({ success: false })
    }
  } else if (method === 'DELETE') {
    try {
      const rapat = await prisma.meet.delete({
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
