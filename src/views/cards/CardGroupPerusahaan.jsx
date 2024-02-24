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

const CardProjectDetails = props => {
  const router = useRouter()

  const jenisFungsi = {
    2: { bagFungsi: 'Bagian Umum', color: 'warning' },
    3: { bagFungsi: 'Statistik Sosial', color: 'warning' },
    4: { bagFungsi: 'Statistik Produksi', color: 'warning' },
    5: { bagFungsi: 'Statistik Distribusi', color: 'warning' },
    6: { bagFungsi: 'Neraca Wilayah dan Analisis Statistik', color: 'warning' },
    7: { bagFungsi: 'Integrasi Pengolahan dan Diseminasi Statistik', color: 'warning' }
  }

  const { id, namaGroupPerusahaan, jumlahPerusahaan, fungsi } = props
  return (
    <Card>
      <CardContent key={id} sx={{ padding: theme => `${theme.spacing(0, 0, 0, 0)} !important` }}>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Box padding={4}>
              <Typography variant='body1' sx={{ marginBottom: 3.5, fontWeight: 600 }}>
                {namaGroupPerusahaan}
              </Typography>
              <Typography variant='body2'>{jenisFungsi[fungsi].bagFungsi}</Typography>
              <Divider sx={{ marginTop: 1.5 }} />
              <Grid justifyContent='start' display='flex'>
                <Link onClick={e => router.push(`/perusahaan-group-details/${id}`)}>
                  <Button sx={{ mt: 1 }} variant='contained' size={'small'}>
                    Selengkapnya
                  </Button>
                </Link>
              </Grid>
            </Box>
          </Grid>
          <Grid
            sx={{ backgroundColor: 'action.hover' }}
            item
            xs={4}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Box alignItems={'center'}>
              <Typography textAlign={'center'} variant='h5'>
                {jumlahPerusahaan.length}
              </Typography>
              <Typography variant='body2'>Perusahaan</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardProjectDetails
