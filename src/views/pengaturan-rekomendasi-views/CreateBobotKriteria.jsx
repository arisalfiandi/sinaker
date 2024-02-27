// react import
import { useState } from 'react'
import * as React from 'react'

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

// ** Third Party Imports

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// Mui Import
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/dist/client/router'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { create, all } from 'mathjs'
import { DataGrid } from '@mui/x-data-grid'

const CreateKegiatanPerusahaanViews = props => {
  const [pegawai, setPegawai] = useState(props.dataPegawai)
  const [mitra, setMitra] = useState(props.dataMitra)

  const [values, setValues] = useState({
    jumlahPekerjaan: 0,
    gajiBlnIni: 0,
    jumlahPekerjaanMitra: 0,
    gajiBlnIniMitra: 0,
    gajiBlnSebelumMitra: 0
  })

  const rowsOBefore = [
    { id: 1, kriteria: 'Jumlah Pekerjaan', prioritas: (pegawai.kriteria1 * 100).toFixed(2) },
    { id: 2, kriteria: 'Jumlah Jam Kerja', prioritas: (pegawai.kriteria2 * 100).toFixed(2) }
  ]

  const rowsMBefore = [
    { id: 1, kriteria: 'Jumlah Pekerjaan', prioritas: (mitra.kriteria1 * 100).toFixed(2) },
    { id: 2, kriteria: 'Gaji Bulan Ini', prioritas: (mitra.kriteria2 * 100).toFixed(2) },
    { id: 3, kriteria: 'Gaji Bulan Sebelumnya', prioritas: (mitra.kriteria3 * 100).toFixed(2) }
  ]

  const columns = [
    {
      field: 'kriteria',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Kriteria</Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'prioritas',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Prioritas
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    }
  ]

  const handleBobotKriteria = async e => {
    e.preventDefault()
    router.push(`/pengaturan-rekomendasi/edit`)
  }

  const router = useRouter()
  return (
    <Card>
      <form action='post' onSubmit={e => e.preventDefault()}>
        <Grid container spacing={4} sx={{ padding: '32px' }}>
          <Grid item xs={12}>
            <Typography variant='h4'>Bobot Kriteria Beban Kerja Saat Ini</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Pegawai</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            {/* <Typography variant='body1'>Nilai Bobot Kriteria</Typography> */}
            <DataGrid
              initialState={{
                sorting: {
                  sortModel: [{ field: 'prioritas', sort: 'desc' }]
                }
              }}
              rows={rowsOBefore}
              columns={columns}
              hideFooter
              disableSelectionOnClick
              sx={{
                width: '100%',
                m: 2
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Mitra</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            {/* <Typography variant='body1'>Nilai Bobot Kriteria</Typography> */}
            <DataGrid
              initialState={{
                sorting: {
                  sortModel: [{ field: 'prioritas', sort: 'desc' }]
                }
              }}
              rows={rowsMBefore}
              columns={columns}
              hideFooter
              disableSelectionOnClick
              sx={{
                width: '100%',
                m: 2
              }}
            />
          </Grid>
          <Divider sx={{ margin: 0 }} />
          <Grid item m={4} display={'flex'} justifyContent={'end'}>
            <Button size='medium' type='submit' variant='contained' onClick={handleBobotKriteria}>
              Ubah Bobot Kriteria
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  )
}

export default CreateKegiatanPerusahaanViews
