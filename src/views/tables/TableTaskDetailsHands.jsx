// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Autocomplete } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import Typography from '@mui/material/Typography'
import CancelIcon from '@mui/icons-material/Close'

// // hands on table
// import { HotTable } from '@handsontable/react'
// import { registerAllModules } from 'handsontable/registry'

// import 'handsontable/dist/handsontable.full.min.css'

// register Handsontable's modules
// registerAllModules()

import {
  GridRowModes,
  GridToolbar,
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  GridActionsCellItem,
  GridSingleSelectColDef,
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
    const id = 100000 + randomId()
    setRows(oldRows => [...oldRows, { id, kip: '', nama: '', desa: '', alamat: '', kecamatan: '', isNew: true }])
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
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  )
}

const TableGroupPerusahaan = props => {
  const [idAja, setidAja] = useState(props.dataId)
  const [mitra, setMitra] = useState(props.dataMitra)
  const [pml, setPML] = useState(props.dataPML)
  const [participants, setParticipants] = useState(props.data)
  const fungsi = props.dataProjectFungsi
  const jenisKeg = props.dataJenisKeg
  const jenisSample = props.dataTaskSample

  const templateTable = participants.length > 0 ? participants[1].templateTable : 5

  // console.log(props.dataMitraLimitHonor)
  console.log(mitra)

  const hitungTotalGaji = dataMitraLimitHonor => {
    const totalGajiPerMitra = {}
    const bulanSekarang = new Date().getMonth()

    dataMitraLimitHonor.forEach(mitra => {
      const { pmlId, pclId, gajiPml, gajiPcl, task } = mitra

      // Periksa apakah bulan duedate dari task sama dengan bulan sekarang
      const taskBulan = task?.dueDate ? new Date(task.dueDate).getMonth() : new Date().getMonth()

      if (taskBulan === bulanSekarang) {
        // console.log('ini bulan sekarang : ' + new Date().getMonth())
        // console.log('ini bulan dl subkeg: ' + new Date(taskBulan).getMonth())
        totalGajiPerMitra[pmlId] = (totalGajiPerMitra[pmlId] || 0) + gajiPml
        totalGajiPerMitra[pclId] = (totalGajiPerMitra[pclId] || 0) + gajiPcl
      }
    })

    const totalGajiArray = Object.entries(totalGajiPerMitra).map(([id, total]) => ({
      id: parseInt(id),
      totalGaji: total
    }))

    return totalGajiArray
  }

  const totalGajiMitra = hitungTotalGaji(props.dataMitraLimitHonor)

  const [organikMitra, setOrganikMitra] = useState({
    value: '',
    label: ''
  })
  const optionPCL = mitra.map(mi => ({
    value: mi.mitra.id,
    label:
      mi.mitra.name +
      ', total Gaji :  Rp' +
      ((totalGajiMitra.find(totalGaji => totalGaji.id === mi.mitra.id)?.totalGaji || 0).toLocaleString('id-ID') || '0')
  }))
  const optionPML = pml.map(pml => ({
    value: pml.organik.id,
    label: pml.organik.name + ' - Organik'
  }))

  const combinedOptions = [...optionPCL, ...optionPML]
  const apapa = props.dataProjectFungsi
  const initialRows = participants.map(row => ({
    id: row.id,
    kip: row.perusahaan.kip,
    nama: row.nama,
    desa: row.desa,
    namadesa: row.namadesa,
    kecamatan: row.kecamatan,
    namaKec: row.namaKec,
    alamat: row.alamat,
    nbs: row.nbs,
    idSls: row.idSls,
    idSbr: row.idSbr,
    nks: row.nks,
    nus: row.nus,
    target: row.target,
    pmlId: row.pmlId,
    pmldrop: row.pmlId,
    gajiPml: row.gajiPml,
    pclId: row.pclId,
    gajiPcl: row.gajiPcl,
    realisasi: row.realisasi,
    persentase:
      row.target > 0 || row.target > 0 ? `${Math.round(100 * (Number(row.realisasi) / Number(row.target)))}%` : 0,
    hasilPencacahan: row.hasilPencacahan,
    tanggalDob: new Date(row.duedate)
  }))

  // console.log(initialRows)

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
    const jenisSub = {
      64: { namaJenisSub: 'Persiapan', color: 'warning' },
      66: { namaJenisSub: 'Pelaksanaan', color: 'warning' },
      65: { namaJenisSub: 'Pengawasan', color: 'warning' },
      67: { namaJenisSub: 'Pengolahan', color: 'warning' },
      68: { namaJenisSub: 'Evaluasi', color: 'warning' },
      69: { namaJenisSub: 'Diseminasi', color: 'warning' }
    }
  }

  // useEffect(() => {
  // }, [rows])

  const handleDeleteClick = id => () => {
    Swal.fire({
      title: 'Delete Baris?',
      text: 'Press "Delete Baris"',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#68B92E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Delete Baris',
      cancelButtonText: 'No, Cancel',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .delete(`/perusahaan/${id}`)
          .then(setRows(rows.filter(row => row.id !== id)))

          .catch(err => {
            Swal.fire('Error', 'Something went wrong. Please try again.', 'error')
          })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelled!', 'Perusahaan is not deleted. Press "OK" to continue.', 'error')
      }
    })
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

  // const processRowUpdate = newRow => {
  //   const updatedRow = { ...newRow, isNew: false }
  //   setRows(rows.map(row => (row.id === newRow.id ? updatedRow : row)))
  //   return updatedRow
  // }

  const processRowUpdate = newRow => {
    const updatedRow = { ...newRow, isNew: false }

    console.log('ini update row')
    console.log(updatedRow)

    // Cari data mitra yang sesuai dengan pmlId dari updatedRow
    const mitraToUpdatePml = totalGajiMitra.find(mitra => mitra.id === updatedRow.pmlId)
    console.log('ini mitra to update pml')
    console.log(mitraToUpdatePml)
    // Hitung total gaji setelah update untuk pmlId
    const newTotalGajiPml = mitraToUpdatePml
      ? mitraToUpdatePml.totalGaji + (updatedRow.gajiPml || 0)
      : updatedRow.gajiPml // gajiPml dari updatedRow atau 0 jika tidak ada
    console.log('ini gaji total pml')
    console.log(newTotalGajiPml)
    // Cari data mitra yang sesuai dengan pclId dari updatedRow
    const mitraToUpdatePcl = updatedRow.pclId ? totalGajiMitra.find(mitra => mitra.id === updatedRow.pclId) : undefined
    console.log('mitra to update pcl')
    console.log(mitraToUpdatePcl)

    // Hitung total gaji setelah update untuk pclId
    const newTotalGajiPcl = mitraToUpdatePcl ? mitraToUpdatePcl.totalGaji + (updatedRow.gajiPcl || 0) : 0 // gajiPcl dari updatedRow atau 0 jika tidak ada
    console.log('newTotalGajiPcl')
    console.log(newTotalGajiPcl)
    // Validasi total gaji untuk pmlId dan pclId
    const isPmlValid = newTotalGajiPml ? newTotalGajiPml <= 4000000 : true
    const isPclValid = newTotalGajiPcl <= 4000000
    console.log('isPmlValid')
    console.log(isPmlValid)
    console.log('isPclValid')
    console.log(isPclValid)

    //////// yang lama
    // // Cari data mitra yang sesuai dengan pmlId dari updatedRow
    // const mitraToUpdatePml = totalGajiMitra.find(mitra => mitra.id === updatedRow.pmlId)

    // // Hitung total gaji setelah update untuk pmlId
    // const newTotalGajiPml = mitraToUpdatePml.totalGaji + (updatedRow.gajiPml || 0) // gajiPml dari updatedRow atau 0 jika tidak ada

    // // Cari data mitra yang sesuai dengan pclId dari updatedRow
    // const mitraToUpdatePcl = totalGajiMitra.find(mitra => mitra.id === updatedRow.pclId)

    // // Hitung total gaji setelah update untuk pclId
    // const newTotalGajiPcl = mitraToUpdatePcl.totalGaji + (updatedRow.gajiPcl || 0) // gajiPcl dari updatedRow atau 0 jika tidak ada

    // // Validasi total gaji untuk pmlId dan pclId
    // const isPmlValid = newTotalGajiPml <= 4000000
    // const isPclValid = newTotalGajiPcl <= 4000000

    // Lakukan pengecekan dan pengiriman permintaan AJAX di sini
    const data = {
      target: updatedRow.target ? updatedRow.target : 0,
      realisasi: updatedRow.realisasi ? updatedRow.realisasi : 0,
      hasilPencacahan: updatedRow.hasilPencacahan ? updatedRow.hasilPencacahan : '',
      duedate: updatedRow.tanggalDob ? updatedRow.tanggalDob : new Date(),
      taskId: props.dataId,
      perusahaanId: props.dataId,
      kip: updatedRow.kip ? updatedRow.kip : '',
      nama: updatedRow.nama ? updatedRow.nama : '',
      desa: updatedRow.desa ? updatedRow.desa : '',
      namadesa: updatedRow.namadesa ? updatedRow.namadesa : '',
      kecamatan: updatedRow.kecamatan ? updatedRow.kecamatan : '',
      namaKec: updatedRow.namaKec ? updatedRow.namaKec : '',
      alamat: updatedRow.alamat ? updatedRow.alamat : '',
      pmlId: updatedRow.pmlId ? updatedRow.pmlId : 0,
      gajiPml: updatedRow.gajiPml ? updatedRow.gajiPml : 0,
      pclId: updatedRow.pclId ? updatedRow.pclId : 0,
      gajiPcl: updatedRow.gajiPcl ? updatedRow.gajiPcl : 0,
      nbs: updatedRow.nbs ? updatedRow.nbs : '',
      idSls: updatedRow.idSls ? updatedRow.idSls : '',
      idSbr: updatedRow.idSbr ? updatedRow.idSbr : '',
      nks: updatedRow.nks ? updatedRow.nks : '',
      nus: updatedRow.nus ? updatedRow.nus : ''
    }

    if (updatedRow.id < 100000) {
      if (data.realisasi <= data.target) {
        if (isPmlValid && isPclValid) {
          axios
            .put(`/perusahaan/${updatedRow.id}`, data)
            .then(res => {
              Swal.fire({
                position: 'bottom-end',
                icon: 'success',
                title: 'Berhasil Disimpan',
                showConfirmButton: false,
                timer: 1000,
                width: 300
              })
            })
            .catch(err => {
              Swal.fire({
                title: 'Error!',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            })
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Honor yang anda input melebihi akumulai bulanan mitra ',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          setRows(rows.map(row => (row.id === updatedRow.id ? { ...row, gajipml: 0 } : row)))

          setValues(values => ({
            ...values, // Pertahankan nilai properti lainnya
            templateTable: event.target.value // Perbarui nilai kegRentang
          }))
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Realisasi lebih besar dari target',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    } else {
      if (jenisSample === 1) {
        axios
          .post(`/task-perusahaan/addWoDB`, data)
          .then(res => {
            Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'Berhasil Disimpan',
              showConfirmButton: false,
              timer: 1000,
              width: 300
            })
          })
          .catch(err => {
            Swal.fire({
              title: 'Error!',
              text: 'Berhasil Disimpan',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          })
      } else if (jenisSample === 0) {
        axios
          .post(`/task-perusahaan`, data)
          .then(res => {
            Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1000,
              width: 300
            })
          })
          .catch(err => {
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          })
      }
    }

    // Update state rows
    setRows(rows.map(row => (row.id === updatedRow.id ? updatedRow : row)))

    return updatedRow
  }

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
    props.dataUpdateTarget(summary.totalRealisasi, summary.totalTarget)
  }, [summary])

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     props.dataUpdateTarget(4567)
  //   }, 2000) // 5000 milliseconds, atau 5 detik

  //   // Membersihkan interval pada unmount atau saat useEffect berubah
  //   return () => clearInterval(intervalId)
  // }, [summary])

  useEffect(() => {
    setSummary(prevSummary => ({
      ...prevSummary,
      totalGajiPml: rows.reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0),
      totalGajiPcl: rows.reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0),
      totalPml: optionPML.length,
      totalPcl: optionPCL.length,
      totalTarget: rows.reduce((totalTarget, tppRow) => totalTarget + tppRow.target, 0),
      totalRealisasi: rows.reduce((totalRealisasi, tppRow) => totalRealisasi + tppRow.realisasi, 0),
      totalSample: rows.length,
      totalSample: rows.length
    }))
  }, [rows])

  // re(summary)
  const handleRowModesModelChange = newRowModesModel => {
    setRowModesModel(newRowModesModel)
  }

  const dataHots = participants.map(row => ({
    id: row.id,
    kip: row.perusahaan.kip,
    nama: row.nama,
    desa: row.desa,
    namadesa: row.namadesa,
    kecamatan: row.kecamatan,
    namaKec: row.namaKec,
    alamat: row.alamat,
    nbs: row.nbs,
    idSls: row.idSls,
    idSbr: row.idSbr,
    nks: row.nks,
    nus: row.nus,
    target: row.target,
    pmlId: row.pmlId,
    gajiPml: row.gajiPml,
    pclId: row.pclId,
    gajiPcl: row.gajiPcl,
    realisasi: row.realisasi,
    persentase:
      row.target > 0 || row.target > 0 ? `${Math.round(100 * (Number(row.realisasi) / Number(row.target)))}%` : 0,
    hasilPencacahan: row.hasilPencacahan,
    tanggalDob: new Date(row.duedate)
  }))
  // console.log(dataHots)

  const newsObject = {
    id: 'id',
    kip: 'perusahaan',
    nama: 'nama',
    desa: 'desa',
    namadesa: 'namadesa',
    kecamatan: 'kecamatan',
    namaKec: 'namaKec',
    alamat: 'alamat',
    nbs: 'nbs',
    idSls: 'idSls',
    idSbr: 'idSbr',
    nks: 'nks',
    nus: 'nus',
    target: 'target',
    pmlId: 'pmlId',
    gajiPml: 'gajiPml',
    pclId: 'pclId',
    gajiPcl: 'gajiPcl',
    realisasi: 'realisasi',
    persentase: 'persentase',
    hasilPencacahan: 'hasilPencacahan',
    tanggalDob: 'Tanggal'
  }
  dataHots.unshift(newsObject)

  const dataHOT = [
    { id: 1, name: 'Ted Right', address: '' },
    { id: 2, name: 'Frank Honest', address: '' },
    { id: 3, name: 'Joan Well', address: '' },
    { id: 4, name: 'Gail Polite', address: '' },
    { id: 5, name: 'Michael Fair', address: '' }
  ]

  // autocomplete
  const optionsKota = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose',
    'Austin',
    'Jacksonville',
    'Fort Worth',
    'Columbus',
    'Charlotte',
    'San Francisco',
    'Indianapolis',
    'Seattle',
    'Denver',
    'Washington',
    'Boston',
    'El Paso',
    'Nashville',
    'Detroit',
    'Oklahoma City',
    'Portland',
    'Las Vegas',
    'Memphis',
    'Louisville',
    'Baltimore'
  ]

  const [inputText, setInputText] = useState('')
  const [filteredOptions, setFilteredOptions] = useState([])
  const [showOptions, setShowOptions] = useState(false)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (inputRef.current && dropdownRef.current) {
      const inputWidth = inputRef.current.offsetWidth
      dropdownRef.current.style.width = `${inputWidth}px`
    }
  }, [inputText, showOptions])

  const handleChange = event => {
    const inputText = event.target.value
    setInputText(inputText)

    const filteredOptions = options.filter(option => option.toLowerCase().includes(inputText.toLowerCase()))
    setFilteredOptions(filteredOptions)
    setShowOptions(true)
  }

  const handleSelectOption = option => {
    setInputText(option)
    setShowOptions(false)
  }

  const dropdownStyles = `
  .autocomplete-dropdown {
    position: relative;
    z-index: 99; /* Menambahkan z-index di sini */
  }

  .options-list {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: none;
    max-height: 200px;
    overflow-y: auto;
    margin: 0;
    padding: 0;
    list-style: none;
    z-index: 99; /* Menambahkan z-index di sini */
  }

  .options-list li {
    padding: 5px 10px;
    cursor: pointer;
  }

  .options-list li:hover {
    background-color: #f0f0f0;
  }
`

  const autoauto = (
    <>
      <style>{dropdownStyles}</style>
      <div className='autocomplete-dropdown' ref={dropdownRef}>
        <input
          type='text'
          value={inputText}
          onChange={handleChange}
          onFocus={() => setShowOptions(true)}
          onBlur={() => setTimeout(() => setShowOptions(false), 200)}
          placeholder='Type here...'
          ref={inputRef}
        />
        {showOptions && (
          <ul className='options-list'>
            {filteredOptions.map((option, index) => (
              <li key={index} onClick={() => handleSelectOption(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )

  const columns = [
    {
      field: 'kecamatan',
      headerName: 'Kode Kecamatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Kode Kecamatan
        </Typography>
      ),
      width: 130,
      editable: true
    },
    {
      field: 'namaKec',
      headerName: 'Nama Kecamatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Nama Kecamatan
        </Typography>
      ),
      renderCell: params => (
        <Typography color={'secondary.main'} sx={{ textTransform: 'uppercase', textAlign: 'center' }}>
          {params.row.namaKec}
        </Typography>
      ),
      width: 130,
      editable: true
    },
    {
      field: 'desa',
      headerName: 'Kode Desa',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Kode Desa
        </Typography>
      ),
      width: 130,
      editable: true
    },
    {
      field: 'namadesa',
      headerName: 'Nama Desa ',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Nama Desa
        </Typography>
      ),
      renderCell: params => (
        <Typography color={'secondary.main'} sx={{ textTransform: 'uppercase', textAlign: 'center' }}>
          {params.row.namadesa}
        </Typography>
      ),
      width: 130,
      editable: true
    },
    {
      field:
        templateTable == 5 //Produksi or Distribusi
          ? 'alamat'
          : templateTable == 4 || templateTable == 3 //Sosial or IPDS dokumen
          ? 'nbs'
          : templateTable == 7 // IPDS Responden
          ? 'idSbr'
          : templateTable == 6 //Nerwilis responden
          ? 'nus'
          : '',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {templateTable == 5 //Produksi or Distribusi
            ? 'Alamat'
            : templateTable == 4 || templateTable == 3 //Sosial or IPDS dokumen
            ? 'NBS'
            : templateTable == 7 // IPDS Responden
            ? 'ID SBR'
            : templateTable == 6 //Nerwilis responden
            ? 'NUS'
            : ''}
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },

    {
      field:
        templateTable == 5 || templateTable == 6 //NerwilisResponden or IPDS Responden
          ? 'nama'
          : templateTable == 4 // Nerwilis Dok
          ? 'idSls'
          : templateTable == 3 //Sosial
          ? 'nks'
          : templateTable == 7 //IPDS Dok
          ? 'nama'
          : '',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {templateTable == 5 || templateTable == 6 //Nerwilis Responden or IPDS Responden
            ? 'Nama Perusahaan'
            : templateTable == 4 // Nerwilis Dok
            ? 'ID SLS'
            : templateTable == 3 //Sosial
            ? 'NKS'
            : templateTable == 7 //IPDS Dok
            ? 'Nama Perusahaan'
            : ''}
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },

    {
      field: 'realisasi',
      headerName: 'Realisasi',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Realisasi
        </Typography>
      ),
      type: 'number',
      width: 100,
      editable: true
    },
    {
      field: 'target',
      type: 'number',
      headerName: 'Target',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Target</Typography>
      ),
      width: 100,
      editable: true
    },
    {
      field: 'persentase',
      headerName: 'Persentase',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Persentase
        </Typography>
      ),
      width: 100,
      editable: false
    },

    {
      field: 'pmlId',
      headerName: 'PML',
      type: 'singleSelect',

      valueOptions: combinedOptions.sort((a, b) => {
        // Periksa apakah label mengandung "organik"
        const isAOrganik = a.label.toLowerCase().includes('organik')
        const isBOrganik = b.label.toLowerCase().includes('organik')

        if (isAOrganik && !isBOrganik) {
          return -1 // Pindahkan label a ke atas
        } else if (!isAOrganik && isBOrganik) {
          return 1 // Pindahkan label b ke atas
        } else {
          // Urutkan berdasarkan label
          return a.label.localeCompare(b.label)
        }
      }),
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {jenisKeg === 65 //Produksi or Distribusi
            ? 'PML'
            : 'Operator'}
        </Typography>
      ),
      width: 180,
      editable: true
    },
    // {
    //   headerName: 'PML',
    //   width: 450,
    //   renderEditCell: params => {
    //     console.log('PARAMS NORM', params)
    //     return (
    //       <Autocomplete
    //         disablePortal
    //         id='combo-box-demo'
    //         options={optionsKota}
    //         sx={{ width: 300 }}
    //         renderInput={params => <TextField {...params} label='Movie' />}
    //       />
    //     )
    //   },
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
    //       {jenisKeg === 65 //Produksi or Distribusi
    //         ? 'PML'
    //         : 'Operator'}
    //     </Typography>
    //   ),
    //   width: 180,
    //   editable: true
    // },
    {
      field: 'gajiPml',
      headerName: 'Honor PML',
      type: 'number',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {jenisKeg === 65 //Produksi or Distribusi
            ? 'Honor PML'
            : 'Honor Operator'}
        </Typography>
      ),
      width: 120,
      editable: true
    },
    {
      field: 'pclId',
      headerName: 'PCL',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {' '}
          {jenisKeg === 65 //Produksi or Distribusi
            ? 'PCL'
            : 'Operator'}
        </Typography>
      ),
      // type: 'singleSelect',
      // valueOptions: optionPCL.sort((a, b) => a.label.localeCompare(b.label)),

      renderEditCell: params => {
        return (
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            // options={optionPCL}
            options={optionPCL.sort((a, b) => a.label.localeCompare(b.label))}
            sx={{ width: 300 }}
            renderInput={params => <TextField {...params} />}
          />
        )
      },

      // renderCell: params => (
      //   <Autocomplete {...params} options={optionPCL} freeSolo={false} multiple={false} disableClearable />
      // ),
      width: 180,
      editable: true
    },
    {
      field: 'gajiPcl',
      headerName: 'Honor PCL',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {jenisKeg === 65 //Produksi or Distribusi
            ? 'Honor PCL'
            : 'Honor Operator'}
        </Typography>
      ),
      type: 'number',
      width: 120,
      editable: true
    },
    {
      field: 'hasilPencacahan',
      headerName: 'Proses',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {jenisSample === 1 ? 'Proses' : 'Proses'}
        </Typography>
      ),
      type: 'singleSelect',
      valueOptions: [
        'New York',
        'Los Angeles',
        'Chicago',
        'Houston',
        'Phoenix',
        'Philadelphia',
        'San Antonio',
        'San Diego',
        'Dallas',
        'San Jose'
      ],
      renderEditCell: params => {
        return (
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            // options={optionPCL}
            options={optionsKota}
            sx={{ width: 300 }}
            renderInput={params => <TextField {...params} />}
          />
        )
      },

      width: 180,
      editable: true,
      description: 'asdasd'
    },
    {
      field: 'tanggalDob',
      headerName: jenisSample === 0 ? 'Tanggal Terima Dok Dikab' : 'Tanggal Selesai Pengerjaan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {jenisSample === 1 ? 'Tanggal Selesai Pengerjaan' : 'Tanggal Selesai Pengerjaan'}
        </Typography>
      ),
      type: 'date',
      width: 180,
      editable: true
    },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Actions</Typography>
      ),
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
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem icon={<DeleteIcon />} label='Delete' onClick={handleDeleteClick(id)} color='inherit' />
        ]
      }
    }
  ]
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
                <Typography variant='body1'>Total Honor Pml</Typography>
                <Typography variant='caption'>Rp{summary.totalGajiPml.toLocaleString('id-ID')} </Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Total Honor PCL</Typography>
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
              slots={{
                toolbar: EditToolbar
              }}
              slotProps={{
                toolbar: { setRows, setRowModesModel, showQuickFilter: true }
              }}
            />
          </Box>
        </Card>
      </Grid>
      <Grid item md={12} xs={12}>
        {/* <HotTable
          data={dataHots}
          startRows={5}
          startCols={5}
          height='auto'
          width='auto'
          colHeaders={true}
          minSpareRows={1}
          autoWrapRow={true}
          autoWrapCol={true}
          licenseKey='non-commercial-and-evaluation'
        />
        <HotTable
          data={dataHOT}
          colHeaders={true}
          height='auto'
          width='auto'
          minSpareRows={1}
          autoWrapRow={true}
          autoWrapCol={true}
          licenseKey='non-commercial-and-evaluation'
        />
        {autoauto} */}
      </Grid>{' '}
    </>
  )
}

export default TableGroupPerusahaan
