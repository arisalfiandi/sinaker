import prisma from '../../../services/db'
import { mailOptions, sendMailMeetTerima, sendMailMeetTolak } from 'src/services/sendEmail'

export default async function handler(req, res) {
  const id = req.query.id
  console.log('ini id')
  console.log(id)
  const { method } = req

  if (method === 'GET') {
    const ph = await prisma.meet.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (!ph) {
      return res.status(400).json({ success: false, message: 'Rapat not found' })
    }

    return res.status(200).json({ success: true, data: ph })
  } else if (method === 'PUT') {
    const { namaRapat, meetDate, startTime, endTime, duration, tempatRapat, description, status } = req.body

    console.log(status)
    console.log(namaRapat)
    console.log(meetDate)
    console.log(startTime)
    console.log(endTime)
    console.log(duration)
    console.log(tempatRapat)
    console.log(description)
    try {
      const rapat = await prisma.meet.update({
        where: {
          id: Number(id)
        },
        data: {
          status
        }
      })

      mailOptions.to = ['jelakora141516@gmail.com', 'luthfilkaa918@gmail.com']

      mailOptions.subject = namaRapat
      mailOptions.title = namaRapat
      mailOptions.description = description
      mailOptions.meetDate = new Date(meetDate).toLocaleDateString('id-ID')
      mailOptions.starttime =
        new Date(startTime).getHours() +
        ':' +
        (new Date(startTime).getMinutes() < 10 ? '0' : '') +
        new Date(startTime).getMinutes()
      mailOptions.endtime =
        new Date(endTime).getHours() +
        ':' +
        (new Date(endTime).getMinutes() < 10 ? '0' : '') +
        new Date(endTime).getMinutes() +
        ' WIB'

      mailOptions.endTime = new Date(meetDate).toLocaleDateString('id-ID')
      mailOptions.link = tempatRapat
      mailOptions.duration = duration
      mailOptions.id = id

      status === 'disetujui' ? sendMailMeetTerima(mailOptions) : sendMailMeetTolak(mailOptions)
      return res.status(200).json({ success: true, data: rapat })
    } catch (error) {
      return res.status(400).json({ success: false })
    }
  } else if (method === 'DELETE') {
    try {
      const ph = await prisma.meet.delete({
        where: {
          id: Number(id)
        }
      })

      return res.status(200).json({ success: true, message: 'Kegiatan Harian Dihapus' })
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Kegiatan Harian Dihapus' })
    }
  }
}
