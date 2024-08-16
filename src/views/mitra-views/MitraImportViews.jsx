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

// import xlsx
import MaterialTable from 'material-table'
import * as XLSX from 'xlsx/xlsx.mjs'

// export xlsx

import exportFromJSON from 'export-from-json'
import xlsx from 'json-as-xlsx'

// import TemplateExcel from './asd.pdf'

const EXTENSIONS = ['xlsx', 'xls', 'csv']

import { DataGrid, GridToolbar } from '@mui/x-data-grid'

const MitraImportViews = props => {
  const [values, setValues] = useState({
    namaTemplate: '',
    jenisSample: '',
    kol1: 'kolom1',
    kol2: 'kol2'
  })

  const handleImportMitra = async e => {
    e.preventDefault()

    try {
      while (true) {
        const res = await axios.post('/mitra/import', {
          participants: data
        })

        if (res.status === 201) {
          Swal.fire({
            title: 'Import Mitra Berhasil',
            text: '',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          }).then(router.push(`mitra`))
        }

        break
      }
    } catch (error) {
      Swal.fire({
        title: 'Import mitra gagal',
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

  // download template

  const columnsNew = [
    {
      field: 'nik',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>NIK</Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'name',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Name</Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'jenisKelamin',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Jenis Kelamin
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'tanggalLahir',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Tanggal Lahir
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'umur',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Umur</Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'pendidikan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Pendidikan
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },

    {
      field: 'email',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Email</Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'status',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Terdaftar Sebagai
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    }
  ]

  const initialRowsT = [
    {
      id: 1,
      nik: '320xxxxxxx',
      name: 'Mitra1',
      jenisKelamin: 'Pria',
      tanggalLahir: '1994/08/13',
      umur: '41',
      pendidikan: 'D4',
      email: 'abc123@gmail.com',
      status: 'pelajar'
    },
    {
      id: 2,
      nik: '320xxxxxx',
      name: 'Mitra2',
      jenisKelamin: 'XY',
      tanggalLahir: '2001/08/13',
      umur: '21',
      pendidikan: 'D4',
      email: '-',
      status: '-'
    }
  ]

  const handleDownloadTemplateTable = e => {
    const dataKolom = columnsNew.map(kol => ({
      label: kol.field,
      value: kol.field
    }))

    dataKolom.unshift({ label: 'id', value: 'id' })

    let dataDownload = [
      {
        sheet: 'sheetone',
        columns: dataKolom,
        content: initialRowsT
      }
    ]

    let settings = {
      fileName: 'template_table_import_mitra', // Name of the resulting spreadsheet
      extraLength: 3, // A bigger number means that columns will be wider
      writeMode: 'writeFile', // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
      writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
      RTL: false // Display the columns from right-to-left (the default value is false)
    }

    xlsx(dataDownload, settings)
  }

  // dari sini kebawah buat keperluan import excel,csv
  const columnsImportMitra = [
    {
      field: 'nik',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>NIK</Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'name',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Nama</Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'jenisKelamin',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Jenis Kelamin
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'tanggalLahir',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Tanggal Lahir
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'umur',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Umur</Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'pendidikan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Pendidikan
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },

    {
      field: 'email',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Email</Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'status',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Status Mitra
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    }
  ]
  const [colDefs, setColDefs] = useState()
  const [data, setData] = useState({
    id: 1,
    nik: '',
    name: '',
    jenisKelamin: '',
    tanggalLahir: '',
    umur: '',
    pendidikan: '',
    email: '',
    status: ''
  })

  const getExention = file => {
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]
    return EXTENSIONS.includes(extension) // return boolean
  }

  const convertToJson = (headers, data) => {
    const rows = []
    data.forEach(row => {
      let rowData = {}
      row.forEach((element, index) => {
        rowData[headers[index]] = element
      })
      rows.push(rowData)
    })
    return rows
  }

  const importExcel = e => {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.onload = event => {
      //parse data

      const bstr = event.target.result
      const workBook = XLSX.read(bstr, { type: 'binary' })

      //get first sheet
      const workSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[workSheetName]
      //convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })

      const headers = fileData[0]
      const heads = headers.map(head => ({ title: head, field: head }))
      setColDefs(heads)

      //removing header
      fileData.splice(0, 1)

      // setData(convertToJson(headers, fileData))

      const midErrorData = convertToJson(headers, fileData)

      const filteredArray = midErrorData.filter(item => Object.keys(item).length !== 0)
      setData(filteredArray)
    }
    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file)
      } else {
        alert('Invalid file input, Select Excel, CSV file')
      }
    } else {
      setData([])
      setColDefs([])
    }
  }

  console.log(data)
  // sampe sini import excel kelar

  const router = useRouter()
  return (
    <form action='post' onSubmit={e => e.preventDefault()}>
      <Grid item md={6} xs={12}>
        <Typography variant={'h6'} mb={4}>
          Import Sample
        </Typography>
      </Grid>
      <Grid mt={2} mb={2} xs={12} md={12} style={{ paddingLeft: 18 }}>
        <input style={{ display: 'none' }} id='raised-button-file' multiple type='file' onChange={importExcel} />
        <label htmlFor='raised-button-file'>
          <Button size='medium' variant='contained' component='span'>
            Upload
          </Button>
        </label>{' '}
        {/* <Button
          style={{ marginLeft: 30 }}
          size='medium'
          variant='contained'
          target='_blank'
          href='https://docs.google.com/spreadsheets/d/1s9k74pPMlJc8wotQRV1jpBxPAYFqh-BD1sH8BhEFb4Q/edit?usp=sharing'
        >
          Unduh Template
        </Button> */}
        <Button variant='contained' onClick={handleDownloadTemplateTable}>
          Unduh Template
        </Button>
      </Grid>
      <Card>
        <Grid item md={12} xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box sx={{ width: '100%' }}>
                <DataGrid
                  // initialState={{
                  //   sorting: {
                  //     sortModel: [{ field: 'nama', sort: 'asc' }]
                  //   }
                  // }}
                  rows={data}
                  columns={columnsImportMitra}
                  pprioritySize={5}
                  sx={{
                    height: '70vh',
                    overflowY: 'disabled',
                    width: '100%'
                  }}
                  slots={{
                    toolbar: GridToolbar
                  }}
                  slotProps={{
                    toolbar: { showQuickFilter: true }
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item m={4} display={'flex'} justifyContent={'end'}>
          <Button color={'primary'} size='medium' type='submit' variant='contained' onClick={handleImportMitra}>
            Import Data Mitra
          </Button>
        </Grid>
      </Card>
    </form>
  )
}

export default MitraImportViews
