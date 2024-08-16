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

import { DataGrid } from '@mui/x-data-grid'
import TableAddParticipant from 'src/views/tables/TableAddParticipant'
import { number } from 'mathjs'

// topsis
import { create, all } from 'mathjs'
import { getBest } from '../../function/topsis'

const statusObj = {
  0: { color: 'error', status: 'Overload' },
  1: { color: 'success', status: 'Available' }
}
const jenisFungsi = {
  2: { bagFungsi: 'Bagian Umum', color: 'warning' },
  3: { bagFungsi: 'Statistik Sosial', color: 'warning' },
  4: { bagFungsi: 'Statistik Produksi', color: 'warning' },
  5: { bagFungsi: 'Statistik Distribusi', color: 'warning' },
  6: { bagFungsi: 'Neraca Wilayah dan Analisis Statistik', color: 'warning' },
  7: { bagFungsi: 'Integrasi Pengolahan dan Diseminasi Statistik', color: 'warning' }
}

const CreateKegiatanPerusahaanViews = props => {
  const [timMember, setTimMember] = useState(props.data.timKerjaPegawai)
  const [kriteria, setKriteria] = useState(props.dataKriteria)

  const [values, setValues] = useState({
    idGroup: props.data.id,
    kegFungsi: props.data.fungsi,
    kegNama: props.data.nama,
    kegKetua: props.data.ketuaTim
  })

  const [participants, setParticipants] = useState(
    props.dataUser.map(users => {
      if (timMember.some(elem => elem.userId === users.id)) {
        return { ...users, checked: true }
      } else {
        return { ...users, checked: false }
      }
    })
  )

  const kriteria1P = parseFloat(kriteria.kriteria1)
  const kriteria2P = parseFloat(kriteria.kriteria2)
  const arrayBebanPegawai = [kriteria1P, kriteria2P]

  const [tpp, setTpp] = useState(props.dataTpp)

  const handlePJ = event => {
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      kegKetua: event.target.value // Perbarui nilai kegRentang
    }))
    dataBebanKerja.map(users => {
      if (users.id === event.target.value) {
        return { ...users, checked: true }
      }
    })
  }

  const userAll = participants.map(row => {
    const jumlahKerjaanTpp = tpp
      .filter(tppRow => tppRow.pmlId === row.id)
      .filter(tppRow => {
        const tppDueDate = new Date(tppRow.duedate)
        const currentDate = new Date()
        return (
          tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
        )
      })
      .reduce((count, item) => count + 1, 0)

    const jumlahJamKerja = row.pekerjaan_harian
      .filter(ph => ph.task.jenisKeg === 65)
      .filter(hari => {
        const tppDueDate = new Date(hari.tanggalSubmit)
        const currentDate = new Date()
        return (
          tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
        )
      })
      .reduce((total, item) => total + item.durasi, 0)

    return {
      pegawai_id: row.id,
      jumlahKegiatan: jumlahKerjaanTpp,
      jumlahJamKerja
    }
  })

  const arrayUser = userAll.map(item => [item.jumlahKegiatan, item.jumlahJamKerja])
  const arrayUserId = userAll.map(item => item.pegawai_id)

  // topsis
  const config = {}
  const math = create(all, config)

  // pegawai
  let m = math.matrix(arrayUser)
  let w = arrayBebanPegawai
  let ia = ['min', 'min']
  let id = arrayUserId
  let result = getBest(m, w, ia, id)

  const resultBaru = result.map(item => {
    return { bebanKerja: item.ps }
  })

  const [dataBebanKerja, setDataBebanKerja] = useState(
    participants.map((item, index) => {
      return {
        ...item,
        ...resultBaru[index]
      }
    })
  )

  const rows = dataBebanKerja.map(row => {
    const jumlahKerjaanTpp = tpp
      .filter(tppRow => tppRow.pmlId === row.id)
      .filter(tppRow => {
        const tppDueDate = new Date(tppRow.duedate)
        const currentDate = new Date()
        return (
          tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
        )
      })
      .reduce((count, item) => count + 1, 0)

    const jumlahJamKerja = row.pekerjaan_harian
      .filter(ph => ph.task.jenisKeg === 65)
      .filter(hari => {
        const tppDueDate = new Date(hari.tanggalSubmit)
        const currentDate = new Date()
        return (
          tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
        )
      })
      .reduce((total, item) => total + item.durasi, 0)

    return {
      id: row.id,
      nama: row.name,
      fungsi: row.fungsi,
      jumlahKegiatan: jumlahKerjaanTpp,
      jumlahTimKerja: row.TimKerjaPegawai.length,
      jumlahJamKerja: jumlahJamKerja,
      bebanKerja: row.bebanKerja.toFixed(2),
      checked: row.checked
    }
  })

  const columns = [
    // { field: 'id', headerName: 'No', type: 'string', minWidth: 40 },
    {
      field: 'checked',
      sortable: true,
      renderHeader: () => (
        <FormControlLabel
          control={
            <Checkbox
              checked={
                dataBebanKerja.filter(participant => participant.checked === true).length === participants.length
              }
              onChange={e => {
                let checked = e.target.checked
                setDataBebanKerja(
                  dataBebanKerja.map(participant => {
                    return {
                      ...participant,
                      checked: checked
                    }
                  })
                )
              }}
            />
          }
          label='All'
        />
      ),
      minWidth: 30,
      renderCell: params => (
        <FormControlLabel
          control={
            <Checkbox
              checked={params.value}
              onChange={e => {
                let checked = e.target.checked
                setDataBebanKerja(
                  dataBebanKerja.map(participant => {
                    if (participant.id === params.id) {
                      participant.checked = checked
                    }

                    return participant
                  })
                )
              }}
            />
          }
          label=''
        />
      ),
      align: 'left'
    },
    {
      field: 'nama',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Nama</Typography>
      ),
      headerName: 'Nama',
      width: 200,
      renderCell: params => (
        <Link
          onClick={async e => {
            router.push(`/pegawai-detail-gaji/${params.row.id}`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ fontWeight: 500, textDecoration: 'underline', fontSize: '0.875rem !important' }}>
            {params.row.nama}
          </Typography>
        </Link>
      )
    },
    // {
    //   field: 'over',
    //   renderCell: params => (
    //     <>
    //       <Chip
    //         label={statusObj[params.row.jumlahKegiatan < 15 ? 1 : 0].status}
    //         color={statusObj[params.row.jumlahKegiatan < 15 ? 1 : 0].color}
    //         sx={{
    //           height: 24,
    //           fontSize: '0.75rem',
    //           width: 100,
    //           textTransform: 'capitalize',
    //           '& .MuiChip-label': { fontWeight: 500 }
    //         }}
    //       />
    //     </>
    //   ),
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
    //       Status Bulan Ini
    //     </Typography>
    //   ),
    //   type: 'string',
    //   width: 140
    // },
    // {
    //   field: 'fungsi',
    //   headerName: 'Fungsi',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Fungsi</Typography>
    //   ),

    //   minWidth: 170,
    //   renderCell: params => (
    //     <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
    //       {' '}
    //       {jenisFungsi[parseInt(params.row.fungsi)].bagFungsi}
    //     </Typography>
    //   )
    // },
    {
      field: 'jumlahKegiatan',
      headerName: 'Jumlah Kegiatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Jumlah Pekerjaan
        </Typography>
      ),

      minWidth: 150
    },
    {
      field: 'jumlahJamKerja',
      headerName: 'Jam Kerja',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Jam Kerja
        </Typography>
      ),
      minWidth: 150
    },
    {
      field: 'bebanKerja',
      headerName: 'Beban Kerja',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Beban Kerja
        </Typography>
      ),

      minWidth: 150
    },
    {
      field: 'jumlahTimKerja',
      headerName: 'Jumlah Tim Kerja',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Jumlah Tim Kerja
        </Typography>
      ),

      minWidth: 150
    }
  ]

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
  }

  const handleFungsiChange = event => {
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      kegFungsi: event.target.value // Perbarui nilai kegRentang
    }))
  }

  const handleKegiatanPerusahaan = async e => {
    e.preventDefault()
    const ketuadanParticipants = dataBebanKerja.map(row => {
      if (row.id === values.kegKetua) {
        if (!row.checked) {
          return { ...row, checked: true }
        }
      }
      return { ...row }
    })

    const ketuaChange = 0
    if (values.kegKetua != props.data.ketuaTim) {
      ketuaChange = 1
    }

    const namaChange = 0
    if (values.kegNama != props.data.nama) {
      namaChange = 1
    }

    const timBaru = ketuadanParticipants.filter(user => user.checked)
    const daftarTambah = timBaru.filter(item2 => !timMember.some(item1 => item1.userId === item2.id))
    const daftarHapus = timMember.filter(item1 => !timBaru.some(item2 => item2.id === item1.userId))

    try {
      while (true) {
        const res = await axios.put(`/tim-kerja/${values.idGroup}`, {
          namaChange: namaChange,
          ketuaChange: ketuaChange,
          nama: values.kegNama,
          ketuaTim: values.kegKetua,
          daftarTambah: daftarTambah,
          daftarHapus: daftarHapus
        })

        if (res.status === 201) {
          // Swal.fire({
          //   title: 'Ubah Tim Kerja Success',
          //   text: 'Press OK to continue',
          //   icon: 'success',
          //   confirmButtonColor: '#68B92E',
          //   confirmButtonText: 'OK'
          // }).then(router.push(`/tim-kerja-detail/${values.idGroup}`))
          Swal.fire({
            title: 'Berhasil disimpan',
            text: '',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          }).then(router.push(`/tim-kerja-list`))

          setValues({
            kegNama: '',
            kegKetua: 0
          })
        }

        break
      }
    } catch (error) {
      Swal.fire({
        title: 'Gagal disimpan',
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
            <Typography variant='h5'>Ubah Tim Kerja</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              value={values.kegNama}
              onChange={handleChange('kegNama')}
              multiline
              label='Nama Tim Kerja'
              name='namaKegiatan'
            />
          </Grid>
          {/* <Grid item xs={12} md={12}>
            <Typography variant='h6' sx={{ py: '5px' }}></Typography>

            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-helper-label'>Penanggung Jawab</InputLabel>
              <Select
                fullWidth
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={values.kegKetua}
                onChange={handlePJ}
                label='Penanggung Jawab'
                name='penanggungJawab'
              >
                {participants.map(item => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid> */}
          <Divider></Divider>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                rowHeight={65}
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'checked', sort: 'desc' }]
                  }
                }}
                rows={rows}
                columns={columns}
                sx={{
                  height: rows.length > 3 ? '80vh' : '45vh',
                  // overflowY: 'auto',
                  width: '100%'
                }}
              />
            </Box>
          </Grid>
        </Grid>
        {/* <TableAddParticipant></TableAddParticipant> */}
        <Divider sx={{ margin: 0 }} />
        <Grid item m={4} display={'flex'} justifyContent={'end'}>
          <Button size='medium' type='submit' variant='contained' onClick={handleKegiatanPerusahaan}>
            Ubah Tim Kerja
          </Button>
        </Grid>
      </form>
    </Card>
  )
}

export default CreateKegiatanPerusahaanViews
