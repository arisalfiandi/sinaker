import * as React from 'react'

// axios
import axios from 'src/pages/api/axios'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// other, swall
import { DataGrid } from '@mui/x-data-grid'
import Swal from 'sweetalert2'
import { useRouter } from 'next/dist/client/router'
import { useSession } from 'next-auth/react'
// icon

import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import router from 'next/router'

import Link from '@mui/material/Link'

const jenisFungsi = {
  2: { bagFungsi: 'Bagian', color: 'warning' },
  3: { bagFungsi: 'Statistik Sosial', color: 'warning' },
  4: { bagFungsi: 'Statistik Produksi', color: 'warning' },
  5: { bagFungsi: 'Statistik Distribusi', color: 'warning' },
  6: { bagFungsi: 'Neraca Wilayah dan Analisis Statistik', color: 'warning' },
  7: { bagFungsi: 'Integrasi Pengolahan dan Diseminasi Statistik', color: 'warning' }
}

const TablePerusahaan = props => {
  const session = useSession()
  const { dataUser } = props
  const rows = dataUser.map(row => ({
    id: row.id,
    kip: row.kip,
    nama: row.nama,
    kecamatan: row.kecamatan,
    desa: row.desa,
    alamat: row.alamat,
    namaDesa: row.namaDesa,
    namaKec: row.namaKec,
    jumlahKegiatan: 2
  }))

  const handleDelete = async id => {
    axios
      .delete(`edel-perusahaan/${id}`)
      .then(async res => {
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Berhasil dihapus'
        })
        router.reload()
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong'
        })
      })
  }
  // console.log(rows)
  const columns = [
    // { field: 'id', headerName: 'No', type: 'string', minWidth: 40 },
    {
      field: 'kip',
      headerName: 'KIP',
      width: 240,
      height: 50,
      minWidth: 130
    },
    {
      field: 'nama',
      renderCell: params => (
        <Link
          onClick={async e => {
            router.push(`/perusahaan-detail/${params.row.id}`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ fontWeight: 500, textDecoration: 'underline', fontSize: '0.875rem !important' }}>
            {params.row.nama}
          </Typography>
        </Link>
      ),
      headerName: 'Nama',
      width: 240,
      minWidth: 130
    },
    {
      field: 'kecamatan',
      headerName: 'Kecamatan',
      width: 240,
      minWidth: 130
    },
    {
      field: 'desa',
      headerName: 'Desa',
      width: 240,
      minWidth: 130
    },
    {
      field: 'alamat',
      headerName: 'Alamat',
      width: 240,
      minWidth: 130
    },
    {
      field: 'namaDesa',
      headerName: 'Nama Desa',
      width: 240,
      minWidth: 130
    },
    {
      field: 'namaKec',
      headerName: 'Nama Kecamatan',
      width: 240,
      minWidth: 130
    },

    {
      field: 'action',
      renderHeader: () =>
        session.status === 'authenticated' && session.data.uid === 1099999 ? (
          <>
            <Typography sx={{ fontSize: '0.875rem !important', textAlign: 'center' }}>Action</Typography>
          </>
        ) : (
          <></>
        ),
      minWidth: 250,
      flex: 1,
      renderCell: params =>
        session.status === 'authenticated' && session.data.uid === 1099999 ? (
          <>
            <Button
              onClick={e => {
                console.log('edit')
                router.push(`/perusahaan-edit/${params.row.id}`)
              }}
              type='submit'
              sx={{ mr: 1 }}
              color='info'
              variant='text'
            >
              <PencilOutline />
            </Button>

            <Button
              onClick={() => {
                Swal.fire({
                  title: 'Hapus Perusahaan?',

                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Ya, Hapus Perusahaan'
                }).then(result => {
                  if (result.isConfirmed) {
                    handleDelete(params.row.id)
                  }
                })
              }}
              type='submit'
              sx={{ mr: 1 }}
              color='error'
              variant='text'
            >
              <DeleteOutline />
            </Button>
          </>
        ) : (
          <></>
        )
    }
  ]

  return (
    <>
      <Card sx={{ padding: 4 }}>
        <DataGrid
          rowHeight={35}
          initialState={{
            sorting: {
              sortModel: [{ field: 'deadline', sort: 'asc' }]
            }
          }}
          rows={rows}
          columns={columns}
          sx={{
            height: rows.length > 3 ? '70vh' : '45vh',
            // overflowY: 'auto',
            width: '100%'
          }}
          columnVisibilityModel={{
            action: session.status === 'authenticated' && session.data.uid === 1099999 ? true : false
          }}
        />
      </Card>
    </>
  )
}

export default TablePerusahaan
