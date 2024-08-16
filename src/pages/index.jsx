import * as React from 'react'
import { useState, useEffect } from 'react'
import prisma from '../services/db'
import { getToken } from 'next-auth/jwt'

// ** MUI Imports
import InputLabel from '@mui/material/InputLabel'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

import Link from '@mui/material/Link'
import Chip from '@mui/material/Chip'

import Divider from '@mui/material/Divider'
import { signOut, useSession } from 'next-auth/react'

import { useRouter } from 'next/dist/client/router'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
// ** MUI chart
// import { BarPlot } from '@mui/x-charts/BarChart'
// import { ChartContainer } from '@mui/x-charts/ChartContainer'

// Chart js
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
Chart.register(CategoryScale)

import LinearProgress from '@mui/material/LinearProgress'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import TabelTaskDashboard from 'src/views/tables/TableTaskDashboard'
import TableTaskDashboard from 'src/views/tables/TableTaskDashboard'

// const Dashboard = ({ dataTask }) => {
//   const session = useSession()
//   const [user, setUser] = useState({})
//   const getUser = async () => {
//     setUser(prev => {
//       return {
//         ...prev,
//         name: session?.data?.user?.name,
//         role: session?.data?.role
//       }
//     })
//   }

//   useEffect(() => {
//     if (session.status === 'authenticated') {
//       getUser()
//     }
//   }, [session])
//   const BulanSekarang = new Date().getMonth() + 1
//   const [task, setTask] = useState(JSON.parse(dataTask))
//   const [targetBulanIni, setTargetBulanIni] = useState(0)
//   const [realisasiBulanIni, setRealisasiBulanIni] = useState(0)

//   const dataawal = [12, 19, 3, 5, 2, 3, 8, 10, 6, 7, 14, 12]
//   const realisasiAwal = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))

//   // State Bar
//   const [targetBar, setTargetBar] = useState(dataawal)
//   const [realisasiBar, setRealisasiBar] = useState(dataawal)
//   const [valueDropBar, setvalueDropBar] = useState(0)
//   const [tahunBar, SetTahunBar] = useState(2023)

//   // State Line
//   const [bulan, SetBulan] = useState(1)
//   const [valueDropLine, setvalueDropLine] = useState(0)
//   const [targetLine, setTargetLine] = useState(realisasiAwal)
//   const [realisasiLine, setRealisasiLine] = useState(dataawal)
//   const [labelsLine, setLabelsLine] = useState(dataawal)

//   // State doughnut
//   const [doughnut, setDoughnut] = useState(0)

//   // state LineProgress
//   const [linearProgress, setLinearProgress] = useState(0)
//   const [totalTarget, setTotalTarget] = useState(0)
//   const [totalRealisasi, setTotalRealisasi] = useState(0)
//   const [linearProgressP, setLinearProgressP] = useState(0)
//   const [totalTargetP, setTotalTargetP] = useState(0)
//   const [totalRealisasiP, setTotalRealisasiP] = useState(0)

//   // handle dropdown
//   const handleChangeBulan = event => {
//     SetBulan(event.target.value)
//   }

//   const handleChangeBar = event => {
//     const untukTarget = []
//     const untukRealisasi = []

//     for (let value = 2; value <= 7; value++) {
//       if (event.target.value === value) {
//         let targetAccumulator = 0
//         let realisasiAccumulator = 0

//         for (let month = 1; month <= 12; month++) {
//           let monthlyTarget = 0
//           let monthlyRealisasi = 0

//           task.forEach(task => {
//             if (task.project.fungsi === value && task.month === month && task.year === tahunBar) {
//               monthlyTarget += task.target
//               monthlyRealisasi += task.realisasi
//             }
//           })

//           targetAccumulator += monthlyTarget
//           realisasiAccumulator += monthlyRealisasi

//           untukTarget.push(targetAccumulator)
//           untukRealisasi.push(realisasiAccumulator)

//           // Mengatur ulang akumulator ke 0 untuk bulan selanjutnya
//           targetAccumulator = 0
//           realisasiAccumulator = 0
//         }

//         setTargetBar(untukTarget)
//         setRealisasiBar(untukRealisasi)

//         break // Keluar dari loop setelah menemukan nilai yang sesuai
//       }
//     }

