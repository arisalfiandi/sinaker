import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { useRouter } from 'next/dist/client/router'

import TableMasterIndukKegiatan from 'src/views/tables/TableMasterIndukKegiatan'

const MasterIndukKegiatanViews = () => {
  const router = useRouter()
  return (
    <>
      <Grid container spacing={4} mb={4}>
        <Grid item md={6}>
          <Typography variant={'h4'}>Master Induk Kegiatan</Typography>
        </Grid>
        <Grid item md={6} display={'flex'} justifyContent={'end'}>
          <Button
            variant={'contained'}
            onClick={e => {
              router.push('/master-induk-kegiatan-add')
            }}
          >
            Tambah Induk Kegiatan
          </Button>
        </Grid>
      </Grid>
      <TableMasterIndukKegiatan></TableMasterIndukKegiatan>
    </>
  )
}

export default MasterIndukKegiatanViews
