import prisma from '../../../services/db'

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
  } else if (method === 'PUT') {
    const { title, jenisKeg, target, realisasi, unitTarget, startDate, duedate, description, month, year } = req.body

    try {
      const task = await prisma.sub_kegiatan.update({
        where: {
          id: Number(id)
        },
        data: {
          title,
          jenisKeg,
          target,
          realisasi,
          unitTarget,
          startDate,
          duedate,
          description,
          month,
          year
        }
      })
      const bulanTarel = await prisma.data_target_realisasi.updateMany({
        where: {
          taskId: Number(id)
        },
        data: {
          month: parseInt(month)
        }
      })

      console.log(res.message)
      return res.status(200).json({ success: true, data: task })
    } catch (error) {
      return res.status(400).json({ success: false })
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