//     setvalueDropBar(event.target.value)
//   }

//   const handleChangeBarTahun = event => {
//     SetTahunBar(event.target.value)
//   }

//   const handleChangeLine = event => {
//     setvalueDropLine(event.target.value)
//   }

//   // UE here, refresh data
//   const calculateTargetAndRealisasi = () => {
//     const untukTarget = []
//     const untukRealisasi = []

//     let targetAccumulator = 0
//     let realisasiAccumulator = 0

//     for (let month = 1; month <= 12; month++) {
//       let monthlyTarget = 0
//       let monthlyRealisasi = 0

//       task.forEach(task => {
//         if (task.project.fungsi === valueDropBar && task.month === month && task.year === tahunBar) {
//           monthlyTarget += task.target
//           monthlyRealisasi += task.realisasi
//         }
//       })

//       targetAccumulator += monthlyTarget
//       realisasiAccumulator += monthlyRealisasi

//       untukTarget.push(targetAccumulator)
//       untukRealisasi.push(realisasiAccumulator)

//       targetAccumulator = 0
//       realisasiAccumulator = 0
//     }

//     setTargetBar(untukTarget)
//     setRealisasiBar(untukRealisasi)
//   }

//   useEffect(() => {
//     calculateTargetAndRealisasi()
//   }, [tahunBar])

//   useEffect(() => {
//     let hasil = task.reduce(
//       (acc, angka) => {
//         if (angka.project.fungsi) {
//           if (angka.project.fungsi >= 1 && angka.project.fungsi <= 7) {
//             acc[angka.project.fungsi - 1]++
//           }
//         }
//         return acc
//       },
//       [0, 0, 0, 0, 0, 0, 0]
//     )
//     setDoughnut(hasil)
//   }, [])

//   useEffect(() => {
//     let tmp = 0
//     let hasil = task.reduce(
//       (acc, angka) => {
//         if (angka.month === BulanSekarang && angka.year === new Date().getFullYear()) {
//           tmp += Number(angka.target)
//         }
//         return tmp
//       },
//       [0]
//     )
//     setTargetBulanIni(hasil)
//   }, [])

//   useEffect(() => {
//     let tmp = 0
//     let hasil = task.reduce(
//       (acc, angka) => {
//         if (angka.month === BulanSekarang && angka.year === new Date().getFullYear()) {
//           tmp += Number(angka.realisasi)
//         }
//         return tmp
//       },
//       [0]
//     )
//     setRealisasiBulanIni(hasil)
//   }, [])

//   // update data saat dropdown bulan line diganti
//   useEffect(() => {
//     const untukTargetLine = []
//     const untukRealisasiLine = []
//     const untukLabelsLine = []
//     task.map(task => {
//       if (task.month === bulan) {
//         untukTargetLine.push(task.target)
//         untukRealisasiLine.push(task.realisasi)
//         untukLabelsLine.push(task.title)
//       }
//     })
//     setTargetLine(untukTargetLine)
//     setRealisasiLine(untukRealisasiLine)
//     setLabelsLine(untukLabelsLine)
//   }, [bulan])

//   // update data saat dropdown fungsi line diganti

//   // useEffect(() => {
//   //   const untukTargetLine = []
//   //   const untukRealisasiLine = []
//   //   const untukLabelsLine = []
//   //   task.map(task => {
//   //     if (task.month === bulan && task.project.fungsi === valueDropLine) {
//   //       untukTargetLine.push(task.target)
//   //       untukRealisasiLine.push(task.realisasi)
//   //       untukLabelsLine.push(task.title)
//   //     }
//   //   })
//   //   setTargetLine(untukTargetLine)
//   //   setRealisasiLine(untukRealisasiLine)
//   //   setLabelsLine(untukLabelsLine)

//   // }, [valueDropLine])

//   useEffect(() => {
//     const untukLinearProgress = 0
//     let targetLinear = 0
//     let realisasiLinear = 0
//     const untukLinearProgressP = 0
//     let targetLinearP = 0
//     let realisasiLinearP = 0

