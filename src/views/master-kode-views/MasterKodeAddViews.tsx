import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'

import { useRouter } from 'next/dist/client/router'

const MasterKodeViews = () => {
  const router = useRouter()
  return (
    <>
      <Card sx={{ padding: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
            Tambah Kode Kegiatan
          </Typography>
          <Typography variant='body2'>Fill this blank field below</Typography>
        </Box>
        <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
          <TextField autoFocus fullWidth id='kode' label='Kode Kegiatan' sx={{ marginBottom: 4 }} />
          <TextField autoFocus fullWidth id='isi' label='Isi Kegiatan' sx={{ marginBottom: 4 }} />
          <FormControl fullWidth sx={{ marginBottom: 4 }}>
            <InputLabel id='form-layouts-separator-select-label'>Fungsi</InputLabel>
            <Select
              sx={{ height: 50 }}
              label='Fungsi'
              id='form-layouts-separator-fungsi'
              labelId='form-layouts-separator-fungsi-label'
            >
              <MenuItem value='umum'>Umum</MenuItem>
              <MenuItem value='ipds'>Ipds</MenuItem>
              <MenuItem value='produksi'>Produksi</MenuItem>
              <MenuItem value='neraca'>Neraca</MenuItem>
              <MenuItem value='distribusi'>Distribusi</MenuItem>
              <MenuItem value='sosial'>Sosial</MenuItem>
            </Select>
          </FormControl>
          <Button
            onClick={e => {
              router.push('/master-kode')
            }}
            fullWidth
            size='medium'
            variant='contained'
            sx={{ marginTop: 4 }}
          >
            Tambah Kode Kegiatan
          </Button>
        </form>
      </Card>
    </>
  )
}

export default MasterKodeViews
