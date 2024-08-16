import prisma from '../../../services/db'
import {
  mailOptions,
  sendMailPJK,
  sendMailProgressPJK,
  sendMailPerbaikiPJK,
  sendMailVerifikator,
  sendMailPPSPM,
  sendMailBendahara
} from 'src/services/sendEmail'
import { Email } from 'mdi-material-ui'

// groupperusahaan
export default async function handler(req, res) {
  const { method } = req
  const id = req.query.id

  if (method === 'PUT') {
    // update info pencairan seperti tahapanId, status, tanggal selesai
    const {
      tahapanChange,
      statusChange,
      SPMChange,
      tahapanId,
      status,
      tanggalSelesai,
      tanggalSPM,
      taskId,
      subject,
      kegiatan,
      pesan,
      tahap,
      email
    } = req.body
    try {
      if (tahapanChange) {
        if (tahapanId == 0) {
          mailOptions.to = email

          mailOptions.subject = subject
          mailOptions.title = subject
          mailOptions.link = `http://localhost:3000/pencairan-detail/${taskId}`
          mailOptions.kegiatan = kegiatan
          mailOptions.pesan = pesan

          sendMailPerbaikiPJK(mailOptions)
        }

        if (tahapanId == 1) {
          const emails = await prisma.user.findMany({
            where: {
              role: {
                equals: 'verifikator'
              }
            },
            select: {
              email: true
            }
          })
          emails.map(mail => {
            mailOptions.to = mail.email
            mailOptions.subject = subject
            mailOptions.title = subject
            mailOptions.link = `http://localhost:3000/pencairan-detail/${taskId}`
            mailOptions.kegiatan = kegiatan
            sendMailVerifikator(mailOptions)
          })
        }

        if (tahapanId == 2) {
          if (email) {
            mailOptions.to = email

            mailOptions.subject = subject
            mailOptions.title = subject
            mailOptions.link = `http://localhost:3000/pencairan-detail/${taskId}`
            mailOptions.kegiatan = kegiatan
            mailOptions.tahap = tahap

            sendMailProgressPJK(mailOptions)
          }
          const emails = await prisma.user.findMany({
            where: {
              role: {
                equals: 'ppspm'
              }
            },
            select: {
              email: true
            }
          })
          emails.map(mail => {
            mailOptions.to = mail.email
            mailOptions.subject = subject
            mailOptions.title = subject
            mailOptions.link = `http://localhost:3000/pencairan-detail/${taskId}`
            mailOptions.kegiatan = kegiatan
            sendMailPPSPM(mailOptions)
          })
        }

        if (tahapanId == 3) {
          if (pesan) {
            mailOptions.to = email

            mailOptions.subject = subject
            mailOptions.title = subject
            mailOptions.link = `http://localhost:3000/pencairan-detail/${taskId}`
            mailOptions.kegiatan = kegiatan
            mailOptions.pesan = pesan

            sendMailPerbaikiPJK(mailOptions)
          } else {
            if (email) {
              mailOptions.to = email

              mailOptions.subject = subject
              mailOptions.title = subject
              mailOptions.link = `http://localhost:3000/pencairan-detail/${taskId}`
              mailOptions.kegiatan = kegiatan
              mailOptions.tahap = tahap

              sendMailProgressPJK(mailOptions)
            }
            const emails = await prisma.user.findMany({
              where: {
                role: {
                  equals: 'bendahara'
                }
              },
              select: {
                email: true
              }
            })
            emails.map(mail => {
              mailOptions.to = mail.email
              mailOptions.subject = subject
              mailOptions.title = subject
              mailOptions.link = `http://localhost:3000/pencairan-detail/${taskId}`
              mailOptions.kegiatan = kegiatan
              sendMailBendahara(mailOptions)
            })
          }
        }

        if (tahapanId == 4) {
          mailOptions.to = email

          mailOptions.subject = subject
          mailOptions.title = subject
          mailOptions.link = `http://localhost:3000/pencairan-detail/${taskId}`
          mailOptions.kegiatan = kegiatan
          mailOptions.tahap = tahap

          sendMailProgressPJK(mailOptions)
        }

        const pencairan = await prisma.pencairan.updateMany({
          data: {
            tahapanId
          },
          where: {
            id: Number(id),
            sub_kegiatanId: Number(taskId)
          }
        })
      }
      if (SPMChange) {
        const pencairan = await prisma.pencairan.updateMany({
          data: {
            tahapanId,
            tanggalSPM
          },
          where: {
            id: Number(id),
            sub_kegiatanId: Number(taskId)
          }
        })
      }
      if (statusChange) {
        const pencairanP = await prisma.pencairan.updateMany({
          data: {
            status,
            tanggalSelesai
          },
          where: {
            id: Number(id),
            sub_kegiatanId: Number(taskId)
          }
        })
      }

      return res.status(201).json({ success: true })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: gP })
  }
}