//     task.map(task => {
//       if (task.jenisSample === 1) {
//         targetLinear += task.target
//         realisasiLinear += task.realisasi
//       } else if (task.jenisSample == 0) {
//         targetLinearP += task.target
//         realisasiLinearP += task.realisasi
//       }
//     })
//     untukLinearProgress = targetLinear == 0 ? 0 : 100 * (realisasiLinear / targetLinear)
//     untukLinearProgressP = targetLinearP == 0 ? 0 : 100 * (realisasiLinearP / targetLinearP)

//     setLinearProgress(untukLinearProgress)
//     setTotalRealisasi(realisasiLinear)
//     setTotalTarget(targetLinear)

//     setLinearProgressP(untukLinearProgressP)
//     setTotalRealisasiP(realisasiLinearP)
//     setTotalTargetP(targetLinearP)
//   }, [task])

//   // data buat chartnya
//   const dataBar = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//     datasets: [
//       {
//         label: 'Target',
//         data: targetBar,
//         backgroundColor: ['rgba(255, 99, 132,1)']
//       },
//       {
//         label: 'Realisasi',
//         data: realisasiBar,
//         backgroundColor: ['rgba(255, 159, 64,1)']
//       }
//     ]
//   }

//   const dataLine = {
//     labels: labelsLine,
//     datasets: [
//       {
//         label: 'Target',
//         data: targetLine,
//         backgroundColor: ['rgba(255, 99, 132, 1)']
//       },
//       {
//         label: 'Realisasi',
//         data: realisasiLine,
//         backgroundColor: ['rgba(25, 19, 132, 1)']
//       }
//     ]
//   }

//   const dataDoughnut = {
//     datasets: [
//       {
//         data: [targetBulanIni - realisasiBulanIni, realisasiBulanIni],
//         backgroundColor: [
//           // 'rgba(49, 10, 49,1)',
//           // 'rgba(115, 93, 120,1)'
//           'rgba(167, 196, 194,1)',
//           'rgba(151, 239, 233,1)'
//           // 'rgba(255, 159, 64,1)'
//         ]
//       }
//     ],

//     // labels: ['Sosial', 'Produksi', 'IPDS', 'Distribusi', 'Nerwilis']
//     labels: ['Total Target yang Belum Terealisasi', 'Total Realisasi ']
//   }

//   return (
//     <ApexChartWrapper>
//       {/* <Button onClick={signOut()}>LogOut</Button> */}
//       <Grid container spacing={4}>
//         <Grid item xs={12} md={8}>
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={12}>
//               <Card sx={{ overflowY: 'scroll', padding: 4, height: 250 }}>
//                 <Typography variant={'h6'}>Sub Kegiatan bulan ini</Typography>
//                 <TableTaskDashboard data={task}></TableTaskDashboard>
//               </Card>
//             </Grid>
//             <Grid item xs={6} md={6}>
//               <Card sx={{ padding: 4, height: 200 }}>
//                 <Typography variant={'body1'}>Tarel Perusahaan</Typography>
//                 <Divider></Divider>
//                 <Grid container spacing={0}>
//                   <Grid item md={12} height={60} display={'flex'} justifyContent={'start'} alignItems={'end'}>
//                     <Typography variant='h3' color={'primary.dark'}>{`${linearProgress.toFixed(2)}%`}</Typography>
//                   </Grid>
//                   <Grid item md={12} height={60}>
//                     <Grid container spacing={0}>
//                       <Grid item md={7}>
//                         <Typography mt={5} variant='body2'>
//                           Realisasi/Target
//                         </Typography>
//                       </Grid>
//                       <Grid item md={5} display={'flex'} justifyContent={'end'}>
//                         <Typography mt={5} variant='body2' color={'primary.dark'}>
//                           {totalRealisasi}/ {totalTarget}
//                         </Typography>
//                       </Grid>
//                     </Grid>
//                     <LinearProgress
//                       sx={{ height: 10 }}
//                       color='success'
//                       value={linearProgress}
//                       variant='determinate'
//                     ></LinearProgress>
//                   </Grid>
//                 </Grid>
//               </Card>
//             </Grid>
//             <Grid item xs={6} md={6}>
//               <Card sx={{ padding: 4, height: 200 }}>
//                 <Typography variant={'body1'}>Tarel Non Perusahaan</Typography>
//                 <Divider></Divider>
//                 <Grid container spacing={0}>
//                   <Grid item md={12} height={60} display={'flex'} justifyContent={'start'} alignItems={'end'}>
//                     <Typography variant='h3' color={'primary.dark'}>{`${linearProgressP.toFixed(2)}%`}</Typography>
//                   </Grid>
//                   <Grid item md={12} height={60}>
//                     <Grid container spacing={0}>
//                       <Grid item md={7}>
//                         <Typography mt={5} variant='body2'>
//                           Realisasi/Target
//                         </Typography>
//                       </Grid>
//                       <Grid item md={5} display={'flex'} justifyContent={'end'}>
//                         <Typography mt={5} variant='body2' color={'primary.dark'}>
//                           {totalRealisasiP}/ {totalTargetP}
//                         </Typography>
//                       </Grid>
//                     </Grid>
//                     <LinearProgress
//                       sx={{ height: 10 }}
//                       color='success'
//                       value={linearProgressP}
//                       variant='determinate'
//                     ></LinearProgress>
//                   </Grid>
//                 </Grid>
//               </Card>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={12}>
//               <Card sx={{ padding: 2, height: 40 }}>
//                 <Grid container>
//                   <Grid item xs={12} md={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
//                     <Typography variant={'body2'}>{user.name} </Typography>
//                   </Grid>
//                 </Grid>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={12}>
//               <Card sx={{ padding: 4, height: 410 }}>
//                 <Typography textAlign={'center'} variant={'body2'}>
//                   Total Target dan Realisasi Bulan Ini
//                 </Typography>
//                 <Divider></Divider>
//                 <Doughnut
//                   data={dataDoughnut}
//                   width={200}
//                   height={100}
//                   options={{
//                     responsive: true,

