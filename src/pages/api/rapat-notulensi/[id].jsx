// pages/api/upload.js

import multer from 'multer'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import prisma from '../../../services/db'

let b = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/upload',
    filename: (req, file, cb) => {
      cb(null, `${b}${file.originalname}`)
    }
  })
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req, res) {
  const { method } = req
  if (req.method !== 'POST') return res.status(404).end()
  // Gunakan try-catch di dalam callback untuk menangani kesalahan upload
  upload.single('file')(req, res, async err => {
    try {
      if (err) {
        throw new Error(err.message) // Lempar kesalahan untuk ditangani di catch
      }

      // Dapatkan informasi file yang diunggah
      const fileName = req.file.originalname
      const filePath = req.file.path
      const id = req.query.id

      // Simpan informasi file ke database menggunakan Prisma
      const file = await prisma.notulensi_meet.create({
        data: {
          taskfile: `${b}${fileName}`,
          meetId: Number(id)
        }
      })
      const fileSucc = { taskfile: `${b}${fileName}`, meetId: req.query.id, id: file.id }

      // Kirim respons berhasil
      return res.status(201).json({ message: fileSucc })
    } catch (error) {
      // Tangani kesalahan yang mungkin terjadi dalam proses upload atau penyimpanan
      console.error('Error during file upload:', error)
      return res.status(400).json({ error: error.message || 'Something went wrong' })
    }
  })

  if (req.method === 'DELETE') {
    try {
      const dokumen = await prisma.notulensi_meet.delete({
        where: {
          id: Number(id)
        }
      })

      return res.status(200).json({ success: true, message: 'notulensi_meet deleted' })
    } catch (error) {
      return res.status(400).json({ success: false, message: 'notulensi_meet not found' })
    }
  }
}
