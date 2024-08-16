// ** Third Party Imports
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Mui Import
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
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

const rentang = {
  59: { waktu: 'Bulanan', color: 'warning' },
  60: { waktu: 'Triwulanan', color: 'warning' },
  61: { waktu: 'Semesteran', color: 'warning' },
  62: { waktu: 'Tahunan', color: 'warning' },
  70: { waktu: 'SubRound', color: 'warning' },
  80: { waktu: 'Ad-Hok', color: 'warning' },
  321: { waktu: 'Belum Ditentukan', color: 'warning' }
}

const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {}
}))
const CardProjectDetails = props => {
  const [task, setTask] = useState(props.totalSubKegiatan)
  const totalRealisasi = task.reduce((accumulator, currentTask) => accumulator + currentTask.realisasi, 0)
  const totalTarget = task.reduce((accumulator, currentTask) => accumulator + currentTask.target, 0)
  const projectProgress =
    task.realisasi !== undefined && task.realisasi !== null ? 100 * (totalRealisasi / totalTarget) : 0
  const gabs =
    task.reduce((acc, cur) => acc + cur.realisasi, 0) !== undefined &&
    task.reduce((acc, cur) => acc + cur.realisasi, 0) !== null
      ? 100 * (task.reduce((acc, cur) => acc + cur.realisasi, 0) / task.reduce((acc, cur) => acc + cur.target, 0))
      : 0
  const router = useRouter()

  const {
    id,
    namaKegiatan,
    intervalWaktu,
    tanggalDimulai,
    tanggalBerakhir,
    jumlahParicipant,
    totalSubKegiatan,
    penganggungJawab,
    totalGaji
  } = props
  return (
    <Card height={100} sx={{ height: 320 }}>
      <CardContent key={id} sx={{ padding: theme => `${theme.spacing(3, 5, 6)} !important` }}>
        <Grid container spacing={1}>
          <Grid item xs={9} height={80}>
            <Typography variant='h6' sx={{ marginBottom: 2, lineHeight: '24px', fontWeight: 600 }}>
              {namaKegiatan}
            </Typography>
            <Typography variant='body2'>{rentang[Number(intervalWaktu)].waktu}</Typography>
          </Grid>
          {/* <Grid item xs={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant='h6' sx={{ lineHeight: 1, fontWeight: 600, fontSize: '3rem !important' }}>
                {Math.round(
                  totalSubKegiatan.length > 0 &&
                    totalSubKegiatan.every(item => item.realisasi !== undefined && item.realisasi !== null) &&
                    totalSubKegiatan.every(item => item.target !== undefined && item.target !== null)
                    ? (100 * totalSubKegiatan.reduce((acc, cur) => acc + cur.realisasi, 0)) /
                        totalSubKegiatan.reduce((acc, cur) => acc + cur.target, 0) <
                      100
                      ? (100 * totalSubKegiatan.reduce((acc, cur) => acc + cur.realisasi, 0)) /
                        totalSubKegiatan.reduce((acc, cur) => acc + cur.target, 0)
                      : 0
                    : 0
                )}
                %
              </Typography>
            </Box>
          </Grid> */}
        </Grid>
        <Divider sx={{ marginTop: 4.5, marginBottom: 4.75 }} />
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
                Total Sub Kegiatan: <strong>{totalSubKegiatan.length}</strong>
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: 4.5, marginBottom: 1.75 }} />
        <Grid justifyContent='end' display='flex'>
          <Link onClick={e => router.push(`/project-detail/${id}`)}>
            <Button sx={{ mt: 3 }} variant='contained'>
              Selengkapnya
            </Button>
          </Link>
          {/* <Button size={'small'} mt={4} variant={'contained'} onClick={() => justt(id)}>
            justtry
          </Button> */}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardProjectDetails
