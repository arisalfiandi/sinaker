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

// icon

import CardGroupPerusahaan from 'src/views/cards/CardGroupPerusahaan'

const GroupPerusahaanViews = props => {
  const cardPRef = useRef([{ id: 1 }])
  const [valueDropDown, setValueDropDown] = useState({
    fungsi: 10
  })

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
      data.fungsi == valueDropDown.fungsi ? tmp.push(data) : 0
    })
    setCardP2(tmp)
  }, [valueDropDown])

  // console.log(valueDropDown.fungsi)

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant='h5'>Group Kegiatan Perusahaan</Typography>
        </Grid>
        <Grid item md={12} display={'flex'} justifyContent={'end'}>
          <FormControl sx={{ width: 300, m: 1, minWidth: 120, maxWidth: 300 }}>
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
          </FormControl>
        </Grid>
        <Grid item md={12}>
          {' '}
          <Grid container spacing={6}>
            {cardP2.length > 0 ? (
              cardP2.map(group => (
                <>
                  <Grid key={group.id} item md={4} xs={12}>
                    <CardGroupPerusahaan
                      id={group.id}
                      namaGroupPerusahaan={group.nama}
                      fungsi={group.fungsi}
                      jumlahPerusahaan={group.Perusahaangroup}
                    ></CardGroupPerusahaan>
                  </Grid>
                </>
              ))
            ) : (
              <>
                <Grid item md={12} xs={12}>
                  <Typography>Tidak Ada Group Perusahaan </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default GroupPerusahaanViews
