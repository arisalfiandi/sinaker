// ** Third Party Imports
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Mui Import

import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/dist/client/router'
import { styled } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Button from '@mui/material/Button'

import CardPencairan from 'src/views/cards/CardPencairan'
import TablePencairan from 'src/views/tables/TablePencairan'

// icon
import GridViewIcon from '@mui/icons-material/GridView'
import IconButton from '@mui/material/IconButton'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import { useSession } from 'next-auth/react'
import { e } from 'mathjs'

const ListProject = props => {
  const [gaji, setGaji] = useState(0)
  const session = useSession()
  const cardPRef = useRef([{ id: 1 }])
  const [valueDropDown, setValueDropDown] = useState({
    tahun: new Date().getFullYear(),
    // bulan: new Date().getMonth() + 1,
    bulan: 13,
    kategori: 1
  })

  // const [valueDropDownK, setValueDropDownK] = useState({
  //   kategori: 0
  // })

  const [viewData, setViewData] = useState(1)

  const handleViewDataGrid = params => {
    setViewData(1)
  }
  const handleViewDataTable = params => {
    setViewData(0)
  }

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

  const handleDropDownKategori = params => {
    setValueDropDown(valueDropDown => ({
      ...valueDropDown,
      kategori: params.target.value
    }))
  }

  const [cardP0, setCardP0] = useState(
    props.data.map(data => {
      return {
        ...data
      }
    })
  )

  const [cardP, setCardP] = useState(
    props.data.map(data => {
      return {
        ...data
      }
    })
  )

  useEffect(() => {
    if (session?.data?.role == 'teamleader' && valueDropDown.kategori === 1) {
      const updatedRowPJK = cardP0.filter(task => {
        const pencairan = task.pencairan && task.pencairan[0]
        const status = pencairan ? pencairan.status : 0
        const tahapan = pencairan ? pencairan.tahapanId : 99
        return (status === 0 || tahapan === 0) && task.project.projectLeaderId == session.data.uid
      })
      setCardP(updatedRowPJK)
    } else if (session?.data?.role == 'verifikator' && valueDropDown.kategori === 1) {
      const updatedRowVerif = cardP0.filter(task => {
        const pencairan = task.pencairan && task.pencairan[0]
        const tahapan = pencairan ? pencairan.tahapanId : 99
        return tahapan === 1
      })
      setCardP(updatedRowVerif)
    } else if (session?.data?.role == 'ppspm' && valueDropDown.kategori === 1) {
      const updatedRowPPSPM = cardP0.filter(task => {
        const pencairan = task.pencairan && task.pencairan[0]
        const tahapan = pencairan ? pencairan.tahapanId : 99
        return tahapan === 2
      })
      setCardP(updatedRowPPSPM)
    } else if (session?.data?.role == 'bendahara' && valueDropDown.kategori === 1) {
      const updatedRowBendahara = cardP0.filter(task => {
        const pencairan = task.pencairan && task.pencairan[0]
        const tahapan = pencairan ? pencairan.tahapanId : 99
        return tahapan === 3
      })
      setCardP(updatedRowBendahara)
    } else if (
      (session?.data?.role == 'admin' || session?.data?.role == 'superAdmin') &&
      valueDropDown.kategori === 1
    ) {
      const updatedRowPJK = cardP0.filter(task => {
        const pencairan = task.pencairan && task.pencairan[0]
        const status = pencairan ? pencairan.status : 0
        const tahapan = pencairan ? pencairan.tahapanId : 99
        return status != 2 || tahapan >= 4
      })
      setCardP(updatedRowPJK)
    }
  }, [])

  const [cardP2, setCardP2] = useState(0)

  useEffect(() => {
    let tmp = []
    if (session?.data?.role == 'teamleader' && valueDropDown.kategori === 1) {
      tmp = cardP0.filter(task => {
        const pencairan = task.pencairan && task.pencairan[0]
        const status = pencairan ? pencairan.status : 0
        const tahapan = pencairan ? pencairan.tahapanId : 99
        return (status === 0 || tahapan === 0) && task.project.projectLeaderId == session.data.uid
      })
    } else if (session?.data?.role == 'verifikator' && valueDropDown.kategori === 1) {
      tmp = cardP0.filter(task => {
        const pencairan = task.pencairan && task.pencairan[0]
        const tahapan = pencairan ? pencairan.tahapanId : 99
        return tahapan === 1
      })
    } else if (session?.data?.role == 'ppspm' && valueDropDown.kategori === 1) {
      tmp = cardP0.filter(task => {
        const pencairan = task.pencairan && task.pencairan[0]
        const tahapan = pencairan ? pencairan.tahapanId : 99
        return tahapan === 2
      })
    } else if (session?.data?.role == 'bendahara' && valueDropDown.kategori === 1) {
      tmp = cardP0.filter(task => {
        const pencairan = task.pencairan && task.pencairan[0]
        const tahapan = pencairan ? pencairan.tahapanId : 99
        return tahapan === 3
      })
    } else if (
      (session?.data?.role == 'admin' || session?.data?.role == 'superAdmin') &&
      valueDropDown.kategori === 1
    ) {
      tmp = cardP0.filter(task => {
        const pencairan = task.pencairan && task.pencairan[0]
        const tahapan = pencairan ? pencairan.tahapanId : 99
        return tahapan != 4
      })
    } else if (session?.data?.role == 'teamleader' && valueDropDown.kategori === 0) {
      tmp = cardP0.filter(task => {
        const pencairan = task.pencairan && task.pencairan[0]
        const status = pencairan ? pencairan.status : 0
        const tahapan = pencairan ? pencairan.tahapanId : 99
        return (status >= 0 || tahapan >= 0) && task.project.projectLeaderId == session.data.uid
      })
    } else if (session?.data?.role == 'verifikator' && valueDropDown.kategori === 0) {
      tmp = cardP0.filter(task => {
        const pencairan = task.pencairan && task.pencairan[0]
        const tahapan = pencairan ? pencairan.tahapanId : 99
        return tahapan >= 1 && tahapan != 99
      })
    } else if (session?.data?.role == 'ppspm' && valueDropDown.kategori === 0) {
      tmp = cardP0.filter(task => {
        const pencairan = task.pencairan && task.pencairan[0]
        const tahapan = pencairan ? pencairan.tahapanId : 99
        return tahapan >= 2 && tahapan != 99
      })
    } else if (session?.data?.role == 'bendahara' && valueDropDown.kategori === 0) {
      tmp = cardP0.filter(task => {
        const pencairan = task.pencairan && task.pencairan[0]
        const tahapan = pencairan ? pencairan.tahapanId : 99
        return tahapan >= 3 && tahapan != 99
      })
    } else if (
      (session?.data?.role == 'admin' || session?.data?.role == 'superAdmin') &&
      valueDropDown.kategori === 0
    ) {
      tmp = cardP0.filter(task => {
        const pencairan = task.pencairan && task.pencairan[0]
        const tahapan = pencairan ? pencairan.tahapanId : 99
        return tahapan >= 0
      })
    }
    // Filter berdasarkan bulan
    tmp = tmp.filter(data => {
      return valueDropDown.bulan == 13
        ? data.year === valueDropDown.tahun
        : (data.month + 1 === valueDropDown.bulan || new Date(data.duedate).getMonth() + 1 === valueDropDown.bulan) &&
            data.year === valueDropDown.tahun
    })
    setCardP2(tmp)
  }, [valueDropDown])

  // useEffect(() => {
  //   let tmp = []
  //   cardP.map(data => {
  // valueDropDown.bulan == 13
  //   ? new Date(data.project.startdate).getFullYear() == valueDropDown.tahun // && data.project.fungsi == valueDropDown.fungsi
  //     ? tmp.push(data)
  //     : 0
  //   : 0
  //   })
  //   setCardP2(tmp)
  // }, [valueDropDown])

  const handleTandaRef = id => {
    cardPRef.current = [...cardPRef.current, { id }]
  }

  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={6}>
          {/* <Button
            onClick={handleViewDataTable}
            sx={{
              width: 10,
              paddingLeft: 8
            }}
            size='medium'
            variant='contained'
            startIcon={<FormatListBulletedIcon />}
          ></Button>

          <Button
            onClick={handleViewDataGrid}
            sx={{
              marginLeft: 2,
              width: 10,
              paddingLeft: 8
            }}
            size='medium'
            variant='contained'
            startIcon={<GridViewIcon />}
          ></Button> */}
        </Grid>
        <Grid item md={6} display={'flex'} justifyContent={'end'}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id='demo-simple-select-helper-label'>Jenis</InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={valueDropDown.kategori}
              label='Jenis'
              size={'small'}
              onChange={handleDropDownKategori}
            >
              <MenuItem value={0}>Semua</MenuItem>
              <MenuItem value={1}>Perlu Diselesaikan</MenuItem>
            </Select>
          </FormControl>
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
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2024}>2024</MenuItem>
              <MenuItem value={2025}>2025</MenuItem>
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
          {/* <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 121 }}>
            <InputLabel id='demo-simple-select-helper-label'>Fungsi</InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={valueDropDown.fungsi}
              label='Fungsi'
              onChange={handleDropDownFungsi}
              size={'small'}
            >
              <MenuItem value={2}>Bagian Umum</MenuItem>
              <MenuItem value={3}>Statistik Sosial </MenuItem>
              <MenuItem value={4}>Statistik Produksi</MenuItem>
              <MenuItem value={5}>Statistik Distribusi</MenuItem>
              <MenuItem value={6}>Neraca Wilayah dan Analisis Statistik</MenuItem>
              <MenuItem value={7}>Integrasi Pengolahan dan Diseminasi Statistik</MenuItem>
            </Select>
          </FormControl> */}
        </Grid>
        <Grid item md={12}>
          {' '}
          <Grid container spacing={6}>
            {viewData == 1 ? (
              cardP2.length > 0 ? (
                cardP2.map(task => (
                  <>
                    <Grid key={task.id} item md={6} xs={12}>
                      <CardPencairan
                        id={task.id}
                        namaKegiatan={task.title}
                        namaProjek={task.project.title}
                        intervalWaktu={task.project.rentangWaktu}
                        tanggalDimulai={task.project.startdate}
                        tanggalBerakhir={task.duedate}
                        target={task.target}
                        realisasi={task.realisasi}
                        statusPencairan={task.pencairan ? (task.pencairan[0] ? task.pencairan[0].status : 0) : 0}
                        tahapPencairan={task.pencairan ? (task.pencairan[0] ? task.pencairan[0].tahapanId : 99) : 99}
                        totalGaji={task.totalGaji}
                        jumlahParicipant={task.project.projectLeader.name}
                        jumlahMitra={task.TaskPeserta}
                      ></CardPencairan>
                    </Grid>
                  </>
                ))
              ) : (
                <>
                  <Grid item md={12} xs={12}>
                    <Typography>Tidak Ada Pencairan Honor Bulan Ini </Typography>
                  </Grid>
                </>
              )
            ) : cardP2.length > 0 ? (
              <>
                <TablePencairan data={props.data} kategori={valueDropDown.kategori}></TablePencairan>
              </>
            ) : (
              <>
                <Grid item md={12} xs={12}>
                  <Typography>Tidak Ada Pencairan Honor Bulan Ini </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default ListProject
