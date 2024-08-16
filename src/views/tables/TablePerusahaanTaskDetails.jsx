// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

import * as React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { Autocomplete } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import Typography from '@mui/material/Typography'
import CancelIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import { List, ListItem, ListItemText, IconButton } from '@mui/material'
import Divider from '@mui/material/Divider'

// topsis
import { create, all } from 'mathjs'
import { getBest } from '../../function/topsis'

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
  const [tpp, setTpp] = useState(props.dataTpp)
  const [participants, setParticipants] = useState(props.data)
  const fungsi = props.dataProjectFungsi
  const jenisKeg = props.dataJenisKeg
  const jenisSample = props.dataTaskSample
  const [pmlAutoComplete, setPmlAutoComplete] = useState({})
  const [pclAutoComplete, setPclAutoComplete] = useState({})
  const [honorBulanIni, setHonorBulanIni] = useState(props.dataMitraLimitHonor)

  console.log('props.dataMitraLimitHonorTetap')
  console.log(props.dataMitraLimitHonorTetap)
  console.log(props.dataMitraLimitHonorTetap)
  const templateTable = participants.length > 0 ? participants[0].templateTable : 5
  const [kolomLP, setKolomLP] = useState({
    kol1: 'nbs',
    kol2: 'nks'
  })
  useEffect(() => {
    const findKolomLV = props.dataTemplateKolom.filter(item => item.templateTableId == templateTable)

    setKolomLP(kolomLP => ({
      ...kolomLP,
      kol1: findKolomLV[0].kolomTable, //kol1
      kol2: findKolomLV[1].kolomTable // kol2
    }))
  }, [])

  const hitungTotalGaji = dataMitraLimitHonor => {
    const totalGajiPerMitra = {}
    const bulanSekarang = new Date().getMonth()
    const [pclAc, setPclAc] = useState({})

    dataMitraLimitHonor.forEach(mitra => {
      const { pmlId, pclId, gajiPml, gajiPcl, task } = mitra

      // Periksa apakah bulan duedate dari task sama dengan bulan sekarang
      const taskBulan = task?.dueDate ? new Date(task.dueDate).getMonth() : new Date().getMonth()

      if (taskBulan === bulanSekarang) {
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

  // const totalGajiMitra = hitungTotalGaji(props.dataMitraLimitHonor)
  const totalGajiMitra = props.dataMitraLimitHonor

  const [organikMitra, setOrganikMitra] = useState({
    value: '',
    label: ''
  })

  // beban kerja
  const userAll = pml.map(row => {
    const jumlahKerjaanTpp = tpp.filter(tppRow => tppRow.pmlId === row.id).reduce((count, item) => count + 1, 0)

    const jumlahJamKerja = row.pekerjaan_harian
      .filter(ph => ph.task.jenisKeg === 65)
      .reduce((total, item) => total + item.durasi, 0)

    return {
      pegawai_id: row.id,
      jumlahKegiatan: jumlahKerjaanTpp,
      jumlahJamKerja
    }
  })

  const arrayUser = userAll.map(item => [item.jumlahKegiatan, item.jumlahJamKerja])
  const arrayUserId = userAll.map(item => item.pegawai_id)

  // topsis
  const config = {}
  const math = create(all, config)

  // pegawai
  let m = math.matrix(arrayUser)
  let w = props.dataKriteriaP
  let ia = ['min', 'min']
  let id = arrayUserId
  let result = getBest(m, w, ia, id)

  const resultBaru = result.map(item => {
    return { bebanKerja: item.ps }
  })

  const dataBebanKerjaPML = pml.map((item, index) => {
    return {
      ...item,
      ...resultBaru[index]
    }
  })

  const userAllM = mitra.map(row => {
    const gajiBulanIniPCL = tpp
      .filter(tppRow => tppRow.pclId === row.id)
      .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

    const gajiBulanIniPML = tpp
      .filter(tppRow => tppRow.pmlId === row.id)
      .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

    // Gabungkan total gaji dari kedua kasus
    const honorBulanIni = gajiBulanIniPCL + gajiBulanIniPML

    const jumlahKerjaanTppPML = tpp.filter(tppRow => tppRow.pmlId === row.id).reduce((count, item) => count + 1, 0)

    const jumlahKerjaanTppPCL = tpp.filter(tppRow => tppRow.pclId === row.id).reduce((count, item) => count + 1, 0)
    let jumlahKegiatan = jumlahKerjaanTppPCL + jumlahKerjaanTppPML
    const honor = props.dataMitraLimitHonorTetap.find(item => item.mitraId === row.id)?.honor || 0
    const gajiBulanIni = honor + honorBulanIni
    console.log(gajiBulanIni)

    return {
      mitra_id: row.id,
      jumlahKegiatan,
      gajiBulanIni
    }
  })

  const arrayUserM = userAllM.map(item => [item.jumlahKegiatan, item.gajiBulanIni])
  const arrayUserIdM = userAllM.map(item => item.mitra_id)

  // mitra
  let mm = math.matrix(arrayUserM)
  let wm = props.dataKriteriaM
  let idm = arrayUserIdM
  let resultm = getBest(mm, wm, ia, idm)

  const resultBaruM = resultm.map(item => {
    return { bebanKerja: item.ps }
  })

  const dataBebanKerjaM = honorBulanIni.map((item, index) => {
    return {
      ...item,
      ...resultBaruM[index]
    }
  })

  const optionPCL = useMemo(() => {
    return dataBebanKerjaM.map(mi => {
      // Temukan honor yang sesuai dengan mitraId saat ini dari dataLimitHonorTetap
      const honor = props.dataMitraLimitHonorTetap.find(item => item.mitraId === mi.mitraId)?.honor || 0

      // Format label dengan menambahkan honor
      const label = `${mi.nama}, total Gaji :  Rp${mi.totalGaji.toLocaleString(
        'id'
      )} - Honor: Rp${honor}, beban kerja: ${mi.bebanKerja.toFixed(2)}`

      return {
        value: mi.mitraId,
        label,
        name: mi.nama
      }
    })
  }, [dataBebanKerjaM, props.dataMitraLimitHonorTetap])
  const optionPML = dataBebanKerjaPML.map(pml => ({
    value: pml.id,
    // label: pml.name + ' - Organik'
    label: pml.name + ' - Organik' + ', beban kerja: ' + pml.bebanKerja.toFixed(2)
  }))

  console.log(optionPCL)

  const combinedOptions = [...optionPCL, ...optionPML]
  const apapa = props.dataProjectFungsi
  const initialRows = participants.map(row => ({
    id: row.id,
    desa: row.desa,
    namadesa: row.namadesa,
    kecamatan: row.kecamatan,
    namaKec: row.namaKec,
    target: row.target,
    pmlId: row.pmlId,
    pclId: row.pclId,
    gajiPml: row.gajiPml,
    gajiPcl: row.gajiPcl,
    kol1: row.kol1,
    kol2: row.kol2,
    realisasi: row.realisasi,
    persentase:
      row.target > 0 || row.target > 0 ? `${Math.round(100 * (Number(row.realisasi) / Number(row.target)))}%` : 0,
    hasilPencacahan: row.hasilPencacahan,
    tanggalDob: new Date(row.duedate)
  }))

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
      title: 'Hapus Baris?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#68B92E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .delete(`/task/task-tarel-progress/${id}`)
          .then(res => {
            Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'Berhasil dihapus',
              showConfirmButton: false,
              timer: 1000,
              width: 300
            })
            setRows(rows.filter(row => row.id !== id))
          })

          .catch(err => {
            Swal.fire('Error', 'Something went wrong. Please try again.', 'warning')
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

  const [snackbar, setSnackbar] = React.useState(null)

  const handleCloseSnackbar = () => setSnackbar(null)
  const handleProcessRowUpdateError = React.useCallback(error => {
    setSnackbar({ children: error.message, severity: 'error' })
  }, [])

  const processRowUpdate = newRow => {
    const updatedRow = { ...newRow, isNew: false }

    // Cari data mitra yang sesuai dengan pmlId dari updatedRow
    const mitraToUpdatePml = honorBulanIni.find(mitra => mitra.mitraId === updatedRow.pmlId)

    // Hitung total gaji setelah update untuk pmlId
    const newTotalGajiPml = mitraToUpdatePml
      ? mitraToUpdatePml.totalGaji + (updatedRow.gajiPml || 0)
      : updatedRow.gajiPml // gajiPml dari updatedRow atau 0 jika tidak ada

    // Cari data mitra yang sesuai dengan pclId dari updatedRow
    const mitraToUpdatePcl = updatedRow.pclId
      ? honorBulanIni.find(mitra => mitra.mitraId === updatedRow.pclId)
      : undefined

    // Hitung total gaji setelah update untuk pclId
    const newTotalGajiPcl = mitraToUpdatePcl ? mitraToUpdatePcl.totalGaji + (updatedRow.gajiPcl || 0) : 0 // gajiPcl dari updatedRow atau 0 jika tidak ada

    // Validasi total gaji untuk pmlId dan pclId
    const isPmlValid = newTotalGajiPml ? newTotalGajiPml <= 4000000 : true
    const isPclValid = newTotalGajiPcl <= 4000000

    // Lakukan pengecekan dan pengiriman permintaan AJAX di sini
    const data = {
      target: updatedRow.target ? updatedRow.target : 0,
      realisasi: updatedRow.realisasi ? updatedRow.realisasi : 0,
      hasilPencacahan: updatedRow.hasilPencacahan ? updatedRow.hasilPencacahan : '',
      duedate: updatedRow.tanggalDob ? updatedRow.tanggalDob : new Date(),
      taskId: props.dataSubKegId,
      desa: updatedRow.desa ? updatedRow.desa : '',
      namadesa: updatedRow.namadesa ? updatedRow.namadesa : '',
      kecamatan: updatedRow.kecamatan ? updatedRow.kecamatan : '',
      namaKec: updatedRow.namaKec ? updatedRow.namaKec : '',
      templateTable: templateTable,
      pmlId: updatedRow.pmlId ? updatedRow.pmlId : 0,
      gajiPml: updatedRow.gajiPml ? updatedRow.gajiPml : 0,
      pclId: updatedRow.pclId ? updatedRow.pclId : 0,
      gajiPcl: updatedRow.gajiPcl ? updatedRow.gajiPcl : 0,
      kol1: updatedRow.kol1 ? updatedRow.kol1.toString() : '',
      kol2: updatedRow.kol2 ? updatedRow.kol2.toString() : '',
      month: props.dataBulan
    }

    if (updatedRow.id < 100000) {
      if (data.realisasi <= data.target) {
        if (isPmlValid && isPclValid) {
          axios
            .put(`/task/task-tarel-progress/${updatedRow.id}`, data)
            .then(res => {
              Swal.fire({
                position: 'bottom-end',
                icon: 'success',
                title: 'Berhasil Disimpan',
                showConfirmButton: false,
                timer: 1000,
                width: 300
              })
              if (updatedRow.pmlId) {
                if (updatedRow.gajiPml && updatedRow.gajiPcl > 0) {
                  // const map = new Map(honorBulanIni.map(item => [item.id, item]))
                  // if (map.has(updatedRow.pmlId)) {
                  //   map.get(updatedRow.pmlId).totalGaji += updatedRow.gajiPml
                  // }
                  // // setHonorBulanIni(Array.from(map.values()))
                  // const updatedArray = Array.from(map.values())
                  // console.log(updatedArray)

                  // setHonorBulanIni(prevA =>
                  //   prevA.map(item =>
                  //     item.mitraId === updatedRow.pmlId
                  //       ? { ...item, totalGaji: item.totalGaji + updatedRow.gajiPml }
                  //       : item
                  //   )
                  // )

                  setHonorBulanIni(prevA => {
                    const index = prevA.findIndex(item => item.mitraId === updatedRow.pmlId)
                    if (index !== -1) {
                      const newArray = [...prevA]
                      newArray[index] = {
                        ...newArray[index],
                        totalGaji: newArray[index].totalGaji + updatedRow.gajiPml
                      }
                      return newArray
                    }
                    return prevA
                  })
                }
              }
              if (updatedRow.pclId) {
                if (updatedRow.gajiPcl && updatedRow.gajiPcl > 0) {
                  // const map = new Map(honorBulanIni.map(item => [item.id, item]))

                  // if (map.has(updatedRow.pclId)) {
                  //   map.get(updatedRow.pmlId).totalGaji += updatedRow.gajiPcl
                  // }
                  // setHonorBulanIni(Array.from(map.values()))
                  // const updatedArray = Array.from(map.values())

                  // console.log(updatedArray)
                  // setHonorBulanIni(prevA =>
                  //   prevA.map(item =>
                  //     item.mitraId === updatedRow.pclId
                  //       ? { ...item, totalGaji: item.totalGaji + updatedRow.gajiPcl }
                  //       : item
                  //   )
                  // )

                  setHonorBulanIni(prevA => {
                    const index = prevA.findIndex(item => item.mitraId === updatedRow.pclId)
                    if (index !== -1) {
                      const newArray = [...prevA]
                      newArray[index] = {
                        ...newArray[index],
                        totalGaji: newArray[index].totalGaji + updatedRow.gajiPcl
                      }
                      return newArray
                    }
                    return prevA
                  })
                }
              }
            })
            .catch(err => {
              Swal.fire({
                title: 'Error!',
                text: err,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            })
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Honor yang anda inputkan melebihi akumulai bulanan mitra ',
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
          .post(`/task/task-tarel-progress`, data)
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
              text: 'Gagal Disimpan',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          })
      } else if (jenisSample === 0) {
        axios
          .post(`/task/task-tarel-progress`, data)
          .then(res => {
            Swal.fire({
              position: 'bottom-end',
              icon: 'Berhasil disimpan',
              title: '',
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
      field: 'kol1',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {kolomLP.kol1}
        </Typography>
      ),
      minWidth: 200,
      flex: 1,
      editable: true
    },

    {
      field: 'kol2',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {kolomLP.kol2}
        </Typography>
      ),
      minWidth: 200,
      flex: 1,
      editable: true
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
          {jenisKeg === 65 || jenisKeg == 66 || jenisKeg == 71 ? 'PML' : 'Operator'}
        </Typography>
      ),
      width: 180,
      editable: true
    },
    {
      field: 'gajiPml',
      headerName: 'Honor PML',
      type: 'number',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {jenisKeg === 65 || jenisKeg == 66 || jenisKeg == 71 ? 'Honor PML' : 'Honor Operator'}
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
          {jenisKeg === 65 || jenisKeg == 66 || jenisKeg == 71 //Produksi or Distribusi
            ? 'PCL'
            : 'Operator 2'}
        </Typography>
      ),
      type: 'singleSelect',
      valueOptions: optionPCL.sort((a, b) => a.label.localeCompare(b.label)),
      // renderEditCell: params => {
      //   return (
      //
      //     <Autocomplete
      //       value={params.row.pclId != 0 ? optionPCL.find(a => a.value === params.row.pclId).label : 0}
      //       disablePortal
      //       id='combo-box-demo'
      //       // options={optionPCL}
      //       onChange={(event, newValue) => {
      //         setPclAutoComplete({ ...pclAutoComplete, rowId: params.row.id, namaPcl: newValue })
      //       }}
      //       // setValues({ ...values, target: trgt, realisasi })
      //       options={optionPCL.sort((a, b) => a.label.localeCompare(b.label))}
      //       sx={{ width: 300 }}
      //       renderInput={params => <TextField {...params} sx={500} />}
      //     />
      //   )
      // },

      width: 180,
      editable: true
    },
    {
      field: 'gajiPcl',
      headerName: 'Honor PCL',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {jenisKeg === 65 || jenisKeg == 66 || jenisKeg == 71 //Produksi or Distribusi
            ? 'Honor PCL'
            : 'Honor Operator2'}
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
      valueOptions:
        jenisSample === 1
          ? jenisKeg === 65 //Produksi or Distribusi
            ? ['Masuk', 'Menunggu Masuk', 'Tutup', 'Tidak Aktif', 'Tidak Ditemukan', 'Non Respon']
            : ['Proses', 'Selesai']
          : ['Proses', 'Selesai'],

      width: 180,
      editable: true
      // renderCell: params => {
      //   return (
      //     <Autocomplete
      //       value={'asd'}
      //       disablePortal
      //       id='combo-box-demo'
      //       // options={optionPCL}
      //       options={optionPCL.sort((a, b) => a.label.localeCompare(b.label))}
      //       sx={{ width: 300 }}
      //       renderInput={params => <TextField {...params} sx={500} />}
      //     />
      //   )
      // },
      // renderEditCell: params => {
      //   return (
      //     // <Autocomplete
      //     //   // options={optionPCL}
      //     //   autoComplete
      //     //   options={optionPCL.sort((a, b) => a.label.localeCompare(b.label))}
      //     //   sx={{ width: 3003 }}
      //     //   renderInput={params => <TextField {...params} sx={{ width: 450 }} />}
      //     // />
      //     <Autocomplete
      //       value={params.row.pcl}
      //       disablePortal
      //       id='combo-box-demo'
      //       // options={optionPCL}

      //       options={optionPCL.sort((a, b) => a.label.localeCompare(b.label))}
      //       sx={{ width: 300 }}
      //       renderInput={params => <TextField {...params} sx={500} />}
      //     />
      //   )
      // }
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

  const [rowsGaji, setRowsGaji] = useState([{ mitra: null, honor: '' }])
  const [savedData, setSavedData] = useState(props.dataMitraHonorTetap)
  // const [savedData, setSavedData] = useState([])

  const handleInputChange = (index, field, value) => {
    const newRows = [...rowsGaji]
    newRows[index][field] = value
    setRowsGaji(newRows)

    if (field === 'mitra' || field === 'honor') {
      if (index === rowsGaji.length - 1) {
        setRowsGaji([...rowsGaji, { mitra: null, honor: 0 }])
      }
    }
  }

  const handleSave = () => {
    const dataToSave = rowsGaji.filter(row => row.mitra && row.honor) // Filter untuk hanya menyimpan baris yang sudah diisi

    const dataToSaveList = dataToSave.map(row => ({
      honor: parseInt(row.honor, 10),
      mitra: {
        name: row.mitra.name // Pastikan ini benar berdasarkan struktur data Anda
      },
      taskId: props.dataSubKegId,
      mitraId: row.mitra.value
    }))

    setRowsGaji([{ mitra: null, honor: '' }])
    setSavedData([...savedData, ...dataToSaveList])
    axios
      .post(`task/task-honor-mitra-tetap/${props.dataSubKegId}`, dataToSave)
      .then(response => {
        console.log('Data berhasil disimpan:', response.data)
      })
      .catch(error => {
        console.error('Terjadi kesalahan saat menyimpan data:', error)
      })
  }
  const handleDelete = (taskId, mitraId) => {
    const data = {
      taskId,
      mitraId
    }
    Swal.fire({
      title: '',
      text: 'Hapus mitra dari kegiatan?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#68B92E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .put(`task/task-honor-mitra-tetap/${props.dataSubKegId}`, data)
          .then(res => {
            Swal.fire('Berhasil terhapus', 'success')

            const newSavedData = savedData.filter(data => data.taskId !== taskId || data.mitraId !== mitraId)
            setSavedData(newSavedData)
          })
          .catch(err => {
            Swal.fire('Error', 'Something went wrong. Please try again.', 'error')
          })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelled!', ' Press "OK" to continue.', 'warning')
      }
    })

    // axios
    //   .put(`task/task-honor-mitra-tetap/${props.dataSubKegId}`, data)
    //   .then(response => {
    //     console.log('Data berhasil dihapus:', response.data)

    //     const newSavedData = savedData.filter(data => data.taskId !== taskId || data.mitraId !== mitraId)
    //     setSavedData(newSavedData)
    //   })
    //   .catch(error => {
    //     console.error('Terjadi kesalahan saat menghapus data:', error)
    //   })
  }

  return (
    <>
      {' '}
      <Grid mt={4} item md={12} xs={12}>
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
              <Grid item md={3} xs={6}>
                <Typography variant='body1'>Total Sample</Typography>
                <Typography variant='caption'>{summary.totalSample}</Typography>
              </Grid>
              <Grid item md={3} xs={6}>
                <Typography variant='body1'>Realisasi/Target</Typography>
                <Typography variant='caption'>
                  {summary.totalRealisasi}/{summary.totalTarget}
                </Typography>
              </Grid>
              {/* <Grid item md={3} xs={6}>
                <Typography variant='body1'>Total Organik</Typography>
                <Typography variant='caption'>{summary.totalPml} orang</Typography>
              </Grid>
              <Grid item md={3} xs={6}>
                <Typography variant='body1'>Total Mitra</Typography>
                <Typography variant='caption'>{summary.totalPcl} orang</Typography>
              </Grid> */}
              <Grid item md={3} xs={6}>
                <Typography variant='body1'>
                  {' '}
                  {jenisKeg === 65 || jenisKeg == 66 || jenisKeg == 71 ? 'Total Honor PML' : 'Total Honor Operator 1'}
                </Typography>
                <Typography variant='caption'>Rp{summary.totalGajiPml.toLocaleString('id-ID')} </Typography>
              </Grid>
              <Grid item md={3} xs={6}>
                <Typography variant='body1'>
                  {' '}
                  {jenisKeg === 65 || jenisKeg == 66 || jenisKeg == 71 ? 'Total Honor PCL' : 'Total Honor Operator1'}
                </Typography>
                <Typography variant='caption'>Rp{summary.totalGajiPcl.toLocaleString('id-ID')}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>
      <Grid mt={4} item md={12} xs={12}>
        <Card>
          <Box
            sx={{
              overflowX: 'auto',
              height: 700,
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
              onProcessRowUpdateError={handleProcessRowUpdateError}
              slots={{
                toolbar: EditToolbar
              }}
              slotProps={{
                toolbar: { setRows, setRowModesModel, showQuickFilter: true }
              }}
            />
          </Box>
        </Card>

        <Card sx={{ marginTop: 10, padding: 3 }}>
          <Grid container>
            <Grid item xs={6}>
              {' '}
              <Box sx={{ width: '100%', padding: '20px', height: '320px', overflowY: 'scroll' }}>
                {rowsGaji.map((row, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <Autocomplete
                      disablePortal
                      id={`combo-box-${index}`}
                      options={optionPCL.sort((a, b) => a.label.localeCompare(b.label))}
                      getOptionLabel={option => option.label}
                      sx={{ width: 300, marginRight: '10px' }}
                      value={row.mitra}
                      onChange={(event, newValue) => handleInputChange(index, 'mitra', newValue)}
                      renderInput={params => <TextField {...params} label='Nama Mitra' />}
                    />
                    <TextField
                      id={`outlined-basic-${index}`}
                      type='number'
                      label='Honor Tetap'
                      variant='outlined'
                      value={row.honor}
                      onChange={event => handleInputChange(index, 'honor', parseInt(event.target.value))}
                    />
                  </Box>
                ))}
              </Box>
              <Divider />
              <Button variant='contained' color='primary' onClick={handleSave}>
                Simpan
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ width: '100%', height: '320px', overflowY: 'scroll' }}>
                <Typography variant='h6'>Daftar Mitra Kegiatan </Typography>
                <List>
                  {savedData.map((data, index) => (
                    <ListItem key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                      <ListItemText
                        primary={`Mitra: ${data.mitra.name}, Honor: Rp${data.honor.toLocaleString('id-ID')}`}
                      />

                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => handleDelete(data.taskId, data.mitraId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>{' '}
    </>
  )
}

export default TableGroupPerusahaan
