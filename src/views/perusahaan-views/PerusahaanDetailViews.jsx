// ** React Imports
import { useState } from 'react'
// next
import { useRouter } from 'next/dist/client/router'
// ** MUI Imports
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import AvatarGroup from '@mui/material/AvatarGroup'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import CardActions from '@mui/material/CardActions'

import router from 'next/router'
import Link from '@mui/material/Link'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const PerusahaanDetailViews = props => {
  const statusObj = {
    0: { color: 'error', status: 'Overload' },
    1: { color: 'success', status: 'Available' }
  }

  const jenisFungsi = {
    2: { bagFungsi: 'Bagian', color: 'warning' },
    3: { bagFungsi: 'Statistik Sosial', color: 'warning' },
    4: { bagFungsi: 'Statistik Produksi', color: 'warning' },
    5: { bagFungsi: 'Statistik Distribusi', color: 'warning' },
    6: { bagFungsi: 'Neraca Wilayah dan Analisis Statistik', color: 'warning' },
    7: { bagFungsi: 'Integrasi Pengolahan dan Diseminasi Statistik', color: 'warning' }
  }

  const namaBulanArr = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ]
  const router = useRouter()
  const [tpp, setTpp] = useState(props.dataTpp)
  // console.log(props.data)
  // console.log(tpp)
  const [values, setValues] = useState({
    id: props.data[0].id,
    perusahaanNama: props.data[0].nama,
    perusahaanKip: props.data[0].kip,
    perusahaanDesa: props.data[0].desa,
    perusahaanNamaDesa: props.data[0].namaDesa,
    perusahaanKecamatan: props.data[0].kecamatan,
    perusahaanNamaKec: props.data[0].namaKec,
    perusahaanAlamat: props.data[0].alamat
  })

  const totalKegiatan = (() => {
    const uniqueTaskIds = new Set()
    const namaKegiatan = {} // Objek untuk menyimpan nama kegiatan per taskId
    const filteredTpp = tpp.filter(tppRow => tppRow.perusahaanId === values.id)

    filteredTpp.forEach(tppRow => {
      uniqueTaskIds.add(tppRow.taskId)
      if (!namaKegiatan[tppRow.taskId]) {
        namaKegiatan[tppRow.taskId] = tppRow.task.title
      }
    })

    const totalKegiatanUnik = uniqueTaskIds.size
    console.log('Jumlah kegiatan dengan taskId unik:', totalKegiatanUnik)

    return { filteredTpp, namaKegiatan }
  })()

  console.log(totalKegiatan.namaKegiatan)

  return (
    <>
      <Card sx={{ position: 'relative' }}>
        <CardMedia sx={{ height: '12.625rem' }} image='/images/cards/yeet-01.png' />
        <Avatar
          alt='Yeet'
          src='/images/avatars/Asset-1-100.jpg'
          sx={{
            width: 95,
            height: 95,
            left: '1.313rem',
            top: '9.28125rem',
            position: 'absolute',
            border: theme => `0.25rem solid ${theme.palette.common.white}`
          }}
        />
        <CardContent>
          <Box
            // bgcolor={'success.main'}
            sx={{
              mt: 5.75,
              mb: 1.75,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Grid container spacing={6}>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Kip</Typography>
                <Typography variant='caption'>{values.perusahaanKip}</Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Nama Perusahaan</Typography>
                <Typography variant='caption'>{values.perusahaanNama}</Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Desa</Typography>
                <Typography variant='caption'>
                  {values.perusahaanDesa}: {values.perusahaanNamaDesa}
                </Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Kecamatan</Typography>
                <Typography variant='caption'>
                  {values.perusahaanKecamatan}:{values.perusahaanNamaKec}
                </Typography>
              </Grid>

              <Grid item md={4} xs={6}>
                <Typography variant='body1'>Alamat</Typography>
                <Typography variant='caption'>{values.perusahaanAlamat}</Typography>
              </Grid>
              <Grid item md={12} xs={12}>
                <Divider sx={{ marginTop: 1.5, marginBottom: 1.75 }} />
              </Grid>
              <Grid item md={6} xs={6} display={'flex'} justifyContent={'start'}>
                <Typography variant='h6'>Total Kegiatan : {totalKegiatan.filteredTpp.length}</Typography>
                <Typography
                  sx={{ marginRight: 30, fontWeight: 500, fontSize: '1.2rem !important', textAlign: 'center' }}
                ></Typography>
              </Grid>

              <Grid item md={6} xs={6} display={'flex'} justifyContent={'end'}>
                <Button
                  onClick={e => {
                    e.preventDefault()
                    router.push(`/perusahaan-edit/${props.data[0].id}`)
                  }}
                  variant='contained'
                  size='medium'
                >
                  Edit perusahaan
                </Button>
              </Grid>

              <Grid item md={12}>
                <div>
                  <p>Perusahaan Masuk Kedalam Kegiatan: {totalKegiatan.totalKegiatanUnik}</p>
                  <ul>
                    {Object.entries(totalKegiatan.namaKegiatan).map(([taskId, namaKegiatan]) => (
                      <Link
                        onClick={async e => {
                          router.push(`/task-detail/${taskId}`)
                        }}
                        sx={{ cursor: 'pointer' }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 500,
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            fontSize: '0.875rem !important'
                          }}
                        >
                          <li key={taskId}>{namaKegiatan}</li>
                        </Typography>
                      </Link>
                    ))}
                  </ul>
                </div>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default PerusahaanDetailViews
