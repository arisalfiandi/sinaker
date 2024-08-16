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
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'

// export table
import exportFromJSON from 'export-from-json'
import xlsx from 'json-as-xlsx'

const TemplateTableDetailViews = props => {
  const [data, setData] = useState(props.dataTemplate)
  console.log(data)

  //   const handleDelete = async e => {
  //     e.preventDefault()

  //     Swal.fire({
  //       title: 'Delete Group?',
  //       text: '',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#68B92E',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes, Delete Group',
  //       cancelButtonText: 'No, Cancel',
  //       reverseButtons: true
  //     }).then(result => {
  //       if (result.isConfirmed) {
  //         axios
  //           .delete(`/group-perusahaan/${values.idGroup}`)
  //           .then(res => {
  //             Swal.fire('Deleted', 'Group has been deleted. ', 'success')

  //             router.push('/perusahaan-group-list')
  //           })
  //           .catch(err => {
  //             Swal.fire('Error', 'Something went wrong. Please try again.', 'error')
  //           })
  //       } else if (
  //         /* Read more about handling dismissals below */
  //         result.dismiss === Swal.DismissReason.cancel
  //       ) {
  //         Swal.fire('Cancelled!', ' Press "OK" to continue.', 'error')
  //       }
  //     })
  //   }

  const camelCase = str => {
    return str
      .toLowerCase()
      .replace(/[\W_]/g, '')
      .replace(/[A-Z]/g, (match, index) => (index === 0 ? match.toLowerCase() : match))
  }

  const jenisSample = {
    0: { color: 'warning', sample: 'Non Perusahaan' },
    1: { color: 'success', sample: 'Perusahaan' }
  }

  const handleDelete = async e => {
    e.preventDefault()

    Swal.fire({
      title: 'Hapus Template?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#68B92E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete Template',
      cancelButtonText: 'No, Cancel',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .delete(`/template-table/${data.id}`)
          .then(res => {
            Swal.fire('Deleted', 'Template Table Deleted. ', 'success')

            router.push('/template-table-list')
          })
          .catch(err => {
            Swal.fire('Error', 'Something went wrong. Please try again.', 'error')
          })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelled!', ' Press "OK" to continue.', 'error')
      }
    })
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
    newObj[camelCase(data.template_table_kolom[0].kolomTable)] = 2
    newObj[camelCase(data.template_table_kolom[1].kolomTable)] = 2
    return newObj
  })

  //   initialRowsT[camelCase(data.template_table_kolom[0].kolomTable)] = 2
  //   initialRowsT[camelCase(data.template_table_kolom[1].kolomTable)] = 2

  const [rowsT, setRowsT] = useState(newData)

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
      field: camelCase(data.template_table_kolom[0].kolomTable),
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {data.template_table_kolom[0].kolomTable}
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },

    {
      field: camelCase(data.template_table_kolom[1].kolomTable),
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {data.template_table_kolom[1].kolomTable}
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

  const handleDownloadTable = e => {
    const dataKolom = columnsNew.map(kol => ({
      label: kol.field,
      value: kol.field
    }))

    dataKolom.unshift({ label: 'id', value: 'id' })

    let dataDownload = [
      {
        sheet: 'sheetone',
        columns: dataKolom,
        // [
        //   { label: 'User', value: 'user' }, // Top level data
        //   { label: 'Age', value: row => row.age + ' years' }, // Custom format
        //   { label: 'Phone', value: row => (row.more ? row.more.phone || '' : '') } // Run functions
        // ],
        content: rowsT
        //  [
        //   { user: 'Andrea', age: 20, more: { phone: '11111111' } },
        //   { user: 'Luis', age: 21, more: { phone: '12345678' } }
        // ]
      }
    ]

    let settings = {
      fileName: 'template_table_' + data.nama, // Name of the resulting spreadsheet
      extraLength: 3, // A bigger number means that columns will be wider
      writeMode: 'writeFile', // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
      writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
      RTL: false // Display the columns from right-to-left (the default value is false)
    }

    xlsx(dataDownload, settings)
  }

  const router = useRouter()
  return (
    <Card>
      <form action='post' onSubmit={e => e.preventDefault()}>
        <Grid container spacing={4} sx={{ padding: '32px' }}>
          <Grid item xs={12}>
            <Typography variant='h5'>Template Table</Typography>
          </Grid>

          <Divider></Divider>
          <Grid item xs={12}>
            <Typography variant='body1'>{data.nama}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2'>Jenis Sample : {jenisSample[data.jenisSample].sample}</Typography>
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }} item xs={6}>
            <Button variant='contained' onClick={handleDownloadTable}>
              Unduh Template
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                pageSizeOptions={[10, 15, 25]}
                rowHeight={65}
                initialState={{
                  pagination: { paginationModel: { pageSize: 100 } }
                }}
                rows={rowsT}
                columns={columnsNew}
                sx={{
                  height: rowsT.length > 3 ? '80vh' : '45vh',
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
          <Button color={'error'} size='medium' type='submit' variant='contained' onClick={handleDelete}>
            Hapus Template Table
          </Button>
        </Grid>
      </form>
    </Card>
  )
}

export default TemplateTableDetailViews
