// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

// ** MUI Components
import Grid from '@mui/material/Grid'
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

const PerusahaanAddViews = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const [values, setValues] = useState({
    perusahaanKip: '',
    perusahaanNama: '',
    perusahaanNamaD: '',
    perusahaanNamaK: '',
    perusahaanDesa: '',
    perusahaanKecamatan: '',
    perusahaanAlamat: ''
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

  // const handleTambah = () => {
  //   console.log(values)
  //   router.push('/pegawai')
  // }

  const handleAddPerusahaan = async e => {
    e.preventDefault()

    try {
      while (true) {
        const res = await axios.post('/perusahaan/add', {
          kip: values.perusahaanKip,
          nama: values.perusahaanNama.toUpperCase(),
          namaDesa: values.perusahaanNamaD.toUpperCase(),
          namaKec: values.perusahaanNamaK.toUpperCase(),
          desa: values.perusahaanDesa,
          kecamatan: values.perusahaanKecamatan,
          alamat: values.perusahaanAlamat
        })

        if (res.status === 201) {
          Swal.fire({
            title: 'Tambah Perusahaan Berhasil',
            text: '',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          })

          setValues({
            perusahaanKip: '',
            perusahaanNama: '',
            perusahaanNamaD: '',
            perusahaanNamaK: '',
            perusahaanDesa: '',
            perusahaanKecamatan: '',
            perusahaanAlamat: ''
          })
        }

        break
      }
    } catch (error) {
      Swal.fire({
        title: 'Tambah Perusahaan Gagal',
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
            Tambah Perusahaan
          </Typography>
          <Typography variant='body2'>Fill this blank field below</Typography>
        </Box>
        <form noValidate autoComplete='off' onSubmit={handleAddPerusahaan}>
          <FormControl fullWidth>
            <TextField
              value={values.perusahaanNama}
              onChange={handleChange('perusahaanNama')}
              autoFocus
              fullWidth
              name='nama'
              id='nama'
              label='Nama Perusahaan'
              sx={{ marginBottom: 4 }}
              inputProps={{ style: { textTransform: 'uppercase' } }}
            />
          </FormControl>
          <TextField
            name='NIP'
            value={values.perusahaanKip}
            onChange={handleChange('perusahaanKip')}
            autoFocus
            fullWidth
            type={'number'}
            id='nip'
            label='KIP'
            sx={{ marginBottom: 4 }}
          />
          <Grid container spacing={4}>
            <Grid item md={6}>
              <TextField
                value={values.perusahaanDesa}
                onChange={handleChange('perusahaanDesa')}
                autoFocus
                fullWidth
                type={'number'}
                id='nip'
                label='Kode Desa'
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                value={values.perusahaanKecamatan}
                onChange={handleChange('perusahaanKecamatan')}
                autoFocus
                fullWidth
                type={'number'}
                label='Kode Kecamatan'
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                value={values.perusahaanNamaD}
                onChange={handleChange('perusahaanNamaD')}
                autoFocus
                fullWidth
                name='nama'
                id='nama'
                label='Nama Desa'
                sx={{ marginBottom: 4 }}
                inputProps={{ style: { textTransform: 'uppercase' } }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                value={values.perusahaanNamaK}
                onChange={handleChange('perusahaanNamaK')}
                autoFocus
                fullWidth
                name='nama'
                id='nama'
                label='Nama Kecamtan'
                sx={{ marginBottom: 4 }}
                inputProps={{ style: { textTransform: 'uppercase' } }}
              />
            </Grid>
          </Grid>
          <TextField
            value={values.perusahaanAlamat}
            onChange={handleChange('perusahaanAlamat')}
            autoFocus
            fullWidth
            multiline
            minRows={3}
            id='email'
            label='Alamat Perusahaan'
            sx={{}}
          />

          <Button
            onClick={handleAddPerusahaan}
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

export default PerusahaanAddViews
