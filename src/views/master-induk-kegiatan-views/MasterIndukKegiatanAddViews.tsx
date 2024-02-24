// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'

import FormControl from '@mui/material/FormControl'

// ** Icons Imports

import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import { useRouter } from 'next/dist/client/router'

const MasterIndukKegiatanAddViews = () => {
  return (
    <>
      <Card sx={{ padding: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
            Tambah Induk Kegiatan
          </Typography>
          <Typography variant='body2'>Fill this blank field below</Typography>
        </Box>
        <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
          <TextField autoFocus fullWidth id='kode' label='Kode Kegiatan' sx={{ marginBottom: 4 }} />
          <TextField autoFocus fullWidth id='induk' label='Induk Kegiatan' sx={{ marginBottom: 4 }} />
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
          <Button fullWidth size='medium' variant='contained' sx={{ marginTop: 4 }}>
            Tambah Induk Kegiatan
          </Button>
        </form>
      </Card>
    </>
  )
}

export default MasterIndukKegiatanAddViews
