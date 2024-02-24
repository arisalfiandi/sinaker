// react import
import { useState, useEffect } from 'react'
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

import { DataGrid } from '@mui/x-data-grid'
import TableGroupPerusahaan from 'src/views/tables/TableGroupPerusahaan'

const CreateKegiatanPerusahaanViews = props => {
  const [participants, setParticipants] = useState({
    perusahaan: props.data[0].Perusahaangroup
  })
  //   console.log(participants)
  //   useEffect(() => {
  //     props.data.map(perusahaan => {
  //       setParticipants({ perusahaan: perusahaan.Perusahaangroup })
  //     })
  //   }, [])

  const [values, setValues] = useState({
    idGroup: 0,
    kegFungsi: 0,
    kegNama: ''
  })
  useEffect(() => {
    props.data.map(perusahaan => {
      console.log(perusahaan.fungsi)
      console.log('ini idnya : ' + perusahaan.id)
      setValues({ kegFungsi: perusahaan.fungsi, kegNama: perusahaan.nama, idGroup: perusahaan.id })
    })
  }, [])

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
  }

  const handleFungsiChange = event => {
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      kegFungsi: event.target.value // Perbarui nilai kegRentang
    }))
  }

  const handleDelete = async e => {
    e.preventDefault()

    Swal.fire({
      title: 'Delete Group?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#68B92E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete Group',
      cancelButtonText: 'No, Cancel',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .delete(`/group-perusahaan/${values.idGroup}`)
          .then(res => {
            Swal.fire('Deleted', 'Group has been deleted. ', 'success')

            router.push('/perusahaan-group-list')
          })
          .catch(err => {
            Swal.fire('Error', 'Something went wrong. Please try again.', 'error')
          })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelled!', ' Press "OK" to continue.', 'error')
      }
    })
    // try {
    //   while (true) {
    //     const res = await axios.post('/perusahaan', {
    //       nama: values.kegNama,
    //       fungsi: values.kegFungsi,
    //       participants: participants
    //     })

    //     if (res.status === 201) {
    //       Swal.fire({
    //         title: 'Create Group Perusahaan Success',
    //         text: 'Press OK to continue',
    //         icon: 'success',
    //         confirmButtonColor: '#68B92E',
    //         confirmButtonText: 'OK'
    //       })

    //       setValues({
    //         kegNama: ''
    //       })
    //     }

    //     break
    //   }
    // } catch (error) {
    //   Swal.fire({
    //     title: 'Create Group Perusahaan Failed',
    //     text: error,
    //     icon: 'error',
    //     confirmButtonColor: '#d33',
    //     confirmButtonText: 'OK'
    //   })
    // }
  }

  const router = useRouter()
  return (
    <Card>
      <form action='post' onSubmit={e => e.preventDefault()}>
        <Grid container spacing={4} sx={{ padding: '32px' }}>
          <Grid item xs={12}>
            <Typography variant='h5'>Buat Group Kegiatan Perusahan</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              value={values.kegNama}
              onChange={handleChange('kegNama')}
              multiline
              label='Nama Group Kegiatan Perusahaan'
              name='namaKegiatan'
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-helper-label'>Fungsi</InputLabel>
              <Select
                disabled
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
          <Divider></Divider>
          <Grid item xs={12}>
            <TableGroupPerusahaan data={participants}></TableGroupPerusahaan>
          </Grid>
        </Grid>
        {/* <TableAddParticipant></TableAddParticipant> */}
        <Divider sx={{ margin: 0 }} />
        <Grid item m={4} display={'flex'} justifyContent={'end'}>
          <Button color={'error'} size='medium' type='submit' variant='contained' onClick={handleDelete}>
            Hapus Group Perusahaan
          </Button>
        </Grid>
      </form>
    </Card>
  )
}

export default CreateKegiatanPerusahaanViews
