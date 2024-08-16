// axios
import axios from 'src/pages/api/axios'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import Swal from 'sweetalert2'

// icon
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

const jenisSub = {
  63: { namaJenisSub: 'Pelatihan', color: 'warning' },
  64: { namaJenisSub: 'Persiapan', color: 'warning' },
  65: { namaJenisSub: 'Lapangan', color: 'warning' },
  66: { namaJenisSub: 'Pengawasan', color: 'warning' },
  67: { namaJenisSub: 'Pengolahan-Entri', color: 'warning' },
  68: { namaJenisSub: 'Evaluasi', color: 'warning' },
  69: { namaJenisSub: 'Diseminasi', color: 'warning' },
  70: { namaJenisSub: 'Pengolahan-Validasi', color: 'warning' }
}
const statusObj = {
  0: { color: 'warning', status: 'On Progress' },
  1: { color: 'success', status: 'Done' }
}

const TableManageTaskList = props => {
  const [subkeg, setSubKeg] = useState(props.data)
  const rows = subkeg.map(row => ({
    id: row.id,
    subKegiatan: row.title,
    jenisKegiatan: row.jenisKeg,
    realisasi: row.realisasi,
    target: row.target,
    status: row.status,
    deadline: new Date(row.duedate).toLocaleDateString('id')
  }))

  const router = useRouter()
  const handleDelete = async id => {
    axios
      .delete(`task/${id}`)
      .then(async res => {
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Berhasil dihapus'
        })
        router.reload()
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong'
        })
      })
  }

  const columns = [
    // { field: 'id', headerName: 'No', type: 'string', width: 70 },
    {
      field: 'subKegiatan',
      headerName: 'Sub Kegiatan',

      renderCell: params => (
        <Link
          onClick={e => {
            router.push(`/task-manage-edit/${params.row.id}`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ fontWeight: 500, textDecoration: 'underline', fontSize: '0.875rem !important' }}>
            {params.row.subKegiatan}
          </Typography>
        </Link>
      ),
      width: 200
    },
    {
      field: 'jenisKegiatan',
      headerName: 'Jenis Kegiatan',
      width: 150,
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {' '}
          {jenisSub[parseInt(params.row.jenisKegiatan)].namaJenisSub}
        </Typography>
      )
    },

    {
      field: 'realisasi',
      width: 70,
      headerName: 'Realisasi',
      type: 'string'
    },

    { field: 'target', headerName: 'Target', type: 'string', width: 70 },
    {
      field: 'status',
      renderCell: params => (
        <Chip
          label={statusObj[params.row.target / params.row.realisasi === 1 ? 1 : 0].status}
          color={statusObj[params.row.target / params.row.realisasi === 1 ? 1 : 0].color}
          sx={{
            height: 24,
            fontSize: '0.75rem',
            width: 100,
            textTransform: 'capitalize',
            '& .MuiChip-label': { fontWeight: 500 }
          }}
        />
      ),
      width: 120,
      headerName: 'Status',
      type: 'string'
    },
    { field: 'deadline', headerName: 'Deadline', width: 140, type: 'string' },
    {
      field: 'action',
      width: 150,
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Action</Typography>
      ),

      renderCell: params => (
        <>
          <Link>
            <Button
              onClick={e => {
                router.push(`/task-manage-edit/ ${params.row.id}`)
              }}
              type='submit'
              sx={{ mr: 1 }}
              color='info'
              variant='text'
            >
              <PencilOutline />
            </Button>
          </Link>

          <Button
            onClick={() => {
              Swal.fire({
                title: 'Hapus sub kegiatan?',
                text: '',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Hapus'
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
      )
    }
  ]

  return (
    <>
      <Grid item md={12} xs={12}>
        <Card>
          <DataGrid
            initialState={{
              sorting: {
                sortModel: [{ field: 'deadline', sort: 'asc' }]
              }
            }}
            rows={rows}
            columns={columns}
            sx={{ overflowX: 'scroll' }}
          />
        </Card>
      </Grid>
    </>
  )
}

export default TableManageTaskList
