// ** MUI Imports

import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/dist/client/router'

import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'

const data = [
  {
    id: 1,
    subKegiatan: 'Sub Kegiatan  1',
    jenisKegiatan: 64,
    realisasi: 10,
    target: 80,
    status: 0,
    deadline: '22/09/2023'
  },
  {
    id: 2,
    subKegiatan: 'Sub Kegiatan  2',
    jenisKegiatan: 67,
    realisasi: 10,
    target: 10,
    status: 0,
    deadline: '22/09/2023'
  },
  {
    id: 3,
    subKegiatan: 'Sub Kegiatan  3',
    jenisKegiatan: 65,
    realisasi: 30,
    target: 50,
    status: 0,
    deadline: '22/09/2023'
  },
  {
    id: 4,
    subKegiatan: 'Sub Kegiatan  4',
    jenisKegiatan: 66,
    realisasi: 10,
    target: 20,
    status: 0,
    deadline: '22/09/2023'
  },
  {
    id: 5,
    subKegiatan: 'Sub Kegiatan  5',
    jenisKegiatan: 69,
    realisasi: 60,
    target: 60,
    status: 1,
    deadline: '22/09/2023'
  }
]

const jenisSub = {
  63: { namaJenisSub: 'Pelatihan', color: 'warning' },
  64: { namaJenisSub: 'Persiapan', color: 'warning' },
  66: { namaJenisSub: 'Pelaksanaan', color: 'warning' },
  65: { namaJenisSub: 'Lapangan', color: 'warning' },
  67: { namaJenisSub: 'Pengolahan-Entri', color: 'warning' },
  68: { namaJenisSub: 'Evaluasi', color: 'warning' },
  69: { namaJenisSub: 'Diseminasi', color: 'warning' },
  70: { namaJenisSub: 'Pengolahan-Validasi', color: 'warning' }
}
const statusObj = {
  0: { color: 'warning', status: 'On Progress' },
  1: { color: 'success', status: 'Done' }
}
const TableProjectDetailTask = props => {
  const router = useRouter()
  const [subkeg, setSubKeg] = useState(props.data)

  const rows = subkeg.map(row => ({
    id: row.id,
    subKegiatan: row.title,
    jenisKegiatan: parseInt(row.jenisKeg),
    realisasi: row.realisasi,
    target: row.target,
    status: row.status,
    deadline: new Date(row.duedate).toLocaleDateString('id')
  }))

  const columns = [
    // { field: 'id', headerName: 'No', type: 'string', width: 70 },
    {
      field: 'subKegiatan',
      headerName: 'Sub Kegiatan',

      renderCell: params => (
        <Link
          onClick={async e => {
            router.push(`/task-detail/${params.row.id}`)
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
    { field: 'deadline', headerName: 'Deadline', width: 140, type: 'string' }
  ]

  return (
    <>
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
    </>
  )
}

export default TableProjectDetailTask
