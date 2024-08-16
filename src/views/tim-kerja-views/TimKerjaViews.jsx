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
import Link from '@mui/material/Link'

import { useSession } from 'next-auth/react'

// icon

import CardTimKerja from 'src/views/cards/CardTimKerja'

const TimKerjaViews = props => {
  const cardPRef = useRef([{ id: 1 }])
  // const [valueDropDown, setValueDropDown] = useState({
  //   fungsi: 10
  // })

  // const handleDropDownFungsi = params => {
  //   setValueDropDown(valueDropDown => ({
  //     ...valueDropDown,
  //     fungsi: params.target.value
  //   }))
  // }

  const [cardP, setCardP] = useState(
    props.data.map(data => {
      return {
        ...data
      }
    })
  )
  const session = useSession()
  // const [cardP2, setCardP2] = useState(0)

  // useEffect(() => {
  //   let tmp = []
  //   cardP.map(data => {
  //     data.fungsi == valueDropDown.fungsi ? tmp.push(data) : 0
  //   })
  //   setCardP2(tmp)
  // }, [valueDropDown])

  // console.log(valueDropDown.fungsi)

  const router = useRouter()

  console.log(cardP)

  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <Typography variant='h5'>Tim Kerja</Typography>
        </Grid>
        {/* <Grid item md={12} display={'flex'} justifyContent={'end'}>
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
        </Grid> */}

        {session.status === 'authenticated' && session.data.role == 'teamleader' && (
          <>
            <Grid item md={6} xs={12} display={'flex'} justifyContent={'end'}>
              <Link onClick={e => router.push(`/create-tim-kerja`)}>
                <Button variant={'contained'}>Buat Tim Kerja</Button>
              </Link>
            </Grid>
          </>
        )}
        <Grid item md={12}>
          {' '}
          <Grid container spacing={6}>
            {cardP.length > 0 ? (
              cardP.map(group => (
                <>
                  <Grid key={group.id} item md={4} xs={12}>
                    <CardTimKerja
                      id={group.id}
                      namaGroupPerusahaan={group.nama}
                      namaKetuaTim={group.userId_fkey.name}
                      fungsi={group.fungsi}
                      jumlahPerusahaan={group.timKerjaPegawai}
                    ></CardTimKerja>
                  </Grid>
                </>
              ))
            ) : (
              <>
                <Grid item md={12} xs={12}>
                  <Typography>Tidak Ada Tim Kerja</Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default TimKerjaViews
