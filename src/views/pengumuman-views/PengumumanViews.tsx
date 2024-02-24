import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

import { useRouter } from 'next/dist/client/router'

import CardPengumuman from 'src/views/cards/CardPengumuman'

const PengumumanViews = () => {
  const router = useRouter()

  return (
    <>
      <Grid container spacing={2} mb={2}>
        <Grid item md={6}>
          <Typography variant={'h4'} mb={4}>
            Pengumuman
          </Typography>
        </Grid>
        <Grid item md={6} display={'flex'} justifyContent={'end'}>
          <Link>
            <Button
              onClick={e => {
                router.push('pengumuman-add')
              }}
              size={'medium'}
              variant={'contained'}
            >
              Buat Pengumuman
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item md={12}>
          <CardPengumuman></CardPengumuman>
        </Grid>
        <Grid item md={12}>
          <CardPengumuman></CardPengumuman>
        </Grid>
      </Grid>
    </>
  )
}

export default PengumumanViews
