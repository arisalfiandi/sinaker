// react import
import { useState, forwardRef, useEffect } from 'react'
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
import { useRouter } from 'next/dist/client/router'
import { Autocomplete } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { pink } from '@mui/material/colors'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import { DataGrid } from '@mui/x-data-grid'

import TableAddParticipant from 'src/views/tables/TableAddParticipant'
import TimelineKegiatan from 'src/views/form-layouts/TimelineKegiatan'

const CustomInputStart = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Tanggal Mulai' autoComplete='on' />
})

const CustomInputEnd = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Tanggal Berakhir' autoComplete='off' />
})

const CreateProjectViews = props => {
  const [dataUser, setDataUser] = useState(props.data)
  const [dataPengguna, setDataPengguna] = useState(
    props.data.map(siyap => ({
      id: siyap.id,
      label: siyap.name
    }))
  )
  const [timKerja, setTimKerja] = useState(props.dataTim)
  const [anggota, setAnggota] = useState(0)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDateE, setSelectedDateE] = useState(null)
  const [disabled, setDisabled] = useState({
    jan: false,
    feb: false,
    mar: false,
    apr: false,
    may: false,
    june: false,
    july: false,
    aug: false,
    sep: false,
    oct: false,
    nov: false,
    dec: false
  })
  const [values, setValues] = useState({
    kegNama: '',
    kegRentang: '',
    kegGajiPml: '',
    kegGajiPcl: '',
    kegFungsi: 7,
    kegDesk: '',
    kegTim: '',
    kegAnggotaId: '',
    kegAnggota: [dataUser[3].name, dataUser[1].name],
    kegKetuaId: '',
    kegJumlah: 0,
    kegBulan: 0
  })
  const [bulan, setBulan] = useState({
    jan: false,
    feb: false,
    mar: false,
    apr: false,
    may: false,
    june: false,
    july: false,
    aug: false,
    sep: false,
    oct: false,
    nov: false,
    dec: false
  })

  // transform bulan bulan ke array date, nyaring mana aja yang true
  useEffect(() => {
    const jumlahTrue = Object.values(bulan).filter(value => value === true).length
    const bulanTrue = Object.keys(bulan)
      .filter(key => bulan[key])
      .map(key => {
        const monthNumber = (() => {
          switch (key) {
            case 'jan':
              return 0
            case 'feb':
              return 1
            case 'mar':
              return 2
            case 'apr':
              return 3
            case 'may':
              return 4
            case 'june':
              return 5
            case 'july':
              return 6
            case 'aug':
              return 7
            case 'sep':
              return 8
            case 'oct':
              return 9
            case 'nov':
              return 10
            case 'dec':
              return 11
            default:
              return null
          }
        })()

        if (monthNumber !== null) {
          const firstDateOfMonth = new Date(new Date().getFullYear(), monthNumber, 2)
          const lastDateOfMonth = new Date(new Date().getFullYear(), monthNumber + 1, 0) // Last day of the month
          return { firstDate: firstDateOfMonth, lastDate: lastDateOfMonth }
        } else {
          return null
        }
      })
      .filter(date => date !== null)

    console.log('Tanggal pertama dan terakhir bulan yang memiliki nilai true:', bulanTrue)
    setValues({ ...values, kegJumlah: jumlahTrue, kegBulan: bulanTrue })
  }, [bulan])

  // coba asal bre,
  // useEffect(() => {
  //   const nilai = Object.values(bulan)
  //   const kunci = Object.keys(bulan)
  //   console.log(kunci)
  //   const tmpJmlh = 0
  //   const tmpBln = []
  //   nilai.map(n => {
  //     n === true ? (tmpJmlh = tmpJmlh + 1) : 0
  //   })

  //   setValues({ ...values, kegJumlah: tmpJmlh })
  // }, [bulan])

  // buat nyimpen di [values] dari input pilih tim kerja sama anggota tim (intinya handle tim dan anggotanya)
  useEffect(() => {
    const dataAnggota = {}
    const dataAnggotaId = []
    const ketuaTimId = 0

    timKerja.map(data => {
      data.id === values.kegTim ? (dataAnggota = data.timKerjaPegawai) : 0
    })

    timKerja.map(data => {
      data.id === values.kegTim ? (ketuaTimId = data.ketuaTim) : 0
    })

    if (Object.keys(dataAnggota).length > 0) {
      dataAnggota.map(member => {
        dataAnggotaId.push(member.userId)
      })
    }

    const userNames = dataUser
      .map(pengguna => (dataAnggotaId.includes(parseInt(pengguna.id)) ? pengguna.name : null))
      .filter(id => id !== null)

    // const userIds = dataUser
    //   .map(pengguna => (dataAnggotaId.includes(parseInt(pengguna.id)) ? pengguna.id : null))
    //   .filter(id => id !== null)

    setValues({ ...values, kegAnggota: userNames, kegKetuaId: ketuaTimId })
  }, [values.kegTim])

  // masih nyambung sama atas, input autocomplete cuma handle berdasar dropdown tim kerja,
  // disini diatur lagi kalo misal ada inputan pegawai lain di luar anggota tim
  useEffect(() => {
    const tmpId = []
    const testId = dataUser.map(itemB => {
      // Periksa apakah nama pada itemB ada di arrayA
      if (values.kegAnggota.includes(itemB.name)) {
        // Jika ada, kembalikan id itemB
        tmpId.push(itemB.id)
      }
    })

    // console.log(tmpId)
    setValues({ ...values, kegAnggotaId: tmpId })
  }, [values.kegAnggota])

  // nguubah semua checkbox bulan jadi uncheked / checked
  useEffect(() => {
    setBulan(prevBulan => {
      // nguubah semua checkbox bulan jadi uncheked
      const newBulan = {}
      Object.keys(prevBulan).map(key => {
        newBulan[key] = false
      })
      return newBulan
    })

    let tmp = values.kegRentang
    tmp === 59
      ? setBulan(prevBulan => {
          // nguubah semua checkbox bulan jadi checked karena periode bulanan
          const newBulan = {}
          Object.keys(prevBulan).map(key => {
            newBulan[key] = true
          })
          return newBulan
        })
      : 0
  }, [values.kegRentang])

  // buat ngatur checkbox bulan bisa di isi berapa aja berdasar input periode
  useEffect(() => {
    let tmp = values.kegRentang

    const bulanValues = Object.values(bulan) // pake object.values buat dapetin nilai dari masing masing key, kalo dapetin keynya ada apa aja pake object.key
    const bulanKeys = Object.keys(bulan)
    const bulanentries = Object.entries(bulan)

    const newBulanFalse = bulanentries.reduce((acc, apalah) => {
      if (!apalah[1]) {
        acc.push(apalah[0])
      }
      return acc
    }, [])

    const newBulanTrue = bulanentries.reduce((acc, apalah) => {
      if (apalah[1]) {
        acc.push(apalah[0])
      }
      return acc
    }, [])

    // newBulanFalse skrg isiny daftar key bulan yang  false
    // console.log(newBulanFalse)

    const bulanTrueValues = bulanValues.filter(value => value === true)
    const jumlahBulanTrue = bulanTrueValues.length

    jumlahBulanTrue == 0
      ? setDisabled(prevState => {
          const newState = {}
          for (const key in prevState) {
            newState[key] = false
          }
          return newState
        })
      : tmp === 60 && jumlahBulanTrue < 4
      ? newBulanFalse.map(idx => {
          setDisabled(prevState => ({
            ...prevState,
            [idx]: false // Ubah nilai hanya untuk bulan November
          }))
        })
      : tmp === 61 && jumlahBulanTrue < 2
      ? newBulanFalse.map(idx => {
          setDisabled(prevState => ({
            ...prevState,
            [idx]: false // Ubah nilai hanya untuk bulan November
          }))
        })
      : 0

    tmp === 62 && jumlahBulanTrue == 1
      ? newBulanFalse.map(idx => {
          setDisabled(prevState => ({
            ...prevState,
            [idx]: true // Ubah nilai hanya untuk bulan November
          }))
        })
      : 0

    tmp === 60 && jumlahBulanTrue >= 4
      ? newBulanFalse.map(idx => {
          setDisabled(prevState => ({
            ...prevState,
            [idx]: true // Ubah nilai hanya untuk bulan November
          }))
        })
      : 0

    tmp === 61 && jumlahBulanTrue >= 2
      ? newBulanFalse.map(idx => {
          setDisabled(prevState => ({
            ...prevState,
            [idx]: true // Ubah nilai hanya untuk bulan November
          }))
        })
      : 0
  }, [bulan])

  const handleChangeBulan = event => {
    setBulan({
      ...bulan,
      [event.target.name]: event.target.checked
    })
    // console.log(bulan)
  }

  const handleDateChange = date => {
    setSelectedDate(date)
    // console.log(date)
  }
  const handleDateChangeE = date => {
    setSelectedDateE(date)
    // console.log(date)
  }

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
    // console.log(values)
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
      kegTim: event.target.value // Perbarui nilai kegRentang
    }))
  }
  // handle submit disini
  const handleProject = async e => {
    e.preventDefault()

    try {
      while (true) {
        const res = await axios.post('/project', {
          title: values.kegNama,
          rentangWaktu: values.kegRentang.toString(),
          startdate: selectedDate,
          enddate: selectedDateE,
          bulan,
          fungsi: values.kegFungsi,
          description: values.kegDesk,
          projectLeaderId: values.kegKetuaId,
          anggotaTimId: values.kegAnggotaId,
          createdById: 99,
          jumlahKegiatan: values.kegJumlah,
          bulanKegiatan: values.kegBulan
        })

        if (res.status === 201) {
          Swal.fire({
            title: 'Create Project Success',
            text: 'Press OK to continue',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          }).then(router.push('/project-list'))

          setValues({
            kegNama: '',
            kegRentang: '',
            kegGajiPml: '',
            kegGajiPcl: '',
            kegFungsi: '',
            kegDesk: '',
            kegTim: '',
            kegAnggotaId: '',
            kegAnggota: [dataUser[3].name, dataUser[1].name],
            kegKetuaId: ''
          })

          setSelectedDate(new Date())
          setSelectedDateE(null)
        }

        break
      }
    } catch (error) {
      Swal.fire({
        title: 'Create Project Failed',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  let button
  button = (
    <>
      {/* <input accept='image/*' style={{ display: 'none' }} id='raised-button-file' multiple type='file' />
      <label htmlFor='raised-button-file'>
        <Button onClick={handleSubmitFile} size='medium' sx={{ mr: 2 }} variant='contained' component='span'>
          Browse
        </Button>
      </label> */}
      <TimelineKegiatan dataMeet={props.dataRapat}></TimelineKegiatan>
    </>
  )

  const router = useRouter()
  return (
    <Card>
      <form action='post' onSubmit={e => e.preventDefault()}>
        <Grid container spacing={4} sx={{ padding: '32px' }}>
          <Grid item xs={12}>
            <Typography variant='h5'>Buat Kegiatan</Typography>
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
                label='Rentang Waktu'
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
          <Grid item xs={12} md={12} sx={{ backgroundColor: 'primary' }}>
            <FormGroup row>
              <FormControlLabel
                value='Januari'
                control={
                  <Checkbox disabled={disabled.jan} checked={bulan.jan} onChange={handleChangeBulan} name='jan' />
                }
                label='Jan'
                labelPlacement='top'
              />
              <FormControlLabel
                value='Februari'
                control={
                  <Checkbox disabled={disabled.feb} checked={bulan.feb} onChange={handleChangeBulan} name='feb' />
                }
                label='Feb'
                labelPlacement='top'
              />
              <FormControlLabel
                value='Maret'
                control={
                  <Checkbox disabled={disabled.mar} checked={bulan.mar} onChange={handleChangeBulan} name='mar' />
                }
                label='Mar'
                labelPlacement='top'
              />
              <FormControlLabel
                value='April'
                control={
                  <Checkbox disabled={disabled.apr} checked={bulan.apr} onChange={handleChangeBulan} name='apr' />
                }
                label='Apr'
                labelPlacement='top'
              />
              <FormControlLabel
                value='Mei'
                control={
                  <Checkbox disabled={disabled.may} checked={bulan.may} onChange={handleChangeBulan} name='may' />
                }
                label='May'
                labelPlacement='top'
              />
              <FormControlLabel
                value='Juni'
                control={
                  <Checkbox disabled={disabled.june} checked={bulan.june} onChange={handleChangeBulan} name='june' />
                }
                label='June'
                labelPlacement='top'
              />
              <FormControlLabel
                value='Juli'
                control={
                  <Checkbox disabled={disabled.july} checked={bulan.july} onChange={handleChangeBulan} name='july' />
                }
                label='July'
                labelPlacement='top'
              />
              <FormControlLabel
                value='Agustus'
                control={
                  <Checkbox disabled={disabled.aug} checked={bulan.aug} onChange={handleChangeBulan} name='aug' />
                }
                label='Aug'
                labelPlacement='top'
              />
              <FormControlLabel
                value='September'
                control={
                  <Checkbox disabled={disabled.sep} checked={bulan.sep} onChange={handleChangeBulan} name='sep' />
                }
                label='Sep'
                labelPlacement='top'
              />
              <FormControlLabel
                value='Oktober'
                control={
                  <Checkbox disabled={disabled.oct} checked={bulan.oct} onChange={handleChangeBulan} name='oct' />
                }
                label='Oct'
                labelPlacement='top'
              />
              <FormControlLabel
                value='November'
                control={
                  <Checkbox disabled={disabled.nov} checked={bulan.nov} onChange={handleChangeBulan} name='nov' />
                }
                label='Nov'
                labelPlacement='top'
              />
              <FormControlLabel
                value='Desember'
                control={
                  <Checkbox disabled={disabled.dec} checked={bulan.dec} onChange={handleChangeBulan} name='dec' />
                }
                label='Dec'
                labelPlacement='top'
              />
            </FormGroup>
          </Grid>

          {/* <Grid item xs={12} sm={12} lg={12}>
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
          </Grid> */}

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              label='Deskripsi Kegiatan'
              placeholder='Description'
              value={values.kegDesk}
              onChange={handleChange('kegDesk')}
              name='kegaitanDesk'
            />
          </Grid>

          {/* <Grid item xs={12} sm={12} lg={6}>
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

          <Grid item xs={12} sm={12} lg={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={selectedDateE}
                sx={{ width: 1000 }}
                showYearDropdown
                showMonthDropdown
                placeholderText='Tanggal Berakhir'
                value={selectedDateE}
                onChange={handleDateChangeE}
                dateFormat='dd/MM/yyyy'
                className='custom-datepicker'
                customInput={<CustomInputEnd />}
                name='tanggalBerakhir'
              />
            </DatePickerWrapper>
          </Grid> */}
          <Grid item xs={12} md={12}>
            {/* <Typography variant='h6' sx={{ py: '5px' }}>
              Penanggung Jawab Kegiatan
            </Typography> */}

            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-helper-label'>Penanggung Jawab</InputLabel>
              <Select
                fullWidth
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={values.kegTim}
                onChange={handlePJ}
                label='Penanggung Jawab'
                name='penanggungJawab'
              >
                {timKerja.map(item => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.nama} - {item.userId_fkey.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Autocomplete
              multiple
              // options={dataUser}
              id='tags-filled'
              value={values.kegAnggota}
              // options={dataPengguna}
              options={dataUser.map(data => data.name)}
              onChange={(event, newValue) => {
                setValues({ ...values, kegAnggota: newValue })
              }}
              filterSelectedOptions
              renderTags={(value, getTagProps) =>
                value.map((option, index) => <Chip variant='outlined' label={option} {...getTagProps({ index })} />)
              }
              renderInput={params => (
                <TextField {...params} variant='outlined' label='Anggota Tim' placeholder='Tambah Anggota Tim' />
              )}
            />
          </Grid>

          <Grid item xs={12} height={220}>
            <Card sx={{ backgroundColor: '#F4F4F4', borderSpacing: 50, border: '4px dashed #E7E7E7' }}>
              <CardContent sx={{ height: 210, textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                {/* <Grid container display={'flex'} justifyContent={'center'}>
                        <Grid display={'flex'} justifyContent={'center'} item xs={12}>
                          <IconButton>
                            <CloudUploadRoundedIcon sx={{ fontSize: 100 }} size={'large'}></CloudUploadRoundedIcon>
                          </IconButton>
                        </Grid>
                        <Grid display={'flex'} justifyContent={'center'} item xs={12}>
                          <Typography>Upload your files here!</Typography>
                        </Grid>
                      </Grid> */}
                <Grid display={'flex'} justifyContent={'center'} item xs={12}>
                  {button}
                </Grid>
              </CardContent>
              <CardActions className='card-action-dense'></CardActions>
            </Card>
          </Grid>
        </Grid>
        {/* <TableAddParticipant></TableAddParticipant> */}
        <Divider sx={{ margin: 0 }} />
        <Grid item m={4} display={'flex'} justifyContent={'end'}>
          <Button size='medium' type='submit' variant='contained' onClick={handleProject}>
            Buat Kegiatan
          </Button>
        </Grid>
      </form>
    </Card>
  )
}

export default CreateProjectViews