//                     plugins: {
//                       legend: {
//                         position: 'bottom'
//                       },
//                       title: {
//                         display: true,
//                         text: ` `
//                       },
//                       tooltip: {
//                         callbacks: {
//                           label: function (context) {
//                             let label = context.dataset.label || ''

//                             if (label) {
//                               label += ': '
//                             }
//                             if (context.parsed.y !== null) {
//                               label =
//                                 `${Math.round(100 * (Number(realisasiBulanIni) / Number(targetBulanIni)))}%` +
//                                 // (100 * (targetBulanIni - realisasiBulanIni)) / realisasiBulanIni +
//                                 ' dari total realisasi : ' +
//                                 realisasiBulanIni
//                             }
//                             return label
//                           }
//                         }
//                       }
//                     }
//                   }}
//                 />
//               </Card>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid mt={1} container spacing={2}>
//         <Grid item xs={12} md={12}>
//           <Card sx={{ padding: 4, height: 400 }}>
//             <Grid container spacing={1}>
//               <Grid item xs={6} md={8}>
//                 <Typography variant={'h6'}>Target dan Realisasi per Sub Kegiatan {tahunBar}</Typography>
//               </Grid>
//               {/* <Grid item xs={3} md={2} display={'flex'} justifyContent={'end'} mb={4}> */}
//               <Grid item xs={6} md={4} display={'flex'} justifyContent={'end'} mb={4}>
//                 <FormControl sx={{ m: 1, minWidth: 120 }}>
//                   <InputLabel id='demo-simple-select-helper-label'>Bulan</InputLabel>
//                   <Select
//                     labelId='demo-simple-select-helper-label'
//                     id='demo-simple-select-helper'
//                     value={bulan}
//                     label='Bulan'
//                     size={'small'}
//                     onChange={handleChangeBulan}
//                   >
//                     <MenuItem value={1}>Januari</MenuItem>
//                     <MenuItem value={2}>Februari</MenuItem>
//                     <MenuItem value={3}>Maret</MenuItem>
//                     <MenuItem value={4}>April</MenuItem>
//                     <MenuItem value={5}>Mei</MenuItem>
//                     <MenuItem value={6}>Juni</MenuItem>
//                     <MenuItem value={7}>Juli</MenuItem>
//                     <MenuItem value={8}>Agustus</MenuItem>
//                     <MenuItem value={9}>September</MenuItem>
//                     <MenuItem value={10}>Oktober</MenuItem>
//                     <MenuItem value={11}>November</MenuItem>
//                     <MenuItem value={12}>Desember</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               {/* <Grid item xs={3} md={2} display={'flex'} justifyContent={'end'} mb={4}>
//                 <FormControl sx={{ m: 1, minWidth: 120 }}>
//                   <InputLabel id='demo-simple-select-helper-label'>Fungsi</InputLabel>
//                   <Select
//                     labelId='demo-simple-select-helper-label'
//                     id='demo-simple-select-helper'
//                     value={valueDropLine}
//                     label='Fungsi'
//                     size={'small'}
//                     onChange={handleChangeLine}
//                   >
//                     <MenuItem value={2}>Bagian Umum</MenuItem>
//                     <MenuItem value={3}>Statistik Sosial </MenuItem>
//                     <MenuItem value={4}>Statistik Produksi</MenuItem>
//                     <MenuItem value={5}>Statistik Distribusi</MenuItem>
//                     <MenuItem value={6}>Neraca Wilayah dan Analisis Statistik</MenuItem>
//                     <MenuItem value={7}>Integrasi Pengolahan dan Diseminasi Statistik</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid> */}
//             </Grid>
//             <Grid item md={12} xs={12}>
//               <Line
//                 datasetIdKey='id'
//                 data={dataLine}
//                 width={500}
//                 height={140}
//                 options={{
//                   responsive: true,
//                   scales: {
//                     x: {
//                       ticks: {
//                         display: true
//                       }
//                     }
//                   },
//                   plugins: {
//                     legend: {
//                       position: 'top'
//                     },
//                     title: {
//                       display: true,
//                       text: ` `
//                     }
//                   }
//                 }}
//               />
//             </Grid>

