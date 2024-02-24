import * as React from 'react'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'

import Swal from 'sweetalert2'
import { useRouter } from 'next/dist/client/router'

// other
import { DataGrid } from '@mui/x-data-grid'

// icon
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

const rows = [
  {
    id: 1,
    kode: '3203',
    indukKegiatan: '22204511221',
    fungsi: 'IPDS'
  },
  {
    id: 2,
    kode: '3206',
    indukKegiatan: '22204511221',
    fungsi: 'IPDS'
  },
  {
    id: 3,
    kode: '3207',
    indukKegiatan: '22204511221',
    fungsi: 'Sosial'
  },
  {
    id: 4,
    kode: '3208',
    indukKegiatan: '22204511221',
    fungsi: 'Sosial'
  },
  {
    id: 5,
    kode: '3209',
    indukKegiatan: '22204511221',
    fungsi: 'Dsitribusi'
  }
]

const TableMasterIndukKegiatan = () => {
  const router = useRouter()
  const handleDelete = () => {
    Swal.fire({
      title: 'Apa Anda Yakin?',
      text: 'Untuk menghapus induk kegiatan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Hapus  !'
    }).then(result => {
      if (result.isConfirmed) {
        router.push('/master-induk-kegiatan')
      } else {
        router.push('/master-induk-kegiatan')
      }
    })
  }

  const columns = [
    { field: 'id', headerName: 'No', type: 'string', width: 40 },
    { field: 'kode', headerName: 'Kode', width: 230 },
    { field: 'indukKegiatan', headerName: 'IndukKegiatan', width: 200 },
    { field: 'fungsi', headerName: 'Fungsi', type: 'string', width: 100 },
    {
      field: 'action',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Action</Typography>
      ),
      minWidth: 215,
      flex: 1,
      renderCell: () => (
        <>
          <Button
            onClick={e => {
              router.push('/master-induk-kegiatan-edit')
            }}
            type='submit'
            sx={{ mr: 1 }}
            color='info'
            variant='text'
          >
            <PencilOutline />
          </Button>

          <Button onClick={handleDelete} type='submit' sx={{ mr: 1 }} color='error' variant='text'>
            <DeleteOutline />
          </Button>
        </>
      )
    }
  ]
  return (
    <>
      <Card>
        <DataGrid
          rowHeight={65}
          initialState={{
            sorting: {
              sortModel: [{ field: 'deadline', sort: 'asc' }]
            }
          }}
          rows={rows}
          columns={columns}
          sx={{
            overflowY: 'auto',
            width: '100%'
          }}
        />
      </Card>
    </>
  )
}

export default TableMasterIndukKegiatan
