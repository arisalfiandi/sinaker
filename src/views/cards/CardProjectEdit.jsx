// react import
import { useState } from 'react'
import * as React from 'react'

// swall
import Swal from 'sweetalert2'

// ** Third Party Imports

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// Mui Import
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/dist/client/router'
import { Autocomplete } from '@mui/lab'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

const CardProjectEdit = () => {
  const projectRutin = [
    'PENGELOLAAN WEB',
    'SURVEI IBS BULANAN',
    'SURVEI IBS TAHUNAN',
    'SURVEI',
    'SAKERNAS SEMESTERAN',
    'SAKERNAS TAHUNAN'
  ]
  const jenisKegiatan = ['Pengolahan', 'Pelaksanaan', 'evaluasi', 'persiapan']

  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDateE, setSelectedDateE] = useState(null)

  const handlePJ = event => {
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      kegKetua: event.target.value // Perbarui nilai kegRentang
    }))
  }

  const handleDateChangeE = date => {
    setSelectedDateE(date)
    console.log(date)
  }

  const [values, setValues] = useState({
    kegNama: '',
    kegRentang: '',
    kegGajiPml: '',
    kegGajiPcl: '',
    kegKetua: '',
    kegFungsi: '',
    kegDesk: ''
  })

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
    console.log(values)
  }

  const handleRentangChange = event => {
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      kegRentang: event.target.value // Perbarui nilai kegRentang
    }))
  }
  console.log(values.kegRentang)
  console.log(values.kegFungsi)

  const handleFungsiChange = event => {
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      kegFungsi: event.target.value // Perbarui nilai kegRentang
    }))
  }

  const router = useRouter()
  const fungsi = ['Umum', 'Nerwilis', 'Produksi', 'Distribusi', 'IPDS', 'Sosial']

  return (
    <>
      <Grid container spacing={4} sx={{ padding: '32px' }}>
        <Grid item xs={12}>
          <Typography variant='h5'>Buat Kegiatan</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-helper-label'>Rentang Waktu</InputLabel>
            <Select
              fullWidth
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={values.kegRentang}
              onChange={handleRentangChange}
              label='Rentang Waktu'
            >
              <MenuItem value={59}>Bulanan</MenuItem>
              <MenuItem value={60}>Triwulanan</MenuItem>
              <MenuItem value={61}>Semesteran</MenuItem>
              <MenuItem value={62}>Tahunan</MenuItem>
              <MenuItem value={70}>SubRound</MenuItem>
              <MenuItem value={80}>Ad-Hok</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            value={values.kegNama}
            onChange={handleChange('kegNama')}
            multiline
            label='Nama Kegiatan'
          />
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>
          <TextField
            fullWidth
            value={values.kegGajiPml}
            onChange={handleChange('kegGajiPml')}
            multiline
            label='Gaji Satuan PML'
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <TextField
            fullWidth
            value={values.kegGajiPcl}
            onChange={handleChange('kegGajiPcl')}
            multiline
            label='Gaji Satuan PCL'
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-helper-label'>Fungsi</InputLabel>
            <Select
              fullWidth
              labelId='demo-simple-select-helper-label'
              onChange={handleFungsiChange}
              value={values.kegFungsi}
              id='demo-simple-select-helper'
              label='Fungsi'
            >
              <MenuItem value={2}>Bagian Umum</MenuItem>
              <MenuItem value={3}>Statistik Sosial </MenuItem>
              <MenuItem value={4}>Statistik Produksi</MenuItem>
              <MenuItem value={5}>Statistik Distribusi</MenuItem>
              <MenuItem value={6}>Neraca Wilayah dan Analisis Statistik</MenuItem>
              <MenuItem value={7}>Integrasi Pengolahan dan Diseminasi Statistik</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            minRows={3}
            label='Project Description'
            placeholder='Description'
            value={values.kegDesk}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={12} lg={12}>
          <DatePickerWrapper fullwidth='true'>
            <DatePicker
              selected={selectedDateE}
              sx={{ width: 1000 }}
              showYearDropdown
              showMonthDropdown
              placeholderText='Tanggal Berakhir'
              value={selectedDateE}
              onChange={handleDateChangeE}
              dateFormat='dd/MM/yyyy'
              className='custom-datepicker'
            />
          </DatePickerWrapper>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant='h6' sx={{ py: '5px' }}>
            Penanggung Jawab Kegiatan
          </Typography>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-helper-label'>Penanggung Jawab</InputLabel>
            <Select
              fullWidth
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={values.kegKetua}
              onChange={handlePJ}
              label='Penanggung Jawab'
            >
              <MenuItem value={1}>Ketua 1</MenuItem>
              <MenuItem value={2}>Ketua 2</MenuItem>
              <MenuItem value={3}>Ketua 3</MenuItem>
              <MenuItem value={4}>Ketua 4</MenuItem>
              <MenuItem value={5}>Ketua 5</MenuItem>
              <MenuItem value={6}>Ketua 6</MenuItem>
            </Select>
          </FormControl>
          {/* <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={pegawai}
            value={values.kegKetua}
            onChange={(event, newValue) => {
              setValues(newValue)
            }}
            renderInput={params => <TextField {...params} label=' Penanggung Jawab Kegiatan' />}
          /> */}
        </Grid>
        <Grid item xs={12} md={3} lg={3}></Grid>
      </Grid>
    </>
  )
}

export default CardProjectEdit