//             <Divider></Divider>
//           </Card>
//         </Grid>
//         {/* <Grid item xs={12} md={12}>
//           <Card sx={{ padding: 4, height: 450 }}>
//             <Grid container spacing={1}>
//               <Grid item xs={1} md={8}>
//                 <Typography variant={'h6'}>Target dan Realisasi per Fungsi Tiap Bulan Tahun {tahunBar} </Typography>
//               </Grid>
//               <Grid item xs={6} md={2} justifyContent={'end'} display={'flex'}>
//                 <FormControl sx={{ m: 1, minWidth: 120 }}>
//                   <InputLabel id='demo-simple-select-helper-label'>Tahun</InputLabel>
//                   <Select
//                     labelId='demo-simple-select-helper-label'
//                     id='demo-simple-select-helper'
//                     value={tahunBar}
//                     label='Tahun'
//                     size={'small'}
//                     onChange={handleChangeBarTahun}
//                   >
//                     <MenuItem value={2023}>2023</MenuItem>
//                     <MenuItem value={2024}>2024</MenuItem>
//                     <MenuItem value={2025}>2025</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={6} md={2} display={'flex'} justifyContent={'end'} mb={4}>
//                 <FormControl sx={{ m: 1, minWidth: 120 }}>
//                   <InputLabel id='demo-simple-select-helper-label'>Fungsi</InputLabel>
//                   <Select
//                     labelId='demo-simple-select-helper-label'
//                     id='demo-simple-select-helper'
//                     value={valueDropBar}
//                     label='Fungsi'
//                     onChange={handleChangeBar}
//                     size={'small'}
//                   >
//                     <MenuItem value={2}>Bagian Umum</MenuItem>
//                     <MenuItem value={3}>Statistik Sosial </MenuItem>
//                     <MenuItem value={4}>Statistik Produksi</MenuItem>
//                     <MenuItem value={5}>Statistik Distribusi</MenuItem>
//                     <MenuItem value={6}>Neraca Wilayah dan Analisis Statistik</MenuItem>
//                     <MenuItem value={7}>Integrasi Pengolahan dan Diseminasi Statistik</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//             </Grid>
//             <Bar
//               data={dataBar}
//               width={500}
//               height={160}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   legend: {
//                     position: 'top'
//                   },
//                   title: {
//                     display: true,
//                     text: ` `
//                   }
//                 }
//               }}
//             />
//             <Divider></Divider>
//           </Card>
//         </Grid> */}
//       </Grid>
//     </ApexChartWrapper>
//   )
// }

