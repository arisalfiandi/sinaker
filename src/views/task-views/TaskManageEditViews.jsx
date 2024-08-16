import { useState, useEffect, forwardRef } from 'react'

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

// mui
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import { useSession } from 'next-auth/react'

import { useRouter } from 'next/dist/client/router'

import { Autocomplete } from '@mui/lab'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// tab
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

// tabel
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
// import xlsx
import MaterialTable from 'material-table'
import * as XLSX from 'xlsx/xlsx.mjs'

// export
import exportFromJSON from 'export-from-json'
import xlsx from 'json-as-xlsx'

// import TemplateExcel from './asd.pdf'

const EXTENSIONS = ['xlsx', 'xls', 'csv']

import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import FolderIcon from '@mui/icons-material/Folder'
import DeleteIcon from '@mui/icons-material/Delete'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import SendIcon from 'mdi-material-ui/Send'
import AccountIcon from 'mdi-material-ui/Account'
import TablePerusahaanTaskDetails from 'src/views/tables/TablePerusahaanTaskDetails'

// chartjs dan visualiasi lain
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
Chart.register(CategoryScale)
import LinearProgress from '@mui/material/LinearProgress'

const TaskManageEditViews = props => {
  const session = useSession()
  const [kolomLP, setKolomLP] = useState({
    kol1: 'nbs',
    kol2: 'nks'
  })

  const top10Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 }
  ]

  const dataTemplatePerusahaan = props.dataT.filter(TP => TP.jenisSample === 1)
  const dataTemplateNonPerusahaan = props.dataT.filter(TP => TP.jenisSample === 0)

  const camelCase = str => {
    return str
      .toLowerCase()
      .replace(/[\W_]/g, '')
      .replace(/[A-Z]/g, (match, index) => (index === 0 ? match.toLowerCase() : match))
  }

  const CustomInputEnd = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Tanggal Berakhir' autoComplete='on' />
  })
  const CustomInputStart = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Tanggal Mulai' autoComplete='on' />
  })

  const router = useRouter()
  const [value, setValue] = useState('2')
  const [value2, setValue2] = useState('1')
  const [selectedDateE, setSelectedDateE] = useState(new Date(props.data.duedate))
  const [selectedDateS, setSelectedDateS] = useState(new Date(props.data.startDate))
  // kegiatan harian
  const [dataPHreal, setDataPHrealn] = useState(1)
  const [valuesHarian, setValuesHarian] = useState({
    namaKegiatan: '',
    durasi: '',
    userId: '',
    taskId: props.data.id,
    tanggalSubmit: new Date()
  })
  const handleChangeHarian = props => event => {
    setValuesHarian({ ...valuesHarian, [props]: event.target.value })
  }
  const handleTaskUpdate = (realisasi, trgt) => {
    setValues({ ...values, target: trgt, realisasi })
  }

  const [values, setValues] = useState({
    id: props.data.project.id,
    subKegNama: props.data.title,
    subKegJenis: props.data.jenisKeg,
    subKegTarget: props.data.target,
    subKegJenisSample: props.data.jenisSample,
    subKegRealisasi: props.data.realisasi,
    subKegUnitTarget: props.data.unitTarget,
    subKegStart: new Date(props.data.startDate),
    subKegDl: new Date(props.data.duedate),
    subKegDesk: props.data.description,
    subKegMonth: props.data.month,
    subKegYear: props.data.year,
    subKegId: props.data.id,
    subKegNotes: props.data.notes,
    templateTable: 4,
    subKegHonorPmlPerPerusahaan: 0,
    subKegHonorPclPerPerusahaan: 0,
    subKegImportStatus: props.data.importStatus
  })

  const statusObj = {
    0: { color: 'warning', status: 'On Progress' },
    1: { color: 'success', status: 'Done' }
  }
  const dokumenResponden = [
    {
      id: 163,
      nama: 'Dokumen'
    },

    {
      id: 164,
      nama: 'Responden'
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

  const handleJenisSample = e => {
    setValues(values => ({
      ...values,
      subKegJenisSample: e.target.value
    }))
  }

  const handleDokumenResponden = e => {
    setValues(values => ({
      ...values,
      subKegUnitTarget: e.target.value
    }))
  }

  const handleChangeTab = (event, newValue) => {
    setValue(newValue)
  }
  const handleChangeTab2 = (event, newValue) => {
    setValue2(newValue)
  }

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
  }

  const handleDateChangeE = date => {
    const dates = new Date(date) // Ganti tanggal dengan tanggal yang sesuai
    const localizedDateString = date.toLocaleDateString('id')
    setSelectedDateE(date)
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      subKegMonth: date.getMonth() + 1,
      subKegYear: date.getFullYear(),
      subKegDl: date // Perbarui nilai kegRentang
    }))
  }

  const handleDateChangeS = date => {
    const dates = new Date(date) // Ganti tanggal dengan tanggal yang sesuai

    setSelectedDateS(date)
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      subKegStart: date // Perbarui nilai kegRentang
    }))
  }
  const handleTemplateChange = event => {
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      templateTable: event.target.value // Perbarui nilai kegRentang
    }))
  }

  const handleJenisSubKeg = eeee => {
    setValues(values => ({
      ...values,
      subKegJenis: eeee.target.value
    }))
  }
  const jenisSubKegiatan = [
    {
      id: 63,
      nama: 'Pelatihan'
    },

    {
      id: 64,
      nama: 'Persiapan '
    },

    {
      id: 66,
      nama: 'Listing '
    },
    {
      id: 65,
      nama: 'Pencacahan'
    },

    {
      id: 67,
      nama: 'Pengolahan-Entri '
    },
    {
      id: 70,
      nama: 'Pengolahan-Validasi '
    },
    {
      id: 71,
      nama: 'Listing'
    },

    {
      id: 69,
      nama: 'Diseminasi '
    },
    {
      id: 68,
      nama: 'Evaluasi '
    }
  ]

  // dari sini kebawah buat keperluan import excel,csv
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
      field: camelCase(kolomLP.kol1),

      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {' '}
          {kolomLP.kol1}
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: camelCase(kolomLP.kol2),

      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {kolomLP.kol2}
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'target',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Target</Typography>
      ),
      minWidth: 200,
      flex: 1
    }
  ]
  const [colDefs, setColDefs] = useState()
  const [data, setData] = useState({
    id: 1,
    kodeDesa: '',
    kodeKecamatan: '',
    namaDesa: '',
    namaKecamatan: '',
    namaPerusahaan: '',
    alamat: '',
    target: ''
  })
  const [data2, setData2] = useState({
    id: 1,
    kodeDesa: '',
    kodeKecamatan: '',
    namaDesa: '',
    namaKecamatan: '',
    namaPerusahaan: '',
    alamat: '',
    target: ''
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

  useEffect(() => {
    const findKolomLV = props.dataTK.filter(item => item.templateTableId == values.templateTable)

    setKolomLP(kolomLP => ({
      ...kolomLP,
      kol1: camelCase(findKolomLV[0].kolomTable), //kol1
      kol2: camelCase(findKolomLV[1].kolomTable) // kol2
    }))
  }, [values.templateTable])

  const handleEdit = e => {
    e.preventDefault()

    const data = {
      title: values.subKegNama,
      jenisKeg: values.subKegJenis,
      target: parseInt(values.subKegTarget),
      realisasi: parseInt(values.subKegRealisasi),
      unitTarget: values.subKegUnitTarget,
      duedate: values.subKegDl,
      startDate: values.subKegStart,
      description: values.subKegDesk,
      month: parseInt(new Date(values.subKegDl).getMonth()),
      year: parseInt(values.subKegYear)
    }

    axios
      .put(`/task/${values.subKegId}`, data)
      .then(res => {
        Swal.fire({
          title: 'Berhasil disimpan',
          text: '',
          icon: 'success',
          confirmButtonText: 'Ok'
        })

        // router.push(`/task-manage/${values.id}`)
        // router.reload()
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

  const handleSimpan = e => {
    const data = {
      realisasi: parseInt(values.realisasi),
      notes: values.notesSubKeg,
      target: parseInt(values.target)
    }
    values.realisasi <= values.target
      ? axios
          .put(`/taskdetail/${values.id}`, data)
          .then(res => {
            Swal.fire({
              title: 'Success!',
              text: 'Berhasil disimpan',
              icon: 'success',
              confirmButtonText: 'Ok'
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
      : Swal.fire({
          title: 'Error!',
          text: 'Realisasi lebih besar dari target',
          icon: 'warning',
          confirmButtonText: 'Ok'
        }).then(
          setValues(values => ({
            ...values, // Pertahankan nilai properti lainnya
            realisasi: values.target // Perbarui nilai kegRentang
          }))
        )
  }
  const handleKegiatanHarian = e => {
    const data = {
      namaKegiatan: valuesHarian.namaKegiatan,
      durasi: Number(valuesHarian.durasi),
      userId: session.data.uid,
      taskId: props.data.id,
      tanggalSubmit: new Date()
    }
    axios
      .post(`/kegiatan-harian`, data)
      .then(res => {
        Swal.fire({
          title: 'Berhasil disimpan',
          text: '',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        router.reload()
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
    newObj[camelCase(kolomLP.kol1)] = 2
    newObj[camelCase(kolomLP.kol2)] = 4
    return newObj
  })

  const [rowsT, setRowsT] = useState(newData)

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
        content: rowsT
      }
    ]

    let settings = {
      fileName: 'template_table_' + values.templateTable,
      extraLength: 3,
      writeMode: 'writeFile',
      writeOptions: {},
      RTL: false
    }

    xlsx(dataDownload, settings)
  }

  const handleImport = async e => {
    e.preventDefault()

    try {
      while (true) {
        const res = await axios.post(`/task/task-import/${values.subKegId}`, {
          unitTarget: values.subKegUnitTarget,
          jenisSample: values.subKegJenisSample,
          importStatus: 1,
          participants: data,
          honorPetugas1: values.subKegJenisSample == 1 ? parseInt(values.subKegHonorPmlPerPerusahaan) : 0,
          honorPetugas2: values.subKegJenisSample == 1 ? parseInt(values.subKegHonorPclPerPerusahaan) : 0,
          templateTable: values.templateTable,
          duedate: values.subKegDl,
          kolomLP: kolomLP,
          month: props.data.month
        })

        if (res.status === 200) {
          Swal.fire({
            title: 'Import data berhasil',
            text: '',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          })
        }

        break
      }
    } catch (error) {
      Swal.fire({
        title: 'Import gagal',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  // forchart

  const [duration, setDuration] = useState(
    props.dataPerusahaan.map(task => {
      const duedateObj = new Date(values.subKegDl)
      const startDateObj = new Date(values.subKegStart)
      const tanggalSekarang = new Date()

      const differenceInMilliseconds = duedateObj.getTime() - startDateObj.getTime()
      const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24) + 1

      const hariBerjalan =
        tanggalSekarang >= startDateObj
          ? tanggalSekarang <= duedateObj
            ? Math.abs(tanggalSekarang.getTime() - startDateObj.getTime()) / (1000 * 3600 * 24) + 1
            : 'Kegiatan telah selesai'
          : 'Kegiatan belum dimulai'
      const targetHarian = task.target / differenceInDays
      const akumulasiTargetHariIni =
        tanggalSekarang >= startDateObj
          ? tanggalSekarang <= duedateObj
            ? Number(targetHarian * hariBerjalan)
            : 'Kegiatan telah selesai'
          : 'Kegiatan belum dimulai'
      const yellowAkumulasiTargetHariIni =
        tanggalSekarang >= startDateObj
          ? tanggalSekarang <= duedateObj
            ? targetHarian * hariBerjalan * 0.8
            : 'Kegiatan telah selesai'
          : 'Kegiatan belum dimulai'
      return {
        durasi: differenceInDays,
        targetHarian: targetHarian,
        durationOff: hariBerjalan,
        akumulasiTargetHariIni: Math.round(akumulasiTargetHariIni),
        yellowAkumulasiTargetHariIni
      }
    })
  )

  const kriteria1P = parseFloat(0.1)
  const kriteria2P = parseFloat(0.9)
  // const kriteria1P = parseFloat(props.dataKriteriaP.kriteria1)
  // const kriteria2P = parseFloat(props.dataKriteriaP.kriteria2)
  const arrayBebanPegawai = [kriteria1P, kriteria2P]

  // const kriteria1M = parseFloat(props.dataKriteriaM.kriteria1)
  // const kriteria2M = parseFloat(props.dataKriteriaM.kriteria2)

  const kriteria1M = parseFloat(0.1)
  const kriteria2M = parseFloat(0.9)
  const arrayBebanMitra = [kriteria1M, kriteria2M]

  const [lineTarel, setLineTaRel] = useState({
    target: props.dataPerusahaan.map(pr => pr.target),
    realisasi: props.dataPerusahaan.map(pr => pr.realisasi),
    akumulasiTargetHarian: duration.map(pr => pr.akumulasiTargetHariIni),
    label: props.dataPerusahaan.map(pr => pr.kol1 + '/' + pr.kol2)
  })

  const dataLine = {
    labels: lineTarel.label,
    datasets: [
      {
        label: 'Target',
        data: lineTarel.target,
        backgroundColor: ['rgba(255, 99, 132, 1)']
      },
      {
        label: 'Realisasi',
        data: lineTarel.realisasi,
        backgroundColor: ['rgba(25, 19, 132, 1)']
      },
      {
        label: 'Akumulasi Target Sampai Hari Ini',
        data: lineTarel.akumulasiTargetHarian,
        backgroundColor: ['rgba(11, 11, 11, 1)']
      }
    ]
  }

  const [judulGrafik, setJudulGrafik] = useState()

  useEffect(() => {
    setJudulGrafik(
      props.dataTK.find(
        head => head.templateTableId === (props.dataPerusahaan.length > 0 ? props.dataPerusahaan[0].templateTable : 1)
      )
    )
  }, [props.dataPerusahaan])

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
            Detail Sub Kegiatan
          </Typography>
        </Grid>
        <Grid item xs={6} flexDirection={'column'} display={'flex'} alignItems={'end'}></Grid>
      </Grid>
      <Divider sx={{ marginTop: 0 }} />
      <TabContext value={value}>
        <TabList variant='fullWidth' onChange={handleChangeTab} aria-label='card navigation example'>
          {session.status === 'authenticated' &&
            (session.data.role == 'teamleader' || session.data.role == 'admin') &&
            (values.subKegJenis == 65 ||
              values.subKegJenis == 66 ||
              values.subKegJenis == 67 ||
              values.subKegJenis == 70) && <Tab value='1' label='Progres Sub Kegiatan' />}
          <Tab value='2' label='Informasi Sub Kegiatan' />
          <Tab value='3' label='Pekerjaan Harian' />
          {(values.subKegJenis == 65 ||
            values.subKegJenis == 66 ||
            values.subKegJenis == 67 ||
            values.subKegJenis == 70) && <Tab value='4' label='Import Tabel Target Realisasi' />}
        </TabList>

        <>
          <TabPanel value='1' sx={{ p: 0 }}>
            <Grid container spacing={4}>
              <Grid item md={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={8}>
                    <Card>
                      {/* <CardHeader title='Nama Project' sx={{ color: 'primary.dark' }}></CardHeader> */}
                      <Grid container p={4} height={450}>
                        <Grid item xs={8} md={10}>
                          <Typography color={'primary.dark'} variant={'h4'}>
                            {props.data.title}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} md={2} display={'flex'} justifyContent={'end'}>
                          <Chip
                            label={statusObj[props.data.target / props.data.realisasi === 1 ? 1 : 0].status}
                            color={statusObj[props.data.target / props.data.realisasi === 1 ? 1 : 0].color}
                            sx={{
                              height: 24,
                              fontSize: '0.75rem',
                              width: 100,
                              textTransform: 'capitalize',
                              '& .MuiChip-label': { fontWeight: 500 }
                            }}
                          />
                        </Grid>
                        <Grid mt={1} item md={12}>
                          <Typography variant={'body1'}></Typography>
                        </Grid>
                        <Grid justifyContent={'start'} mt={2} xs={6} item md={6}>
                          <Typography textAlign={'start'} variant={'body1'}>
                            {/* Target Kegiatan : 900 */}
                          </Typography>
                        </Grid>
                        <Grid justifyContent={'end'} mt={2} xs={6} item md={6}>
                          <Typography textAlign={'end'} variant={'body2'}>
                            Due Date: {new Date(props.data.duedate).toLocaleDateString('id')}
                          </Typography>
                        </Grid>

                        <Grid mt={2} item xs={12} md={12} height={335} overflow={'none'}>
                          <Divider sx={{ marginTop: 3.5 }} />
                          <Typography mt={4} textAlign={'center'} variant={'body1'}>
                            Target Realisasi per
                          </Typography>
                          <Typography variant={'body2'}>{props.data.description}</Typography>
                          <Line
                            datasetIdKey='id'
                            data={dataLine}
                            width={500}
                            height={140}
                            options={{
                              scaleOverride: true,
                              scaleSteps: 114,
                              scaleStepWidth: 25,
                              scaleStartValue: 0,
                              responsive: true,
                              scales: {
                                x: {
                                  ticks: {
                                    display: true
                                  }
                                }
                              },
                              plugins: {
                                legend: {
                                  position: 'top'
                                },
                                title: {
                                  display: true,
                                  text: ` `
                                }
                              }
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                  <Grid item md={4}>
                    <form onSubmit={e => e.preventDefault()}>
                      <Card>
                        <Grid container p={4}>
                          <Grid item xs={12} md={12}>
                            <Typography color={'primary.dark'} variant={'h5'}>
                              Progres Sub Kegiatan
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={12} mt={2} display={'flex'} alignItems={'start'}>
                            <Typography variant={'body2'}>Unit Target: {props.data.unitTarget}</Typography>
                          </Grid>
                          <Grid item xs={12} md={12} mt={3}>
                            <TextField
                              value={values.subKegRealisasi}
                              size='small'
                              fullWidth
                              type={'number'}
                              label='Realisasi'
                              onChange={handleChange('subKegRealisasi')}
                              placeholder='Realisasi'
                            />
                          </Grid>

                          <Grid item xs={12} md={12} mt={2}>
                            <TextField
                              value={values.subKegTarget}
                              size='small'
                              fullWidth
                              multiline
                              label='Target'
                              type={'number'}
                              onChange={handleChange('subKegTarget')}
                              placeholder='Target'
                            />
                          </Grid>
                        </Grid>
                      </Card>
                      <Card sx={{ marginTop: 4 }}>
                        <Grid container p={4} height={200} spacing={2} overflow={'auto'}>
                          <Grid item xs={1} md={1} display={'inline'}>
                            <AccountIcon></AccountIcon>
                          </Grid>
                          <Grid item xs={11} md={11} display={'inline'}>
                            <Typography color={'primary.dark'} variant={'body1'}>
                              Catatan
                            </Typography>
                          </Grid>
                          <Grid mt={1} display={'flex'} justifyContent={'center'} xs={12} item md={12}>
                            <FormControl fullWidth sx={{ overflowY: 'auto' }}>
                              <OutlinedInput
                                name='subKegNotes'
                                value={values.subKegNotes}
                                onChange={handleChange('subKegNotes')}
                                minRows={3}
                                multiline
                                endAdornment={
                                  <InputAdornment position='end'>
                                    <IconButton
                                      type='submit'
                                      onClick={handleEdit}
                                      edge='end'
                                      aria-label='toggle password visibility'
                                    >
                                      <SendIcon></SendIcon>
                                    </IconButton>
                                  </InputAdornment>
                                }
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Card>
                      <Grid container spacing={3}>
                        <Grid justifyContent={'center'} mt={2} item xs={12} md={12}>
                          <Button type='submit' variant={'contained'} onClick={handleEdit} fullWidth>
                            Simpan
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
                {session.status === 'authenticated' &&
                  (session.data.role == 'teamleader' || session.data.role == 'admin') &&
                  (values.subKegJenis == 65 ||
                    values.subKegJenis == 66 ||
                    values.subKegJenis == 67 ||
                    values.subKegJenis == 70) &&
                  values.subKegImportStatus === 1 && (
                    <>
                      <TablePerusahaanTaskDetails
                        dataBulan={values.subKegMonth}
                        data={props.dataPerusahaan}
                        dataProjectFungsi={props.data.project.fungsi}
                        dataId={values.id}
                        dataMitra={props.dataMitra}
                        dataPML={props.dataPML}
                        dataTaskSample={values.subKegJenisSample}
                        dataJenisKeg={values.subKegJenis}
                        dataUpdateTarget={handleTaskUpdate}
                        dataMitraLimitHonor={props.dataResultTotalGaji}
                        dataTpp={props.dataTpp}
                        dataTemplate={props.dataT}
                        dataKriteriaP={arrayBebanPegawai}
                        dataKriteriaM={arrayBebanMitra}
                        dataTemplateKolom={props.dataTK}
                        dataSubKegId={values.subKegId}
                        dataMitraHonorTetap={props.dataHonorTetap}
                        dataMitraLimitHonorTetap={props.dataLimitHonorTetap}
                      ></TablePerusahaanTaskDetails>
                    </>
                    // <Button type='submit' variant={'contained'} onClick={handleSimpan} fullWidth>
                    //   Simpan
                    // </Button>
                  )}
              </Grid>
              {}
            </Grid>
          </TabPanel>
        </>

        <TabPanel value='2' sx={{ p: 0 }}>
          <Card sx={{ padding: 4 }}>
            <Box sx={{ mt: 5, mb: 6 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}></Typography>
              {/* <Typography variant='body2'>Fill this blank field below</Typography> */}
            </Box>
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
              <TextField
                name='namaSubKeg'
                value={values.subKegNama}
                onChange={handleChange('subKegNama')}
                fullWidth
                id='namaKegiatan'
                label='Nama Sub Kegiatan'
                sx={{ marginBottom: 4 }}
              />

              <Grid container spacing={4}>
                <Grid item md={12} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-helper-label'>Jenis Kegiatan</InputLabel>
                    <Select
                      name='jenisSubKeg'
                      fullWidth
                      labelId='demo-simple-select-helper-label'
                      id='demo-simple-select-helper'
                      label='Rentang Waktu'
                      onChange={handleJenisSubKeg}
                      value={values.subKegJenis}
                    >
                      {jenisSubKegiatan.map(item => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.nama}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    name='realisasiSubKeg'
                    value={values.subKegRealisasi}
                    onChange={handleChange('subKegRealisasi')}
                    autoFocus
                    fullWidth
                    id='realisasi'
                    label='Realisasi'
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    name='targetSubKeg'
                    value={values.subKegTarget}
                    onChange={handleChange('subKegTarget')}
                    autoFocus
                    fullWidth
                    id='target'
                    label='Target'
                  />
                </Grid>
                {/* <Grid item md={6} xs={12}>
              <TextField
                name='unitTargetSubKeg'
                value={values.subKegUnitTarget}
                onChange={handleChange('subKegUnitTarget')}
                autoFocus
                fullWidth
                id='unitTarget'
                label='Unit Target'
              />
            </Grid> */}
                <Grid item md={6} xs={12}>
                  <DatePickerWrapper>
                    <DatePicker
                      selected={selectedDateS}
                      sx={{ width: 1000 }}
                      showYearDropdown
                      showMonthDropdown
                      placeholderText='Tanggal Mulai'
                      value={selectedDateS}
                      onChange={handleDateChangeS}
                      customInput={<CustomInputStart />}
                      dateFormat='dd/MM/yyyy'
                      className='custom-datepicker'
                    />
                  </DatePickerWrapper>
                </Grid>
                <Grid item md={6} xs={12}>
                  <DatePickerWrapper>
                    <DatePicker
                      selected={selectedDateE}
                      sx={{ width: 1000 }}
                      label='Tanggal Berakhir'
                      showYearDropdown
                      showMonthDropdown
                      placeholderText='Tanggal Berakhir'
                      value={selectedDateE}
                      customInput={<CustomInputEnd />}
                      onChange={handleDateChangeE}
                      dateFormat='dd/MM/yyyy'
                      className='custom-datepicker'
                    />
                  </DatePickerWrapper>
                </Grid>
                <Grid item md={12} xs={12}>
                  {' '}
                  <TextField
                    name='deskripsiSubKeg'
                    value={values.subKegDesk}
                    onChange={handleChange('subKegDesk')}
                    fullWidth
                    multiline
                    minRows={3}
                    label='Deskripsi Sub Kegiatan'
                    placeholder='Deskripsi Sub Kegiatan'
                  />
                </Grid>
              </Grid>

              {/* <TableAddParticipant></TableAddParticipant> */}
              <Button fullWidth onClick={handleEdit} size='medium' variant='contained' sx={{ marginTop: 4 }}>
                Simpan
              </Button>
            </form>
          </Card>
        </TabPanel>
        <TabPanel value='3' sx={{ p: 0, height: 350 }}>
          <Grid container spacing={4}>
            <Grid xs={12} mt={5} item height={200} overflow={'auto'}>
              {dataPHreal.length > 0 ? (
                dataPHreal.map(ph => (
                  <>
                    {' '}
                    <List key={ph.id}>
                      <ListItem
                        secondaryAction={
                          <IconButton
                            onClick={() => {
                              Swal.fire({
                                title: 'Hapus Kegiatan Harian?',
                                text: '',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes'
                              }).then(result => {
                                if (result.isConfirmed) {
                                  handleDeleteKegiatanHarian(ph.id)
                                }
                              })
                            }}
                            edge='end'
                            aria-label='delete'
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={ph.namaKegiatan} />
                      </ListItem>
                    </List>
                  </>
                ))
              ) : (
                <>
                  <Typography>Belum Ada Pekerjaan Harian Pada Kegiatan Ini, Silahkan Input Dibawah</Typography>
                </>
              )}
            </Grid>
            <Grid mt={2} item xs={12}>
              <Grid container spacing={4}>
                <Grid item xs={7}>
                  <TextField
                    value={valuesHarian.namaKegiatan}
                    size='small'
                    fullWidth
                    multiline
                    type={'string'}
                    onChange={handleChangeHarian('namaKegiatan')}
                    placeholder='Nama Kegiatan'
                  />
                </Grid>
                <Grid item xs={4}>
                  {' '}
                  <TextField
                    value={valuesHarian.durasi}
                    size='small'
                    fullWidth
                    multiline
                    type={'number'}
                    onChange={handleChangeHarian('durasi')}
                    placeholder='Durasi Pengerjaan '
                  />
                </Grid>
                <Grid item mt={5} xs={1}>
                  {' '}
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={handleKegiatanHarian}
                      size='medium'
                      type='submit'
                      aria-label='toggle password visibility'
                    >
                      <SendIcon></SendIcon>
                    </IconButton>
                  </InputAdornment>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value='4' sx={{ p: 0 }}>
          <Card sx={{ padding: 4 }}>
            <Box sx={{ mt: 5, mb: 6 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                Import data target dan realisasi
              </Typography>
              {/* <Typography variant='body2'>Fill this blank field below</Typography> */}
            </Box>
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
              <Grid container spacing={4}>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-helper-label'>Dokumen/Responden</InputLabel>
                    <Select
                      fullWidth
                      labelId='demo-simple-select-helper-label'
                      id='demo-simple-select-helper'
                      label='Dokumen/Responden'
                      onChange={handleDokumenResponden}
                      value={values.subKegUnitTarget}
                      disabled={values.subKegImportStatus == 1 ? true : false}
                    >
                      <MenuItem key={''} value={''}>
                        {''}
                      </MenuItem>
                      {dokumenResponden.map(item => (
                        <MenuItem key={item.id} value={item.nama}>
                          {item.nama}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-helper-label'>Jenis Sample</InputLabel>
                    <Select
                      disabled={values.subKegImportStatus == 1 ? true : false}
                      fullWidth
                      labelId='demo-simple-select-helper-label'
                      id='demo-simple-select-helper'
                      label='Jenis Sample'
                      onChange={handleJenisSample}
                      value={values.subKegJenisSample}
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
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth>
                    {values.subKegJenisSample === 0 && (
                      <>
                        <InputLabel id='demo-simple-select-helper-label'>Level Pencatatan</InputLabel>
                        <Select
                          disabled={values.subKegImportStatus == 1 ? true : false}
                          fullWidth
                          labelId='demo-simple-select-helper-label'
                          onChange={handleTemplateChange}
                          value={values.templateTable}
                          id='demo-simple-select-helper'
                          label='Level Pencatatan'
                          name='Level Pencatatan'
                          size='medium'
                        >
                          {dataTemplateNonPerusahaan.map(item => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.nama}
                            </MenuItem>
                          ))}
                          {/* <MenuItem value={3}>NBS-NKS</MenuItem>
                          <MenuItem value={4}>NBS-ID SLS</MenuItem> */}
                        </Select>
                      </>
                    )}
                    {values.subKegJenisSample === 1 && (
                      <>
                        <InputLabel id='demo-simple-select-helper-label'>Level Pencatatan</InputLabel>
                        <Select
                          fullWidth
                          labelId='demo-simple-select-helper-label'
                          onChange={handleTemplateChange}
                          value={values.templateTable}
                          disabled={values.subKegImportStatus == 1 ? true : false}
                          id='demo-simple-select-helper'
                          label='Level Pencatatan'
                          name='Level Pencatatan'
                          size='medium'
                        >
                          {dataTemplatePerusahaan.map(item => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.nama}
                            </MenuItem>
                          ))}
                          {/* <MenuItem value={5}>Alamat-Nama Perusahaan</MenuItem>
                          <MenuItem value={6}>NUS-Nama Perusahaan/Dinas</MenuItem>
                          <MenuItem value={7}>ID SBR-Nama Perusahaan</MenuItem> */}
                        </Select>
                      </>
                    )}
                  </FormControl>
                </Grid>
                {values.subKegJenisSample === 1 && values.subKegJenis == 65 && (
                  <>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        labelId='demo-simple-select-helper-label'
                        id='demo-simple-select-helper'
                        disabled={values.subKegImportStatus == 1 ? true : false}
                        label='Honor PML/Dokumen'
                        onChange={handleChange('subKegHonorPmlPerPerusahaan')}
                        value={values.subKegHonorPmlPerPerusahaan}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        labelId='demo-simple-select-helper-label'
                        id='demo-simple-select-helper'
                        disabled={values.subKegImportStatus == 1 ? true : false}
                        label='Honor PCL/Dokumen'
                        onChange={handleChange('subKegHonorPclPerPerusahaan')}
                        value={values.subKegHonorPclPerPerusahaan}
                      />
                    </Grid>
                  </>
                )}
                {(values.subKegJenisSample === 0 || values.subKegJenisSample === 1) && (
                  <>
                    <Grid mt={4} item md={6} xs={12}>
                      <Typography variant={'h6'} mb={4}>
                        Import Sample
                      </Typography>
                    </Grid>
                    <Grid mb={4} xs={12} md={12} style={{ paddingLeft: 15 }}>
                      <input
                        style={{ display: 'none' }}
                        id='raised-button-file'
                        multiple
                        type='file'
                        onChange={importExcel}
                      />
                      <label htmlFor='raised-button-file'>
                        <Button variant='contained' component='span'>
                          Upload
                        </Button>
                      </label>
                      <Button sx={{ marginLeft: 5 }} variant='contained' onClick={handleDownloadTable}>
                        Unduh Template
                      </Button>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <Grid container spacing={4}>
                        <Grid item xs={12}>
                          <Box sx={{ width: '100%' }}>
                            <DataGrid
                              getRowId={row => row.id}
                              rows={data}
                              columns={columnsNew}
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
                  </>
                )}
              </Grid>

              {/* <TableAddParticipant></TableAddParticipant> */}
              <Button fullWidth onClick={handleImport} size='medium' variant='contained' sx={{ marginTop: 4 }}>
                Import Data
              </Button>
            </form>
          </Card>
        </TabPanel>
      </TabContext>
    </>
  )
}

export default TaskManageEditViews
