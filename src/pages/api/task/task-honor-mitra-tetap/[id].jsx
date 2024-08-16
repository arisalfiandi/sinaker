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
    const { dataToSave } = req.body

    // console.log(req.body)
    try {
      req.body.map(async peserta => {
        console.log(peserta)
        const tp = await prisma.sub_kegiatan_mitra.create({
          data: {
            taskId: Number(id),
            mitraId: peserta.mitra.value,
            honor: Number(peserta.honor)
          }
        })
      })

      return res.status(200).json({ success: true })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false })
    }
  } else if (method === 'PUT') {
    const { taskId, mitraId } = req.body

    try {
      const deleteSubKegMitra = await prisma.sub_kegiatan_mitra.deleteMany({
        where: {
          taskId: Number(id),
          mitraId: Number(mitraId)
        }
      })

      return res.status(200).json({ success: true })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false })
    }
  }
}
