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
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
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
import { number } from 'mathjs'

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

  const [user, setUser] = useState(props.dataUser)

  const [tpp, setTpp] = useState(props.dataTpp)

  const [values, setValues] = useState({
    idGroup: props.data.id,
    kegFungsi: props.data.fungsi,
    kegNama: props.data.nama,
    kegKetua: props.data.userId_fkey.name
  })

  // console.log(props.data)

  const rows = timMember.map(row => {
    const gajiBulanIni = tpp
      .filter(tppRow => tppRow.pmlId === row.userId_fkey.id)
      .filter(tppRow => {
        const tppDueDate = new Date(tppRow.task.duedate)
        const currentDate = new Date()
        return (
          tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
        )
      })
      .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

    const gajiBulanSblm = tpp
      .filter(tppRow => tppRow.pmlId === row.userId_fkey.id)
      .filter(tppRow => {
        const tppDueDate = new Date(tppRow.task.duedate)
        const currentDate = new Date()
        return currentDate.getMonth != 0
          ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
              tppDueDate.getMonth() === currentDate.getMonth() - 1
          : tppDueDate.getFullYear() === currentDate.getFullYear() - 1 && tppDueDate.getMonth() === 12
      })
      .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

    const gajiBulanDepan = tpp
      .filter(tppRow => tppRow.pmlId === row.userId_fkey.id)
      .filter(tppRow => {
        const tppDueDate = new Date(tppRow.task.duedate)
        const currentDate = new Date()
        return currentDate.getMonth != 11
          ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
              tppDueDate.getMonth() === currentDate.getMonth() + 1
          : tppDueDate.getFullYear() === currentDate.getFullYear() + 1 && tppDueDate.getMonth() === 0
      })
      .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

    const bebanKerja = row.userId_fkey.beban_kerja_pegawai[0].bebanKerja
    const nilaiBebanKerja = number(bebanKerja).toFixed(2)

    return {
      id: row.userId_fkey.id,
      nama: row.userId_fkey.name,
      fungsi: row.userId_fkey.fungsi,
      jumlahKegiatan: row.userId_fkey.UserProject.length,
      // gajiBulanIni,
      // gajiBulanSblm,
      // gajiBulanDepan,
      bebanKerjaO: nilaiBebanKerja,
      over: gajiBulanIni
      // checked: row.checked
    }
  })

  const columns = [
    // { field: 'id', headerName: 'No', type: 'string', minWidth: 40 },
    // {
    //   field: 'checked',
    //   sortable: true,
    //   renderHeader: () => (
    //     <FormControlLabel
    //       control={
    //         <Checkbox
    //           checked={participants.filter(participant => participant.checked === true).length === participants.length}
    //           onChange={e => {
    //             let checked = e.target.checked
    //             setParticipants(
    //               participants.map(participant => {
    //                 return {
    //                   ...participant,
    //                   checked: checked
    //                 }
    //               })
    //             )
    //           }}
    //         />
    //       }
    //       label='All'
    //     />
    //   ),
    //   minWidth: 30,
    //   renderCell: params => (
    //     <FormControlLabel
    //       control={
    //         <Checkbox
    //           checked={params.value}
    //           onChange={e => {
    //             let checked = e.target.checked
    //             setParticipants(
    //               participants.map(participant => {
    //                 if (participant.id === params.id) {
    //                   participant.checked = checked
    //                 }

    //                 return participant
    //               })
    //             )
    //           }}
    //         />
    //       }
    //       label=''
    //     />
    //   ),
    //   align: 'left'
    // },
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
    {
      field: 'over',
      renderCell: params => (
        <>
          <Chip
            label={statusObj[params.row.jumlahKegiatan < 15 ? 1 : 0].status}
            color={statusObj[params.row.jumlahKegiatan < 15 ? 1 : 0].color}
            sx={{
              height: 24,
              fontSize: '0.75rem',
              width: 100,
              textTransform: 'capitalize',
              '& .MuiChip-label': { fontWeight: 500 }
            }}
          />
        </>
      ),
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Status Bulan Ini
        </Typography>
      ),
      type: 'string',
      width: 140
    },

    // {
    //   field: 'gajiBulanIni',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
    //       Gaji Bulan Ini
    //     </Typography>
    //   ),
    //   headerName: 'Gaji Bulan Ini ',
    //   type: 'string',
    //   width: 140,
    //   renderCell: params => (
    //     <>
    //       <Typography
    //         color={params.row.gajiBulanIni < 3000000 ? 'secondary.main' : 'error.main'}
    //         sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
    //       >
    //         {`Rp ${params.row.gajiBulanIni.toLocaleString('id-ID')}`}
    //       </Typography>
    //     </>
    //   )
    // },
    // {
    //   field: 'gajiBulanSblm',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
    //       Gaji Bulan Sebelumnya
    //     </Typography>
    //   ),
    //   headerName: 'Gaji Bulan Sebelumnya ',
    //   type: 'string',
    //   width: 140,
    //   renderCell: params => (
    //     <>
    //       <Typography
    //         color={params.row.gajiBulanSblm < 3000000 ? 'secondary.main' : 'error.main'}
    //         sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
    //       >
    //         {`Rp ${params.row.gajiBulanSblm.toLocaleString('id-ID')}`}
    //       </Typography>
    //     </>
    //   )
    // },
    // {
    //   field: 'gajiBulanDepan',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
    //       Gaji Bulan Depan
    //     </Typography>
    //   ),
    //   headerName: 'Gaji Bulan Depan ',
    //   type: 'string',
    //   width: 140,
    //   renderCell: params => (
    //     <>
    //       <Typography
    //         color={params.row.gajiBulanDepan < 3000000 ? 'secondary.main' : 'error.main'}
    //         sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
    //       >
    //         {`Rp ${params.row.gajiBulanDepan.toLocaleString('id-ID')}`}
    //       </Typography>
    //     </>
    //   )
    // },
    {
      field: 'fungsi',
      headerName: 'Fungsi',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Fungsi</Typography>
      ),

      minWidth: 170,
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {' '}
          {jenisFungsi[parseInt(params.row.fungsi)].bagFungsi}
        </Typography>
      )
    },
    // {
    //   field: 'totalGaji',
    //   headerName: 'Total Gaji',

    //   minWidth: 170
    // },
    // {
    //   field: 'gajiBulanan',
    //   headerName: 'Gaji Bulanan',

    //   width: 150
    // },
    // {
    //   field: 'gajiTriwulanan',
    //   headerName: 'Gaji Triwulanan',

    //   width: 150
    // },
    // {
    //   field: 'gajiSemesteran',
    //   headerName: 'Gaji Semesteran',

    //   width: 150
    // },
    // {
    //   field: 'gajiTahunan',
    //   headerName: 'Gaji Tahunan',

    //   width: 150
    // },
    {
      field: 'jumlahKegiatan',
      headerName: 'Jumlah Kegiatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Jumlah Kegiatan
        </Typography>
      ),

      minWidth: 150
    },
    {
      field: 'bebanKerjaO',
      headerName: 'Beban Kerja',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Beban Kerja
        </Typography>
      ),

      minWidth: 150
    }

    // {
    //   field: 'role',
    //   renderHeader: () => <Typography sx={{ fontSize: '0.875rem !important', textAlign: 'center' }}>Role</Typography>,
    //   minWidth: 160,
    //   flex: 1,
    //   renderCell: () => (
    //     <form>
    //       <FormControl fullWidth>
    //         <InputLabel id='form-layouts-separator-select-label'>role</InputLabel>
    //         <Select
    //           sx={{ height: 50 }}
    //           label='role'
    //           id='form-layouts-separator-role'
    //           labelId='form-layouts-separator-role-label'
    //         >
    //           <MenuItem value='1'>Ketua Tim</MenuItem>
    //           <MenuItem value='2'>Staff</MenuItem>
    //         </Select>
    //       </FormControl>
    //     </form>
    //   )
    // },
    // {
    //   field: 'action',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Action</Typography>
    //   ),

    //   minWidth: 250,
    //   flex: 1,
    //   renderCell: params => (
    //     <>
    //       <Button
    //         onClick={e => {
    //           router.push(`/people-edit/${params.row.id}`)
    //         }}
    //         type='submit'
    //         sx={{ mr: 1 }}
    //         color='info'
    //         variant='text'
    //       >
    //         <PencilOutline />
    //       </Button>

    //       {/* <Button onClick={handleDelete} type='submit' sx={{ mr: 1 }} color='error' variant='text'>
    //         <DeleteOutline />
    //       </Button> */}
    //     </>
    //   )
    // }
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

  const handleDelete = async e => {
    e.preventDefault()

    Swal.fire({
      title: 'Delete Tim Kerja?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#68B92E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete Tim Kerja',
      cancelButtonText: 'No, Cancel',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .delete(`/tim-kerja/${values.idGroup}`)
          .then(res => {
            Swal.fire('Deleted', 'Tim kerja has been deleted. ', 'success')

            router.push('/tim-kerja-list')
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
  }

  const router = useRouter()
  return (
    <Card>
      <form action='post' onSubmit={e => e.preventDefault()}>
        <Grid container spacing={4} sx={{ padding: '32px' }}>
          <Grid item xl={12}>
            <Typography variant='h4'>{values.kegNama}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Ketua Tim: {values.kegKetua}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <TextField
              fullWidth
              value={values.kegNama}
              onChange={handleChange('kegNama')}
              multiline
              label='Nama Group Kegiatan Perusahaan'
              name='namaKegiatan'
              disabled
            /> */}
          </Grid>
          {/* <Grid item xs={12} md={6}>
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
          </Grid> */}
          <Divider></Divider>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                pageSizeOptions={[10, 15, 25]}
                rowHeight={65}
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'bebanKerjaO', sort: 'asc' }]
                  },
                  pagination: { paginationModel: { pageSize: 100 } }
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
          {/* <Button
            color={'primary'}
            sx={{ m: 2 }}
            size='medium'
            type='submit'
            variant='contained'
            onClick={e => router.push(`/tim-kerja-edit/${id}`)}
          >
            Edit Tim Kerja
          </Button> */}
          <Button color={'error'} sx={{ m: 2 }} size='medium' type='submit' variant='contained' onClick={handleDelete}>
            Hapus Tim Kerja
          </Button>
        </Grid>
      </form>
    </Card>
  )
}

export default CreateKegiatanPerusahaanViews
