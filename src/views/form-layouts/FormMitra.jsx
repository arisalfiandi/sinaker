// ** React Imports
import { useEffect, forwardRef, useState } from 'react'

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
// MUI
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Link from '@mui/material/Link'

import { useRouter } from 'next/dist/client/router'
// ** Icons Imports

import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import InputAdornment from '@mui/material/InputAdornment'

const FormMitra = () => {
  const router = useRouter()
  const CustomInputStart = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Tanggal Lahir' autoComplete='on' />
  })

  const [selectedDate, setSelectedDate] = useState(null)

  const [values, setValues] = useState({
    mitraNama: '',
    mitraNIK: '',
    mitraJenisKelamin: '',
    mitraTanggalLahir: '',
    mitraUmur: '',
    mitraPendidikan: '',
    mitraEmail: '',
    mitraStatus: ''
  })

  const handleDateChange = date => {
    setSelectedDate(date)
    setValues({ ...values, mitraTanggalLahir: new Date(date) })
    console.log(date)
  }

  const handleAdd = async e => {
    // console.log(values)
    e.preventDefault()

    try {
      while (true) {
        const res = await axios.post('/mitra', {
          nik: values.mitraNIK,
          name: values.mitraNama,
          jenisKelamin: values.mitraJenisKelamin,
          tanggalLahir: selectedDate,
          umur: values.mitraUmur,
          pendidikan: values.mitraPendidikan,
          email: values.mitraEmail,
          status: values.mitraStatus
        })

        if (res.status === 201) {
          Swal.fire({
            title: 'Tambah Mitra Berhasil',
            text: '',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          })
          router.push('/mitra-add')
        }

        break
      }
    } catch (error) {
      Swal.fire({
        title: 'Tambah Mitra Gagal',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  useEffect(() => {
    values.mitraTanggalLahir
      ? setValues({ ...values, mitraUmur: new Date().getFullYear() - new Date(values.mitraTanggalLahir).getFullYear() })
      : 0
  }, [values.mitraTanggalLahir])

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
  }
  return (
    <>
      <Card sx={{ padding: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
            Tambah Mitra
          </Typography>
          <Typography variant='body2'>Fill this blank field below</Typography>
        </Box>
        <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <TextField
                value={values.mitraNama}
                onChange={handleChange('mitraNama')}
                autoFocus
                fullWidth
                id='nama'
                label='Nama'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                value={values.mitraNIK}
                onChange={handleChange('mitraNIK')}
                autoFocus
                type={'number'}
                fullWidth
                label='NIK'
                sx={{}}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-helper-label'>Jenis Kelamin</InputLabel>
                <Select
                  fullWidth
                  labelId='demo-simple-select-helper-label'
                  id='demo-simple-select-helper'
                  label='Jenis Kelamin'
                  name='Jenis Kelamin'
                  value={values.mitraJenisKelamin}
                  onChange={handleChange('mitraJenisKelamin')}
                >
                  <MenuItem value={'Laki-laki'}>Laki-laki</MenuItem>
                  <MenuItem value={'Perempuan'}>Perempuan</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePickerWrapper>
                <DatePicker
                  sx={{ width: 1000 }}
                  selected={selectedDate}
                  showYearDropdown
                  showMonthDropdown
                  placeholderText='Tanggal Mulai'
                  value={selectedDate}
                  onChange={handleDateChange}
                  dateFormat='dd/MM/yyyy'
                  className='custom-datepicker'
                  customInput={<CustomInputStart />}
                  name='tanggalMulai'
                />
              </DatePickerWrapper>
            </Grid>
            {/* <Grid item xs={12} md={6}>
              <TextField disabled value={values.umur} autoFocus fullWidth label='Umur' sx={{}} />
            </Grid> */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-helper-label'>Pendidikan</InputLabel>
                <Select
                  value={values.mitraPendidikan}
                  onChange={handleChange('mitraPendidikan')}
                  fullWidth
                  labelId='demo-simple-select-helper-label'
                  id='demo-simple-select-helper'
                  label='Pendidikan'
                  name='Pendidikan'
                >
                  <MenuItem value={'Sekolah Dasa(SD)'}>Sekolah Dasa(SD)</MenuItem>
                  <MenuItem value={'Sekolah Menengah Pertama(SMP)/sederajat'}>
                    Sekolah Menengah Pertama(SMP)/sederajat
                  </MenuItem>
                  <MenuItem value={'SMA/Sederajat'}>SMA/Sederajat </MenuItem>
                  <MenuItem value={'D1-3'}>D1-3</MenuItem>
                  <MenuItem value={'D4/S1'}>D4/S1</MenuItem>
                  <MenuItem value={'S2'}>S2</MenuItem>
                  <MenuItem value={'S3'}>S3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                value={values.mitraEmail}
                onChange={handleChange('mitraEmail')}
                autoFocus
                fullWidth
                label='Email'
                sx={{}}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-helper-label'>Mitra Internal/Eksternal</InputLabel>
                <Select
                  value={values.mitraStatus}
                  fullWidth
                  onChange={handleChange('mitraStatus')}
                  labelId='demo-simple-select-helper-label'
                  id='demo-simple-select-helper'
                  label='Mitra Internal/Eksternal'
                  name='Mitra Internal/Eksternal'
                >
                  <MenuItem value={'Internal'}>Internal</MenuItem>
                  <MenuItem value={'EKsternal'}>Eksternal</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Link>
            <Button onClick={handleAdd} fullWidth size='medium' variant='contained' sx={{ marginTop: 4 }}>
              Tambah
            </Button>
          </Link>
        </form>
      </Card>
    </>
  )
}

export default FormMitra