const statusObj = {
  0: { color: 'warning', status: 'On Progress' },
  1: { color: 'success', status: 'Done' }
}
const jenisSub = {
  63: { namaJenisSub: 'Pelatihan', color: 'warning' },
  64: { namaJenisSub: 'Persiapan', color: 'warning' },
  66: { namaJenisSub: 'Pelaksanaan', color: 'warning' },
  65: { namaJenisSub: 'Pencacahan', color: 'warning' },
  67: { namaJenisSub: 'Pengolahan-Entri', color: 'warning' },
  68: { namaJenisSub: 'Evaluasi', color: 'warning' },
  69: { namaJenisSub: 'Diseminasi', color: 'warning' },
  70: { namaJenisSub: 'Pengolahan-Validasi', color: 'warning' },
  71: { namaJenisSub: 'Listing', color: 'warning' }
}

const Dashboard = ({ dataTask }) => {
  const router = useRouter()
  const session = useSession()
  const [user, setUser] = useState({})
  const getUser = async () => {
    setUser(prev => {
      return {
        ...prev,
        name: session?.data?.user?.name,
        role: session?.data?.role
      }
    })
  }

  useEffect(() => {
    if (session.status === 'authenticated') {
      getUser()
    } 
  }, [session])
  const [task, setTask] = useState(JSON.parse(dataTask))

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
          onClick={async e => {
            router.push(`/project-detail/${params.row.kegiatanNameid}`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography
            color={
              params.row.durationOff != 'Kegiatan belum dimulai'
                ? params.row.durationOff != 'Kegiatan telah selesai'
                  ? params.row.realisasi < params.row.akumulasiTargetHariIni
                    ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                      ? 'error.main'
                      : 'warning.main'
                    : 'success.main'
                  : params.row.durationOff == 'Kegiatan telah selesai' && params.row.realisasi >= params.row.target
                  ? 'secondary.dark'
                  : 'error.main'
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
                ? params.row.durationOff != 'Kegiatan telah selesai'
                  ? params.row.realisasi < params.row.akumulasiTargetHariIni
                    ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                      ? 'error.main'
                      : 'warning.main'
                    : 'success.main'
                  : params.row.durationOff == 'Kegiatan telah selesai' && params.row.realisasi >= params.row.target
                  ? 'secondary.dark'
                  : 'error.main'
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
              ? params.row.durationOff != 'Kegiatan telah selesai'
                ? params.row.realisasi < params.row.akumulasiTargetHariIni
                  ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                    ? 'error.main'
                    : 'warning.main'
                  : 'success.main'
                : params.row.durationOff == 'Kegiatan telah selesai' && params.row.realisasi >= params.row.target
                ? 'secondary.dark'
                : 'error.main'
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
              ? params.row.durationOff != 'Kegiatan telah selesai'
                ? params.row.realisasi < params.row.akumulasiTargetHariIni
                  ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                    ? 'error.main'
                    : 'warning.main'
                  : 'success.main'
                : params.row.durationOff == 'Kegiatan telah selesai' && params.row.realisasi >= params.row.target
                ? 'secondary.dark'
                : 'error.main'
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
      field: 'persentase',
      headerName: 'Persentase',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Persentase
        </Typography>
      ),
      renderCell: params => (
        <Typography
          textAlign={'center'}
          color={
            params.row.durationOff != 'Kegiatan belum dimulai'
              ? params.row.durationOff != 'Kegiatan telah selesai'
                ? params.row.realisasi < params.row.akumulasiTargetHariIni
                  ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                    ? 'error.main'
                    : 'warning.main'
                  : 'success.main'
                : params.row.durationOff == 'Kegiatan telah selesai' && params.row.realisasi >= params.row.target
                ? 'secondary.dark'
                : 'error.main'
              : 'secondary.dark'
          }
          sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}
        >
          {params.row.persentase}
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
            label={
              params.row.durationOff != 'Kegiatan belum dimulai'
                ? params.row.durationOff != 'Kegiatan telah selesai'
                  ? params.row.realisasi < params.row.akumulasiTargetHariIni
                    ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                      ? 'Tertinggal Target'
                      : 'Diutamakan'
                    : 'Memenuhi Target'
                  : params.row.durationOff == 'Kegiatan telah selesai' && params.row.realisasi >= params.row.target
                  ? 'Memenuhi Target'
                  : 'Terlewat Batas Waktu'
                : 'Belum Dimulai'
            }
            color={
              params.row.durationOff != 'Kegiatan belum dimulai'
                ? params.row.durationOff != 'Kegiatan telah selesai'
                  ? params.row.realisasi < params.row.akumulasiTargetHariIni
                    ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                      ? 'error'
                      : 'warning'
                    : 'success'
                  : params.row.durationOff == 'Kegiatan telah selesai' && params.row.realisasi >= params.row.target
                  ? 'secondary'
                  : 'error'
                : 'secondary'
            }
            sx={{
              height: 24,
              fontSize: '0.75rem',
              width: 170,
              textTransform: 'capitalize',
              '& .MuiChip-label': { fontWeight: 500 }
            }}
          />
        </>
      ),
      headerName: 'Status',
      type: 'string',
      width: 180
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
              ? params.row.durationOff != 'Kegiatan telah selesai'
                ? params.row.realisasi < params.row.akumulasiTargetHariIni
                  ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                    ? 'error.main'
                    : 'warning.main'
                  : 'success.main'
                : params.row.durationOff == 'Kegiatan telah selesai' && params.row.realisasi >= params.row.target
                ? 'secondary.dark'
                : 'error.main'
              : 'secondary.dark'
          }
          sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}
        >
          {' '}
          {params.row.jenisKegiatan ? jenisSub[parseInt(params.row.jenisKegiatan)].namaJenisSub : 0}
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
              ? params.row.durationOff != 'Kegiatan telah selesai'
                ? params.row.realisasi < params.row.akumulasiTargetHariIni
                  ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                    ? 'error.main'
                    : 'warning.main'
                  : 'success.main'
                : params.row.durationOff == 'Kegiatan telah selesai' && params.row.realisasi >= params.row.target
                ? 'secondary.dark'
                : 'error.main'
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
              ? params.row.durationOff != 'Kegiatan telah selesai'
                ? params.row.realisasi < params.row.akumulasiTargetHariIni
                  ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                    ? 'error.main'
                    : 'warning.main'
                  : 'success.main'
                : params.row.durationOff == 'Kegiatan telah selesai' && params.row.realisasi >= params.row.target
                ? 'secondary.dark'
                : 'error.main'
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
              ? params.row.durationOff != 'Kegiatan telah selesai'
                ? params.row.realisasi < params.row.akumulasiTargetHariIni
                  ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                    ? 'error.main'
                    : 'warning.main'
                  : 'success.main'
                : params.row.durationOff == 'Kegiatan telah selesai' && params.row.realisasi >= params.row.target
                ? 'secondary.dark'
                : 'error.main'
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
              ? params.row.durationOff != 'Kegiatan telah selesai'
                ? params.row.realisasi < params.row.akumulasiTargetHariIni
                  ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                    ? 'error.main'
                    : 'warning.main'
                  : 'success.main'
                : params.row.durationOff == 'Kegiatan telah selesai' && params.row.realisasi >= params.row.target
                ? 'secondary.dark'
                : 'error.main'
              : 'secondary.dark'
          }
          sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}
        >
          {Math.round(params.row.status2)}
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
              ? params.row.durationOff != 'Kegiatan telah selesai'
                ? params.row.realisasi < params.row.akumulasiTargetHariIni
                  ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                    ? 'error.main'
                    : 'warning.main'
                  : 'success.main'
                : params.row.durationOff == 'Kegiatan telah selesai' && params.row.realisasi >= params.row.target
                ? 'secondary.dark'
                : 'error.main'
              : 'secondary.dark'
          }
          sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}
        >
          {params.row.durationOff === 'Kegiatan telah selesai'
            ? params.row.durationOff === 'Kegiatan belum dimulai'
              ? params.row.durationOff
              : params.row.durationOff
            : `${Math.round(params.row.durationOff)} Hari`}
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
              ? params.row.durationOff != 'Kegiatan telah selesai'
                ? params.row.realisasi < params.row.akumulasiTargetHariIni
                  ? params.row.realisasi <= params.row.yellowAkumulasiTargetHariIni
                    ? 'error.main'
                    : 'warning.main'
                  : 'success.main'
                : params.row.durationOff == 'Kegiatan telah selesai' && params.row.realisasi >= params.row.target
                ? 'secondary.dark'
                : 'error.main'
              : 'secondary.dark'
          }
          sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}
        >
          {' '}
          {params.row.akumulasiTargetHariIni === 'Kegiatan telah selesai'
            ? params.row.akumulasiTargetHariIni === 'Kegiatan belum dimulai'
              ? params.row.akumulasiTargetHariIni
              : params.row.akumulasiTargetHariIni
            : Math.round(params.row.akumulasiTargetHariIni)}
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
          ? Math.abs(tanggalSekarang.getTime() - startDateObj.getTime()) / (1000 * 3600 * 24) + 1
          : 'Kegiatan telah selesai'
        : 'Kegiatan belum dimulai'
    const targetHarian = task.target / differenceInDays
    const akumulasiTargetHariIni =
      tanggalSekarang >= startDateObj
        ? tanggalSekarang <= duedateObj
          ? Number(targetHarian * hariBerjalan)
          : 'Kegiatan telah selesai'
        : 'Kegiatan belum dimulai'
    const yellowAkumulasiTargetHariIni =
      tanggalSekarang >= startDateObj
        ? tanggalSekarang <= duedateObj
          ? targetHarian * hariBerjalan * 0.8
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
      persentase: task.realisasi && task.target != 0 ? `${Math.round(100 * (task.realisasi / task.target))}%` : `0%`,
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

  const [valueDropDown, setValueDropDown] = useState({
    tahun: new Date().getFullYear(),
    bulan: new Date().getMonth() + 1,
    fungsi: 10
  })

  const handleDropDownTahun = params => {
    setValueDropDown(valueDropDown => ({
      ...valueDropDown,
      tahun: params.target.value
    }))
  }
  const handleDropDownBulan = params => {
    setValueDropDown(valueDropDown => ({
      ...valueDropDown,
      bulan: params.target.value
    }))
  }

  useEffect(() => {
    // Melakukan filtering pada task berdasarkan bulan
    valueDropDown.bulan == 13
      ? // const filteredTasks =
        // task.filter(item => item.bulan === valueDropDown.bulan)

        // Mengatur ulang state task pake hasil filtering
        setTask(JSON.parse(dataTask))
      : setTask(
          JSON.parse(dataTask).filter(
            item =>
              new Date(item.duedate).getFullYear() === valueDropDown.tahun &&
              (new Date(item.duedate).getMonth() + 1 === valueDropDown.bulan ||
                new Date(item.startDate).getMonth() + 1 === valueDropDown.bulan)
          )
        )
    console.log(task)
    console.log(valueDropDown.bulan)
  }, [valueDropDown])

  return (
    <>
      <Grid item md={12}>
        <Grid mb={4} item md={12} alignItems='end' justifyContent={'end'} display={'flex'}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id='demo-simple-select-helper-label'>Tahun</InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={valueDropDown.tahun}
              label='Tahun'
              size={'small'}
              onChange={handleDropDownTahun}
            >
              <MenuItem value={2024}>2024</MenuItem>
              <MenuItem value={2025}>2025</MenuItem>
              <MenuItem value={2026}>2026</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id='demo-simple-select-helper-label'>Bulan</InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={valueDropDown.bulan}
              label='Bulan'
              size={'small'}
              onChange={handleDropDownBulan}
            >
              <MenuItem value={13}>--Semua--</MenuItem>
              <MenuItem value={1}>Januari</MenuItem>
              <MenuItem value={2}>Februari</MenuItem>
              <MenuItem value={3}>Maret</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>Mei</MenuItem>
              <MenuItem value={6}>Juni</MenuItem>
              <MenuItem value={7}>Juli</MenuItem>
              <MenuItem value={8}>Agustus</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>Oktober</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>Desember</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Card mt={4} height={300}>
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
              height: rows.length > 2 ? '81vh' : '45vh',
              width: '100%'
            }}
            slotProps={{
              toolbar: { showQuickFilter: true }
            }}
          />
        </Card>
      </Grid>
    </>
  )
}
// const Dashboard = ({ dataTask }) => {}
export async function getServerSideProps(context) {
  const token = await getToken({ req: context.req, secret: process.env.JWT_SECRET })

  if (!token) {
    return {
      redirect: {
        destination: '/pages/login',
        permanent: false
      }
    }
  }

  let tasks

  tasks = await prisma.sub_kegiatan.findMany({
    include: {
      project: true
    }
  })
  return {
    props: {
      dataTask: JSON.stringify(tasks)
    }
  }
}

export default Dashboard
