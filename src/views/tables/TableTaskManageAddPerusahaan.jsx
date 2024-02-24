// react import
import { useState } from 'react'
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

import { DataGrid } from '@mui/x-data-grid'
import TableAddParticipant from 'src/views/tables/TableAddParticipant'

const CreateKegiatanPerusahaanViews = props => {
  const [participants, setParticipants] = useState(
    props.data.map(perusahaan => {
      return {
        ...perusahaan,
        checked: false
      }
    })
  )

  const rows = participants.map(perusahaan => ({
    id: perusahaan.id,
    nama: perusahaan.nama,
    desa: perusahaan.desa,
    kecamatan: perusahaan.kecamatan,
    alamat: perusahaan.alamat,
    checked: perusahaan.checked
  }))

  const columns = [
    {
      field: 'checked',
      sortable: false,
      renderHeader: () => (
        <FormControlLabel
          control={
            <Checkbox
              checked={participants.filter(participant => participant.checked === true).length === participants.length}
              onChange={e => {
                let checked = e.target.checked
                setParticipants(
                  participants.map(participant => {
                    return {
                      ...participant,
                      checked: checked
                    }
                  })
                )
              }}
            />
          }
          label='All'
        />
      ),
      minWidth: 30,
      renderCell: params => (
        <FormControlLabel
          control={
            <Checkbox
              checked={params.value}
              onChange={e => {
                let checked = e.target.checked
                setParticipants(
                  participants.map(participant => {
                    if (participant.id === params.id) {
                      participant.checked = checked
                    }

                    return participant
                  })
                )
              }}
            />
          }
          label=''
        />
      ),
      align: 'left'
    },
    {
      field: 'nama',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Name</Typography>
      ),
      minWidth: 200,
      flex: 1,
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.value}</Typography>
      )
    },
    {
      field: 'desa',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Desa</Typography>
      ),
      minWidth: 200,
      flex: 1,
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.value}</Typography>
      )
    },
    {
      field: 'kecamatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Kecamatan
        </Typography>
      ),
      minWidth: 200,
      flex: 1,
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.value}</Typography>
      )
    },
    {
      field: 'alamat',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Alamat</Typography>
      ),
      minWidth: 200,
      flex: 1,
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.value}</Typography>
      )
    }
  ]

  const router = useRouter()
  return (
    <form action='post' onSubmit={e => e.preventDefault()}>
      <Grid container spacing={4} sx={{ padding: '32px' }}>
        <Grid item xs={12}>
          <Box sx={{ width: '100%' }}>
            <DataGrid
              initialState={{
                // filter: {
                //   filterModel: {
                //     items: [{ field: 'nama', value: 'antam' }]
                //   }
                // }
                sorting: {
                  sortModel: [{ field: 'nama', sort: 'asc' }]
                }
              }}
              rows={rows}
              columns={columns}
              pprioritySize={5}
              rowsPerPpriorityOptions={[5]}
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
              sx={{
                height: rows.length > 3 ? '70vh' : '45vh',
                overflowY: 'auto',
                width: '100%'
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}

export default CreateKegiatanPerusahaanViews
