import prisma from '../../../services/db'
import { mailOptions, sendMailMeetCreated } from 'src/services/sendEmail'

export default async function handler(req, res) {
  console.log('asdwadad')
  const { method } = req

  if (method === 'GET') {
    const projects = await prisma.meet.findMany()
    if (!projects) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: projects })
  }

  if (method === 'POST') {
    const {
      namaRapat,
      meetDate,
      startTime,
      endTime,
      duration,
      tempatRapat,
      description,
      pesertaRapatId,
      createdById,
      nomor,
      lampiran,
      perihal,
      ditujukan
    } = req.body

    try {
      const rapat = await prisma.meet.create({
        data: {
          namaRapat,
          meetDate,
          startTime,
          endTime,
          duration,
          tempatRapat,
          status: 'diajukan',
          description,
          nomor,
          lampiran,
          perihal,
          ditujukan,
          createdById,
          statusSendEmail: 0
        }
      })

      pesertaRapatId.map(async anggota => {
        const pri = await prisma.user_meet.create({
          data: {
            userId: anggota,
            meetId: rapat.id
          }
        })
      })

      // mailOptions.to = participants.map(participant => {
      //   if (participant.checked) {
      //     return participant.email
      //   }
      // })
      // mailOptions.to = 'jelakora141516@gmail.com'

      // mailOptions.subject = namaRapat
      // mailOptions.title = namaRapat
      // mailOptions.description = description
      // mailOptions.meetDate = new Date(meetDate).toLocaleDateString('id-ID')
      // mailOptions.starttime =
      //   new Date(startTime).getHours() +
      //   ':' +
      //   (new Date(startTime).getMinutes() < 10 ? '0' : '') +
      //   new Date(startTime).getMinutes()
      // mailOptions.endtime =
      //   new Date(endTime).getHours() +
      //   ':' +
      //   (new Date(endTime).getMinutes() < 10 ? '0' : '') +
      //   new Date(endTime).getMinutes() +
      //   ' WIB'
      // console.log(mailOptions.starttime)
      // mailOptions.endTime = new Date(meetDate).toLocaleDateString('id-ID')
      // mailOptions.link = tempatRapat
      // mailOptions.duration = duration

      // sendMailMeetCreated(mailOptions)

      return res.status(201).json({ success: true })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
