// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

// router
import { useRouter } from 'next/dist/client/router'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// tab
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import KeyOutline from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const AccountViews = props => {
  const [value, setValue] = useState('1')
  const router = useRouter()
  const handleChangeTab = (event, newValue) => {
    setValue(newValue)
  }
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)

      reader.readAsDataURL(files[0])
    }
  }

  const [values, setValues] = useState({
    id: props.data.id,
    pName: props.data.name,
    pPassword: props.data.password,
    pEmail: props.data.email,
    pRole: props.data.role,
    pNip: props.data.nip,
    newPassword: '',
    currentPassword: props.data.password,
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })
  console.log(values)

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
  }

  const handleRentangChange = event => {
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      pRole: event.target.value // Perbarui nilai kegRentang
    }))
  }

  // Handle Current Password
  const handleCurrentPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }
  const handleMouseDownCurrentPassword = event => {
    event.preventDefault()
  }

  // Handle New Password
  const handleNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }
  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }
  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }

  const handleSimpan = e => {
    e.preventDefault()
    const data = {
      id: values.id,
      name: values.pName,
      email: values.pEmail,
      password: values.pPassword,
      newPassword: values.newPassword,
      confirmNewPassword: values.confirmNewPassword,
      nip: values.pNip,
      role: values.pRole
    }
    axios
      .put(`/account/${values.id}`, data)
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
          text: err,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
  }

  return (
    <Card>
      <CardContent>
        <TabContext value={value}>
          <TabList variant='fullWidth' onChange={handleChangeTab} aria-label='card navigation example'>
            <Tab value='1' label='Informasi Akun' />
            <Tab value='2' label='Ganti Password' />
          </TabList>
          <TabPanel value='1' sx={{ p: 0, height: 570 }}>
            <form>
              <Grid container spacing={7}>
                <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ImgStyled src={imgSrc} alt='Profile Pic' />
                    <Box>
                      {/* <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled> */}
                      <Typography variant='body2' sx={{ marginTop: 5 }}></Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Username' value={values.pName} onChange={handleChange('pName')} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Name' onChange={handleChange('pName')} value={values.pName} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='email'
                    label='Email'
                    value={values.pEmail}
                    onChange={handleChange('pEmail')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* <FormControl disabled fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select label='Role' defaultValue='admin'>
                      <MenuItem value='admin'>Admin</MenuItem>
                      <MenuItem value='author'>Author</MenuItem>
                      <MenuItem value='editor'>Editor</MenuItem>
                      <MenuItem value='maintainer'>Maintainer</MenuItem>
                      <MenuItem value='subscriber'>Subscriber</MenuItem>
                    </Select>
                  </FormControl> */}
                  <FormControl fullWidth disabled>
                    <InputLabel id='demo-simple-select-helper-label'>Role</InputLabel>
                    <Select
                      fullWidth
                      labelId='demo-simple-select-helper-label'
                      value={values.pRole}
                      onChange={handleRentangChange}
                      label='Role'
                      name='role'
                    >
                      <MenuItem value='kepalaBps'>Kepala BPS</MenuItem>
                      <MenuItem value='admin'>admin</MenuItem>
                      <MenuItem value='teamleader'>PJK</MenuItem>
                      <MenuItem value='employee'>Pegawai</MenuItem>
                      <MenuItem value='verifikator'>Verifikator</MenuItem>
                      <MenuItem value='ppspm'>PPSPM</MenuItem>
                      <MenuItem value='bendahara'>Bendahara</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField fullWidth label='NIP' onChange={handleChange('pNip')} value={values.pNip} />
                </Grid>

                <Grid item xs={12}>
                  <Button onClick={handleSimpan} variant='contained' sx={{ marginRight: 3.5 }}>
                    Simpan Perubahan
                  </Button>
                </Grid>
              </Grid>
            </form>
          </TabPanel>
          <TabPanel value='2' sx={{ p: 0, height: 370 }}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password'>Current Password</InputLabel>
                  <OutlinedInput
                    label='Current Password'
                    value={values.pPassword}
                    id='account-settings-current-password'
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    onChange={handleChange('pPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownCurrentPassword}
                        >
                          {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 6 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
                  <OutlinedInput
                    label='New Password'
                    value={values.newPassword}
                    id='account-settings-new-password'
                    onChange={handleNewPasswordChange('newPassword')}
                    type={values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowNewPassword}
                          aria-label='toggle password visibility'
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm New Password</InputLabel>
                  <OutlinedInput
                    label='Confirm New Password'
                    value={values.confirmNewPassword}
                    id='account-settings-confirm-new-password'
                    type={values.showConfirmNewPassword ? 'text' : 'password'}
                    onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownConfirmNewPassword}
                        >
                          {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={
                    values.newPassword == '' ||
                    values.confirmNewPassword == '' ||
                    values.newPassword != values.confirmNewPassword
                      ? true
                      : false
                  }
                  onClick={handleSimpan}
                  variant='contained'
                  sx={{ marginRight: 3.5 }}
                >
                  Ganti Password
                </Button>
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default AccountViews
