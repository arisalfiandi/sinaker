// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

// Mui
import Button from '@mui/material/Button'
import { useState } from 'react'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'

import SendIcon from 'mdi-material-ui/Send'
import AccountIcon from 'mdi-material-ui/Account'

const CardTaskComent = props => {
  const [values, setValues] = useState({
    notesSubKeg: props.data.notes,
    target: props.data.target,
    realisasi: props.data.realisasi,
    id: props.data.id
  })

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
  }

  const handleSimpan = () => {
    console.log(values.notesSubKeg)
  }

  const handleNotes = e => {
    e.preventDefault()
    const data = {
      realisasi: parseInt(values.realisasi),
      notes: values.notesSubKeg,
      target: values.target
    }
    values.realisasi <= values.target
      ? axios
          .put(`/taskdetail/${values.id}`, data)
          .then(res => {
            Swal.fire({
              title: 'Success!',
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
  return (
    <>
      <Card sx={{ marginTop: 4 }}>
        {/* <CardHeader title='Nama Project' sx={{ color: 'primary.dark' }}></CardHeader> */}
        <form onSubmit={e => e.preventDefault()}>
          <Grid container p={4} spacing={2}>
            <Grid item md={1} display={'inline'}>
              <AccountIcon></AccountIcon>
            </Grid>
            <Grid item md={11} display={'inline'}>
              <Typography color={'primary.dark'} variant={'body1'}>
                Note
              </Typography>
            </Grid>
            <Grid mt={1} display={'flex'} justifyContent={'center'} item md={12}>
              <FormControl fullWidth sx={{ overflowY: 'auto' }}>
                <OutlinedInput
                  name='notesSubKeg'
                  value={values.notesSubKeg}
                  onChange={handleChange('notesSubKeg')}
                  minRows={3}
                  multiline
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        type='submit'
                        onClick={handleNotes}
                        edge='end'
                        aria-label='toggle password visibility'
                      >
                        <SendIcon></SendIcon>
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Card>
    </>
  )
}

export default CardTaskComent
