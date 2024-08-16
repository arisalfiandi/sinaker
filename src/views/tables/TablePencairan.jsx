import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'

import { useRouter } from 'next/dist/client/router'

import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

const statusObj = {
  0: { color: 'info', status: 'Belum Mulai' },
  1: { color: 'warning', status: 'On Progress' },
  2: { color: 'success', status: 'Selesai' }
}

// const array_aksi = {
//   0: { Aksi: 'Selengkapnya' },
//   1: { Aksi: 'Selengkapnya' },
//   2: { Aksi: 'Selengkapnya' },
//   3: { Aksi: 'Selengkapnya' },
//   4: { Aksi: 'Selengkapnya' },
//   99: { Aksi: 'Mulai Pencairan' }
// }

// const array_aksi_role = {
//   0: { Aksi: 'Upload Dokumen' },
//   1: { Aksi: 'Review' },
//   2: { Aksi: 'Upload SPM' },
//   3: { Aksi: 'Selengkapnya' },
//   4: { Aksi: 'Selengkapnya' },
//   99: { Aksi: 'Mulai Pencairan' }
// }

const TableTask = props => {
  const router = useRouter()
  const session = useSession()
  const [data, setData] = useState(props.data)
  const [kategori, setKategori] = useState(props.kategori)

  const handleClickPencairan = async (e, id) => {
    e.preventDefault()
    const currentDate = new Date()
    const tanggal1BulanKemudian = new Date(currentDate)
    tanggal1BulanKemudian.setMonth(tanggal1BulanKemudian.getMonth() + 1)

    try {
      while (true) {
        const res = await axios.post('/pencairan', {
          taskId: id,
          tahapanId: 0,
          status: 1,
          tanggalMulai: currentDate,
          tanggalSelesai: currentDate,
          tanggalSPM: tanggal1BulanKemudian
        })

        if (res.status === 201) {
          Swal.fire({
            title: 'Berhasil memulai proses pencairan',
            text: 'Press OK to continue',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          }).then(router.push(`/pencairan-detail/${id}`))
        }

        break
      }
    } catch (error) {
      Swal.fire({
        title: 'Gagal memulai proses pencairan',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  const handleSeePencairan = (e, id) => {
    e.preventDefault()
    router.push(`/pencairan-detail/${id}`)
  }

  const columns = [
    // { field: 'id', headerName: 'No', type: 'string', width: 70 },
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
        // onClick={async e => {
        //   router.push(`/project-detail/${params.row.kegiatanNameid}`)
        // }}
        // sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ textDecoration: 'underline', fontWeight: 500, fontSize: '0.875rem !important' }}>
            {params.row.kegiatanName}
          </Typography>
        </Link>
      ),
      width: 250
    },
    {
      field: 'taskName',
      renderCell: params => (
        <Link
        // onClick={async e => {
        //   router.push(`/task--manage-edit/${params.row.taskId}`)
        // }}
        // sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ fontWeight: 500, textDecoration: 'underline', fontSize: '0.875rem !important' }}>
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
      width: 220
    },
    {
      field: 'tanggal',
      headerName: 'Tanggal',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Tanggal</Typography>
      ),
      renderCell: params => (
        <Typography textAlign={'center'} sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {params.row.tanggal}
        </Typography>
      ),
      width: 180
    },
    {
      field: 'tahap',
      headerName: 'Tahap',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Tahap</Typography>
      ),
      renderCell: params => (
        <Typography textAlign={'center'} sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {params.row.tahap}
        </Typography>
      ),
      width: 150
    },
    {
      field: 'keterangan',
      headerName: 'Keternagan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Keterangan
        </Typography>
      ),
      renderCell: params => (
        <Typography textAlign={'center'} sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {params.row.keterangan}
        </Typography>
      ),
      width: 250
    },

    // {
    //   field: 'status',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Status</Typography>
    //   ),
    //   renderCell: params => (
    //     <>
    //       <Chip
    //         label={statusObj[params.row.status].status}
    //         color={statusObj[params.row.status].color}
    //         sx={{
    //           height: 24,
    //           fontSize: '0.75rem',
    //           width: 100,
    //           textTransform: 'capitalize',
    //           '& .MuiChip-label': { fontWeight: 500 }
    //         }}
    //       />
    //     </>
    //   ),
    //   headerName: 'Status',
    //   type: 'string',
    //   width: 140
    // },
    {
      field: 'aksi',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Aksi</Typography>
      ),
      headerName: 'Aksi',
      renderCell: params => (
        <Link
          onClick={e =>
            params.row.aksi == 99
              ? handleClickPencairan(e, params.row.taskId)
              : handleSeePencairan(e, params.row.taskId)
          }
        >
          <Button
            variant='outlined'
            color={
              params.row.aksi === 99 && session?.data?.role == 'teamleader'
                ? 'info'
                : params.row.aksi === 0 && session?.data?.role == 'teamleader'
                ? 'primary'
                : params.row.aksi === 1 && session?.data?.role == 'verifikator'
                ? 'primary'
                : params.row.aksi === 2 && session?.data?.role == 'ppspm'
                ? 'primary'
                : params.row.aksi === 3 && session?.data?.role == 'bendahara'
                ? 'primary'
                : 'success'
            }
          >
            {params.row.aksi === 99 && session?.data?.role == 'teamleader'
              ? 'Mulai Pencairan'
              : params.row.aksi === 0 && session?.data?.role == 'teamleader'
              ? 'Upload Dokumen'
              : params.row.aksi === 1 && session?.data?.role == 'verifikator'
              ? 'Review'
              : params.row.aksi === 2 && session?.data?.role == 'ppspm'
              ? 'Upload SPM'
              : params.row.aksi === 3 && session?.data?.role == 'bendahara'
              ? 'Lakukan Pencairan'
              : 'Selengkapnya'}
          </Button>
        </Link>
      ),
      type: 'string',
      width: 200
    }
  ]

  useEffect(() => {
    setKategori(props.kategori)
  }, [props.kategori])

  let nobaris = 1
  const rows = data.map(task => ({
    id: nobaris++,
    taskName: task.title,
    taskId: task.id,
    kegiatanName: task.project.title,
    kegiatanNameid: task.project.id,
    tahap: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].tahapan.nama : 'Belum Dimulai') : 'Belum Dimulai',
    keterangan: task.pencairan
      ? task.pencairan[0]
        ? task.pencairan[0].tahapan.deskripsi
        : 'Belum Dimulai'
      : 'Belum Dimulai',
    status: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].status : 0) : 0,
    aksi: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].tahapanId : 99) : 99,
    userId: task.userId,
    tanggal:
      new Date(task.project.startdate).toLocaleDateString('id') + '-' + new Date(task.duedate).toLocaleDateString('id')
  }))

  // const [rowsPJK, setRowsPJK] = useState(
  //   task
  //     .map(task => ({
  //       id: nobaris++,
  //       taskName: task.title,
  //       taskId: task.id,
  //       kegiatanName: task.project.title,
  //       kegiatanNameid: task.project.id,
  //       kegiatanLeader: task.project.projectLeaderId,
  //       tahap: task.pencairan
  //         ? task.pencairan[0]
  //           ? task.pencairan[0].tahapan.nama
  //           : 'Belum Dimulai'
  //         : 'Belum Dimulai',
  //       keterangan: task.pencairan
  //         ? task.pencairan[0]
  //           ? task.pencairan[0].tahapan.deskripsi
  //           : 'Belum Dimulai'
  //         : 'Belum Dimulai',
  //       status: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].status : 0) : 0,
  //       aksi: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].tahapanId : 99) : 99,
  //       userId: task.userId
  //     }))
  //     .filter(row =>
  //       kategori === 1
  //         ? (row.status === 0 || row.aksi === 0) && row.kegiatanLeader == session.data.uid
  //         : (row.status >= 0 || row.aksi >= 0) && row.kegiatanLeader == session.data.uid
  //     )
  // )

  const [rowsPJK, setRowsPJK] = useState([])
  const [rowsVerifikator, setRowsVerifikator] = useState([])
  const [rowsPPSPM, setRowsPPSPM] = useState([])
  const [rowsBendahara, setRowsBendahara] = useState([])

  console.log(data)
  console.log(session.data.uid)

  useEffect(() => {
    const updatedRowsPJK = data
      .map(task => ({
        id: nobaris++,
        taskName: task.title,
        taskId: task.id,
        kegiatanName: task.project.title,
        kegiatanNameid: task.project.id,
        kegiatanLeader: task.project.projectLeaderId,
        tahap: task.pencairan
          ? task.pencairan[0]
            ? task.pencairan[0].tahapan.nama
            : 'Belum Dimulai'
          : 'Belum Dimulai',
        keterangan: task.pencairan
          ? task.pencairan[0]
            ? task.pencairan[0].tahapan.deskripsi
            : 'Belum Dimulai'
          : 'Belum Dimulai',
        status: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].status : 0) : 0,
        aksi: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].tahapanId : 99) : 99,
        userId: task.userId,
        tanggal:
          new Date(task.project.startdate).toLocaleDateString('id') +
          '-' +
          new Date(task.duedate).toLocaleDateString('id')
      }))
      .filter(row =>
        kategori === 1
          ? (row.status === 0 || row.aksi === 0) && row.kegiatanLeader == session.data.uid
          : (row.status >= 0 || row.aksi >= 0) && row.kegiatanLeader == session.data.uid
      )

    setRowsPJK(updatedRowsPJK)
    // verifikator
    const updatedRowsVerifikator = data
      .map(task => ({
        id: nobaris++,
        taskName: task.title,
        taskId: task.id,
        kegiatanName: task.project.title,
        kegiatanNameid: task.project.id,
        kegiatanLeader: task.project.projectLeaderId,
        tahap: task.pencairan
          ? task.pencairan[0]
            ? task.pencairan[0].tahapan.nama
            : 'Belum Dimulai'
          : 'Belum Dimulai',
        keterangan: task.pencairan
          ? task.pencairan[0]
            ? task.pencairan[0].tahapan.deskripsi
            : 'Belum Dimulai'
          : 'Belum Dimulai',
        status: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].status : 0) : 0,
        aksi: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].tahapanId : 99) : 99,
        userId: task.userId,
        tanggal:
          new Date(task.project.startdate).toLocaleDateString('id') +
          '-' +
          new Date(task.duedate).toLocaleDateString('id')
      }))
      .filter(row => (kategori === 1 ? row.aksi === 1 : row.aksi >= 1 && row.aksi !== 99))

    setRowsVerifikator(updatedRowsVerifikator)

    // ppspm
    const updatedRowsPPSPM = data
      .map(task => ({
        id: nobaris++,
        taskName: task.title,
        taskId: task.id,
        kegiatanName: task.project.title,
        kegiatanNameid: task.project.id,
        kegiatanLeader: task.project.projectLeaderId,
        tahap: task.pencairan
          ? task.pencairan[0]
            ? task.pencairan[0].tahapan.nama
            : 'Belum Dimulai'
          : 'Belum Dimulai',
        keterangan: task.pencairan
          ? task.pencairan[0]
            ? task.pencairan[0].tahapan.deskripsi
            : 'Belum Dimulai'
          : 'Belum Dimulai',
        status: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].status : 0) : 0,
        aksi: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].tahapanId : 99) : 99,
        userId: task.userId,
        tanggal:
          new Date(task.project.startdate).toLocaleDateString('id') +
          '-' +
          new Date(task.duedate).toLocaleDateString('id')
      }))
      .filter(row => (kategori === 1 ? row.aksi === 2 : row.aksi >= 2 && row.aksi !== 99))

    setRowsPPSPM(updatedRowsPPSPM)

    // Bendahara
    const updatedRowsBendahara = data
      .map(task => ({
        id: nobaris++,
        taskName: task.title,
        taskId: task.id,
        kegiatanName: task.project.title,
        kegiatanNameid: task.project.id,
        kegiatanLeader: task.project.projectLeaderId,
        tahap: task.pencairan
          ? task.pencairan[0]
            ? task.pencairan[0].tahapan.nama
            : 'Belum Dimulai'
          : 'Belum Dimulai',
        keterangan: task.pencairan
          ? task.pencairan[0]
            ? task.pencairan[0].tahapan.deskripsi
            : 'Belum Dimulai'
          : 'Belum Dimulai',
        status: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].status : 0) : 0,
        aksi: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].tahapanId : 99) : 99,
        userId: task.userId,
        tanggal:
          new Date(task.project.startdate).toLocaleDateString('id') +
          '-' +
          new Date(task.duedate).toLocaleDateString('id')
      }))
      .filter(row => (kategori === 1 ? row.aksi === 3 : row.aksi >= 3 && row.aksi !== 99))

    setRowsBendahara(updatedRowsBendahara)
  }, [data, kategori, session.data.uid])

  // const rowsVerifikator = task
  //   .map(task => ({
  //     id: nobaris++,
  //     taskName: task.title,
  //     taskId: task.id,
  //     kegiatanName: task.project.title,
  //     kegiatanNameid: task.project.id,
  //     tahap: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].tahapan.nama : 'Belum Dimulai') : 'Belum Dimulai',
  //     keterangan: task.pencairan
  //       ? task.pencairan[0]
  //         ? task.pencairan[0].tahapan.deskripsi
  //         : 'Belum Dimulai'
  //       : 'Belum Dimulai',
  //     status: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].status : 0) : 0,
  //     aksi: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].tahapanId : 99) : 99,
  //     userId: task.userId
  //   }))
  //   .filter(row => row.aksi === 1)

  // const rowsPPSPM = task
  //   .map(task => ({
  //     id: nobaris++,
  //     taskName: task.title,
  //     taskId: task.id,
  //     kegiatanName: task.project.title,
  //     kegiatanNameid: task.project.id,
  //     tahap: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].tahapan.nama : 'Belum Dimulai') : 'Belum Dimulai',
  //     keterangan: task.pencairan
  //       ? task.pencairan[0]
  //         ? task.pencairan[0].tahapan.deskripsi
  //         : 'Belum Dimulai'
  //       : 'Belum Dimulai',
  //     status: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].status : 0) : 0,
  //     aksi: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].tahapanId : 99) : 99,
  //     userId: task.userId
  //   }))
  //   .filter(row => row.aksi === 2)

  // const rowsBendahara = task
  //   .map(task => ({
  //     id: nobaris++,
  //     taskName: task.title,
  //     taskId: task.id,
  //     kegiatanName: task.project.title,
  //     kegiatanNameid: task.project.id,
  //     tahap: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].tahapan.nama : 'Belum Dimulai') : 'Belum Dimulai',
  //     keterangan: task.pencairan
  //       ? task.pencairan[0]
  //         ? task.pencairan[0].tahapan.deskripsi
  //         : 'Belum Dimulai'
  //       : 'Belum Dimulai',
  //     status: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].status : 0) : 0,
  //     aksi: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].tahapanId : 99) : 99,
  //     userId: task.userId
  //   }))
  //   .filter(row => row.aksi === 3)

  console.log(rowsVerifikator)

  return (
    <>
      <Grid item md={12}>
        <Card height={300}>
          <DataGrid
            height={300}
            initialState={{
              sorting: {
                sortModel: [
                  { field: 'aksi', sort: 'desc' },
                  { field: 'tanggal', sort: 'desc' }
                ]
              }
            }}
            rows={
              session?.data?.role == 'teamleader'
                ? rowsPJK
                : session?.data?.role == 'verifikator'
                ? rowsVerifikator
                : session?.data?.role == 'ppspm'
                ? rowsPPSPM
                : session?.data?.role == 'bendahara'
                ? rowsBendahara
                : rows
            }
            columns={columns}
            sx={{
              height: '70vh',
              width: '100%'
            }}
          />
        </Card>
      </Grid>
    </>
  )
}

export default TableTask
