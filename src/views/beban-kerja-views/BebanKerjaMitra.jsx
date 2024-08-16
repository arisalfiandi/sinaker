import { useState, useEffect, useRef } from 'react'

// axios
import axios from 'src/pages/api/axios'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
// other
import { DataGrid } from '@mui/x-data-grid'
import { useRouter } from 'next/dist/client/router'
import Swal from 'sweetalert2'
import Link from '@mui/material/Link'
import { useSession } from 'next-auth/react'

// icon
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

// topsis
import { create, all } from 'mathjs'
import { getBest } from '../../function/topsis'

const TableMitra = props => {
  const statusObj = {
    0: { color: 'error', status: 'Overload' },
    1: { color: 'success', status: 'Available' }
  }

  const [mitra, setMitra] = useState(props.data)
  const [tpp, setTpp] = useState(props.dataTpp)
  const [kriteriaM, setKriteriaM] = useState(props.dataKriteriaM)
  const session = useSession()

  const userAllM = mitra.map(row => {
    const gajiBulanIniPCL = tpp
      .filter(tppRow => tppRow.pclId === row.id)
      .filter(tppRow => {
        const tppDueDate = new Date(tppRow.duedate)
        const currentDate = new Date()
        return (
          tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
        )
      })
      .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

    const gajiBulanIniPML = tpp
      .filter(tppRow => tppRow.pmlId === row.id)
      .filter(tppRow => {
        const tppDueDate = new Date(tppRow.duedate)
        const currentDate = new Date()
        return (
          tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
        )
      })
      .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

    // Gabungkan total gaji dari kedua kasus
    const gajiBulanIni = gajiBulanIniPCL + gajiBulanIniPML

    const jumlahKerjaanTppPML = tpp
      .filter(tppRow => tppRow.pmlId === row.id)
      .filter(tppRow => {
        const tppDueDate = new Date(tppRow.duedate)
        const currentDate = new Date()
        return (
          tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
        )
      })
      .reduce((count, item) => count + 1, 0)

    const jumlahKerjaanTppPCL = tpp
      .filter(tppRow => tppRow.pclId === row.id)
      .filter(tppRow => {
        const tppDueDate = new Date(tppRow.duedate)
        const currentDate = new Date()
        return (
          tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
        )
      })
      .reduce((count, item) => count + 1, 0)
    let jumlahKegiatan = jumlahKerjaanTppPCL + jumlahKerjaanTppPML

    return {
      mitra_id: row.id,
      jumlahKegiatan,
      gajiBulanIni
    }
  })

  const arrayUserM = userAllM.map(item => [item.jumlahKegiatan, item.gajiBulanIni])
  const arrayUserIdM = userAllM.map(item => item.mitra_id)

  // topsis
  const config = {}
  const math = create(all, config)

  // mitra
  let mm = math.matrix(arrayUserM)
  let wm = kriteriaM
  let ia = ['min', 'min']
  let idm = arrayUserIdM
  let resultm = getBest(mm, wm, ia, idm)

  console.log(mm)

  const resultBaruM = resultm.map(item => {
    return { bebanKerja: item.ps }
  })

  const dataBebanKerjaM = mitra.map((item, index) => {
    return {
      ...item,
      ...resultBaruM[index]
    }
  })

  const rows = dataBebanKerjaM.map(row => {
    const gajiBulanIniPCL = tpp
      .filter(tppRow => tppRow.pclId === row.id)
      .filter(tppRow => {
        const tppDueDate = new Date(tppRow.duedate)
        const currentDate = new Date()
        return (
          tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
        )
      })
      .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

    const gajiBulanIniPML = tpp
      .filter(tppRow => tppRow.pmlId === row.id)
      .filter(tppRow => {
        const tppDueDate = new Date(tppRow.duedate)
        const currentDate = new Date()
        return (
          tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
        )
      })
      .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

    // Gabungkan total gaji dari kedua kasus
    const gajiBulanIni = gajiBulanIniPCL + gajiBulanIniPML

    const bebanKerja = row.bebanKerja
    const nilaiBebanKerja = Number(bebanKerja).toFixed(2)

    const jumlahKerjaanTppPML = tpp
      .filter(tppRow => tppRow.pmlId === row.id)
      .filter(tppRow => {
        const tppDueDate = new Date(tppRow.duedate)
        const currentDate = new Date()
        return (
          tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
        )
      })
      .reduce((count, item) => count + 1, 0)

    const jumlahKerjaanTppPCL = tpp
      .filter(tppRow => tppRow.pclId === row.id)
      .filter(tppRow => {
        const tppDueDate = new Date(tppRow.duedate)
        const currentDate = new Date()
        return (
          tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
        )
      })
      .reduce((count, item) => count + 1, 0)
    const jumlahKegiatan = jumlahKerjaanTppPCL + jumlahKerjaanTppPML

    return {
      id: row.id,
      name: row.name,
      jumlahKegiatan: jumlahKegiatan,
      bebanKerja: nilaiBebanKerja,
      gajiBulanIni,
      over: gajiBulanIni
    }
  })

  const router = useRouter()
  const columns = [
    // { field: 'id', headerName: 'No', type: 'string', width: 40 },
    // {
    //   field: 'nik',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>NIK</Typography>
    //   ),
    //   headerName: 'NIK',
    //   width: 200
    // },
    {
      field: 'name',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Nama</Typography>
      ),
      headerName: 'Nama',
      width: 200,
      renderCell: params => (
        <Link
          onClick={async e => {
            router.push(`/mitra-detail-gaji/${params.row.id}`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ fontWeight: 500, textDecoration: 'underline', fontSize: '0.875rem !important' }}>
            {params.row.name}
          </Typography>
        </Link>
      )
    },
    {
      field: 'over',
      renderCell: params => (
        <>
          <Chip
            label={statusObj[params.row.gajiBulanIni < 4200000 ? 1 : 0].status}
            color={statusObj[params.row.gajiBulanIni < 4200000 ? 1 : 0].color}
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
    {
      field: 'jumlahKegiatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Jumlah Kegiatan
        </Typography>
      ),
      headerName: 'Jumlah Kegiatan',
      width: 150
    },

    {
      field: 'gajiBulanIni',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Honor</Typography>
      ),
      headerName: 'Gaji Bulan Ini ',
      type: 'string',
      width: 140,
      renderCell: params => (
        <>
          <Typography
            color={params.row.gajiBulanIni < 4200000 ? 'secondary.main' : 'error.main'}
            sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
          >
            {`Rp${params.row.gajiBulanIni.toLocaleString('id-ID')}`}
          </Typography>
        </>
      )
    },
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
    //         {`Rp${params.row.gajiBulanSblm.toLocaleString('id-ID')}`}
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
    //         {`Rp${params.row.gajiBulanDepan.toLocaleString('id-ID')}`}
    //       </Typography>
    //     </>
    //   )
    // },
    {
      field: 'bebanKerja',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Beban Kerja
        </Typography>
      ),
      headerName: 'Beban Kerja',
      width: 150
    }
    // {
    //   field: 'jenisKelamin',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
    //       Jenis Kelamin
    //     </Typography>
    //   ),
    //   headerName: 'Jenis Kelamin',
    //   width: 150
    // },

    // {
    //   field: 'tanggalLahir',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
    //       Tanggal Lahir
    //     </Typography>
    //   ),
    //   headerName: 'Tanggal Lahir',
    //   type: 'string',
    //   width: 150
    // },
    // {
    //   field: 'umur',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Umur</Typography>
    //   ),
    //   headerName: 'Umur',
    //   type: 'string',
    //   width: 150
    // },
    // {
    //   field: 'pendidikan',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
    //       Pendidikan
    //     </Typography>
    //   ),
    //   headerName: 'Pendidikan',
    //   type: 'string',
    //   width: 150
    // },
    // {
    //   field: 'email',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Email</Typography>
    //   ),
    //   headerName: 'Email',
    //   width: 250
    // },
    // {
    //   field: 'status',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
    //       Mitra Internal/Eksternal
    //     </Typography>
    //   ),
    //   headerName: 'Mitra Internal/Eksernal ',
    //   type: 'string',
    //   width: 140
    // }

    // {
    //   field: 'action',
    //   renderHeader: () =>
    //     session.status === 'authenticated' && session.data.uid === 1099999 ? (
    //       <>
    //         <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
    //           Action
    //         </Typography>
    //       </>
    //     ) : (
    //       <></>
    //     ),
    //   minWidth: 215,
    //   flex: 1,
    //   renderCell: params =>
    //     session.status === 'authenticated' && session.data.uid === 1099999 ? (
    //       <>
    //         <Button
    //           onClick={e => {
    //             e.preventDefault()
    //             router.push(`/mitra-edit/${params.row.id}`)
    //           }}
    //           type='submit'
    //           sx={{ mr: 1 }}
    //           color='info'
    //           variant='text'
    //         >
    //           <PencilOutline />
    //         </Button>

    //         <Button
    //           onClick={() => {
    //             Swal.fire({
    //               title: 'Hapus Mitra?',
    //               text: '',
    //               icon: 'warning',
    //               showCancelButton: true,
    //               confirmButtonColor: '#3085d6',
    //               cancelButtonColor: '#d33',
    //               confirmButtonText: 'Ya, Hapus Mitra'
    //             }).then(result => {
    //               if (result.isConfirmed) {
    //                 handleDelete(params.row.id)
    //               }
    //             })
    //           }}
    //           type='submit'
    //           sx={{ mr: 1 }}
    //           color='error'
    //           variant='text'
    //         >
    //           <DeleteOutline />
    //         </Button>
    //       </>
    //     ) : (
    //       <></>
    //     )
    // }
  ]
  return (
    <>
      <Card sx={{ padding: 4 }}>
        <Box sx={{ width: '100%' }}>
          <DataGrid
            rowHeight={65}
            rows={rows}
            columns={columns}
            sx={{
              height: rows.length > 3 ? '80vh' : '45vh',
              // overflowY: 'auto',
              width: '100%'
            }}
            columnVisibilityModel={{
              action: session.status === 'authenticated' && session.data.uid === 1099999 ? true : false
            }}
          />
        </Box>
      </Card>
    </>
  )
}

export default TableMitra
