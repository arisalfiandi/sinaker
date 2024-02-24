// react import
import { useState } from 'react'

// swall
import Swal from 'sweetalert2'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Mui Import
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

import { useRouter } from 'next/dist/client/router'
import { Autocomplete } from '@mui/lab'

import TableAddParticipant from 'src/views/tables/TableAddParticipant'

const RapatCreateViews = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDateE, setSelectedDateE] = useState(null)
  const router = useRouter()

  const handleCreate = () => {
    Swal.fire({
      title: 'Apa anda yakin?',
      text: 'Periksa kembali untuk memastikan tidak ada yang salah',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Buat Kegiatan!'
    }).then(result => {
      if (result.isConfirmed) {
        router.push('/project-list')
      } else {
        router.push('/create-project')
      }
    })
  }

  const projectRutin = [
    'PENGELOLAAN WEB',
    'SURVEI IBS BULANAN',
    'SURVEI IBS TAHUNAN',
    'SURVEI',
    'SAKERNAS SEMESTERAN',
    'SAKERNAS TAHUNAN'
  ]
  const jenisKegiatan = ['Pengolahan', 'Pelaksanaan', 'evaluasi', 'persiapan']

  const pegawai = ['Pegawai1', 'Pegawai2', 'Pegawai3', 'Pegawai4']
  return (
    <Card>
      <Grid container spacing={5} sx={{ padding: '32px' }}>
        <Grid item xs={12}>
          <Typography variant='h5'>Buat Rapat</Typography>
        </Grid>

        <Grid item xs={12} md={12}>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={projectRutin}
            renderInput={params => <TextField {...params} label='Nama Rapat' />}
          />
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>
          {/* <DatePicker
            fullWidth
            selected={selectedDate}
            showYearDropdown
            showMonthDropdown
            placeholderText='Tanggal Mulai'
            onChange={setSelectedDate}
            dateFormat='dd/MM/yyyy'
            className='custom-datepicker'
          /> */}
          <TextField fullWidth multiline label='Waktu Mulai' placeholder='Waktu Mulai' />
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          {/* <DatePicker
            fullWidth
            selected={selectedDateE}
            showYearDropdown
            showMonthDropdown
            placeholderText='Tanggal Berakhir'
            onChange={setSelectedDateE}
            dateFormat='dd/MM/yyyy'
            className='custom-datepicker'
          /> */}
          <TextField fullWidth multiline label='Waktu Selesai' placeholder='Waktu Selesai' />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='link'>Age</InputLabel>
            <Select labelId='Link' id='demo-simple-select' label='Link'>
              <MenuItem value={10}>Link 1</MenuItem>
              <MenuItem value={20}>Link 2</MenuItem>
              <MenuItem value={30}>Link 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth multiline minRows={3} label='Deskripsi Rapat' placeholder='Description' />
        </Grid>

        <TableAddParticipant></TableAddParticipant>
        <Divider sx={{ margin: 0 }} />
        <Grid item xs={12} md={3} lg={3}>
          <Button onClick={handleCreate} size='medium' type='submit' variant='contained'>
            Buat Rapat
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}

export default RapatCreateViews
