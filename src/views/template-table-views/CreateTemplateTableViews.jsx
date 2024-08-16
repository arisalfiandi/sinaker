// react import
import { useState, useEffect } from 'react'
import * as React from 'react'

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

// ** Third Party Imports

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// Mui Import
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/dist/client/router'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import Alert from '@mui/material/Alert'
import CheckIcon from '@mui/icons-material/Check'

import { DataGrid } from '@mui/x-data-grid'

const TemplateTableDetailViews = props => {
  const [values, setValues] = useState({
    namaTemplate: '',
    jenisSample: '',
    kol1: 'kolom1',
    kol2: 'kol2',
    target: 0
  })
  const [sama, setSama] = useState(1)

  const [jmlKolom, setJmlKolom] = useState(2)

  const handleJenisSample = event => {
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      jenisSample: event.target.value // Perbarui nilai kegRentang
    }))
  }

  const handleChange = prop => event => {
    const newValue = event.target.value

    const newValues = { ...values, [prop]: newValue }

    if (newValues.kol1 === newValues.kol2) {
      console.log('Kedua inputan tidak boleh sama.')

      setSama(0)
    } else {
      setSama(1)
      setValues(newValues)
    }
  }

  const handleTemplateTable = async e => {
    e.preventDefault()

    try {
      while (true) {
        const res = await axios.post('/template-table', {
          nama: values.namaTemplate,
          jenisSample: values.jenisSample,
          kolom1: values.kol1,
          kolom2: values.kol2
        })

        if (res.status === 201) {
          Swal.fire({
            title: 'Template table berhasil ditambahkan',
            text: '',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          }).then(router.push(`template-table-list`))
        }

        break
      }
    } catch (error) {
      Swal.fire({
        title: 'Template Table Gagal ditambahkan',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  const camelCase = str => {
    return str
      .toLowerCase()
      .replace(/[\W_]/g, '')
      .replace(/[A-Z]/g, (match, index) => (index === 0 ? match.toLowerCase() : match))
  }

  const initialRowsT = [
    {
      id: 1,
      kodeDesa: '3',
      kodeKecamatan: 4,
      namaDesa: 'Cilebut timur',
      namaKecamatan: 'Bojonggede',
      target: 0
    },
    {
      id: 2,
      kodeDesa: '3',
      kodeKecamatan: 4,
      namaDesa: 'Cilebut timur',
      namaKecamatan: 'Bojonggede',
      target: 0
    }
  ]
  const newData = initialRowsT.map(obj => {
    const newObj = {}
    for (const key in obj) {
      newObj[key] = obj[key]
    }
    newObj[camelCase(values.kol1)] = 3
    newObj[camelCase(values.kol2)] = 2
    return newObj
  })

  const [rowsT, setRowsT] = useState(newData)
  useEffect(() => {
    console.log(rowsT)
  }, [values])

  const columnsNew = [
    {
      field: 'kodeDesa',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Kode Desa
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'kodeKecamatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Kode Kecamatan
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'namaDesa',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Nama Desa
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'namaKecamatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Nama Kecamatan
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: camelCase(values.kol1),
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {values.kol1}
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },

    {
      field: camelCase(values.kol2),
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {values.kol2}
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: camelCase('target'),
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Target</Typography>
      ),
      minWidth: 200,
      flex: 1
    }
  ]

  const jenisSample = [
    {
      id: 1,
      nama: 'Perusahaan'
    },
    {
      id: 0,
      nama: 'Non Perusahaan'
    }
  ]

  const router = useRouter()
  return (
    <Card>
      <form action='post' onSubmit={e => e.preventDefault()}>
        <Grid container spacing={4} sx={{ padding: '32px' }}>
          <Grid item xs={12}>
            {/* <Typography variant='h5'>Tambah Table Kegiatan</Typography> */}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              value={values.namaTemplate}
              onChange={handleChange('namaTemplate')}
              multiline
              label='Nama Template Table'
              name='namaKegiatan'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-helper-label'>Jenis Sample</InputLabel>
              <Select
                fullWidth
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                label='Jenis Sample'
                onChange={handleJenisSample}
                value={values.jenisSample}
              >
                <MenuItem key={''} value={''}>
                  {''}
                </MenuItem>
                {jenisSample.map(item => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.nama}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Divider></Divider>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2'>Kolom Acuan: </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              value={values.kol1}
              onChange={handleChange('kol1')}
              multiline
              placeholder='NBS/NKS/Nama Perusahaan/dll..'
              label='Kolom 1'
              name='kolom1'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              value={values.kol2}
              onChange={handleChange('kol2')}
              multiline
              placeholder='NBS/NKS/Nama Perusahaan/dll..'
              label='Kolom 2'
              name='kolom2'
            />
          </Grid>
          <Grid item xs={12} md={12} height={40}>
            {sama == 0 && (
              <>
                <Alert severity='warning'>Kedua kolom tabel memiliki value yang sama</Alert>
              </>
            )}
          </Grid>

          <Grid mt={5} item xs={12}>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                pageSizeOptions={[10, 15, 25]}
                rowHeight={65}
                initialState={{
                  pagination: { paginationModel: { pageSize: 100 } }
                }}
                rows={newData}
                columns={columnsNew}
                sx={{
                  height: newData.length > 3 ? '80vh' : '45vh',
                  // overflowY: 'auto',
                  width: '100%'
                }}
              />
            </Box>
          </Grid>
        </Grid>
        {/* <TableAddParticipant></TableAddParticipant> */}
        <Divider sx={{ margin: 0 }} />

        <Grid item m={4} display={'flex'} justifyContent={'end'}>
          <Button color={'primary'} size='medium' type='submit' variant='contained' onClick={handleTemplateTable}>
            Buat Template Table
          </Button>
        </Grid>
      </form>
    </Card>
  )
}

export default TemplateTableDetailViews
