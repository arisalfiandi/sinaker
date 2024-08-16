// pages/api/upload.js

import multer from 'multer'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import prisma from '../../../services/db'

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req, res) {
  const { method } = req
  if (req.method == 'POST') {
    let b = `${new Date().getTime()}-${Math.random().toString(36).substring(7)}-`

    const upload = multer({
      storage: multer.diskStorage({
        destination: './public/upload',
        filename: (req, file, cb) => {
          cb(null, `${b}${file.originalname}`)
        }
      })
    })
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
        const file = await prisma.undangan_persetujuan_meet.create({
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
  }
  if (req.method === 'DELETE') {
    try {
      const dokumen = await prisma.undangan_persetujuan_meet.deleteMany({
        where: {
          meetId: Number(req.query.id),
          id: {
            not: 0
          }
        }
      })

      return res.status(200).json({ success: true, message: 'undangan ajuan deleted' })
    } catch (error) {
      return res.status(400).json({ success: false, message: error })
    }
  }
}
