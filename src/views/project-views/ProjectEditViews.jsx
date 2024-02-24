import { useState, forwardRef } from 'react'
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
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { Autocomplete } from '@mui/lab'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

//router
import { useRouter } from 'next/dist/client/router'

import TableProjectEditParticipant from 'src/views/tables/TableProjectEditParticipant'
import CardProjectEdit from 'src/views/cards/CardProjectEdit'

const ProjectEditViews = props => {
  const CustomInputStart = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Start Date' autoComplete='on' />
  })

  const CustomInputEnd = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='End Date' autoComplete='off' />
  })
  const [dataUser, setDataUser] = useState(props.data.user)
  // console.log(dataUser)
  const [selectedDate, setSelectedDate] = useState(new Date(props.data.project.startdate))
  const [selectedDateE, setSelectedDateE] = useState(new Date(props.data.project.enddate))
  const [values, setValues] = useState({
    id: props.data.project.id,
    kegNama: props.data.project.title,
    kegRentang: props.data.project.rentangWaktu,
    kegGajiPml: '',
    kegGajiPcl: '',
    kegFungsi: props.data.project.fungsi,
    kegDesk: props.data.project.description,
    kegKetua: props.data.project.projectLeaderId,
    kegArsip: props.data.project.isArchived
  })

  const handleDateChange = date => {
    setSelectedDate(date)
    console.log(date)
  }
  const handleDateChangeE = date => {
    setSelectedDateE(date)
    console.log(date)
  }

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

  const handleFungsiChange = event => {
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      kegFungsi: event.target.value // Perbarui nilai kegRentang
    }))
  }

  const handlePJ = event => {
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      kegKetua: event.target.value // Perbarui nilai kegRentang
    }))
  }
  const router = useRouter()

  // handle edit
  const handleEdit = e => {
    // console.log(values)
    // console.log(selectedDate)
    // console.log(selectedDateE)
    e.preventDefault()
    const data = {
      title: values.kegNama,
      rentangWaktu: values.kegRentang.toString(),
      startdate: selectedDate,
      enddate: selectedDateE,
      fungsi: values.kegFungsi,
      description: values.kegDesk,
      projectLeaderId: values.kegKetua,
      createdById: 99,
      isArchived: values.kegArsip
    }
    axios
      .put(`/project/${values.id}`, data)
      .then(res => {
        Swal.fire({
          title: 'Success!',
          text: 'Project has been updated',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        router.push(`/project-detail/${values.id}`)
      })
      .catch(err => {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
  }

  return (
    <Card>
      <form action='post' onSubmit={e => e.preventDefault()}>
        <Grid container spacing={4} sx={{ padding: '32px' }}>
          <Grid item xs={12}>
            <Typography variant='h5'>Edit Kegiatan</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-helper-label'>Periode Waktu</InputLabel>
              <Select
                fullWidth
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={values.kegRentang}
                onChange={handleRentangChange}
                label='Periode Waktu'
                name='rentangWaktu'
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
              name='namaKegiatan'
            />
          </Grid>

          {/* <Grid item xs={12} sm={12} lg={6}>
          <TextField
            fullWidth
            value={values.kegGajiPml}
            type={'number'}
            onChange={handleChange('kegGajiPml')}
            label='Gaji Satuan PML'
            name='gajiPML'
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <TextField
            fullWidth
            value={values.kegGajiPcl}
            type={'number'}
            onChange={handleChange('kegGajiPcl')}
            label='Gaji Satuan PCL'
            name='gajiPCL'
          />
        </Grid> */}
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
                name='fungsi'
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
              onChange={handleChange('kegDesk')}
              name='kegaitanDesk'
            />
          </Grid>

          <Grid item xs={12} sm={12} lg={6}>
            <DatePickerWrapper>
              <DatePicker
                sx={{ width: 1000 }}
                selected={selectedDate}
                showYearDropdown
                showMonthDropdown
                placeholderText='Tanggal Mulai'
                value={selectedDate}
                onChange={handleDateChange}
                customInput={<CustomInputStart />}
                dateFormat='dd/MM/yyyy'
                className='custom-datepicker'
                name='tanggalMulai'
              />
            </DatePickerWrapper>
            {/* <TextField fullWidth multiline label='Tanggal Dimulai' placeholder='Tanggal Dimulai' /> */}
          </Grid>

          <Grid item xs={12} sm={12} lg={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={selectedDateE}
                sx={{ width: 1000 }}
                showYearDropdown
                showMonthDropdown
                placeholderText='Tanggal Berakhir'
                value={selectedDateE}
                customInput={<CustomInputEnd />}
                onChange={handleDateChangeE}
                dateFormat='dd/MM/yyyy'
                className='custom-datepicker'
                name='tanggalBerakhir'
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
                name='penanggungJawab'
              >
                {dataUser.map(item => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3} lg={3}></Grid>
        </Grid>
        {/* <TableAddParticipant></TableAddParticipant> */}
        <Divider sx={{ margin: 0 }} />
        <Grid item m={4} display={'flex'} justifyContent={'end'}>
          <Button size='medium' type='submit' variant='contained' onClick={handleEdit}>
            Edit Kegiatan
          </Button>
        </Grid>
      </form>
      {/* <CardProjectEdit data={props.data}></CardProjectEdit>
      <Grid container>
        <Grid item md={12} xs={12} justifyContent={'end'} display={'flex'} p={4}></Grid>
      </Grid>

      <Grid container mt={4}>
        <Grid p={4} md={12} item display={'flex'} justifyContent={'end'}>
          <Button
            onClick={e => {
              router.push('/project-detail')
            }}
            variant='contained'
          >
            {' '}
            Edit Kegiatan
          </Button>
        </Grid>
      </Grid> */}
    </Card>
  )
}

export default ProjectEditViews
