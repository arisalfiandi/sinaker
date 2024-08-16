import prisma from '../../../services/db'
// groupperusahaan
export default async function handler(req, res) {
  const { method } = req
  const id = req.query.id

  if (method === 'PUT') {
    // update info pencairan seperti tahapanId, status, tanggal selesai
    const { role, name, email, password, nip, newPassword, confirmNewPassword } = req.body
    try {
      const userP = await prisma.user.update({
        where: {
          id: Number(id)
        },
        data: {
          name,
          email,
          password: newPassword === '' ? password : newPassword,
          nip
        }
      })

      return res.status(201).json({ success: true })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: gP })
  }
}
