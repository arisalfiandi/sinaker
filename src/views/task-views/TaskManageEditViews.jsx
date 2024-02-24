import * as React from 'react'
import { useState } from 'react'

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

// mui
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

import { useRouter } from 'next/dist/client/router'

import { Autocomplete } from '@mui/lab'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const TaskManageEditViews = props => {
  const router = useRouter()
  const [selectedDateE, setSelectedDateE] = useState(new Date(props.data.duedate))
  const [values, setValues] = useState({
    id: props.data.project.id,
    subKegNama: props.data.title,
    subKegJenis: props.data.jenisKeg,
    subKegTarget: props.data.target,
    subKegUnitTarget: props.data.unitTarget,
    subKegDl: new Date(props.data.duedate),
    subKegDesk: props.data.description,
    subKegMonth: props.data.month,
    subKegYear: props.data.year,
    subKegId: props.data.id
  })

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
  }

  const handleDateChangeE = date => {
    const dates = new Date(date) // Ganti tanggal dengan tanggal yang sesuai
    const localizedDateString = date.toLocaleDateString('id')
    setSelectedDateE(date)
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      subKegMonth: date.getMonth() + 1,
      subKegYear: date.getFullYear(),
      subKegDl: date // Perbarui nilai kegRentang
    }))
    console.log(date)
  }

  const handleJenisSubKeg = eeee => {
    setValues(values => ({
      ...values,
      subKegJenis: eeee.target.value
    }))
  }
  const jenisSubKegiatan = [
    {
      id: 65,
      nama: 'Lapangan'
    },

    {
      id: 67,
      nama: 'Pengolahan '
    },

    {
      id: 69,
      nama: 'Diseminasi '
    }
  ]

  const handleEdit = e => {
    e.preventDefault()

    const data = {
      title: values.subKegNama,
      jenisKeg: values.subKegJenis,
      target: parseInt(values.subKegTarget),
      unitTarget: values.subKegUnitTarget,
      duedate: values.subKegDl,
      description: values.subKegDesk,
      month: parseInt(values.subKegMonth),
      year: parseInt(values.subKegYear)
    }

    // console.log(data)
    axios
      .put(`/task/${values.subKegId}`, data)
      .then(res => {
        Swal.fire({
          title: 'Success!',
          text: 'Sub Kegiatan berhasil diedit',
          icon: 'success',
          confirmButtonText: 'Ok'
        })

        router.push(`/task-manage/${values.id}`)
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

  // a check b check c check
  // console.log(values.subKegJenis)
  // console.log(values)
  return (
    <>
      <Card sx={{ padding: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
            Edit Sub Kegiatan
          </Typography>
          {/* <Typography variant='body2'>Fill this blank field below</Typography> */}
        </Box>
        <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
          <TextField
            name='namaSubKeg'
            value={values.subKegNama}
            onChange={handleChange('subKegNama')}
            fullWidth
            id='namaKegiatan'
            label='Nama Sub Kegiatan'
            sx={{ marginBottom: 4 }}
          />

          <Grid container spacing={4}>
            <Grid item md={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-helper-label'>Jenis Kegiatan</InputLabel>
                <Select
                  name='jenisSubKeg'
                  fullWidth
                  labelId='demo-simple-select-helper-label'
                  id='demo-simple-select-helper'
                  label='Rentang Waktu'
                  onChange={handleJenisSubKeg}
                  value={values.subKegJenis}
                >
                  {jenisSubKegiatan.map(item => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nama}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name='targetSubKeg'
                value={values.subKegTarget}
                onChange={handleChange('subKegTarget')}
                autoFocus
                fullWidth
                id='target'
                label='Target'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name='unitTargetSubKeg'
                value={values.subKegUnitTarget}
                onChange={handleChange('subKegUnitTarget')}
                autoFocus
                fullWidth
                id='unitTarget'
                label='Unit Target'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <DatePickerWrapper>
                <DatePicker
                  selected={selectedDateE}
                  sx={{ width: 1000 }}
                  label='Tanggal Berakhir'
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
            <Grid item md={12} xs={12}>
              {' '}
              <TextField
                name='deskripsiSubKeg'
                value={values.subKegDesk}
                onChange={handleChange('subKegDesk')}
                fullWidth
                multiline
                minRows={3}
                label='Deskripsi Sub Kegiatan'
                placeholder='Deskripsi Sub Kegiatan'
              />
            </Grid>
          </Grid>

          {/* <TableAddParticipant></TableAddParticipant> */}
          <Button fullWidth onClick={handleEdit} size='medium' variant='contained' sx={{ marginTop: 4 }}>
            Edit Sub Kegiatan
          </Button>
        </form>
      </Card>
    </>
  )
}

export default TaskManageEditViews
