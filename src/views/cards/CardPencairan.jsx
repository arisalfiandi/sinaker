// ** Third Party Imports
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Mui Import
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'

import { useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import { styled } from '@mui/material/styles'

// icon
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import ClipboardFileOutline from 'mdi-material-ui/ClipboardFileOutline'
import LockOutline from 'mdi-material-ui/LockOutline'

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

const status = {
  0: { deskripsi: 'Belum Mulai', color: 'info' },
  1: { deskripsi: 'On Progress', color: 'warning' },
  2: { deskripsi: 'Selesai', color: 'success' }
}

const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {}
}))

const CardProjectDetails = props => {
  const totalRealisasi = props.realisasi
  const totalTarget = props.target
  const jumlahMitra = props.jumlahMitra
  // const projectProgress =
  //   task.realisasi !== undefined && task.realisasi !== null ? 100 * (totalRealisasi / totalTarget) : 0
  const router = useRouter()

  const {
    id,
    namaKegiatan,
    namaProjek,
    intervalWaktu,
    tanggalDimulai,
    tanggalBerakhir,
    jumlahParicipant,
    tahapPencairan,
    statusPencairan,
    target,
    realisasi,
    totalGaji
  } = props

  const handleClickPencairan = async e => {
    e.preventDefault()
    const currentDate = new Date()
    const tanggal1BulanKemudian = new Date(currentDate)
    tanggal1BulanKemudian.setMonth(tanggal1BulanKemudian.getMonth() + 1)
    try {
      while (true) {
        const res = await axios.post('/pencairan', {
          taskId: id,
          tahapanId: 0,
          status: 1,
          tanggalMulai: currentDate,
          tanggalSelesai: currentDate,
          tanggalSPM: tanggal1BulanKemudian
        })

        if (res.status === 201) {
          Swal.fire({
            title: 'Berhasil memulai proses pencairan',
            text: 'Press OK to continue',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          }).then(router.push(`/pencairan-detail/${id}`))
        }

        break
      }
    } catch (error) {
      Swal.fire({
        title: 'Gagal memulai proses pencairan',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  const handleSeePencairan = e => {
    e.preventDefault()
    router.push(`/pencairan-detail/${id}`)
  }

  return (
    <Card>
      <CardContent key={id} sx={{ padding: theme => `${theme.spacing(3, 5, 6)} !important` }}>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Typography variant='h6' sx={{ marginBottom: 2, lineHeight: '24px', fontWeight: 600 }}>
              {namaKegiatan} {namaProjek}
            </Typography>
            <Typography variant='body2' sx={{ my: 1, fontStyle: 'italic' }}>
              {tahapPencairan == 99
                ? 'Pencairan Belum di Mulai'
                : tahapPencairan == 0
                ? 'PJK Sedang Membuat Dokumen Pencairan'
                : tahapPencairan == 1
                ? 'Verifikator Sedang Memverifikasi Dokumen'
                : tahapPencairan == 2
                ? 'PPSPM Sedang Membuat SPM'
                : tahapPencairan == 3
                ? 'Bendahara Sedang Melakukan Proses Pencairan'
                : 'Selesai'}
            </Typography>
          </Grid>
          <Grid item xs={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Chip
                variant='body2'
                color={status[Number(statusPencairan)].color}
                label={status[Number(statusPencairan)].deskripsi}
              />
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: 4.5, marginBottom: 4.5 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <StyledBox>
              <Box sx={{ mb: 5, mt: 3, display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline sx={{ color: 'primary.main', marginRight: 2.25 }} fontSize='small' />
                <Typography variant='body2' sx={{ fontSize: '12px' }}>
                  Tanggal Dimulai: <strong>{new Date(tanggalDimulai).toLocaleDateString('id')}</strong>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline sx={{ color: 'primary.main', marginRight: 2.25 }} fontSize='small' />
                <Typography variant='body2' sx={{ fontSize: '12px' }}>
                  Penanggung Jawab: <strong>{jumlahParicipant}</strong>
                </Typography>
              </Box>
            </StyledBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 5, mt: 3, display: 'flex', alignItems: 'center' }}>
              <LockOutline sx={{ color: 'primary.main', marginRight: 2.25 }} fontSize='small' />
              <Typography variant='body2' sx={{ fontSize: '12px' }}>
                Tanggal Berakhir: <strong>{new Date(tanggalBerakhir).toLocaleDateString('id')}</strong>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ClipboardFileOutline sx={{ color: 'primary.main', marginRight: 2.25 }} fontSize='small' />
              <Typography variant='body2' sx={{ fontSize: '12px' }}>
                Jumlah Mitra: <strong>{jumlahMitra.length} Orang</strong>
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: 4.5, marginBottom: 1.75 }} />
        <Grid justifyContent='end' display='flex'>
          <Link onClick={statusPencairan == 0 ? handleClickPencairan : handleSeePencairan}>
            <Button sx={{ mt: 3 }} variant='contained'>
              {statusPencairan == 0 ? 'Buat Pencairan' : 'Selengkapnya'}
            </Button>
          </Link>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardProjectDetails
