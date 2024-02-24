import prisma from '../../../services/db'

export default async function handler(req, res) {
  const { method } = req

  if (method === 'GET') {
    const users = await prisma.user.findMany()
    if (!users) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: users })
  }

  if (method === 'POST') {
    const { email, name, nip, password, role, fungsi } = req.body

    console.log('dah sampe post')
    try {
      const user = await prisma.user.create({
        data: {
          email,
          name,
          nip,
          password,
          role,
          fungsi
        }
      })

      return res.status(201).json({ success: true, data: user })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
