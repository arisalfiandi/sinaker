import * as React from 'react'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

// other
import Swal from 'sweetalert2'
import { useRouter } from 'next/dist/client/router'
import { DataGrid } from '@mui/x-data-grid'

// icon
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

const rows = [
  {
    id: 1,
    kodeGroup: '1 [Bidang]',
    isi: 'Bagian Umum [Bag TU]',
    fungsi: 'IPDS',
    action: 'edit/delete'
  },
  {
    id: 2,
    kodeGroup: '2 [Seksi]',
    isi: 'Subbagian Tata Usaha [Subbag TU]',
    fungsi: 'IPDS',
    action: 'edit/delete'
  },
  {
    id: 3,
    kodeGroup: '3 [Jabatan]',
    isi: '30 - Supervisor [SVR]',
    fungsi: 'IPDS',
    action: 'edit/delete'
  }
]

const TableMasterKode = () => {
  const router = useRouter()
  const handleDelete = () => {
    Swal.fire({
      title: 'Apa Anda Yakin?',
      text: 'Untuk menghapus kode kegiatan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Hapus  !'
    }).then(result => {
      if (result.isConfirmed) {
        router.push('/master-kode')
      } else {
        router.push('/master-kode')
      }
    })
  }

  const columns = [
    { field: 'id', headerName: 'No', type: 'string', width: 40 },
    { field: 'kodeGroup', headerName: 'Kode Group', width: 230 },
    { field: 'isi', headerName: 'Isi', width: 300 },
    { field: 'fungsi', headerName: 'Fungsi', type: 'string', width: 180 },
    {
      field: 'action',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Action</Typography>
      ),
      minWidth: 190,
      flex: 1,
      renderCell: () => (
        <>
          <Button type='submit' sx={{ mr: 1 }} color='info' variant='text'>
            <PencilOutline
              onClick={e => {
                router.push('/master-kode-edit')
              }}
            />
          </Button>

          <Button type='submit' sx={{ mr: 1 }} color='error' variant='text'>
            <DeleteOutline onClick={handleDelete} />
          </Button>
        </>
      )
    }
  ]

  return (
    <>
      <Grid item md={12}>
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
              width: '100%',
              alignItems: 'start'
            }}
          />
        </Card>
      </Grid>
    </>
  )
}

export default TableMasterKode
