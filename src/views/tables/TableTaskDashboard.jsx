import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'

import { useRouter } from 'next/dist/client/router'

import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect, useRef } from 'react'

const statusObj = {
  0: { color: 'warning', status: 'On Progress' },
  1: { color: 'success', status: 'Done' }
}

const jenisSub = {
  64: { namaJenisSub: 'Persiapan', color: 'warning' },
  66: { namaJenisSub: 'Pelaksanaan', color: 'warning' },
  65: { namaJenisSub: 'Lapangan', color: 'warning' },
  67: { namaJenisSub: 'Pengolahan', color: 'warning' },
  68: { namaJenisSub: 'Evaluasi', color: 'warning' },
  69: { namaJenisSub: 'Diseminasi', color: 'warning' }
}

const TableTaskDashboard = props => {
  const router = useRouter()
  const [task, setTask] = useState(props.data)

  // const [dateSekarang, setDateSekarang] = useState({
  //   bulan: new Date().getMonth() + 1,
  //   tahun: new Date().getFullYear()
  // })

  // console.log(task)
  // useEffect(() => {
  //   task.map(task => {
  //     task.month == new Date().getMonth() + 1 && task.year == new Date().getFullYear() ? setTask(task) : 0
  //   })
  // }, [])
  const columns = [
    {
      field: 'kegiatanName',
      headerName: 'Kegiatan',
      renderCell: params => (
        <Link
          onClick={async e => {
            router.push(`/project-detail/${params.row.kegiatanNameid}`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ textDecoration: 'underline', fontWeight: 500, fontSize: '0.875rem !important' }}>
            {params.row.kegiatanName}
          </Typography>
        </Link>
      ),
      width: 140
    },
    {
      field: 'taskName',
      renderCell: params => (
        <Link
          onClick={async e => {
            router.push(`/task-manage-edit/${params.row.taskId}`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ fontWeight: 500, textDecoration: 'underline', fontSize: '0.875rem !important' }}>
            {params.row.taskName}
          </Typography>
        </Link>
      ),

      headerName: 'Sub Kegiatan',
      width: 200
    },

    {
      field: 'target',
      headerName: 'Realisasi/Target',
      renderCell: params => (
        <Typography textAlign={'center'} sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {params.row.realisasi} / {params.row.target}
        </Typography>
      ),
      width: 140
    },
    {
      field: 'persentase',
      headerName: 'Persentase progres',
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {params.row.target === 0 || params.row.realisasi === 0
            ? 0
            : Math.round(100 * (Number(params.row.target - params.row.realisasi) / Number(params.row.target)))}
          %
        </Typography>
      ),
      type: 'string',
      width: 180
    },

    {
      field: 'deadline',
      headerName: 'Deadline',
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}> {params.row.deadline}</Typography>
      ),
      type: 'string',
      width: 180
    }
  ]

  const data = []
  const rows = task
    .filter(row => new Date().getMonth() + 1 == row.month && row.year == new Date().getFullYear())
    .map(row => ({
      id: row.id,
      taskName: row.title,
      taskId: row.id,
      kegiatanName: row.project.title,
      kegiatanNameid: row.project.id,
      jenisKegiatan: row.jenisKeg,
      target: row.target,
      realisasi: row.realisasi,
      status: 'see',
      deadline: new Date(row.duedate).toLocaleDateString('id'),
      userId: row.userId
    }))
  // task.length >= 1
  //   ? task.map(task => ({
  //       id: task.id,
  //       taskName: task.title,
  //       taskId: task.id,
  //       kegiatanName: task.project.title,
  //       kegiatanNameid: task.project.id,
  //       jenisKegiatan: task.jenisKeg,
  //       target: task.target,
  //       realisasi: task.realisasi,
  //       status: 'see',
  //       deadline: new Date(task.duedate).toLocaleDateString('id'),
  //       userId: task.userId
  //     }))
  //   : {
  //       id: task.id,
  //       taskName: task.title,
  //       taskId: task.id,
  //       kegiatanName: task.project.title,
  //       kegiatanNameid: task.project.id,
  //       jenisKegiatan: task.jenisKeg,
  //       target: task.target,
  //       realisasi: task.realisasi,
  //       status: 'see',
  //       deadline: new Date(task.duedate).toLocaleDateString('id'),
  //       userId: task.userId
  //     }
  return (
    <>
      <Grid item md={12}>
        <DataGrid
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
      </Grid>
    </>
  )
}

export default TableTaskDashboard
