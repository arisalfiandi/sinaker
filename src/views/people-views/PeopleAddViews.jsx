// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

// ** MUI Components
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
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

// ** Icons Imports

import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import InputAdornment from '@mui/material/InputAdornment'

import { useRouter } from 'next/router'

const PeopleAddViews = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const [values, setValues] = useState({
    pegawaiId: '',
    pegawaiNama: '',
    pegawaiNIP: '',
    pegawaiFungsi: 3,
    pegawaiEmail: '',
    pegawaiPassword: ''
  })

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
  }

  const handleDropDownChange = event => {
    setValues(values => ({
      ...values,
      pegawaiFungsi: event.target.value
    }))
  }

  const handleTambah = () => {
    console.log(values)
    router.push('/pegawai')
  }

  const handleAddPegawai = async e => {
    e.preventDefault()
    // console.log(
    //   values.kegNama +
    //     '||' +
    //     values.kegRentang +
    //     '||' +
    //     selectedDate +
    //     '||' +
    //     selectedDateE +
    //     '||' +
    //     values.kegFungsi +
    //     '||' +
    //     values.kegDesk +
    //     '||' +
    //     values.kegKetua
    // )
    try {
      while (true) {
        const res = await axios.post('/user', {
          email: values.pegawaiEmail,
          name: values.pegawaiNama,
          nip: values.pegawaiNIP,
          password: values.pegawaiPassword,
          role: 'employee',
          fungsi: values.pegawaiFungsi
        })

        if (res.status === 201) {
          Swal.fire({
            title: 'Tambah pegawai berhasil',
            text: '',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          })

          setValues({
            pegawaiId: '',
            pegawaiNama: '',
            pegawaiNIP: '',
            pegawaiFungsi: '',
            pegawaiEmail: '',
            pegawaiPassword: ''
          })
        }

        break
      }
    } catch (error) {
      Swal.fire({
        title: 'Tambah Pegawai Gagal',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  return (
    <>
      <Card sx={{ padding: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
            Tambah Pegawai
          </Typography>
          <Typography variant='body2'>Fill this blank field below</Typography>
        </Box>
        <form noValidate autoComplete='off' onSubmit={handleAddPegawai}>
          <FormControl fullWidth>
            <TextField
              value={values.pegawaiNama}
              onChange={handleChange('pegawaiNama')}
              autoFocus
              fullWidth
              name='nama'
              id='nama'
              label='Nama'
              sx={{ marginBottom: 4 }}
            />
          </FormControl>
          <TextField
            name='NIP'
            value={values.pegawaiNIP}
            onChange={handleChange('pegawaiNIP')}
            autoFocus
            fullWidth
            type={'number'}
            id='nip'
            label='Nip'
            sx={{ marginBottom: 4 }}
          />
          {/* <FormControl fullWidth sx={{ marginBottom: 4 }}>
            <InputLabel id='form-layouts-separator-select-label'>Fungsi</InputLabel>
            <Select
              sx={{ height: 50 }}
              label='Fungsi'
              id='form-layouts-separator-fungsi'
              labelId='form-layouts-separator-fungsi-label'
              value={values.pegawaiFungsi}
              onChange={handleDropDownChange}
            >
              <MenuItem value={2}>Bagian Umum</MenuItem>
              <MenuItem value={3}>Statistik Sosial </MenuItem>
              <MenuItem value={4}>Statistik Produksi</MenuItem>
              <MenuItem value={5}>Statistik Distribusi</MenuItem>
              <MenuItem value={6}>Neraca Wilayah dan Analisis Statistik</MenuItem>
              <MenuItem value={7}>Integrasi Pengolahan dan Diseminasi Statistik</MenuItem>
            </Select>
          </FormControl> */}
          <TextField
            value={values.pegawaiEmail}
            onChange={handleChange('pegawaiEmail')}
            autoFocus
            fullWidth
            id='email'
            label='Email/Username'
            sx={{}}
          />
          <FormControl fullWidth sx={{ marginTop: 4 }}>
            <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
            <OutlinedInput
              label='Password'
              value={values.pegawaiPassword}
              onChange={handleChange('pegawaiPassword')}
              id='auth-login-password'
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button
            onClick={handleTambah}
            type='submit'
            fullWidth
            size='medium'
            variant='contained'
            sx={{ marginTop: 4 }}
          >
            Tambah
          </Button>
        </form>
      </Card>
    </>
  )
}

export default PeopleAddViews
