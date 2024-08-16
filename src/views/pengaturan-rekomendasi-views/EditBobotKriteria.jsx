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
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import Link from '@mui/material/Link'

const CreateKegiatanPerusahaanViews = props => {
  const [pegawai, setPegawai] = useState(props.dataPegawai)
  const [mitra, setMitra] = useState(props.dataMitra)
  const [values, setValues] = useState({
    jumlahPekerjaan: pegawai.kriteria1,
    gajiBlnIni: pegawai.kriteria2,
    jumlahPekerjaanMitra: mitra.kriteria1,
    gajiBlnIniMitra: mitra.kriteria2
  })

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
    console.log(values)
  }

  const handleBobotKriteria = async e => {
    e.preventDefault()

    try {
      while (true) {
        const res = await axios.post('/pengaturan-rekomendasi', {
          kriteria1P: values.jumlahPekerjaan,
          kriteria2P: values.gajiBlnIni,
          kriteria1M: values.jumlahPekerjaanMitra,
          kriteria2M: values.gajiBlnIniMitra
        })

        if (res.status === 201) {
          Swal.fire({
            title: 'Ubah Bobot Kriteria Berhasil',
            text: 'Tekan OK untuk melanjutkan',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          }).then(router.push(`/pengaturan-rekomendasi`))

          setValues({
            kegNama: '',
            kegKetua: 0
          })
        }

        break
      }
    } catch (error) {
      Swal.fire({
        title: 'Ubah Bobot Kriteria Gagal',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  const router = useRouter()
  return (
    <Card>
      <form action='post' onSubmit={e => e.preventDefault()}>
        <Grid container spacing={4} sx={{ padding: '32px' }}>
          <Grid item xs={12}>
            <Typography variant='h3'>Ubah Bobot Kriteria Beban Kerja</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Kriteria Beban Kerja Pegawai</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              value={values.jumlahPekerjaan}
              onChange={handleChange('jumlahPekerjaan')}
              multiline
              label='Bobot Kriteria Jumlah Pekerjaan Pegawai'
              name='jumlahPekerjaan'
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              value={values.gajiBlnIni}
              onChange={handleChange('gajiBlnIni')}
              multiline
              label='Bobot Kriteria Gaji Bulan Ini Pegawai'
              name='gajiBlnIni'
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Kriteria Beban Kerja Mitra</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              value={values.jumlahPekerjaanMitra}
              onChange={handleChange('jumlahPekerjaanMitra')}
              multiline
              label='Bobot Kriteria Jumlah Pekerjaan Mitra'
              name='jumlahPekerjaanMitra'
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              value={values.gajiBlnIniMitra}
              onChange={handleChange('gajiBlnIniMitra')}
              multiline
              label='Bobot Kriteria Honor Mitra'
              name='gajiBlnIniMitra'
            />
          </Grid>
        </Grid>
        {/* <TableAddParticipant></TableAddParticipant> */}
        <Divider sx={{ margin: 0 }} />
        <Grid item m={4} display={'flex'} justifyContent={'end'}>
          <Button size='medium' type='submit' variant='contained' onClick={handleBobotKriteria}>
            Simpan
          </Button>
        </Grid>
      </form>
    </Card>
  )
}

export default CreateKegiatanPerusahaanViews
