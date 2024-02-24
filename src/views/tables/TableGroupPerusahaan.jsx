import * as React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons
} from '@mui/x-data-grid'
import { randomCreatedDate, randomTraderName, randomId, randomArrayItem } from '@mui/x-data-grid-generator'

const roles = ['Market', 'Finance', 'Development']
const randomRole = () => {
  return randomArrayItem(roles)
}

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props

  const handleClick = () => {
    const id = randomId()
    setRows(oldRows => [...oldRows, { id, kip: '', nama: 'www', desa: '', alamat: '', kecamatan: '', isNew: true }])
    setRowModesModel(oldModel => ({
      ...oldModel,

      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' }
    }))
  }

  return (
    <GridToolbarContainer>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  )
}

const TableGroupPerusahaan = props => {
  const [participants, setParticipants] = useState(props.data.perusahaan)
  const initialRows = participants.map(row => ({
    id: row.id,
    kip: row.perusahaan.kip,
    nama: row.perusahaan.nama,
    desa: row.perusahaan.desa,
    kecamatan: row.perusahaan.kecamatan,
    alamat: row.perusahaan.alamat
  }))
  console.log(participants)
  const initialRow2s = [
    {
      id: randomId(),
      name: randomTraderName(),
      age: 25,
      joinDate: randomCreatedDate(),
      role: randomRole()
    }
  ]

  const [rows, setRows] = React.useState(initialRows)
  const [rowModesModel, setRowModesModel] = React.useState({})

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
    processRowUpdate
  }

  const handleEditClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
    // console.log(rows)
  }

  const handleDeleteClick = id => () => {
    setRows(rows.filter(row => row.id !== id))
  }

  const handleCancelClick = id => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    })

    const editedRow = rows.find(row => row.id === id)
    if (editedRow.isNew) {
      setRows(rows.filter(row => row.id !== id))
    }
  }

  const processRowUpdate = newRow => {
    const updatedRow = { ...newRow, isNew: false }
    setRows(rows.map(row => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
  }
  // console.log(rows)

  const handleRowModesModelChange = newRowModesModel => {
    setRowModesModel(newRowModesModel)
  }

  const columns = [
    {
      field: 'kip',
      headerName: 'KIP',

      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: false
    },
    { field: 'nama', headerName: 'Name', width: 250, editable: false },
    { field: 'alamat', headerName: 'Alamat', width: 250, editable: false },
    { field: 'desa', headerName: 'Desa', width: 80, editable: false },
    { field: 'kecamatan', headerName: 'Kecamatan', width: 880, editable: false },
    // {
    //   field: '',
    //   headerName: 'Join date',
    //   type: 'date',
    //   width: 180,
    //   editable: false
    // },
    // {
    //   field: 'role',
    //   headerName: 'Department',
    //   width: 220,
    //   editable: false,
    //   type: 'singleSelect',
    //   valueOptions: ['Market', 'Finance', 'Development']
    // },
    {
      field: 'actions',
      type: 'actions',
      headerName: ' ',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label='Save'
              sx={{
                color: 'primary.main'
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />
          ]
        }

        return [
          // <GridActionsCellItem
          //   icon={<EditIcon />}
          //   label='Edit'
          //   className='textPrimary'
          //   onClick={handleEditClick(id)}
          //   color='inherit'
          // />,
          // <GridActionsCellItem icon={<DeleteIcon />} label='Delete' onClick={handleDeleteClick(id)} color='inherit' />
        ]
      }
    }
  ]

  return (
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
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } }
        }}
        pageSizeOptions={[10, 15, 25]}
        rowHeight={35}
        rows={rows}
        columns={columns}
        editMode='row'
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        // slots={{
        //   toolbar: EditToolbar
        // }}
        slotProps={{
          toolbar: { setRows, setRowModesModel }
        }}
      />
    </Box>
  )
}

export default TableGroupPerusahaan
