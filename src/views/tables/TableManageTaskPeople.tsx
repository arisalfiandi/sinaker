import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'

// icon
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

const columns = [
  { field: 'id', headerName: 'No', type: 'string', width: 40 },
  { field: 'nama', headerName: 'Nama', width: 230 },
  { field: 'totalGaji', headerName: 'Total Gaji', type: 'string', width: 280 },
  { field: 'jumlahKegiatan', headerName: 'Jumlah Kegiatan', width: 260 }
]

const rows = [
  {
    id: 1,
    nama: 'Pegawai1',
    totalGaji: 320000,
    fungsi: 'Distribusi',
    jumlahKegiatan: '5'
  },
  {
    id: 2,
    nama: 'Pegawai2',
    totalGaji: 440000,
    fungsi: 'IPDS',
    jumlahKegiatan: '4'
  },
  {
    id: 3,
    nama: 'Pegawai3',
    totalGaji: 140000,
    fungsi: 'IPDS',
    jumlahKegiatan: '4'
  },
  {
    id: 4,
    nama: 'pegawai4',
    totalGaji: 200000,
    fungsi: 'Produksi',
    jumlahKegiatan: '2'
  }
]

const TableManageTaskList = () => {
  return (
    <>
      <Grid item md={12} xs={11}>
        <Card>
          <DataGrid
            initialState={{
              sorting: {
                sortModel: [{ field: 'deadline', sort: 'asc' }]
              }
            }}
            rows={rows}
            columns={columns}
            sx={{ overflowX: 'auto' }}
          />
        </Card>
      </Grid>
    </>
  )
}

export default TableManageTaskList
