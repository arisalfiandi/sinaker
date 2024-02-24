import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'

import { useRouter } from 'next/dist/client/router'

import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect, useRef } from 'react'

const TableKegiatanList = props => {
  const router = useRouter()
  const [kegiatan, setKegiatan] = useState(props.data)
  console.log('table')
  console.log(kegiatan)
  console.log('table')
  const columns = [
    {
      field: 'kegiatanName',
      renderCell: params => (
        <Link
          onClick={async e => {
            router.push(`/project-detail/${params.row.id}`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ fontWeight: 500, textDecoration: 'underline', fontSize: '0.875rem !important' }}>
            {params.row.kegiatanName}
          </Typography>
        </Link>
      ),
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Nama Kegiatan
        </Typography>
      ),
      headerName: 'Nama Kegiatan',
      width: 250
    },
    {
      field: 'penanggungJawab',
      renderCell: params => (
        <Typography sx={{ fontSize: '0.875rem !important' }}>{params.row.penanggungJawab}</Typography>
      ),
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Penanggung Jawab Kegiatan
        </Typography>
      ),
      headerName: 'Penanngung Jawab Kegiatan',
      width: 250
    },
    {
      field: 'totalSubKegiatan',
      renderCell: params => (
        <Typography sx={{ fontSize: '0.875rem !important' }}>{params.row.totalSubKegiatan}</Typography>
      ),
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Total Sub Kegiatan
        </Typography>
      ),
      width: 250
    },
    {
      field: 'totalProses',
      renderCell: params => (
        <Typography sx={{ fontSize: '0.875rem !important' }}>
          {Math.round(
            params.row.subkegiatan.length > 0 &&
              params.row.subkegiatan.every(item => item.realisasi !== undefined && item.realisasi !== null) &&
              params.row.subkegiatan.every(item => item.target !== undefined && item.target !== null)
              ? (100 * params.row.subkegiatan.reduce((acc, cur) => acc + cur.realisasi, 0)) /
                  params.row.subkegiatan.reduce((acc, cur) => acc + cur.target, 0) <
                100
                ? (100 * params.row.subkegiatan.reduce((acc, cur) => acc + cur.realisasi, 0)) /
                  params.row.subkegiatan.reduce((acc, cur) => acc + cur.target, 0)
                : 0
              : 0
          )}
          %
        </Typography>
      ),
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Total Progres
        </Typography>
      ),
      width: 250
    }
  ]

  const rows = kegiatan.map(keg => ({
    id: keg.project.id,
    kegiatanName: keg.project.title,
    pjkId: keg.project.projectLeader.id,
    penanggungJawab: keg.project.projectLeader.name,
    subkegiatan: keg.project.Task,
    totalSubKegiatan: keg.project.Task.length,
    totalRealisasi: keg.project.Task.reduce((accumulator, currentTask) => accumulator + currentTask.realisasi, 0),
    totalTarget: keg.project.Task.reduce((accumulator, currentTask) => accumulator + currentTask.target, 0),
    projectProgress:
      keg.project.Task.realisasi !== undefined && keg.project.Task.realisasi !== null
        ? 100 * (totalRealisasi / totalTarget)
        : 0,
    gabs:
      keg.project.Task.reduce((acc, cur) => acc + cur.realisasi, 0) !== undefined &&
      keg.project.Task.reduce((acc, cur) => acc + cur.realisasi, 0) !== null
        ? 100 *
          (keg.project.Task.reduce((acc, cur) => acc + cur.realisasi, 0) /
            keg.project.Task.reduce((acc, cur) => acc + cur.target, 0))
        : 0
  }))
  return (
    <>
      <Grid item md={12}>
        <Card>
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
        </Card>
      </Grid>
    </>
  )
}

export default TableKegiatanList
