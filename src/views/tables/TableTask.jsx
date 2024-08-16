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
  63: { namaJenisSub: 'Pelatihan', color: 'warning' },
  64: { namaJenisSub: 'Persiapan', color: 'warning' },
  65: { namaJenisSub: 'Lapangan', color: 'warning' },
  66: { namaJenisSub: 'Pengawasan', color: 'warning' },
  67: { namaJenisSub: 'Pengolahan', color: 'warning' },
  68: { namaJenisSub: 'Evaluasi', color: 'warning' },
  69: { namaJenisSub: 'Diseminasi', color: 'warning' },
  70: { namaJenisSub: 'Pengolahan-Validasi', color: 'warning' }
}

const TableTask = props => {
  const router = useRouter()
  const [task, setTask] = useState(props.data)

  console.log(task)
  const columns = [
    // { field: 'id', headerName: 'No', type: 'string', width: 70 },
    {
      field: 'taskName',
      renderCell: params => (
        <Link
          onClick={async e => {
            router.push(`/task-manage-edit/${params.row.taskId}`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography
            color={
              params.row.durationOff != 'Kegiatan belum dimulai'
                ? params.row.durationOff != 'Kegiatan belum dimulai'
                  ? params.row.realisasi <= params.row.akumulasiTargetHariIni
                    ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                      ? 'error.main'
                      : 'warning.main'
                    : 'success.main'
                  : 'secondary.dark'
                : 'secondary.dark'
            }
            sx={{ fontWeight: 500, textDecoration: 'underline', fontSize: '0.875rem !important' }}
          >
            {params.row.taskName}
          </Typography>
        </Link>
      ),
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Sub Kegiatan
        </Typography>
      ),
      headerName: 'Sub Kegiatan',
      width: 250
    },
    {
      field: 'kegiatanName',
      headerName: 'Kegiatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {' '}
          Kegiatan
        </Typography>
      ),
      renderCell: params => (
        <Link
          onClick={async e => {
            router.push(`/project-detail/${params.row.kegiatanNameid}`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography
            color={
              params.row.durationOff != 'Kegiatan belum dimulai'
                ? params.row.durationOff != 'Kegiatan belum dimulai'
                  ? params.row.realisasi <= params.row.akumulasiTargetHariIni
                    ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                      ? 'error.main'
                      : 'warning.main'
                    : 'success.main'
                  : 'secondary.dark'
                : 'secondary.dark'
            }
            sx={{ textDecoration: 'underline', fontWeight: 500, fontSize: '0.875rem !important' }}
          >
            {params.row.kegiatanName}
          </Typography>
        </Link>
      ),
      width: 200
    },
    {
      field: 'realisasi',
      headerName: 'Realisasi',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Realisasi
        </Typography>
      ),
      renderCell: params => (
        <Typography
          textAlign={'center'}
          color={
            params.row.durationOff != 'Kegiatan belum dimulai'
              ? params.row.durationOff != 'Kegiatan belum dimulai'
                ? params.row.realisasi <= params.row.akumulasiTargetHariIni
                  ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                    ? 'error.main'
                    : 'warning.main'
                  : 'success.main'
                : 'secondary.dark'
              : 'secondary.dark'
          }
          sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}
        >
          {params.row.realisasi}
        </Typography>
      ),
      width: 100
    },
    {
      field: 'target',
      headerName: 'Target',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Target</Typography>
      ),
      renderCell: params => (
        <Typography
          textAlign={'center'}
          color={
            params.row.durationOff != 'Kegiatan belum dimulai'
              ? params.row.durationOff != 'Kegiatan belum dimulai'
                ? params.row.realisasi <= params.row.akumulasiTargetHariIni
                  ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                    ? 'error.main'
                    : 'warning.main'
                  : 'success.main'
                : 'secondary.dark'
              : 'secondary.dark'
          }
          sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}
        >
          {params.row.target}
        </Typography>
      ),
      width: 100
    },

    {
      field: 'status',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Status</Typography>
      ),
      renderCell: params => (
        <>
          <Chip
            label={statusObj[params.row.status === 'Done' ? 1 : 0].status}
            color={statusObj[params.row.status === 'Done' ? 1 : 0].color}
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
      headerName: 'Status',
      type: 'string',
      width: 140
    },
    {
      field: 'jenisKegiatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Jenis Kegiatan
        </Typography>
      ),
      headerName: 'Jenis Kegiatan',
      renderCell: params => (
        <Typography
          color={
            params.row.durationOff != 'Kegiatan belum dimulai'
              ? params.row.durationOff != 'Kegiatan belum dimulai'
                ? params.row.realisasi <= params.row.akumulasiTargetHariIni
                  ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                    ? 'error.main'
                    : 'warning.main'
                  : 'success.main'
                : 'secondary.dark'
              : 'secondary.dark'
          }
          sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}
        >
          {' '}
          {jenisSub[parseInt(params.row.jenisKegiatan)].namaJenisSub}
        </Typography>
      ),
      type: 'string',
      width: 180
    },
    {
      field: 'startDate',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Tanggal Mulai
        </Typography>
      ),
      headerName: 'Deadline',
      renderCell: params => (
        <Typography
          color={
            params.row.durationOff != 'Kegiatan belum dimulai'
              ? params.row.durationOff != 'Kegiatan belum dimulai'
                ? params.row.realisasi <= params.row.akumulasiTargetHariIni
                  ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                    ? 'error.main'
                    : 'warning.main'
                  : 'success.main'
                : 'secondary.dark'
              : 'secondary.dark'
          }
          sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}
        >
          {' '}
          {params.row.startDate}
        </Typography>
      ),
      type: 'string',
      width: 180
    },
    {
      field: 'deadline',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Tanggal Berakhir
        </Typography>
      ),
      headerName: 'Deadline',
      renderCell: params => (
        <Typography
          color={
            params.row.durationOff != 'Kegiatan belum dimulai'
              ? params.row.durationOff != 'Kegiatan belum dimulai'
                ? params.row.realisasi <= params.row.akumulasiTargetHariIni
                  ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                    ? 'error.main'
                    : 'warning.main'
                  : 'success.main'
                : 'secondary.dark'
              : 'secondary.dark'
          }
          sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}
        >
          {' '}
          {params.row.deadline}
        </Typography>
      ),
      type: 'string',
      width: 180
    },
    {
      field: 'durasi',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Durasi</Typography>
      ),
      headerName: 'Durasi Kegiatan',
      renderCell: params => (
        <Typography
          textAlign={'center'}
          color={
            params.row.durationOff != 'Kegiatan belum dimulai'
              ? params.row.durationOff != 'Kegiatan belum dimulai'
                ? params.row.realisasi <= params.row.akumulasiTargetHariIni
                  ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                    ? 'error.main'
                    : 'warning.main'
                  : 'success.main'
                : 'secondary.dark'
              : 'secondary.dark'
          }
          sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}
        >
          {params.row.durasi} Hari
        </Typography>
      ),
      type: 'string',
      width: 180
    },
    {
      field: 'status2',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Target Harian
        </Typography>
      ),
      headerName: 'Target Harian',
      renderCell: params => (
        <Typography
          textAlign={'center'}
          color={
            params.row.durationOff != 'Kegiatan belum dimulai'
              ? params.row.durationOff != 'Kegiatan belum dimulai'
                ? params.row.realisasi <= params.row.akumulasiTargetHariIni
                  ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                    ? 'error.main'
                    : 'warning.main'
                  : 'success.main'
                : 'secondary.dark'
              : 'secondary.dark'
          }
          sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}
        >
          {params.row.status2}
        </Typography>
      ),
      type: 'string',
      width: 180
    },
    {
      field: 'durationOff',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Hari Berjalan
        </Typography>
      ),
      headerName: 'Hari Berjalan',
      renderCell: params => (
        <Typography
          textAlign={'center'}
          color={
            params.row.durationOff != 'Kegiatan belum dimulai'
              ? params.row.durationOff != 'Kegiatan belum dimulai'
                ? params.row.realisasi <= params.row.akumulasiTargetHariIni
                  ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                    ? 'error.main'
                    : 'warning.main'
                  : 'success.main'
                : 'secondary.dark'
              : 'secondary.dark'
          }
          sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}
        >
          {params.row.durationOff} Hari
        </Typography>
      ),
      type: 'string',
      width: 180
    },
    {
      field: 'akumulasiTargetHariIni',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Akumulasi Target Sampai Hari Ini
        </Typography>
      ),
      headerName: 'Akumulasi Target Sampai Hari Ini',
      renderCell: params => (
        <Typography
          color={
            params.row.durationOff != 'Kegiatan belum dimulai'
              ? params.row.durationOff != 'Kegiatan belum dimulai'
                ? params.row.realisasi <= params.row.akumulasiTargetHariIni
                  ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                    ? 'error.main'
                    : 'warning.main'
                  : 'success.main'
                : 'secondary.dark'
              : 'secondary.dark'
          }
          sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}
        >
          {' '}
          {params.row.akumulasiTargetHariIni}
        </Typography>
      ),
      type: 'string',
      width: 180
    }
  ]

  const data = []

  let nobaris = 1
  const rows = task.map(task => {
    const duedateObj = new Date(task.duedate)
    const startDateObj = new Date(task.startDate)
    const tanggalSekarang = new Date()

    const differenceInMilliseconds = duedateObj.getTime() - startDateObj.getTime()
    const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24) + 1

    const hariBerjalan =
      tanggalSekarang >= startDateObj
        ? tanggalSekarang <= duedateObj
          ? Math.round(Math.abs(tanggalSekarang.getTime() - startDateObj.getTime()) / (1000 * 3600 * 24)) + 1
          : 'Kegiatan telah selesai'
        : 'Kegiatan belum dimulai'
    const targetHarian = Math.round(task.target / differenceInDays)
    const akumulasiTargetHariIni =
      tanggalSekarang >= startDateObj
        ? tanggalSekarang <= duedateObj
          ? Number(targetHarian * hariBerjalan)
          : 'Kegiatan telah selesai'
        : 'Kegiatan belum dimulai'
    const yellowAkumulasiTargetHariIni =
      tanggalSekarang >= startDateObj
        ? tanggalSekarang <= duedateObj
          ? Math.round(targetHarian * hariBerjalan * 0.8)
          : 'Kegiatan telah selesai'
        : 'Kegiatan belum dimulai'

    return {
      ...task,
      id: nobaris++,
      taskName: task.title,
      taskId: task.id,
      kegiatanName: task.project.title,
      kegiatanNameid: task.project.id,
      jenisKegiatan: task.jenisKeg,
      target: task.target,
      realisasi: task.realisasi,
      status: task.target / task.realisasi === 1 ? 'Done' : 'On Progress',
      deadline: new Date(task.duedate).toLocaleDateString('id'),
      startDate: new Date(task.startDate).toLocaleDateString('id'),
      userId: task.userId,
      durasi: differenceInDays,
      status2: targetHarian,
      durationOff: hariBerjalan,
      akumulasiTargetHariIni,
      yellowAkumulasiTargetHariIni
    }
  })
  return (
    <>
      <Typography variant={'h5'} mb={5}>
        {' '}
        Sub Kegiatan
      </Typography>
      <Grid item md={12}>
        <Card height={300}>
          <DataGrid
            height={300}
            // initialState={{
            //   sorting: {
            //     sortModel: [{ field: 'deadline', sort: 'asc' }]
            //   }
            // }}
            rows={rows}
            columns={columns}
            sx={{
              height: rows.length > 3 ? '81vh' : '45vh',
              width: '100%'
            }}
          />
        </Card>
      </Grid>
    </>
  )
}

export default TableTask
