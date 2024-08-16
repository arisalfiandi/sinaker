import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import {
  GridColDef,
  GridRowsProp,
  DataGrid,
  GridRowId,
  GridCellModes,
  GridRowModesModel,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter
} from '@mui/x-data-grid'
import { randomCreatedDate, randomTraderName, randomUpdatedDate } from '@mui/x-data-grid-generator'
//  icon
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
// swall
import Swal from 'sweetalert2'

function EditToolbar(props) {
  const { cellModesModel, setCellModesModel, editingCellParams, setEditingCellParams: setEditingRowsParams } = props

  const handleSaveOrEdit = () => {
    if (editingCellParams.length > 0) {
      let modeModel = {}

      editingCellParams.forEach(cells => {
        const { id } = cells

        modeModel[id] = { mode: GridCellModes.View }
      })
      setCellModesModel({
        ...cellModesModel,
        ...modeModel
      })
      setEditingRowsParams([])
    }
  }

  const handleCancel = () => {
    let modeModel = {}

    editingCellParams.forEach(cells => {
      const { id } = cells
      modeModel[id] = { mode: GridCellModes.View, ignoreModifications: true }
    })
    setCellModesModel({
      ...cellModesModel,
      ...modeModel
    })
  }

  const handleMouseDown = event => {
    // Keep the focus in the cell
    event.preventDefault()
  }

  const handleClick = () => {
    const id = 100000 + randomId()
    setRows(oldRows => [...oldRows, { id, kip: '', nama: '', desa: '', alamat: '', kecamatan: '', isNew: true }])
    setRowModesModel(oldModel => ({
      ...oldModel,

      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' }
    }))
  }

  return (
    <GridToolbarContainer>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Button
          onClick={handleSaveOrEdit}
          onMouseDown={handleMouseDown}
          startIcon={<SaveIcon />}
          disabled={editingCellParams.length === 0}
        >
          Save All
        </Button>
        <Button onClick={handleCancel} onMouseDown={handleMouseDown} disabled={editingCellParams.length === 0}>
          Cancel
        </Button>
        <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
        <GridToolbarColumnsButton />
        {/* <GridToolbarFilterButton /> */}
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <GridToolbarQuickFilter />
      </Box>
    </GridToolbarContainer>
  )
}

export default function StartEditButtonGrid() {
  const [editingRowParams, setEditingRowParams] = useState([])

  const [rowModesModel, setCellModesModel] = useState({})

  const [summary, setSummary] = useState({
    totalTarget: 0,
    totalRealisasi: 0,
    totalSample: 0,
    totalPcl: 0,
    totalPml: 0,
    totalMasuk: 0,
    totalTidakDitemukan: 0,
    totalGajiPcl: 0,
    totalGajiPml: 0
  })

  useEffect(() => {
    console.log(editingRowParams)
  }, [editingRowParams])

  return (
    <>
      {' '}
      <Grid item md={12} xs={12}>
        <Card>
          {' '}
          <Box
            sx={{
              overflowX: 'auto',
              height: 100,
              width: '100%',
              padding: 6
            }}
          >
            <Grid container spacing={4}>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Total Sample</Typography>
                <Typography variant='caption'>{summary.totalSample}</Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Realisasi/Target</Typography>
                <Typography variant='caption'>
                  {summary.totalRealisasi}/{summary.totalTarget}
                </Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Total Organik</Typography>
                <Typography variant='caption'>{summary.totalPml} orang</Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Total Mitra</Typography>
                <Typography variant='caption'>{summary.totalPcl} orang</Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Total Gaji Pml</Typography>
                <Typography variant='caption'>Rp{summary.totalGajiPml.toLocaleString('id-ID')} </Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Total Gaji PCL</Typography>
                <Typography variant='caption'>Rp{summary.totalGajiPcl.toLocaleString('id-ID')}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>
      <Grid item md={12} xs={12}>
        <Card>
          <Box
            sx={{
              overflowX: 'auto',
              height: 500,
              width: '100%',
              '& .actions': {
                color: 'text.secondary'
              },
              '& .textPrimary': {
                color: 'text.primary'
              }
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              rowModesModel={rowModesModel}
              onRowModesModelChange={model => {
                setCellModesModel(model)
              }}
              onRowEditStop={(p, e) => {
                e.defaultMuiPrevented = true
              }}
              onRowEditStart={(p, e) => {
                const { id } = p
                setEditingRowParams([...editingRowParams, { id: id }])
              }}
              editMode='row'
              slots={{
                toolbar: EditToolbar
              }}
              slotProps={{
                toolbar: {
                  cellModesModel: rowModesModel,
                  setCellModesModel,
                  editingCellParams: editingRowParams,
                  setEditingCellParams: setEditingRowParams
                }
              }}
            />
          </Box>
        </Card>
      </Grid>{' '}
    </>
  )
}

const columns = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', editable: true },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    type: 'date',
    width: 180,
    editable: true
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    editable: true
  }
]

const rows = [
  {
    id: 1,
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 2,
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 3,
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 4,
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 5,
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  }
]
