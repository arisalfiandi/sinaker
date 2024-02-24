import prisma from '../../../services/db'

export default async function handler(req, res) {
  const id = req.query.id

  const { method } = req

  if (method === 'GET') {
    const project = await prisma.project.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (!project) {
      return res.status(400).json({ success: false, message: 'Project not found' })
    }

    return res.status(200).json({ success: true, data: project })
  } else if (method === 'PUT') {
    const { title, startdate, enddate, description, projectLeaderId, createdById, fungsi, rentangWaktu, isArchived } =
      req.body

    console.log('asdasdasd')
    if (isArchived) {
      try {
        const project = await prisma.project.update({
          where: {
            id: Number(id)
          },
          data: {
            isArchived: isArchived
          }
        })

        return res.status(200).json({ success: true, data: project })
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          console.log(error.message)
          return res.status(400).json({ success: false, message: error.message })
        }

        return res.status(500).json({ success: false, message: error.message })
      }
    }

    try {
      const project = await prisma.project.update({
        where: {
          id: Number(id)
        },
        data: {
          title,
          startdate,
          enddate,
          description,
          isArchived,
          projectLeaderId,
          fungsi,
          rentangWaktu,
          createdById
        },
        include: {
          UserProject: true
        }
      })

      return res.status(200).json({ success: true, data: project })
    } catch (error) {
      console.log(error.message)
      return res.status(400).json({ success: false })
    }
  } else if (method === 'DELETE') {
    try {
      const project = await prisma.project.delete({
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
