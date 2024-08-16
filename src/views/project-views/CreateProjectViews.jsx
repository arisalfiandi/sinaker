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
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import { DataGrid } from '@mui/x-data-grid'

import TableAddParticipant from 'src/views/tables/TableAddParticipant'
import TimelineKegiatan from 'src/views/form-layouts/TimelineKegiatan'
import { EmailSearch } from 'mdi-material-ui'

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
  const [isiAll, setIsiAll] = useState('0')
  const [anggota, setAnggota] = useState(0)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDateE, setSelectedDateE] = useState(null)
  const [fieldFilled, setFieldFilled] = useState({})
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
    kegBulan: 0,
    jumlahSubKeg: 0
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

  const [subKeg, setSubKeg] = useState({
    pelatihan: false,
    persiapan: false,
    listing: false,
    pencacahan: false,
    pengolahanEntri: false,
    pengolahanValidasi: false,
    diseminasi: false,
    evaluasi: false
  })
  const [namaSubKeg, setNamaSubKeg] = useState([])

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

    setValues({ ...values, kegJumlah: jumlahTrue, kegBulan: bulanTrue })
  }, [bulan])

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
  }

  const handleDateChange = date => {
    setSelectedDate(date)
  }
  const handleDateChangeE = date => {
    setSelectedDateE(date)
  }

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
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

  useEffect(() => {
    setFieldFilled({
      ...fieldFilled,
      fieldNama: values.kegNama,
      fieldPeriode: values.kegRentang,
      fieldTim: values.kegKetuaId,
      fieldAnggota: values.kegAnggotaId,
      fieldBulan: values.kegBulan
    })
  }, [values])

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

  const handleChangeSubKeg = event => {
    setSubKeg({
      ...subKeg,
      [event.target.name]: event.target.checked
    })
  }

  useEffect(() => {
    const subKegValues = Object.values(subKeg)
    const subKegTrueValues = subKegValues.filter(value => value === true)
    const jumlahSubKegTrue = subKegTrueValues.length
    setValues({ ...values, jumlahSubKeg: jumlahSubKegTrue })
  }, [subKeg])

  useEffect(() => {
    const entries = Object.entries(subKeg)

    const trueEntries = entries.filter(([key, value]) => value === true)

    const trueKeys = trueEntries.map(([key]) => key)

    setNamaSubKeg(trueKeys)
  }, [subKeg])

  useEffect(() => {
    const allFilled = Object.values(fieldFilled).every(
      value =>
        (typeof value === 'string' && value.trim() !== '') ||
        (Array.isArray(value) && value.length > 0) ||
        (typeof value === 'number' && value !== null)
    )
    setIsiAll(allFilled ? '1' : '0')
  }, [fieldFilled])

  console.log(isiAll)
  console.log(fieldFilled)
  const handleProject = async e => {
    e.preventDefault()

    try {
      while (true) {
        if (isiAll == '1') {
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
            bulanKegiatan: values.kegBulan,
            subKeg: namaSubKeg,
            jumlahSubKeg: values.jumlahSubKeg
          })

          if (res.status === 201) {
            Swal.fire({
              title: 'Kegiatan berhasil dibuat',
              text: '',
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
        } else {
          Swal.fire({
            title: 'Form belum lengkap',
            text: 'Pastikan semua field telah terisi',
            icon: 'warning',
            confirmButtonColor: 'warning.main',
            confirmButtonText: 'OK'
          })
        }

        break
      }
    } catch (error) {
      Swal.fire({
        title: 'Kegiatan gagal dibuat',
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
              placeholder='SUSENAS/SAKERNAS/dll.'
              name='namaKegiatan'
            />
          </Grid>
          <Grid item xs={6}>
            <FormLabel component='legend'>Bulan Kegiatan</FormLabel>
            <FormGroup sx={{ minHeight: 150, padding: 2, border: 1, borderColor: '#DCDCDC', borderRadius: 1 }} row>
              <FormControlLabel
                value='Januari'
                control={
                  <Checkbox disabled={disabled.jan} checked={bulan.jan} onChange={handleChangeBulan} name='jan' />
                }
                label='Jan'
                labelPlacement='right'
              />
              <FormControlLabel
                value='Februari'
                control={
                  <Checkbox disabled={disabled.feb} checked={bulan.feb} onChange={handleChangeBulan} name='feb' />
                }
                label='Feb'
                labelPlacement='right'
              />
              <FormControlLabel
                value='Maret'
                control={
                  <Checkbox disabled={disabled.mar} checked={bulan.mar} onChange={handleChangeBulan} name='mar' />
                }
                label='Mar'
                labelPlacement='right'
              />
              <FormControlLabel
                value='April'
                control={
                  <Checkbox disabled={disabled.apr} checked={bulan.apr} onChange={handleChangeBulan} name='apr' />
                }
                label='Apr'
                labelPlacement='right'
              />
              <FormControlLabel
                value='Mei'
                control={
                  <Checkbox disabled={disabled.may} checked={bulan.may} onChange={handleChangeBulan} name='may' />
                }
                label='May'
                labelPlacement='right'
              />
              <FormControlLabel
                value='Juni'
                control={
                  <Checkbox disabled={disabled.june} checked={bulan.june} onChange={handleChangeBulan} name='june' />
                }
                label='June'
                labelPlacement='right'
              />
              <FormControlLabel
                value='Juli'
                control={
                  <Checkbox disabled={disabled.july} checked={bulan.july} onChange={handleChangeBulan} name='july' />
                }
                label='July'
                labelPlacement='right'
              />
              <FormControlLabel
                value='Agustus'
                control={
                  <Checkbox disabled={disabled.aug} checked={bulan.aug} onChange={handleChangeBulan} name='aug' />
                }
                label='Aug'
                labelPlacement='right'
              />
              <FormControlLabel
                value='September'
                control={
                  <Checkbox disabled={disabled.sep} checked={bulan.sep} onChange={handleChangeBulan} name='sep' />
                }
                label='Sep'
                labelPlacement='right'
              />
              <FormControlLabel
                value='Oktober'
                control={
                  <Checkbox disabled={disabled.oct} checked={bulan.oct} onChange={handleChangeBulan} name='oct' />
                }
                label='Oct'
                labelPlacement='right'
              />
              <FormControlLabel
                value='November'
                control={
                  <Checkbox disabled={disabled.nov} checked={bulan.nov} onChange={handleChangeBulan} name='nov' />
                }
                label='Nov'
                labelPlacement='right'
              />
              <FormControlLabel
                value='Desember'
                control={
                  <Checkbox disabled={disabled.dec} checked={bulan.dec} onChange={handleChangeBulan} name='dec' />
                }
                label='Dec'
                labelPlacement='right'
              />
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormLabel component='legend'>Sub Kegiatan</FormLabel>
            <FormGroup sx={{ minHeight: 150, padding: 2, border: 1, borderColor: '#DCDCDC', borderRadius: 1 }} row>
              <FormControlLabel
                name='pelatihan'
                onChange={handleChangeSubKeg}
                labelPlacement='right'
                value='63'
                control={<Checkbox />}
                label='Pelatihan'
              />
              <FormControlLabel
                name='persiapan'
                onChange={handleChangeSubKeg}
                labelPlacement='right'
                value='64'
                control={<Checkbox />}
                label='Persiapan'
              />
              <FormControlLabel
                name='listing'
                onChange={handleChangeSubKeg}
                labelPlacement='right'
                value='66'
                control={<Checkbox />}
                label='Listing'
              />
              <FormControlLabel
                name='pencacahan'
                onChange={handleChangeSubKeg}
                labelPlacement='right'
                value='65'
                control={<Checkbox />}
                label='Pencacahan'
              />
              <FormControlLabel
                name='pengolahanEntri'
                onChange={handleChangeSubKeg}
                labelPlacement='right'
                value='67'
                control={<Checkbox />}
                label='Pengolahan-Entri'
              />
              <FormControlLabel
                labelPlacement='70'
                value='pengolahanValidasi'
                control={<Checkbox />}
                label='Pengolahan-Validasi'
              />
              <FormControlLabel
                name='diseminasi'
                onChange={handleChangeSubKeg}
                labelPlacement='right'
                value='69'
                control={<Checkbox />}
                label='Diseminasi'
              />
              <FormControlLabel
                name='evaluasi'
                onChange={handleChangeSubKeg}
                labelPlacement='right'
                value='68'
                control={<Checkbox />}
                label='Evaluasi'
              />
              {/* <FormControlLabel required control={<Checkbox />} label='Required' />
              <FormControlLabel disabled control={<Checkbox />} label='Disabled' /> */}
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
              placeholder='Dapat dikosongkan..'
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
                value.map((option, index) => (
                  <Chip key={index} variant='outlined' label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={params => (
                <TextField {...params} variant='outlined' label='Anggota Tim' placeholder='Tambah Anggota Tim' />
              )}
            />
          </Grid>

          {/* <Grid item xs={12} height={220}>
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
                      </Grid> 
                <Grid display={'flex'} justifyContent={'center'} item xs={12}>
                  {button} 
                </Grid>
              </CardContent>
              <CardActions className='card-action-dense'></CardActions>
            </Card>
          </Grid> */}
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
