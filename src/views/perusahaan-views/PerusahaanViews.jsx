import TablePerusahaan from 'src/views/tables/TablePerusahaan'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router'
import { useState, useEffect, useRef } from 'react'

const PerusahaanViews = props => {
  const router = useRouter()
  const [cardP, setCardP] = useState(
    props.data.map(data => {
      return {
        ...data
      }
    })
  )
  const session = useSession()
  // console.log(cardP)
  return (
    <>
      <Grid container spacing={5}>
        <Grid item md={6} xs={6} display={'flex'} justifyContent={'start'}>
          <Typography variant={'h5'}>Daftar Perusahaan</Typography>
        </Grid>
        <Grid item md={6} xs={6} display={'flex'} justifyContent={'end'}>
          {session.status === 'authenticated' && session.data.uid === 1099999 && (
            <Link onClick={e => router.push(`/add-perusahaan`)}>
              <Button variant={'contained'}>Tambah Perusahaan</Button>
            </Link>
          )}
        </Grid>
        <Grid item md={12} xs={12}>
          <Box sx={{ width: '100%' }}>
            <TablePerusahaan dataUser={cardP}></TablePerusahaan>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default PerusahaanViews
