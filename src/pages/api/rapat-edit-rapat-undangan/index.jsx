import nextConnect from 'next-connect'
import multer from 'multer'
import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'fs'
import prisma from '../../../services/db'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/')
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
  const { rapatId } = req.body

  if (!file) {
    return res.status(400).json({ error: 'File is required' })
  }

  try {
    const getIfExist = await prisma.undangan_file.findMany({
      where: {
        meetId: Number(rapatId)
      }
    })
    

    // const deleteFile = filePath => {
    //   fs.unlink(filePath, err => {
    //     if (err) {
    //       console.error(`Failed to delete file ${filePath}: ${err}`)
    //       console.log(`Failed to delete file ${filePath}: ${err}`)
    //     } else {
    //       console.log(`Successfully deleted file ${filePath}`)
    //     }
    //   })
    // }
    // if (getIfExist[0]) {
    //   deleteFile(path.join('public/', getIfExist[0].path))
    // }
    const deleteIfExist = await prisma.undangan_file.deleteMany({
      where: {
        meetId: Number(rapatId)
      }
    })

    // Save the uploaded file information in the database
    const savedFile = await prisma.undangan_file.create({
      data: {
        filename: file.originalname,
        path: path.join('uploads/', file.filename), // Path relative to the public directory
        meetId: Number(rapatId)
      }
    })

    res.status(200).json({ message: 'File saved and meet saved successfully', file: savedFile, deleteIfExist })
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
