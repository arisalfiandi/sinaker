import React, { useState, useEffect, useLayoutEffect } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// Mui Import
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import Typography from '@mui/material/Typography'
import DoneIcon from '@mui/icons-material/Done'
import Message from '@mui/icons-material/Send'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'

import { useRouter } from 'next/dist/client/router'
import { useSession } from 'next-auth/react'

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

// icon
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import ClipboardFileOutline from 'mdi-material-ui/ClipboardFileOutline'
import LockOutline from 'mdi-material-ui/LockOutline'
import Coin from 'mdi-material-ui/CurrencyUsd'
import { Null } from 'mdi-material-ui'
import { typeOf } from 'mathjs'

const ProjectDetailsViews = props => {
  console.log(props.dataEmail)
  const statusPencairan = props.data.pencairan[0].status
  const tanggalMulai = props.data.project.startdate
  const tanggalBerakhir = props.data.duedate
  const tanggalSPM = new Date(props.data.pencairan[0].tanggalSPM)
  const tanggalNow = new Date()
  const penanggungJawab = props.data.project.projectLeader.name
  // Filter data yang memenuhi kondisi pmlId dan pclId kurang dari 10000
  const filteredData = props.dataTpp.filter(item => item.pmlId < 10000 && item.pclId < 10000)
  // Mengumpulkan pmlId dan pclId yang unik
  const pmlIdSet = new Set(filteredData.map(item => item.pmlId))
  const pclIdSet = new Set(filteredData.map(item => item.pclId))
  // Gabungkan kedua set ID unik
  const combinedIdSet = new Set([...pmlIdSet, ...pclIdSet])
  const jumlahMitra = combinedIdSet.size
  const [totalGaji, setTotalGaji] = useState(
    props.dataTpp
      .filter(item => item.pmlId < 10000 && item.pclId < 10000)
      .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl + tppRow.gajiPml, 0)
  )
  const router = useRouter()
  const session = useSession()

  const steps = ['PJK', 'Verifikator', 'PPSPM', 'Bendahara']
  const status = {
    0: { deskripsi: 'Belum Mulai', color: 'info' },
    1: { deskripsi: 'On Process', color: 'warning' },
    2: { deskripsi: 'Selesai', color: 'success' }
  }

  const [activeStep, setActiveStep] = useState(props.data.pencairan[0].tahapanId)
  const [completed, setCompleted] = useState({})

  useEffect(() => {
    const x = props.data.pencairan[0].tahapanId
    const newData = {}

    for (let i = 0; i < x; i++) {
      newData[i] = true
    }

    setCompleted(newData)
  }, [])

  const totalSteps = () => {
    return steps.length
  }

  const completedSteps = () => {
    return Object.keys(completed).length
  }

  const isLastStep = () => {
    return activeStep === totalSteps() - 1
  }

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps()
  }

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1
    setActiveStep(newActiveStep)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleStep = step => () => {
    setActiveStep(step)
  }

  const handleFirst = () => {
    setActiveStep(0)
  }

  const handleComplete = () => {
    const newCompleted = completed
    newCompleted[activeStep] = true
    setCompleted(newCompleted)
    handleNext()
  }

  const handleReset = () => {
    setActiveStep(0)
    setCompleted({})
  }

  const [valuesBeforeEdit, setValuesBeforeEdit] = useState({
    suratTugas: '',
    SK: '',
    KAK: '',
    SPJ: '',
    formPermintaan: '',
    SPM: ''
  })

  const [values, setValues] = useState({
    suratTugas: '',
    SK: '',
    KAK: '',
    SPJ: '',
    formPermintaan: '',
    SPM: ''
  })

  useEffect(() => {
    if (props.data.pencairan[0].surat_pencairan.length > 0) {
      const updatedValues = props.data.pencairan[0].surat_pencairan.reduce((acc, surat) => {
        if (surat.jenisId === 1) {
          acc.suratTugas = surat.lokasi
        }
        if (surat.jenisId === 2) {
          acc.SK = surat.lokasi
        }
        if (surat.jenisId === 3) {
          acc.KAK = surat.lokasi
        }
        if (surat.jenisId === 4) {
          acc.SPJ = surat.lokasi
        }
        if (surat.jenisId === 5) {
          acc.formPermintaan = surat.lokasi
        }
        if (surat.jenisId === 6) {
          setEditPPSPM(1)
          acc.SPM = surat.lokasi
        }
        return acc
      }, {})
      setValues(updatedValues)
      if (props.data.pencairan[0].tahapanId !== 0) {
        setEditPJK(1)
      }
    }
  }, [])

  useEffect(() => {
    setValuesBeforeEdit(values)
  }, [])

  const [editPJK, setEditPJK] = useState(0)
  const [editPPSPM, setEditPPSPM] = useState(0)

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
  }

  const [open, setOpen] = useState(() => {
    return props.data.pencairan[0].pesan_pencairan.reduce((acc, pesan) => {
      acc[pesan.id] = true
      return acc
    }, {})
  })

  const handleClose = index => {
    setOpen(prevOpen => {
      const newOpen = { ...prevOpen }
      newOpen[index] = false
      return newOpen
    })
  }

  const handleResolvePesan = async (pencairanId, tahapanId, pesanId) => {
    try {
      const res = await axios.put(`/pesan_pencairan/${props.data.pencairan[0].id}`, {
        tahapanId: tahapanId,
        pencairanId: props.data.pencairan[0].id,
        pesanId: pesanId,
        resolve: 1
      })

      if (res.status === 201) {
        Swal.fire({
          title: 'Berhasil Menyelesaikan Pesan Kesalahan',
          text: 'Tekan OK untuk melanjutkan',
          icon: 'success',
          confirmButtonColor: '#68B92E',
          confirmButtonText: 'OK'
        }).then(() => {
          handleClose(pesanId)
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Gagal Menyelesaikan Pesan Kesalahan',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  const handlePJK = async e => {
    e.preventDefault()
    const tanggalSelesai = new Date()
    if (
      values.suratTugas != '' &&
      values.SK != '' &&
      values.KAK != '' &&
      values.SPJ != '' &&
      values.formPermintaan != '' &&
      values.suratTugas != null &&
      values.SK != null &&
      values.KAK != null &&
      values.SPJ != null &&
      values.formPermintaan != null
    ) {
      if (props.data.pencairan[0].surat_pencairan.length > 0) {
        const data_surat_edit = []
        if (valuesBeforeEdit.suratTugas != values.suratTugas) {
          data_surat_edit.push({ lokasi: values.suratTugas, jenis: 1, id: props.data.pencairan[0].id })
        }
        if (valuesBeforeEdit.SK != values.SK) {
          data_surat_edit.push({ lokasi: values.SK, jenis: 2, id: props.data.pencairan[0].id })
        }
        if (valuesBeforeEdit.KAK != values.KAK) {
          data_surat_edit.push({ lokasi: values.KAK, jenis: 3, id: props.data.pencairan[0].id })
        }
        if (valuesBeforeEdit.SPJ != values.SPJ) {
          data_surat_edit.push({ lokasi: values.SPJ, jenis: 4, id: props.data.pencairan[0].id })
        }
        if (valuesBeforeEdit.formPermintaan != values.formPermintaan) {
          data_surat_edit.push({ lokasi: values.formPermintaan, jenis: 5, id: props.data.pencairan[0].id })
        }
        try {
          const response = await axios.put(`/surat_pencairan/${props.data.pencairan[0].id}`, {
            data_surat_edit: data_surat_edit
          })

          if (response.status === 201) {
            Swal.fire({
              title: 'Berhasil Mengubah Dokumen Pencairan',
              text: 'Tekan OK untuk melanjutkan',
              icon: 'success',
              confirmButtonColor: '#68B92E',
              confirmButtonText: 'OK'
            }).then(() => {
              handleComplete()
              router.push(`/pencairan-detail/${props.data.id}`)
            })
          }
        } catch (error) {
          Swal.fire({
            title: 'Gagal Mengubah Dokumen Pencairan',
            text: 'Pastikan form sudah terisi lengkap',
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
          })
        }
      } else {
        const data_surat = Object.keys(values).map((key, index) => {
          if (key != 'SPM') {
            return { lokasi: values[key], jenis: index + 1, id: props.data.pencairan[0].id }
          }
        })
        try {
          const res = await axios.post('/surat_pencairan', {
            data_surat: data_surat
          })

          const response = await axios.put(`/pencairan/${props.data.pencairan[0].id}`, {
            tahapanChange: 1,
            tahapanId: 1,
            taskId: props.data.id,
            subject: props.data.title + ' ' + props.data.project.title,
            kegiatan: props.data.project.title
          })

          if (res.status === 201 && response.status === 201) {
            Swal.fire({
              title: 'Berhasil Menambahkan Dokumen Pencairan',
              text: 'Tekan OK untuk melanjutkan',
              icon: 'success',
              confirmButtonColor: '#68B92E',
              confirmButtonText: 'OK'
            }).then(() => {
              handleComplete()
              router.push(`/pencairan-detail/${props.data.id}`)
            })
          }
        } catch (error) {
          Swal.fire({
            title: 'Gagal Menambahkan Dokumen Pencairan',
            text: 'Pastikan form sudah terisi lengkap',
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
          })
        }
      }
    } else {
      Swal.fire({
        title: 'Gagal Menambahkan Dokumen Pencairan',
        text: 'Pastikan form sudah terisi lengkap',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  const handleEditPJK = async e => {
    const data_surat_edit = []
    if (valuesBeforeEdit.suratTugas != values.suratTugas) {
      data_surat_edit.push({ lokasi: values.suratTugas, jenis: 1, id: props.data.pencairan[0].id })
    }
    if (valuesBeforeEdit.SK != values.SK) {
      data_surat_edit.push({ lokasi: values.SK, jenis: 2, id: props.data.pencairan[0].id })
    }
    if (valuesBeforeEdit.KAK != values.KAK) {
      data_surat_edit.push({ lokasi: values.KAK, jenis: 3, id: props.data.pencairan[0].id })
    }
    if (valuesBeforeEdit.SPJ != values.SPJ) {
      data_surat_edit.push({ lokasi: values.SPJ, jenis: 4, id: props.data.pencairan[0].id })
    }
    if (valuesBeforeEdit.formPermintaan != values.formPermintaan) {
      data_surat_edit.push({ lokasi: values.formPermintaan, jenis: 5, id: props.data.pencairan[0].id })
    }
    try {
      const response = await axios.put(`/surat_pencairan/${props.data.pencairan[0].id}`, {
        data_surat_edit: data_surat_edit
      })

      if (response.status === 201) {
        Swal.fire({
          title: 'Berhasil Mengubah Dokumen Pencairan',
          text: 'Tekan OK untuk melanjutkan',
          icon: 'success',
          confirmButtonColor: '#68B92E',
          confirmButtonText: 'OK'
        }).then(() => {
          handleComplete()
          router.push(`/pencairan-detail/${props.data.id}`)
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Gagal Mengubah Dokumen Pencairan',
        text: 'Pastikan form sudah terisi lengkap',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  const [pesan, setPesan] = useState('')

  const openModal = async tahapanId => {
    const { value: pesanError } = Swal.fire({
      title: 'Kembalikan Dokumen ke PJK?',
      input: 'text',
      inputLabel: 'Masukkan Pesan Kesalahan',
      confirmButtonText: 'Kembalikan ke PJK',
      showCancelButton: true,
      inputValidator: value => {
        if (!value) {
          return 'Pesan kesalahan harus diisi'
        }
      }
    }).then(result => {
      if (result.isConfirmed) {
        setPesan(result.value)
      }
    })
    if (pesan) {
      try {
        const res = await axios.post('/pesan_pencairan', {
          tahapanId: tahapanId,
          pencairanId: props.data.pencairan[0].id,
          pesan: pesan,
          resolve: 0
        })

        const response = await axios.put(`/pencairan/${props.data.pencairan[0].id}`, {
          tahapanChange: 1,
          tahapanId: 0,
          taskId: props.data.id,
          subject: props.data.title + ' ' + props.data.project.title,
          pesan: pesan,
          email: props.data.project.projectLeader.email
        })

        if (res.status === 201 && response.status === 201) {
          Swal.fire({
            title: 'Berhasil Mengembalikan Dokumen ke PJK',
            text: 'Tekan OK untuk melanjutkan',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          }).then(() => {
            handleFirst()
            router.push(`/pencairan`)
          })
        }
      } catch (error) {
        Swal.fire({
          title: 'Gagal Mengembalikan Dokumen ke PJK',
          text: 'Pastikan form sudah terisi lengkap',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        })
      }
    }
  }

  const handleSesuai = async e => {
    e.preventDefault()
    try {
      const response = await axios.put(`/pencairan/${props.data.pencairan[0].id}`, {
        tahapanChange: 1,
        tahapanId: 2,
        taskId: props.data.id,
        subject: props.data.title + ' ' + props.data.project.title,
        kegiatan: props.data.title + ' ' + props.data.project.title,
        tahap: props.data.pencairan[0].tahapan.deskripsi,
        email: props.data.project.projectLeader.email
      })

      if (response.status === 201) {
        Swal.fire({
          title: 'Dokumen Pencairan Telah Sesuai',
          text: 'Tekan OK untuk melanjutkan',
          icon: 'success',
          confirmButtonColor: '#68B92E',
          confirmButtonText: 'OK'
        }).then(() => {
          handleComplete()
          router.push(`/pencairan-detail/${props.data.id}`)
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Terjadi Kesalahan, Coba Lagi Nanti',
        text: 'Pastikan form sudah terisi lengkap',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  const handlePPSPM = async e => {
    e.preventDefault()
    const tanggalSelesai = new Date()
    if (values.SPM != '' && values.SPM != null) {
      const data_surat = Object.keys(values).map((key, index) => {
        if (key === 'SPM') {
          return { lokasi: values[key], jenis: 6, id: props.data.pencairan[0].id }
        }
      })
      try {
        const res = await axios.post('/surat_pencairan', {
          data_surat: data_surat
        })

        const response = await axios.put(`/pencairan/${props.data.pencairan[0].id}`, {
          SPMChange: 1,
          tahapanId: 3,
          taskId: props.data.id,
          tanggalSPM: new Date(),
          subject: props.data.title + ' ' + props.data.project.title,
          kegiatan: props.data.title + ' ' + props.data.project.title,
          tahap: props.data.pencairan[0].tahapan.deskripsi,
          email: props.data.project.projectLeader.email
        })

        if (res.status === 201 && response.status === 201) {
          Swal.fire({
            title: 'Berhasil Menambahkan SPM',
            text: 'Tekan OK untuk melanjutkan',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          }).then(() => {
            handleComplete()
            router.push(`/pencairan-detail/${props.data.id}`)
          })
        }
      } catch (error) {
        Swal.fire({
          title: 'Gagal Menambahkan SPM',
          text: 'Pastikan form sudah terisi lengkap',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        })
      }
    } else {
      Swal.fire({
        title: 'Gagal Menambahkan SPM',
        text: 'Pastikan form sudah terisi lengkap',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  const handleEditPPSPM = async e => {
    const data_surat_edit = []
    if (valuesBeforeEdit.SPM != values.SPM) {
      console.log(true)
      data_surat_edit.push({ lokasi: values.SPM, jenis: 6, id: props.data.pencairan[0].id })
    } else {
      console.log(false)
    }
    console.log(data_surat_edit)
    try {
      const response = await axios.put(`/surat_pencairan/${props.data.pencairan[0].id}`, {
        data_surat_edit: data_surat_edit
      })

      if (response.status === 201) {
        Swal.fire({
          title: 'Berhasil Mengubah SPM',
          text: 'Tekan OK untuk melanjutkan',
          icon: 'success',
          confirmButtonColor: '#68B92E',
          confirmButtonText: 'OK'
        }).then(() => {
          handleComplete()
          router.push(`/pencairan-detail/${props.data.id}`)
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Gagal Mengubah SPM',
        text: 'Pastikan form sudah terisi lengkap',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  const [openBendahara, setOpenBendahara] = useState(true)
  const [pesanBendahara, setPesanBendahara] = useState('')

  const handleBendahara = async e => {
    e.preventDefault()
    const tanggalSelesai = new Date()
    try {
      const response = await axios.put(`/pencairan/${props.data.pencairan[0].id}`, {
        tahapanChange: 1,
        tahapanId: 4,
        taskId: props.data.id,
        tahap: props.data.pencairan[0].tahapan.deskripsi,
        email: props.data.project.projectLeader.email
      })

      const response2 = await axios.put(`/pencairan/${props.data.pencairan[0].id}`, {
        statusChange: 1,
        status: 2,
        tanggalSelesai: tanggalSelesai,
        taskId: props.data.id
      })

      if (response.status === 201 && response2.status === 201) {
        Swal.fire({
          title: 'Berhasil Menyelesaikan Proses Pencairan',
          text: 'Tekan OK untuk melanjutkan',
          icon: 'success',
          confirmButtonColor: '#68B92E',
          confirmButtonText: 'OK'
        }).then(() => {
          handleComplete()
          setOpenBendahara(false)
          router.push(`/pencairan-detail/${props.data.id}`)
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Gagal Menyelesaikan Proses Pencairan',
        text: 'Pastikan form sudah terisi lengkap',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  const openModalBendahara = async tahapanId => {
    const { value: pesanError } = Swal.fire({
      title: 'Masukkan Pesan Keterangan?',
      input: 'text',
      inputLabel: 'Masukkan Pesan',
      confirmButtonText: 'Kirim Pesan',
      showCancelButton: true,
      inputValidator: value => {
        if (!value) {
          return 'Pesan keterangan harus diisi'
        }
      }
    }).then(result => {
      if (result.isConfirmed) {
        setPesanBendahara(result.value)
      }
    })
    if (pesanBendahara) {
      try {
        const res = await axios.post('/pesan_pencairan', {
          tahapanId: tahapanId,
          pencairanId: props.data.pencairan[0].id,
          pesan: pesanBendahara,
          resolve: 0
        })

        const response = await axios.put(`/pencairan/${props.data.pencairan[0].id}`, {
          tahapanChange: 1,
          tahapanId: 3,
          taskId: props.data.id,
          subject: props.data.title + ' ' + props.data.project.title,
          pesan: pesanBendahara,
          email: props.data.project.projectLeader.email
        })

        if (res.status === 201 && response.status === 201) {
          Swal.fire({
            title: 'Berhasil Memberikan Keterangan',
            text: 'Tekan OK untuk melanjutkan',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          }).then(() => {
            router.push(`/pencairan`)
          })
        }
      } catch (error) {
        Swal.fire({
          title: 'Gagal Mengirimkan Pesan Keterangan',
          text: 'Pastikan form sudah terisi lengkap',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        })
      }
    }
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={6} display={'flex'} justifyContent={'start'}>
            <Typography variant='h6' sx={{ mt: 2, mb: 1, py: 1 }}>
              {props.data.title + ' ' + props.data.project.title}
            </Typography>
          </Grid>
          <Grid item xs={6} display={'flex'} justifyContent={'end'}>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>Status: {status[Number(statusPencairan)].deskripsi}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Alert severity='info' sx={{ mb: 2 }}>
              {props.data.pencairan[0].tahapan.deskripsi}
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mt: 2, mb: 7, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline sx={{ color: 'secondary', marginRight: 2.25 }} fontSize='small' />
                <Typography variant='body2' sx={{ fontSize: '12px' }}>
                  Tanggal Kegiatan:{' '}
                  <strong>
                    {new Date(tanggalMulai).toLocaleDateString('id')} -{' '}
                    {new Date(tanggalBerakhir).toLocaleDateString('id')}
                  </strong>
                </Typography>
              </Box>
              {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOutline sx={{ color: 'secondary', marginRight: 2.25 }} fontSize='small' />
                <Typography variant='body2' sx={{ fontSize: '12px' }}>
                  Tanggal Berakhir: <strong>{new Date(tanggalBerakhir).toLocaleDateString('id')}</strong>
                </Typography>
              </Box> */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline sx={{ color: 'secondary', marginRight: 2.25 }} fontSize='small' />
                <Typography variant='body2' sx={{ fontSize: '12px' }}>
                  PJK: <strong>{penanggungJawab}</strong>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ClipboardFileOutline sx={{ color: 'secondary', marginRight: 2.25 }} fontSize='small' />
                <Typography variant='body2' sx={{ fontSize: '12px' }}>
                  Jumlah Mitra: <strong>{jumlahMitra} Orang</strong>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ClipboardFileOutline sx={{ color: 'secondary', marginRight: 2.25 }} fontSize='small' />
                <Typography variant='body2' sx={{ fontSize: '12px' }}>
                  Total Honor: <strong>Rp. {totalGaji}</strong>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ mb: 4 }} />
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]} onClick={handleStep(index)}>
                    <StepButton color='inherit'>{label}</StepButton>
                  </Step>
                ))}
              </Stepper>
              {activeStep == 0 ? (
                <React.Fragment>
                  {props.data.pencairan[0].pesan_pencairan
                    ? props.data.pencairan[0].pesan_pencairan.map(pesan =>
                        pesan.resolve === 0 ? (
                          <Collapse key={pesan.id} sx={{ mt: 5 }} in={open[pesan.id]}>
                            <Alert
                              severity='error'
                              action={
                                session.data.uid === props.data.project.projectLeaderId ? (
                                  <IconButton
                                    aria-label='close'
                                    color='inherit'
                                    size='small'
                                    onClick={() => handleResolvePesan(pesan.pencairanId, pesan.tahapanId, pesan.id)}
                                  >
                                    <DoneIcon fontSize='inherit' />
                                  </IconButton>
                                ) : (
                                  <IconButton aria-label='close' color='inherit' size='small'>
                                    <DoneIcon fontSize='inherit' />
                                  </IconButton>
                                )
                              }
                              sx={{ mb: 2 }}
                            >
                              {pesan.pesan}
                            </Alert>
                          </Collapse>
                        ) : null
                      )
                    : ''}
                  <from action='post' onSubmit={e => e.preventDefault()}>
                    <TextField
                      sx={{ mb: 2, mt: 4 }}
                      required
                      fullWidth
                      value={values.suratTugas}
                      onChange={handleChange('suratTugas')}
                      multiline
                      label='Link Surat Tugas'
                      name='suratTugas'
                      disabled={
                        (session?.data?.role === 'teamleader' &&
                          session.data.uid === props.data.project.projectLeaderId) ||
                        session?.data?.role === 'admin' ||
                        session?.data?.role === 'superAdmin'
                          ? false
                          : true
                      }
                    />
                    <TextField
                      sx={{ my: 2 }}
                      required
                      fullWidth
                      value={values.SK}
                      onChange={handleChange('SK')}
                      multiline
                      label='Link SK'
                      name='SK'
                      disabled={
                        (session?.data?.role === 'teamleader' &&
                          session.data.uid === props.data.project.projectLeaderId) ||
                        session?.data?.role === 'admin' ||
                        session?.data?.role === 'superAdmin'
                          ? false
                          : true
                      }
                    />
                    <TextField
                      sx={{ my: 2 }}
                      required
                      fullWidth
                      value={values.KAK}
                      onChange={handleChange('KAK')}
                      multiline
                      label='Link KAK'
                      name='KAK'
                      disabled={
                        (session?.data?.role === 'teamleader' &&
                          session.data.uid === props.data.project.projectLeaderId) ||
                        session?.data?.role === 'admin' ||
                        session?.data?.role === 'superAdmin'
                          ? false
                          : true
                      }
                    />
                    <TextField
                      sx={{ my: 2 }}
                      required
                      fullWidth
                      value={values.SPJ}
                      onChange={handleChange('SPJ')}
                      multiline
                      label='Link SPJ'
                      name='SPJ'
                      disabled={
                        (session?.data?.role === 'teamleader' &&
                          session.data.uid === props.data.project.projectLeaderId) ||
                        session?.data?.role === 'admin' ||
                        session?.data?.role === 'superAdmin'
                          ? false
                          : true
                      }
                    />
                    <TextField
                      sx={{ my: 2 }}
                      required
                      fullWidth
                      value={values.formPermintaan}
                      onChange={handleChange('formPermintaan')}
                      multiline
                      label='Link Form Permintaan Pencairan'
                      name='formPermintaan'
                      disabled={
                        (session?.data?.role === 'teamleader' &&
                          session.data.uid === props.data.project.projectLeaderId) ||
                        session?.data?.role === 'admin' ||
                        session?.data?.role === 'superAdmin'
                          ? false
                          : true
                      }
                    />
                    {(session?.data?.role === 'teamleader' &&
                      session.data.uid === props.data.project.projectLeaderId) ||
                    session?.data?.role === 'admin' ||
                    session?.data?.role === 'superAdmin' ? (
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={editPJK === 1 ? handleEditPJK : handlePJK}>
                          {editPJK === 1 ? 'Ubah Dokumen Pencairan' : 'Kirim ke Verifikator'}
                        </Button>
                      </Box>
                    ) : (
                      ''
                    )}
                  </from>
                </React.Fragment>
              ) : activeStep == 1 ? (
                <React.Fragment>
                  {props.data.pencairan[0].surat_pencairan
                    ? props.data.pencairan[0].surat_pencairan.map(surat =>
                        surat.jenisId === 1 ? (
                          <Chip
                            sx={{ mb: 2, mt: 7, width: '100%' }}
                            label='Lihat Surat Tugas'
                            component='a'
                            href={surat.lokasi}
                            target='_blank'
                            clickable
                          />
                        ) : surat.jenisId === 2 ? (
                          <Chip
                            sx={{ mb: 2, mt: 4, width: '100%' }}
                            label='Lihat SK'
                            component='a'
                            href={surat.lokasi}
                            target='_blank'
                            clickable
                          />
                        ) : surat.jenisId === 3 ? (
                          <Chip
                            sx={{ mb: 2, mt: 4, width: '100%' }}
                            label='Lihat KAK'
                            component='a'
                            href={surat.lokasi}
                            target='_blank'
                            clickable
                          />
                        ) : surat.jenisId === 4 ? (
                          <Chip
                            sx={{ mb: 2, mt: 4, width: '100%' }}
                            label='Lihat SPJ'
                            component='a'
                            href={surat.lokasi}
                            target='_blank'
                            clickable
                          />
                        ) : (
                          <Chip
                            sx={{ mb: 2, mt: 4, width: '100%' }}
                            label='Lihat Form Permintaan Pencairan'
                            component='a'
                            href={surat.lokasi}
                            target='_blank'
                            clickable
                          />
                        )
                      )
                    : null}
                  {session?.data?.role === 'verifikator' ||
                  session?.data?.role === 'admin' ||
                  session?.data?.role === 'superAdmin' ? (
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <Box sx={{ flex: '1 1 auto' }} />
                      <Button onClick={() => openModal(1)}>Review Kembali</Button>
                      <Button color='success' onClick={handleSesuai}>
                        Sesuai
                      </Button>
                    </Box>
                  ) : (
                    ''
                  )}
                </React.Fragment>
              ) : activeStep == 2 ? (
                <React.Fragment>
                  <from action='post' onSubmit={e => e.preventDefault()}>
                    <TextField
                      sx={{ mb: 2, mt: 4 }}
                      required
                      fullWidth
                      value={values.SPM}
                      onChange={handleChange('SPM')}
                      multiline
                      label='Link SPM'
                      name='SPM'
                      disabled={
                        session?.data?.role === 'ppspm' ||
                        session?.data?.role === 'admin' ||
                        session?.data?.role === 'superAdmin'
                          ? false
                          : true
                      }
                    />
                    {session?.data?.role === 'ppspm' ||
                    session?.data?.role === 'admin' ||
                    session?.data?.role === 'superAdmin' ? (
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={editPPSPM == 1 ? handleEditPPSPM : handlePPSPM}>
                          {editPPSPM == 1 ? 'Ubah SPM' : 'Kirim ke Bendahara'}
                        </Button>
                      </Box>
                    ) : (
                      ''
                    )}
                  </from>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {props.data.pencairan[0].surat_pencairan
                    ? props.data.pencairan[0].surat_pencairan.map(surat =>
                        surat.jenisId === 1 ? (
                          <Chip
                            sx={{ mb: 2, mt: 7, width: '100%' }}
                            label='Lihat Surat Tugas'
                            component='a'
                            href={surat.lokasi}
                            target='_blank'
                            clickable
                          />
                        ) : surat.jenisId === 2 ? (
                          <Chip
                            sx={{ mb: 2, mt: 4, width: '100%' }}
                            label='Lihat SK'
                            component='a'
                            href={surat.lokasi}
                            target='_blank'
                            clickable
                          />
                        ) : surat.jenisId === 3 ? (
                          <Chip
                            sx={{ mb: 2, mt: 4, width: '100%' }}
                            label='Lihat KAK'
                            component='a'
                            href={surat.lokasi}
                            target='_blank'
                            clickable
                          />
                        ) : surat.jenisId === 4 ? (
                          <Chip
                            sx={{ mb: 2, mt: 4, width: '100%' }}
                            label='Lihat SPJ'
                            component='a'
                            href={surat.lokasi}
                            target='_blank'
                            clickable
                          />
                        ) : surat.jenisId === 5 ? (
                          <Chip
                            sx={{ mb: 2, mt: 4, width: '100%' }}
                            label='Lihat Form Permintaan Pencairan'
                            component='a'
                            href={surat.lokasi}
                            target='_blank'
                            clickable
                          />
                        ) : (
                          <Chip
                            sx={{ mb: 2, mt: 4, width: '100%' }}
                            label='Lihat Form Permintaan Pencairan'
                            component='a'
                            href={surat.lokasi}
                            target='_blank'
                            clickable
                          />
                        )
                      )
                    : null}
                  {Math.ceil((tanggalNow - tanggalSPM) / (1000 * 60 * 60 * 24)) > 0 &&
                  (session?.data?.role === 'bendahara' ||
                    session?.data?.role === 'admin' ||
                    session?.data?.role === 'superAdmin') ? (
                    <Collapse sx={{ mt: 5 }} in={openBendahara}>
                      <Alert
                        severity='error'
                        action={
                          <IconButton
                            aria-label='close'
                            color='inherit'
                            size='small'
                            onClick={() => openModalBendahara(3)}
                          >
                            <Message fontSize='inherit' />
                          </IconButton>
                        }
                        sx={{ mb: 2 }}
                      >
                        Belum menyelesaikan pencairan setelah 3 hari terbit SPM, harap memberi pemberitahuan!
                      </Alert>
                    </Collapse>
                  ) : null}
                  {session?.data?.role === 'bendahara' ||
                  session?.data?.role === 'admin' ||
                  session?.data?.role === 'superAdmin' ? (
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <Box sx={{ flex: '1 1 auto' }} />
                      <Button onClick={handleBendahara}>
                        {completedSteps() === totalSteps() - 1 ? 'Pencairan Selesai' : null}
                      </Button>
                    </Box>
                  ) : (
                    ''
                  )}
                </React.Fragment>
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProjectDetailsViews
