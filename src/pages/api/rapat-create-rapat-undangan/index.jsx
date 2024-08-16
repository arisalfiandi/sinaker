import nextConnect from 'next-connect'
import multer from 'multer'
import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'fs'
import prisma from '../../../services/db'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/upload/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const filename = `${file.originalname.split('.')[0]}-${uniqueSuffix}.pdf`
    cb(null, filename)
  }
})

const upload = multer({ storage })

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something went wrong! ${error.message}` })
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  }
})

apiRoute.use(upload.single('file'))

apiRoute.post(async (req, res) => {
  const { file } = req
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

  if (!file) {
    return res.status(400).json({ error: 'File is required' })
  }

  try {
    // Create the meet entry in the database
    const rapat = await prisma.meet.create({
      data: {
        namaRapat,
        meetDate: new Date(meetDate),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        duration: parseInt(duration, 10),
        tempatRapat,
        status: 'diajukan',
        description,
        nomor,
        lampiran,
        perihal,
        ditujukan,
        createdById: parseInt(createdById, 10),
        statusSendEmail: 0
      }
    })

    // Create user_meet entries for each pesertaRapatId
    const pesertaIds = JSON.parse(pesertaRapatId)
    await Promise.all(
      pesertaIds.map(anggota =>
        prisma.user_meet.create({
          data: {
            userId: parseInt(anggota, 10),
            meetId: rapat.id
          }
        })
      )
    )

    // Save the uploaded file information in the database
    const savedFile = await prisma.undangan_file.create({
      data: {
        filename: file.originalname,
        path: path.join('upload/', file.filename), // Path relative to the public directory
        meetId: rapat.id
      }
    })

    res.status(200).json({ message: 'File uploaded and meet created successfully', file: savedFile, rapat })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while processing your request' })
  }
})

export const config = {
  api: {
    bodyParser: false // Disallow body parsing, as we're using multer
  }
}

export default apiRoute
