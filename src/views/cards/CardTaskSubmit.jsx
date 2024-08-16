// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

// MUI
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'

import { useState } from 'react'

const CardTaskSubmit = props => {
  const [values, setValues] = useState({
    id: props.data.id,
    target: props.data.target,
    realisasi: props.data.realisasi,
    notes: props.data.notes
  })

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
  }

  const handleSimpan = e => {
    const data = {
      realisasi: parseInt(values.realisasi),
      notes: values.notesSubKeg,
      target: parseInt(values.target)
    }
    values.realisasi <= values.target
      ? axios
          .put(`/taskdetail/${values.id}`, data)
          .then(res => {
            Swal.fire({
              title: '',
              text: 'Berhasil disimpan',
              icon: 'success',
              confirmButtonText: 'Ok'
            })
          })
          .catch(err => {
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          })
      : Swal.fire({
          title: 'Error!',
          text: 'Realisasi lebih besar dari target',
          icon: 'error',
          confirmButtonText: 'Ok'
        }).then(
          setValues(values => ({
            ...values, // Pertahankan nilai properti lainnya
            realisasi: values.target // Perbarui nilai kegRentang
          }))
        )
  }

  const s = () => {
    console.log(values.realisasi)
    console.log(values.target)
    console.log(values.id)
    console.log(values.notes)
  }
  return (
    <>
      <Card>
        {/* <CardHeader title='Nama Project' sx={{ color: 'primary.dark' }}></CardHeader> */}
        <form onSubmit={e => e.preventDefault()}>
          <Grid container p={4}>
            <Grid item xs={12} md={12}>
              <Typography color={'primary.dark'} variant={'h5'}>
                Pekerjaan Anda
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} mt={2} display={'flex'} alignItems={'start'}>
              <Typography variant={'body2'}>Unit Target: {props.data.unitTarget}</Typography>
            </Grid>
            <Grid item xs={12} md={12} mt={3}>
              <TextField
                value={values.realisasi}
                size='small'
                fullWidth
                type={'number'}
                label='Realisasi'
                onChange={handleChange('realisasi')}
                placeholder='Realisasi'
              />
            </Grid>

            <Grid item xs={12} md={12} mt={2}>
              <TextField
                value={values.target}
                size='small'
                fullWidth
                multiline
                label='Target'
                type={'number'}
                onChange={handleChange('target')}
                placeholder='Target'
              />
            </Grid>

            {/* <Grid mt={3} display={'flex'} justifyContent={'center'} item xs={12} md={12}>
            <Box
              width={'100%'}
              sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1 }}
              height={120}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              bgcolor={'grey.200'}
            >
              <Typography variant={'body2'}>File</Typography>
            </Box>
          </Grid> */}
            {/* <Grid justifyContent={'center'} mt={2} item xs={12} md={12}>
            <Button variant={'contained'} fullWidth>
              Submit
            </Button>
          </Grid> */}
            <Grid container spacing={3}>
              <Grid justifyContent={'center'} mt={2} item xs={12} md={12}>
                <Button type='submit' variant={'contained'} onClick={handleSimpan} fullWidth>
                  Simpan
                </Button>
              </Grid>
              {/* <Grid justifyContent={'center'} mt={2} item xs={12} md={6}>
              <Button variant={'contained'} fullWidth>
                Revisi
              </Button>
            </Grid> */}
            </Grid>
          </Grid>
        </form>
      </Card>
    </>
  )
}

export default CardTaskSubmit
