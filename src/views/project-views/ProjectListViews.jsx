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

import CardProjectDetails from 'src/views/cards/CardProjectDetails'
import TableKegiatanList from 'src/views/tables/TableKegiatanList'

// icon
import GridViewIcon from '@mui/icons-material/GridView'
import IconButton from '@mui/material/IconButton'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'

const ProjectListViews = props => {
  const [gaji, setGaji] = useState(0)
  const cardPRef = useRef([{ id: 1 }])
  const [valueDropDown, setValueDropDown] = useState({
    tahun: new Date().getFullYear(),
    bulan: new Date().getMonth() + 1,
    fungsi: 10
  })
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

  const handleDropDownFungsi = params => {
    setValueDropDown(valueDropDown => ({
      ...valueDropDown,
      fungsi: params.target.value
    }))
  }

  const [cardP, setCardP] = useState(
    props.data.map(data => {
      return {
        ...data
      }
    })
  )

  const [cardP2, setCardP2] = useState(0)

  useEffect(() => {
    let tmp = []
    cardP.map(data => {
      // console.log(valueDropDown.bulan == new Date(data.project.startdate).getMonth() + 1)
      // console.log(data.project.fungsi)

      new Date(data.project.startdate).getMonth() + 1 == valueDropDown.bulan ||
      new Date(data.project.enddate).getMonth() + 1 == valueDropDown.bulan
        ? new Date(data.project.startdate).getFullYear() == valueDropDown.tahun // && data.project.fungsi == valueDropDown.fungsi
          ? tmp.push(data)
          : 0
        : valueDropDown.bulan == 13
        ? new Date(data.project.startdate).getFullYear() == valueDropDown.tahun // && data.project.fungsi == valueDropDown.fungsi
          ? tmp.push(data)
          : 0
        : 0
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

  // console.log(valueDropDown.tahun)
  // console.log(valueDropDown.bulan)
  // console.log(valueDropDown.fungsi)

  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={6}>
          <Button
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
          ></Button>
        </Grid>
        <Grid item md={6} display={'flex'} justifyContent={'end'}>
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
                cardP2.map(kegiatan => (
                  <>
                    <Grid key={kegiatan.id} item md={6} xs={12}>
                      <CardProjectDetails
                        id={kegiatan.project.id}
                        namaKegiatan={kegiatan.project.title}
                        intervalWaktu={kegiatan.project.rentangWaktu}
                        tanggalDimulai={kegiatan.project.startdate}
                        tanggalBerakhir={kegiatan.project.enddate}
                        jumlahParicipant={kegiatan.project.projectLeader.name}
                        totalSubKegiatan={kegiatan.project.Task}
                        totalGaji={kegiatan.totalGaji}
                        penanggungJawab={kegiatan.project.title}
                      ></CardProjectDetails>
                    </Grid>
                  </>
                ))
              ) : (
                <>
                  <Grid item md={12} xs={12}>
                    <Typography>Tidak Ada Kegiatan Bulan Ini </Typography>
                  </Grid>
                </>
              )
            ) : cardP2.length > 0 ? (
              <>
                <TableKegiatanList data={cardP2}></TableKegiatanList>
              </>
            ) : (
              <>
                <Grid item md={12} xs={12}>
                  <Typography>Tidak Ada Kegiatan Bulan Ini </Typography>
                </Grid>
              </>
            )}
            {/* {cardP2.length > 0 ? (
              cardP2.map(kegiatan => (
                <>
                  <Grid key={kegiatan.id} item md={6} xs={12}>
                    <CardProjectDetails
                      id={kegiatan.project.id}
                      namaKegiatan={kegiatan.project.title}
                      intervalWaktu={kegiatan.project.rentangWaktu}
                      tanggalDimulai={kegiatan.project.startdate}
                      tanggalBerakhir={kegiatan.project.enddate}
                      jumlahParicipant={kegiatan.project.projectLeader.name}
                      totalSubKegiatan={kegiatan.project.Task}
                      totalGaji={kegiatan.totalGaji}
                      penanggungJawab={kegiatan.project.title}
                    ></CardProjectDetails>
                  </Grid>
                </>
              ))
            ) : (
              <>
                <Grid item md={12} xs={12}>
                  <Typography>Tidak Ada Kegiatan Bulan Ini </Typography>
                </Grid>
              </>
            )} */}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default ProjectListViews
