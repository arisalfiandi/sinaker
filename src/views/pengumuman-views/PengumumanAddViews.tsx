import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import TextField from '@mui/material/TextField'

import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'

import { useRouter } from 'next/dist/client/router'
import { Autocomplete } from '@mui/lab'

const PengumumanAddViews = () => {
  const router = useRouter()
  const ProjectParticipant = ['pegawai1', 'pegawai2', 'pegawai3']
  return (
    <>
      <Card sx={{ padding: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
            Buat Pengumuman
          </Typography>
        </Box>
        <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
          <TextField autoFocus fullWidth id='judulPengumuman' label='Judul Pengumuman' sx={{ marginBottom: 4 }} />
          <TextField fullWidth multiline minRows={3} label='Isi Pengumuman' placeholder='Isi Pengumuman' />
          <Grid mt={4} container>
            <Grid mt={3} display={'flex'} justifyContent={'center'} item xs={12} md={12}>
              <Box
                width={'100%'}
                sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1 }}
                height={120}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                bgcolor={'grey.200'}
              >
                <Typography variant={'body2'}>Lampirkan File</Typography>
              </Box>
            </Grid>
          </Grid>
          <Button
            fullWidth
            onClick={e => {
              router.push('/pengumuman')
            }}
            size='medium'
            variant='contained'
            sx={{ marginTop: 4 }}
          >
            Buat Pengumuman
          </Button>
        </form>
      </Card>
    </>
  )
}

export default PengumumanAddViews
