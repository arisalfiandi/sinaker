import * as React from 'react'
import { useState, useEffect, forwardRef } from 'react'

// import xlsx
import MaterialTable from 'material-table'
import * as XLSX from 'xlsx/xlsx.mjs'

// import TemplateExcel from './asd.pdf'

const EXTENSIONS = ['xlsx', 'xls', 'csv']

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

// mui
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import { useSession } from 'next-auth/react'

import { useRouter } from 'next/dist/client/router'
import { Autocomplete } from '@mui/lab'

// ** Third Party Imports

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { DataGrid } from '@mui/x-data-grid'
import { number } from 'mathjs'

import TableAddParticipant from 'src/views/tables/TableAddParticipant'

const TaskManageAddViews = propss => {
  const CustomInputStart = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Tanggal Berakhir' autoComplete='on' />
  })

  const statusObj = {
    0: { color: 'error', status: 'Overload' },
    1: { color: 'success', status: 'Available' }
  }

  const session = useSession()
  const [project, setProject] = useState(propss.data)
  const [organikProject_member, setOrganikProject_member] = useState(propss.dataOrganikProject_member)
  const [timkerja, setTimkerja] = useState(propss.dataTimKerja)
  const [group, setGroup] = useState(propss.dataPerusahaan)
  const [bobotMitra, setBobotMitra] = useState(propss.dataBobotMitra)
  const [bobotPegawai, setBobotPegawai] = useState(propss.dataBobotPegawai)
  const [participants, setParticipants] = useState([])
  const [participantsTimKerja, setParticipantsTimKerja] = useState([])
  const [tpp, setTpp] = useState(propss.dataTaskPerusahaan)
  const [fungsi, setFungsi] = useState(project.fungsi)
  const [selectedDateE, setSelectedDateE] = useState(null)
  const [values, setValues] = useState({
    subKegNama: '',
    subKegJenis: '',
    subKegTarget: 0,
    subKegUnitTarget: '',
    subKegJenisSample: '',
    subKegSamplePerusahaan: '',
    subKegSampleTimKerja: '',
    subKegDl: '',
    subKegDesk: '',
    subKegProjectId: project.id,
    subKegProjectFungsi: project.fungsi,
    subKegUserId: project.projectLeaderId,
    subKegMonth: '',
    subKegYear: '',
    templateTable: 4,
    subKegGajiPerPerusahaan: 0
  })

  const kriteria1M = parseFloat(bobotMitra.kriteria1)
  const kriteria2M = parseFloat(bobotMitra.kriteria2)
  const kriteria3M = parseFloat(bobotMitra.kriteria3)
  const arrayBebanMitra = [kriteria1M, kriteria2M, kriteria3M]

  const kriteria1P = parseFloat(bobotPegawai.kriteria1)
  const kriteria2P = parseFloat(bobotPegawai.kriteria2)
  const arrayBebanPegawai = [kriteria1P, kriteria2P]

  useEffect(() => {
    let dataGroup = []
    group.map(dataG => {
      dataG.id == values.subKegSamplePerusahaan ? (dataGroup = dataG.Perusahaangroup) : []
    })
    setParticipants(dataGroup)
  }, [values])

  useEffect(() => {
    let dataTimkerja = []
    timkerja.map(dataG => {
      dataG.id == values.subKegSampleTimKerja ? (dataTimkerja = dataG.timKerjaPegawai) : []
    })
    setParticipantsTimKerja(dataTimkerja)
  }, [values])

  const handleTemplateChange = event => {
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      templateTable: event.target.value // Perbarui nilai kegRentang
    }))
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
      subKegMonth: dates.getMonth() + 1,
      subKegYear: dates.getFullYear(),
      subKegDl: date // Perbarui nilai kegRentang
    }))
  }

  const handleJenisSubKeg = eeee => {
    setValues(values => ({
      ...values,
      subKegJenis: eeee.target.value
    }))
  }

  const handleJenisSample = e => {
    setValues(values => ({
      ...values,
      subKegJenisSample: e.target.value
    }))
  }

  const handleSamplePerusahaan = e => {
    setValues(values => ({
      ...values,
      subKegSamplePerusahaan: e.target.value
    }))
  }

  const handleSampleTimKerja = e => {
    setValues(values => ({
      ...values,
      subKegSampleTimKerja: e.target.value
    }))
  }
  const handleDokumenResponden = e => {
    setValues(values => ({
      ...values,
      subKegUnitTarget: e.target.value
    }))
  }

  // useEffect(() => {
  //   values.subKegJenisSample === 0
  //     ? rows.map(row => {
  //         setRows(values => ({
  //           ...values,
  //           checked: false
  //         }))
  //       })
  //     :
  // }, [values])

  // intinya disini pas mau add ke db, value-value
  const handleAddTask = async e => {
    e.preventDefault()
    let dataPCL = []
    rowsM.map(a => {
      if (a.checked) {
        dataPCL.push(a)
      }
    })

    let pegawaiOrganik = []
    rowsO.map(a => {
      if (a.checked) {
        pegawaiOrganik.push(a)
      }
    })

    const userAll = dataOrganik.map(row => {
      const gajiBulanIni = tpp
        .filter(tppRow => tppRow.pmlId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return (
            tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
          )
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

      const gajiBulanSblm = tpp
        .filter(tppRow => tppRow.pmlId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return currentDate.getMonth != 0
            ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
                tppDueDate.getMonth() === currentDate.getMonth() - 1
            : tppDueDate.getFullYear() === currentDate.getFullYear() - 1 && tppDueDate.getMonth() === 12
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

      const gajiBulanDepan = tpp
        .filter(tppRow => tppRow.pmlId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return currentDate.getMonth != 11
            ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
                tppDueDate.getMonth() === currentDate.getMonth() + 1
            : tppDueDate.getFullYear() === currentDate.getFullYear() + 1 && tppDueDate.getMonth() === 0
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

      const jumlahKegiatan = 0

      pegawaiOrganik.map(tambah => {
        if (tambah.id === row.id) {
          return (jumlahKegiatan = row.TaskOrganik.length + 1)
        } else {
          return (jumlahKegiatan = row.TaskOrganik.length)
        }
      })

      return {
        pegawai_id: row.id,
        jumlahKegiatan,
        gajiBulanIni
      }
    })

    const arrayUser = userAll.map(item => [item.jumlahKegiatan, item.gajiBulanIni])
    const arrayUserId = userAll.map(item => item.pegawai_id)

    const mitraAll = dataMitra.map(row => {
      const gajiBulanIniPCL = tpp
        .filter(tppRow => tppRow.pclId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return (
            tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
          )
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

      const gajiBulanIniPML = tpp
        .filter(tppRow => tppRow.pmlId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return (
            tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
          )
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

      // Gabungkan total gaji dari kedua kasus
      const gajiBulanIni = gajiBulanIniPCL + gajiBulanIniPML

      const gajiBulanSblmPCL = tpp
        .filter(tppRow => tppRow.pclId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return currentDate.getMonth != 0
            ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
                tppDueDate.getMonth() === currentDate.getMonth() - 1
            : tppDueDate.getFullYear() === currentDate.getFullYear() - 1 && tppDueDate.getMonth() === 12
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

      const gajiBulanSblmPML = tpp
        .filter(tppRow => tppRow.pmlId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return currentDate.getMonth != 0
            ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
                tppDueDate.getMonth() === currentDate.getMonth() - 1
            : tppDueDate.getFullYear() === currentDate.getFullYear() - 1 && tppDueDate.getMonth() === 12
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)
      const gajiBulanSblm = gajiBulanSblmPML + gajiBulanSblmPCL

      const gajiBulanDepanPCL = tpp
        .filter(tppRow => tppRow.pclId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return currentDate.getMonth != 11
            ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
                tppDueDate.getMonth() === currentDate.getMonth() + 1
            : tppDueDate.getFullYear() === currentDate.getFullYear() + 1 && tppDueDate.getMonth() === 0
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

      const gajiBulanDepanPML = tpp
        .filter(tppRow => tppRow.pclId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return currentDate.getMonth != 11
            ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
                tppDueDate.getMonth() === currentDate.getMonth() + 1
            : tppDueDate.getFullYear() === currentDate.getFullYear() + 1 && tppDueDate.getMonth() === 0
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

      const gajiBulanDepan = gajiBulanDepanPCL + gajiBulanDepanPML

      const jumlahKegiatan = 0

      pegawaiOrganik.map(tambah => {
        if (tambah.id === row.id) {
          return (jumlahKegiatan = row.TaskPeserta.length + 1)
        } else {
          return (jumlahKegiatan = row.TaskPeserta.length)
        }
      })

      return {
        mitra_id: row.id,
        jumlahKegiatan,
        gajiBulanIni,
        gajiBulanSblm
      }
    })

    const arrayMitra = mitraAll.map(item => [item.jumlahKegiatan, item.gajiBulanIni, item.gajiBulanSblm])
    const arrayMitraId = mitraAll.map(item => item.mitra_id)

    try {
      while (true) {
        const res = await axios.post('/task', {
          title: values.subKegNama,
          jenisKeg: values.subKegJenis,
          targetTotal: parseInt(values.subKegTarget),
          deadLaneAwal: values.subKegDl > project.enddate ? values.subKegDl : project.enddate,
          unitTarget: values.subKegUnitTarget,
          duedate: values.subKegDl,
          bulan: new Date(values.subKegDl).getMonth(),
          jenisSample: values.subKegJenis == 65 || values.subKegJenis == 67 ? values.subKegJenisSample : 0,
          participants: data,
          fungsi: fungsi,
          peserta: dataPCL,
          arrayUser: arrayUser,
          arrayMitra: arrayMitra,
          arrayUserId: arrayUserId,
          arrayMitraId: arrayMitraId,
          arrayBebanPegawai: arrayBebanPegawai,
          arrayBebanMitra: arrayBebanMitra,
          persertaOrganik: pegawaiOrganik,
          description: values.subKegDesk,
          realisasi: 0,
          month: parseInt(values.subKegMonth),
          year: parseInt(values.subKegYear),
          projectId: values.subKegProjectId,
          userId: values.subKegUserId,
          notes: '-',
          gaji: values.subKegJenisSample == 1 ? parseInt(values.subKegGajiPerPerusahaan) : 0,
          templateTable: values.templateTable
        })

        if (res.status === 201) {
          Swal.fire({
            title: 'Tambah Sub Kegiatan Success',
            text: 'Tekan OK untuk lanjut',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          }).then(router.push(`/project-detail/${values.subKegProjectId}`))

          setValues({
            subKegNama: '',
            subKegJenis: '',
            subKegTarget: '',
            subKegUnitTarget: '',
            subKegDl: '',
            subKegDesk: '',
            subKegProjectId: project.id,
            subKegUserId: project.projectLeaderId,
            subKegMonth: '',
            subKegYear: ''
          })
        }

        break
      }
    } catch (error) {
      Swal.fire({
        title: 'Tambah Sub Kegiatan Gagal',
        text: 'Pastikan form sudah lengkap terisi',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  const router = useRouter()
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

  const jenisSubKegiatan = [
    {
      id: 63,
      nama: 'Pelatihan'
    },
    // {
    //   id: 64,
    //   nama: 'Persiapan'
    // },
    {
      id: 65,
      nama: 'Pencacahan'
    },

    {
      id: 67,
      nama: 'Pengolahan-Entri'
    },
    // {
    //   id: 68,
    //   nama: 'Evaluasi '
    // },
    // {
    //   id: 69,
    //   nama: 'Diseminasi '
    // },
    {
      id: 70,
      nama: 'Pengolahan-Validasi'
    }
  ]

  const [company, setCompany] = useState(
    propss.dataAllPerusahaan.map(perusahaan => {
      return {
        ...perusahaan,
        checked: false
      }
    })
  )

  const [dataMitra, setDataMitra] = useState(
    propss.dataMitra.map(meetra => {
      return {
        ...meetra,
        checked: false
      }
    })
  )

  const [dataOrganik, setDataOrganik] = useState(
    propss.dataOrganik.map(obj => {
      return {
        ...obj,
        checked: false
      }
    })
  )

  const [datadata, setdatata] = useState(
    organikProject_member
      .map(obj => {
        const hasilFilter = propss.dataOrganik.find(member => member.id === obj.userId)
        if (hasilFilter) {
          return {
            id: hasilFilter.id,
            email: hasilFilter.email,
            name: hasilFilter.name,
            fungsi: hasilFilter.fungsi,
            role: hasilFilter.role,
            nip: hasilFilter.nip,
            task_organik: hasilFilter.TaskOrganik,
            password: hasilFilter.password,
            beban_kerja_pegawai: hasilFilter.beban_kerja_pegawai,
            checked: true
          }
        }
        return null // Mengembalikan null jika tidak ada yang cocok
      })
      .filter(obj => obj !== null) // Menghapus nilai null dari array
  )

  // const [anggotaTim, setAnggotaTim] = useState(0)
  // useEffect(() => {
  //   // const hasilFilter = organikProject_member.filter(member => {
  //   //   return member.userId === dataOrganik.id
  //   // })
  //   //

  //   dataOrganik.map(obj => {
  //     const hasilFilter = organikProject_member.filter(member => member.userId === obj.id)
  //     if (hasilFilter.length > 0) {
  //       objekYangSama.push(...hasilFilter)
  //     }
  //   })
  //   setAnggotaTim(objekYangSama)
  // }, [])

  //

  // const rows = company.map(perusahaan => ({
  //   id: perusahaan.id,
  //   nama: perusahaan.nama,
  //   desa: perusahaan.desa,
  //   kecamatan: perusahaan.kecamatan,
  //   alamat: perusahaan.alamat,
  //   checked: perusahaan.checked
  // }))

  const [rows, setRows] = useState(
    company.map(perusahaan => ({
      id: perusahaan.id,
      nama: perusahaan.nama,
      desa: perusahaan.desa,
      namaDesa: perusahaan.namaDesa,
      kecamatan: perusahaan.kecamatan,
      namaKec: perusahaan.namaKec,
      alamat: perusahaan.alamat,
      checked: perusahaan.checked,
      realisasi: 0,
      target: 0,
      hasilPencacahan: '',
      tanggal: new Date()
    }))
  )

  const [rowsM, setRowsM] = useState(
    dataMitra.map(row => {
      const gajiBulanIniPCL = tpp
        .filter(tppRow => tppRow.pclId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return (
            tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
          )
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

      const gajiBulanIniPML = tpp
        .filter(tppRow => tppRow.pmlId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return (
            tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
          )
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

      // Gabungkan total gaji dari kedua kasus
      const gajiBulanIni = gajiBulanIniPCL + gajiBulanIniPML

      const gajiBulanSblmPCL = tpp
        .filter(tppRow => tppRow.pclId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return currentDate.getMonth != 0
            ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
                tppDueDate.getMonth() === currentDate.getMonth() - 1
            : tppDueDate.getFullYear() === currentDate.getFullYear() - 1 && tppDueDate.getMonth() === 12
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

      const gajiBulanSblmPML = tpp
        .filter(tppRow => tppRow.pmlId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return currentDate.getMonth != 0
            ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
                tppDueDate.getMonth() === currentDate.getMonth() - 1
            : tppDueDate.getFullYear() === currentDate.getFullYear() - 1 && tppDueDate.getMonth() === 12
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)
      const gajiBulanSblm = gajiBulanSblmPML + gajiBulanSblmPCL

      const gajiBulanDepanPCL = tpp
        .filter(tppRow => tppRow.pclId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return currentDate.getMonth != 11
            ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
                tppDueDate.getMonth() === currentDate.getMonth() + 1
            : tppDueDate.getFullYear() === currentDate.getFullYear() + 1 && tppDueDate.getMonth() === 0
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

      const gajiBulanDepanPML = tpp
        .filter(tppRow => tppRow.pclId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return currentDate.getMonth != 11
            ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
                tppDueDate.getMonth() === currentDate.getMonth() + 1
            : tppDueDate.getFullYear() === currentDate.getFullYear() + 1 && tppDueDate.getMonth() === 0
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

      const gajiBulanDepan = gajiBulanDepanPCL + gajiBulanDepanPML

      const bebanKerjaM = row.beban_kerja_mitra[0].bebanKerja
      const nilaiBebanKerjaM = number(bebanKerjaM).toFixed(2)

      return {
        id: row.id,
        nik: row.nik.toString(),
        name: row.name,
        jumlahKegiatanM: row.TaskPeserta.length,
        gajiBulanIni,
        gajiBulanSblm,
        gajiBulanDepan,
        bebanKerjaM: nilaiBebanKerjaM,
        over: gajiBulanIni
      }
    })
  )

  const [rowsO, setRowsO] = useState(
    datadata.map(row => {
      const gajiBulanIni = tpp
        .filter(tppRow => tppRow.pmlId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return (
            tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
          )
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

      const gajiBulanSblm = tpp
        .filter(tppRow => tppRow.pmlId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return currentDate.getMonth != 0
            ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
                tppDueDate.getMonth() === currentDate.getMonth() - 1
            : tppDueDate.getFullYear() === currentDate.getFullYear() - 1 && tppDueDate.getMonth() === 12
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

      const gajiBulanDepan = tpp
        .filter(tppRow => tppRow.pmlId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return currentDate.getMonth != 11
            ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
                tppDueDate.getMonth() === currentDate.getMonth() + 1
            : tppDueDate.getFullYear() === currentDate.getFullYear() + 1 && tppDueDate.getMonth() === 0
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

      const bebanKerja = row.beban_kerja_pegawai[0].bebanKerja
      const nilaiBebanKerja = number(bebanKerja).toFixed(2)

      return {
        id: row.id,
        nip: row.nip.toString(),
        name: row.name,
        jumlahKegiatan: row.task_organik.length,
        bebanKerjaO: nilaiBebanKerja,
        over: row.task_organik.length
      }
    })
  )

  useEffect(() => {
    // Saat participants berubah, periksa dan ubah status checked jika cocok
    const updatedRows = rows.map(row => {
      const participantExists = participants.some(participant => participant.perusahaan.id === row.id)
      return { ...row, checked: participantExists }
    })
    setRows(updatedRows)
  }, [participants])

  useEffect(() => {
    // Saat participants berubah, periksa dan ubah status checked jika cocok
    const updatedRowsO = rowsO.map(row => {
      const participantTimKerjaExists = participantsTimKerja.some(participant => participant.userId_fkey.id === row.id)
      return { ...row, checked: participantTimKerjaExists }
    })
    setRowsO(updatedRowsO)
  }, [participantsTimKerja])

  const columns = [
    {
      field: 'checked',
      sortable: true,
      renderHeader: () => (
        <FormControlLabel
          control={
            <Checkbox
              checked={rows.filter(participant => participant.checked === true).length === rows.length}
              onChange={e => {
                let checked = e.target.checked
                setRows(
                  rows.map(participant => {
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
                setRows(
                  rows.map(participant => {
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
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Nama Perusahaan
        </Typography>
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

  const columnsM = [
    {
      field: 'checked',
      sortable: true,
      renderHeader: () => (
        <FormControlLabel
          control={
            <Checkbox
              checked={rowsM.filter(participant => participant.checked === true).length === rowsM.length}
              onChange={e => {
                let checked = e.target.checked
                setRowsM(
                  rowsM.map(participant => {
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
                setRowsM(
                  rowsM.map(participant => {
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
      field: 'nik',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>NIK</Typography>
      ),
      headerName: 'NIK',
      width: 200
    },
    {
      field: 'name',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Nama</Typography>
      ),
      headerName: 'Nama',
      width: 200
    },
    {
      field: 'over',
      renderCell: params => (
        <>
          <Chip
            label={statusObj[params.row.bebanKerjaM < 0.7 ? (params.row.gajiBulanIni < 3000000 ? 1 : 0) : 0].status}
            color={statusObj[params.row.bebanKerjaM < 0.7 ? (params.row.gajiBulanIni < 3000000 ? 1 : 0) : 0].color}
            sx={{
              height: 24,
              fontSize: '0.75rem',
              width: 100,
              textTransform: 'capitalize',
              '& .MuiChip-label': { fontWeight: 500 }
            }}
          />
        </>
      ),
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Status Bulan Ini
        </Typography>
      ),
      type: 'string',
      width: 140
    },
    {
      field: 'jumlahKegiatanM',
      headerName: 'Beban Kerja',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Jumlah Pekerjaan
        </Typography>
      ),

      minWidth: 150
    },

    {
      field: 'gajiBulanIni',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Gaji Bulan Ini
        </Typography>
      ),
      headerName: 'Gaji Bulan Ini ',
      type: 'string',
      width: 140,
      renderCell: params => (
        <>
          <Typography
            color={params.row.gajiBulanIni < 3000000 ? 'secondary.main' : 'error.main'}
            sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
          >
            {`Rp ${params.row.gajiBulanIni.toLocaleString('id-ID')}`}
          </Typography>
        </>
      )
    },
    {
      field: 'gajiBulanSblm',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Gaji Bulan Sebelumnya
        </Typography>
      ),
      headerName: 'Gaji Bulan Sebelumnya ',
      type: 'string',
      width: 140,
      renderCell: params => (
        <>
          <Typography
            color={params.row.gajiBulanSblm < 3000000 ? 'secondary.main' : 'error.main'}
            sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
          >
            {`Rp ${params.row.gajiBulanSblm.toLocaleString('id-ID')}`}
          </Typography>
        </>
      )
    },
    // {
    //   field: 'gajiBulanDepan',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
    //       Gaji Bulan Depan
    //     </Typography>
    //   ),
    //   headerName: 'Gaji Bulan Depan ',
    //   type: 'string',
    //   width: 140,
    //   renderCell: params => (
    //     <>
    //       <Typography
    //         color={params.row.gajiBulanDepan < 3000000 ? 'secondary.main' : 'error.main'}
    //         sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
    //       >
    //         {`Rp ${params.row.gajiBulanDepan.toLocaleString('id-ID')}`}
    //       </Typography>
    //     </>
    //   )
    // },
    {
      field: 'bebanKerjaM',
      headerName: 'Beban Kerja',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Beban Kerja
        </Typography>
      ),

      minWidth: 150
    }
  ]

  const columnsO = [
    {
      field: 'checked',
      sortable: true,
      headerName: 'List',
      renderHeader: () => (
        <FormControlLabel
          control={
            <Checkbox
              checked={rowsO.filter(participant => participant.checked === true).length === rowsO.length}
              onChange={e => {
                let checked = e.target.checked
                setRowsO(
                  rowsO.map(participant => {
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
                setRowsO(
                  rowsO.map(participant => {
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
      field: 'nip',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>NIP</Typography>
      ),
      headerName: 'NIP',
      width: 200
    },
    {
      field: 'name',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Nama</Typography>
      ),
      headerName: 'Nama',
      width: 200
    },
    {
      field: 'over',
      renderCell: params => (
        <>
          <Chip
            label={statusObj[params.row.jumlahKegiatan < 15 ? 1 : 0].status}
            color={statusObj[params.row.jumlahKegiatan < 15 ? 1 : 0].color}
            sx={{
              height: 24,
              fontSize: '0.75rem',
              width: 100,
              textTransform: 'capitalize',
              '& .MuiChip-label': { fontWeight: 500 }
            }}
          />
        </>
      ),
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Status Bulan Ini
        </Typography>
      ),
      type: 'string',
      width: 140
    },

    // {
    //   field: 'gajiBulanIni',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
    //       Gaji Bulan Ini
    //     </Typography>
    //   ),
    //   headerName: 'Gaji Bulan Ini ',
    //   type: 'string',
    //   width: 140,
    //   renderCell: params => (
    //     <>
    //       <Typography
    //         color={params.row.gajiBulanIni < 3000000 ? 'secondary.main' : 'error.main'}
    //         sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
    //       >
    //         {`Rp ${params.row.gajiBulanIni.toLocaleString('id-ID')}`}
    //       </Typography>
    //     </>
    //   )
    // },
    // {
    //   field: 'gajiBulanSblm',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
    //       Gaji Bulan Sebelumnya
    //     </Typography>
    //   ),
    //   headerName: 'Gaji Bulan Sebelumnya ',
    //   type: 'string',
    //   width: 140,
    //   renderCell: params => (
    //     <>
    //       <Typography
    //         color={params.row.gajiBulanSblm < 3000000 ? 'secondary.main' : 'error.main'}
    //         sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
    //       >
    //         {`Rp ${params.row.gajiBulanSblm.toLocaleString('id-ID')}`}
    //       </Typography>
    //     </>
    //   )
    // },
    // {
    //   field: 'gajiBulanDepan',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
    //       Gaji Bulan Depan
    //     </Typography>
    //   ),
    //   headerName: 'Gaji Bulan Depan ',
    //   type: 'string',
    //   width: 140,
    //   renderCell: params => (
    //     <>
    //       <Typography
    //         color={params.row.gajiBulanDepan < 3000000 ? 'secondary.main' : 'error.main'}
    //         sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
    //       >
    //         {`Rp ${params.row.gajiBulanDepan.toLocaleString('id-ID')}`}
    //       </Typography>
    //     </>
    //   )
    // },
    {
      field: 'jumlahKegiatan',
      headerName: 'Beban Kerja',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Jumlah Pekerjaan
        </Typography>
      ),

      minWidth: 150
    },
    {
      field: 'bebanKerjaO',
      headerName: 'Beban Kerja',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Beban Kerja
        </Typography>
      ),

      minWidth: 150
    }
  ]

  // const columnsRT = [
  //   {
  //     field: 'kodeKecamatan',
  //     renderHeader: () => (
  //       <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
  //         Kode Kecamatan
  //       </Typography>
  //     ),
  //     minWidth: 200,
  //     flex: 1
  //   },
  //   {
  //     field: 'namaKecamatan',
  //     renderHeader: () => (
  //       <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
  //         Nama Kecamatan
  //       </Typography>
  //     ),
  //     minWidth: 200,
  //     flex: 1
  //   },
  //   {
  //     field: 'kodeDesa',
  //     renderHeader: () => (
  //       <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
  //         Kode Desa
  //       </Typography>
  //     ),
  //     minWidth: 200,
  //     flex: 1
  //   },
  //   {
  //     field: 'namaDesa',
  //     renderHeader: () => (
  //       <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
  //         Nama Desa
  //       </Typography>
  //     ),
  //     minWidth: 200,
  //     flex: 1
  //   },

  //   {
  //     field:
  //       fungsi === 4 || fungsi === 5 //Produksi or Distribusi
  //         ? 'alamat'
  //         : fungsi === 3 || (fungsi === 7 && values.subKegJenisSample === 0) //Sosial or IPDS dokumen
  //         ? 'nbs'
  //         : fungsi === 6 && values.subKegJenisSample === 0 // Nerwilis Dok
  //         ? 'idSls'
  //         : fungsi === 7 && values.subKegJenisSample === 1 // IPDS Responden
  //         ? 'idSbr'
  //         : fungsi === 6 && values.subKegJenisSample === 1 //Nerwilis responden
  //         ? 'nus'
  //         : '',
  //     renderHeader: () => (
  //       <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
  //         {fungsi === 4 || fungsi === 5 //Produksi or Distribusi
  //           ? 'Alamat'
  //           : fungsi === 3 || (fungsi === 7 && values.subKegJenisSample === 0) //Sosial or IPDS dokumen
  //           ? 'NBS'
  //           : fungsi === 6 && values.subKegJenisSample === 0 // Nerwilis Dok
  //           ? 'ID SLS'
  //           : fungsi === 7 && values.subKegJenisSample === 1 // IPDS Responden
  //           ? 'ID SBR'
  //           : fungsi === 6 && values.subKegJenisSample === 1 //Nerwilis responden
  //           ? 'NUS'
  //           : ''}
  //       </Typography>
  //     ),
  //     minWidth: 200,
  //     flex: 1
  //   },
  //   {
  //     field:
  //       fungsi === 4 || fungsi === 5 //Produksi or Distribusi
  //         ? 'nbs/nks/idsls'
  //         : (fungsi === 6 && values.subKegJenisSample === 1) || (fungsi === 7 && values.subKegJenisSample === 1) //NerwilisResponden or IPDS Responden
  //         ? 'nama'
  //         : fungsi === 6 && values.subKegJenisSample === 0 // Nerwilis Dok
  //         ? 'nbs'
  //         : fungsi === 3 //Sosial
  //         ? 'nks'
  //         : fungsi === 7 && values.subKegJenisSample === 0 //IPDS Dok
  //         ? 'idSls'
  //         : '',
  //     renderHeader: () => (
  //       <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
  //         {fungsi === 4 || fungsi === 5 //Produksi or Distribusi
  //           ? 'NBS/NKS/IDSLS'
  //           : (fungsi === 6 && values.subKegJenisSample === 1) || (fungsi === 7 && values.subKegJenisSample === 1) //NerwilisResponden or IPDS Responden
  //           ? 'Nama Perusahaan'
  //           : fungsi === 6 && values.subKegJenisSample === 0 // Nerwilis Dok
  //           ? 'NBS'
  //           : fungsi === 3 //Sosial
  //           ? 'NKS'
  //           : fungsi === 7 && values.subKegJenisSample === 0 //IPDS Dok
  //           ? 'ID SLS'
  //           : ''}
  //       </Typography>
  //     ),
  //     minWidth: 200,
  //     flex: 1
  //   }
  // ]
  // ini kebawah buat keperluan import excel,csv

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
      field:
        values.templateTable == 5 //Produksi or Distribusi
          ? 'alamat'
          : values.templateTable == 4 || values.templateTable == 3 //Sosial or IPDS dokumen
          ? 'nbs'
          : values.templateTable == 7 // IPDS Responden
          ? 'idSbr'
          : values.templateTable == 6 //Nerwilis responden
          ? 'nus'
          : '',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {values.templateTable == 5 //Produksi or Distribusi
            ? 'Alamat'
            : values.templateTable == 4 || values.templateTable == 3 //Sosial or IPDS dokumen
            ? 'NBS'
            : values.templateTable == 7 // IPDS Responden
            ? 'ID SBR'
            : values.templateTable == 6 //Nerwilis responden
            ? 'NUS'
            : ''}
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },

    {
      field:
        values.templateTable == 5 || values.templateTable == 6 //NerwilisResponden or IPDS Responden
          ? 'namaPerusahaan'
          : values.templateTable == 4 // Nerwilis Dok
          ? 'idSls'
          : values.templateTable == 3 //Sosial
          ? 'nks'
          : values.templateTable == 7 //IPDS Dok
          ? 'namaPerusahaan'
          : '',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {values.templateTable == 5 || values.templateTable == 6 //Nerwilis Responden or IPDS Responden
            ? 'Nama Perusahaan'
            : values.templateTable == 4 // Nerwilis Dok
            ? 'ID SLS'
            : values.templateTable == 3 //Sosial
            ? 'NKS'
            : values.templateTable == 7 //IPDS Dok
            ? 'Nama Perusahaan'
            : ''}
        </Typography>
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
    alamat: ''
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

      setData(convertToJson(headers, fileData))
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
  // sampe sini import excel kelar
  return (
    <>
      <Card sx={{ padding: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
            Tambah Sub Kegiatan
          </Typography>
        </Box>
        <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
          <TextField
            required
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
                  fullWidth
                  labelId='demo-simple-select-helper-label'
                  id='demo-simple-select-helper'
                  label='Rentang Waktu'
                  onChange={handleJenisSubKeg}
                  value={values.subKegJenis}
                >
                  <MenuItem key={''} value={''}>
                    {''}
                  </MenuItem>
                  {jenisSubKegiatan.map(item => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nama}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={values.subKegJenis === 65 || values.subKegJenis === 67 ? 6 : 12} xs={12}>
              <DatePickerWrapper>
                <DatePicker
                  selected={selectedDateE}
                  sx={{ width: 1000 }}
                  showYearDropdown
                  showMonthDropdown
                  placeholderText='Tanggal Berakhir'
                  value={selectedDateE}
                  onChange={handleDateChangeE}
                  customInput={<CustomInputStart />}
                  dateFormat='dd/MM/yyyy'
                  className='custom-datepicker'
                />
              </DatePickerWrapper>
            </Grid>

            {session.status === 'authenticated' &&
              (session.data.uid === 9988 ||
                values.subKegJenis === 65 ||
                values.subKegJenis === 67 ||
                values.subKegJenis === 70) && (
                <>
                  <Grid item md={6} xs={12}>
                    {/* <TextField
                      name='unitTargetSubKeg'
                      value={values.subKegUnitTarget}
                      onChange={handleChange('subKegUnitTarget')}
                      autoFocus
                      fullWidth
                      id='unitTarget'
                      label='Dokumen/Responden'
                    /> */}
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-helper-label'>Dokumen/Responden</InputLabel>
                      <Select
                        fullWidth
                        labelId='demo-simple-select-helper-label'
                        id='demo-simple-select-helper'
                        label='Dokumen/Responden'
                        onChange={handleDokumenResponden}
                        value={values.subKegUnitTarget}
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
                  {/* <Grid item md={6} xs={12}>
                    <TextField
                      name='targetSubKeg'
                      value={values.subKegTarget}
                      onChange={handleChange('subKegTarget')}
                      autoFocus
                      type={'number'}
                      fullWidth
                      id='target'
                      label='Target'
                    />
                  </Grid> */}
                </>
              )}
            {session.status === 'authenticated' &&
              (session.data.uid === 9988 || values.subKegJenis === 65 || values.subKegJenis === 67) && (
                <>
                  <Grid item md={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-helper-label'>Jenis Sample</InputLabel>
                      <Select
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
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      {session.status === 'authenticated' && values.subKegJenisSample === 0 && (
                        <>
                          <InputLabel id='demo-simple-select-helper-label'>Template Table</InputLabel>
                          <Select
                            fullWidth
                            labelId='demo-simple-select-helper-label'
                            onChange={handleTemplateChange}
                            value={values.templateTable}
                            id='demo-simple-select-helper'
                            label='Template Table'
                            name='Template Table'
                            size='medium'
                          >
                            <MenuItem value={3}>NBS-NKS</MenuItem>
                            <MenuItem value={4}>NBS-ID SLS</MenuItem>
                          </Select>
                        </>
                      )}
                      {session.status === 'authenticated' && values.subKegJenisSample === 1 && (
                        <>
                          <InputLabel id='demo-simple-select-helper-label'>Template Table</InputLabel>
                          <Select
                            fullWidth
                            labelId='demo-simple-select-helper-label'
                            onChange={handleTemplateChange}
                            value={values.templateTable}
                            id='demo-simple-select-helper'
                            label='Template Table'
                            name='Template Table'
                            size='medium'
                          >
                            <MenuItem value={5}>Alamat-Nama Perusahaan</MenuItem>
                            <MenuItem value={6}>NUS-Nama Perusahaan/Dinas</MenuItem>
                            <MenuItem value={7}>ID SBR-Nama Perusahaan</MenuItem>
                          </Select>
                        </>
                      )}
                    </FormControl>
                  </Grid>
                </>
              )}

            <Grid item md={12} xs={12}>
              {' '}
              {session.status === 'authenticated' &&
                values.subKegJenisSample === 1 &&
                (values.subKegJenis === 65 || values.subKegJenis === 67) && (
                  <>
                    {' '}
                    <TextField
                      required
                      name='namaSubKeg'
                      value={values.subKegGajiPerPerusahaan}
                      onChange={handleChange('subKegGajiPerPerusahaan')}
                      fullWidth
                      id='kegGajiPerPerusahaan'
                      label='Harga Dokumen Per Perusahaan'
                      sx={{ marginBottom: 4 }}
                    />
                  </>
                )}
              {/* <TextField
                name='deskripsiSubKeg'
                value={values.subKegDesk}
                onChange={handleChange('subKegDesk')}
                fullWidth
                multiline
                minRows={3}
                label='Deskripsi Sub Kegiatan'
                placeholder='Deskripsi Sub Kegiatan'
              /> */}
              <Divider mt={2}></Divider>
            </Grid>

            {/* {session.status === 'authenticated' &&
              (session.data.uid === 999 ||
                (values.subKegJenisSample === 1 && (values.subKegJenis === 65 || values.subKegJenis === 67))) && (
                <>
                  <Grid item md={6} xs={12}>
                    <Typography variant={'h6'} mb={4}>
                      Sample Perusahaan
                    </Typography>
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-helper-label'>Group Perusahaan</InputLabel>
                      <Select
                        fullWidth
                        labelId='demo-simple-select-helper-label'
                        id='demo-simple-select-helper'
                        label='Group Perusahaan'
                        onChange={handleSamplePerusahaan}
                        value={values.subKegSamplePerusahaan}
                      >
                        <MenuItem key={''} value={''}>
                          {''}
                        </MenuItem>
                        {group.map(item => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.nama}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Grid container spacing={4}>
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
                                sortModel: [{ field: 'checked', sort: 'desc' }]
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
                              // overflowY: 'auto',
                              width: '100%'
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )} */}
            {session.status === 'authenticated' &&
              (session.data.uid === 999 || values.subKegJenisSample === 0 || values.subKegJenisSample === 1) && (
                <>
                  <Grid item md={6} xs={12}>
                    <Typography variant={'h6'} mb={4}>
                      Import Sample
                    </Typography>
                  </Grid>
                  <Grid mt={2} mb={2} xs={12} md={12} style={{ paddingLeft: 18 }}>
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
                    {values.templateTable == 3 && (
                      <>
                        {' '}
                        <Button
                          style={{ marginLeft: 30 }}
                          variant='contained'
                          target='_blank'
                          href='https://docs.google.com/spreadsheets/d/1r7-45vtZHeJc8NIHt-_37nSNvv6b_sdyL-k_RRJY1CA/edit?usp=sharing'
                        >
                          Template Table
                        </Button>
                      </>
                    )}
                    {values.templateTable == 4 && (
                      <>
                        {' '}
                        <Button
                          style={{ marginLeft: 30 }}
                          variant='contained'
                          target='_blank'
                          href='https://docs.google.com/spreadsheets/d/1SMEoofTuCwTbz0S8wWv50c0NdQR7YdTZMkD-MheQ05w/edit?usp=sharing'
                        >
                          Template Table
                        </Button>
                      </>
                    )}

                    {values.templateTable == 5 && (
                      <>
                        {' '}
                        <Button
                          style={{ marginLeft: 30 }}
                          variant='contained'
                          target='_blank'
                          href='https://docs.google.com/spreadsheets/d/1drqslfn5KY6GhR5N2Bc_ZbyMJWg4IF5SDVo6umsBlho/edit?usp=sharing'
                        >
                          Template Table
                        </Button>
                      </>
                    )}

                    {values.templateTable == 7 && (
                      <>
                        {' '}
                        <Button
                          style={{ marginLeft: 30 }}
                          variant='contained'
                          target='_blank'
                          href='https://docs.google.com/spreadsheets/d/1nWR6_tsLBXa1qLdTry5fsx1Hgmvfj---oNsiCQO3ods/edit?usp=sharing'
                        >
                          Template Table
                        </Button>
                      </>
                    )}

                    {values.templateTable == 6 && (
                      <>
                        {' '}
                        <Button
                          style={{ marginLeft: 30 }}
                          variant='contained'
                          target='_blank'
                          href='https://docs.google.com/spreadsheets/d/1s9k74pPMlJc8wotQRV1jpBxPAYFqh-BD1sH8BhEFb4Q/edit?usp=sharing'
                        >
                          Template Table
                        </Button>
                      </>
                    )}
                  </Grid>
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
                            columns={columnsNew}
                            pprioritySize={5}
                            sx={{
                              height: rows.length > 3 ? '70vh' : '45vh',
                              overflowY: 'disabled',
                              width: '100%'
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}
            {session.status === 'authenticated' &&
              (session.data.uid === 9988 || values.subKegJenis === 65 || values.subKegJenis === 67) && (
                <>
                  <Grid item md={6} xs={12}>
                    <Typography variant={'h6'} mb={4}>
                      Mitra
                    </Typography>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <Box sx={{ width: '100%' }}>
                          <DataGrid
                            initialState={{
                              sorting: {
                                sortModel: [
                                  {
                                    field: 'bebanKerjaM',
                                    sort: 'asc'
                                  }
                                ]
                              }
                            }}
                            rows={rowsM}
                            columns={columnsM}
                            pprioritySize={5}
                            rowsPerPpriorityOptions={[5]}
                            disableSelectionOnClick
                            experimentalFeatures={{ newEditingApi: true }}
                            sx={{
                              height: rowsM.length > 3 ? '70vh' : '45vh',
                              width: '100%'
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* <Grid item md={6} xs={12}>
                    <Typography variant={'h6'} mb={4}>
                      Tim Kerja
                    </Typography>
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-helper-label'>Tim Kerja</InputLabel>
                      <Select
                        disabled
                        fullWidth
                        labelId='demo-simple-select-helper-label'
                        id='demo-simple-select-helper'
                        label='Tim Kerja'
                        onChange={handleSampleTimKerja}
                        value={values.subKegSampleTimKerja}
                      >
                        <MenuItem key={''} value={''}>
                          {''}
                        </MenuItem>
                        {timkerja.map(item => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.nama}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid> */}
                  <Grid item md={12} xs={12}>
                    <Typography variant={'h6'} mb={4}></Typography>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <Box sx={{ width: '100%' }}>
                          <DataGrid
                            initialState={{
                              sorting: {
                                sortModel: [
                                  {
                                    field: 'bebanKerjaO',
                                    sort: 'asc'
                                  }
                                ]
                              }
                            }}
                            rows={rowsO}
                            columns={columnsO}
                            pprioritySize={5}
                            rowsPerPpriorityOptions={[5]}
                            disableSelectionOnClick
                            experimentalFeatures={{ newEditingApi: true }}
                            sx={{
                              height: rowsO.length > 3 ? '70vh' : '45vh',
                              width: '100%'
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
          <Button fullWidth onClick={handleAddTask} size='medium' variant='contained' sx={{ marginTop: 4 }}>
            Buat Sub Kegiatan
          </Button>
        </form>
      </Card>
    </>
  )
}

export default TaskManageAddViews
