import { useState, useEffect, useRef } from 'react'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Link from '@mui/material/Link'

// other, swall
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useRouter } from 'next/dist/client/router'
import { useSession } from 'next-auth/react'

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

// icon
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import router from 'next/router'

const jenisFungsi = {
  2: { bagFungsi: 'Bagian Umum', color: 'warning' },
  3: { bagFungsi: 'Statistik Sosial', color: 'warning' },
  4: { bagFungsi: 'Statistik Produksi', color: 'warning' },
  5: { bagFungsi: 'Statistik Distribusi', color: 'warning' },
  6: { bagFungsi: 'Neraca Wilayah dan Analisis Statistik', color: 'warning' },
  7: { bagFungsi: 'Integrasi Pengolahan dan Diseminasi Statistik', color: 'warning' }
}

const TablePeople = props => {
  const session = useSession()
  const [role, setRole] = useState()
  const statusObj = {
    0: { color: 'error', status: 'Overload' },
    1: { color: 'success', status: 'Available' }
  }
  const [tpp, setTpp] = useState(props.dataTpp)
  const { dataUser } = props
  // console.log(tpp)

  const handleChangeRole = async (e, id, role) => {
    e.preventDefault()
    try {
      const response = await axios.put(`/user/${id}`, {
        role: role
      })

      if (response.status === 201) {
        Swal.fire({
          title: 'Berhasil Mengubah Peran Pegawai',
          text: '',
          icon: 'success',
          confirmButtonColor: '#68B92E',
          confirmButtonText: 'OK'
        }).then(() => {
          router.push(`/pegawai`)
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Gagal Mengubah Peran Pegawai',
        text: 'Coba lagi nanti',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  const rows = dataUser.map(row => {
    // const gajiBulanIni = tpp
    //   .filter(tppRow => tppRow.pmlId === row.id)
    //   .filter(tppRow => {
    //     const tppDueDate = new Date(tppRow.task.duedate)
    //     const currentDate = new Date()
    //     return (
    //       tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
    //     )
    //   })
    //   .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

    // const gajiBulanSblm = tpp
    //   .filter(tppRow => tppRow.pmlId === row.id)
    //   .filter(tppRow => {
    //     const tppDueDate = new Date(tppRow.task.duedate)
    //     const currentDate = new Date()
    //     return currentDate.getMonth != 0
    //       ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
    //           tppDueDate.getMonth() === currentDate.getMonth() - 1
    //       : tppDueDate.getFullYear() === currentDate.getFullYear() - 1 && tppDueDate.getMonth() === 12
    //   })
    //   .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

    // const gajiBulanDepan = tpp
    //   .filter(tppRow => tppRow.pmlId === row.id)
    //   .filter(tppRow => {
    //     const tppDueDate = new Date(tppRow.task.duedate)
    //     const currentDate = new Date()
    //     return currentDate.getMonth != 11
    //       ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
    //           tppDueDate.getMonth() === currentDate.getMonth() + 1
    //       : tppDueDate.getFullYear() === currentDate.getFullYear() + 1 && tppDueDate.getMonth() === 0
    //   })
    //   .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

    // const bebanKerja = row.beban_kerja_pegawai[0].bebanKerja
    // const nilaiBebanKerja = Number(bebanKerja).toFixed(2)

    return {
      id: row.id,
      nama: row.name,
      fungsi: row.fungsi,
      jumlahKegiatan: row.TaskOrganik.length,
      role: row.role
      // bebanKerja: nilaiBebanKerja,
      // gajiBulanIni,
      // gajiBulanSblm,
      // gajiBulanDepan,
      // over: nilaiBebanKerja
    }
  })
  //   id: row.id,
  //   nama: row.name,
  //   fungsi: row.fungsi,
  //   totalGaji: 10000,
  //   gajiBulanan: 10000,
  //   gajiTriwulanan: 10000,
  //   gajiSemesteran: 10000,
  //   gajiTahunan: 10000,
  //   jumlahKegiatan: row.kegiatan_user_leader.length
  //   // jumlahSubkegiatan: row.jumlahSubkegiatan,
  // }))

  const columnsAdmin = [
    // { field: 'id', headerName: 'No', type: 'string', minWidth: 40 },
    {
      field: 'nama',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Nama</Typography>
      ),
      headerName: 'Nama',
      width: 270,
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
    //         // label={statusObj[params.row.bebanKerja < 0.5 ? (params.row.jumlahKegiatan < 15 ? 1 : 0) : 0].status}
    //         // color={statusObj[params.row.bebanKerja < 0.5 ? (params.row.jumlahKegiatan < 15 ? 1 : 0) : 0].color}
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

      minWidth: 170
    },
    // {
    //   field: 'bebanKerja',
    //   headerName: 'Beban Kerja',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
    //       Beban Kerja
    //     </Typography>
    //   ),

    //   minWidth: 150
    // },

    {
      field: 'role',
      renderHeader: () => <Typography sx={{ fontSize: '0.875rem !important', textAlign: 'center' }}>Role</Typography>,
      minWidth: 160,
      flex: 1,
      renderCell: params => (
        <form>
          <>
            <FormControl fullWidth>
              <InputLabel id='form-layouts-separator-select-label'>role</InputLabel>
              {params.row.role == 'superAdmin' || params.row.role == 'admin' ? (
                <Select
                  sx={{ height: 50 }}
                  value={params.row.role}
                  label='role'
                  id='form-layouts-separator-role'
                  labelId='form-layouts-separator-role-label'
                >
                  <MenuItem value='superAdmin'>Kepala BPS</MenuItem>
                </Select>
              ) : (
                <Select
                  sx={{ height: 50 }}
                  value={params.row.role}
                  label='role'
                  id='form-layouts-separator-role'
                  labelId='form-layouts-separator-role-label'
                  onChange={e => handleChangeRole(e, params.row.id, e.target.value)}
                >
                  <MenuItem value='pimpinan'>Kepala BPS</MenuItem>
                  <MenuItem value='teamleader'>PJK</MenuItem>
                  <MenuItem value='employee'>Pegawai</MenuItem>
                  <MenuItem value='verifikator'>Verifikator</MenuItem>
                  <MenuItem value='ppspm'>PPSPM</MenuItem>
                  <MenuItem value='bendahara'>Bendahara</MenuItem>
                </Select>
              )}
            </FormControl>
          </>
        </form>
      )
    },

    {
      field: 'action',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Action</Typography>
      ),

      minWidth: 250,
      flex: 1,
      renderCell: params => (
        <>
          <Button
            onClick={e => {
              router.push(`/people-edit/${params.row.id}`)
            }}
            type='submit'
            sx={{ mr: 1 }}
            color='info'
            variant='text'
          >
            <PencilOutline />
          </Button>

          {/* <Button onClick={handleDelete} type='submit' sx={{ mr: 1 }} color='error' variant='text'>
            <DeleteOutline />
          </Button> */}
        </>
      ),
      hide: true
    }
  ]

  const columns = [
    // { field: 'id', headerName: 'No', type: 'string', minWidth: 40 },
    {
      field: 'nama',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Nama</Typography>
      ),
      headerName: 'Nama',
      width: 270,
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
    //         // label={statusObj[params.row.bebanKerja < 0.5 ? (params.row.jumlahKegiatan < 15 ? 1 : 0) : 0].status}
    //         // color={statusObj[params.row.bebanKerja < 0.5 ? (params.row.jumlahKegiatan < 15 ? 1 : 0) : 0].color}
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

      minWidth: 170
    },
    // {
    //   field: 'bebanKerja',
    //   headerName: 'Beban Kerja',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
    //       Beban Kerja
    //     </Typography>
    //   ),

    //   minWidth: 150
    // },

    {
      field: 'action',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Action</Typography>
      ),

      minWidth: 250,
      flex: 1,
      renderCell: params => (
        <>
          <Button
            onClick={e => {
              router.push(`/people-edit/${params.row.id}`)
            }}
            type='submit'
            sx={{ mr: 1 }}
            color='info'
            variant='text'
          >
            <PencilOutline />
          </Button>

          {/* <Button onClick={handleDelete} type='submit' sx={{ mr: 1 }} color='error' variant='text'>
            <DeleteOutline />
          </Button> */}
        </>
      ),
      hide: true
    }
  ]
  const handleDelete = () => {
    Swal.fire({
      title: 'Apa Anda Yakin?',
      text: 'Untuk menghapus akun ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hapus'
    }).then(result => {
      if (result.isConfirmed) {
        router.push('/people')
      } else {
        router.push('/people')
      }
    })
  }

  return (
    <>
      <Card sx={{ padding: 4 }}>
        <DataGrid
          rowHeight={65}
          initialState={{
            sorting: {
              sortModel: [{ field: 'nama', sort: 'asc' }]
            }
          }}
          rows={rows}
          columns={
            session.status === 'authenticated' && (session.data.uid === 1099999 || session.data.role == 'admin')
              ? columnsAdmin
              : columns
          }
          sx={{
            height: rows.length > 3 ? '80vh' : '45vh',
            // overflowY: 'auto',
            width: '100%'
          }}
          columnVisibilityModel={{
            action: session.status === 'authenticated' && session.data.uid === 1099999 ? true : false
          }}
          slots={{
            toolbar: GridToolbar
          }}
          slotProps={{
            toolbar: { showQuickFilter: true }
          }}
        />
      </Card>
    </>
  )
}

export default TablePeople
