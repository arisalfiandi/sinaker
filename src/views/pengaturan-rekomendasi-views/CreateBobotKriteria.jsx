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

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { create, all } from 'mathjs'
import { DataGrid } from '@mui/x-data-grid'

const CreateKegiatanPerusahaanViews = props => {
  const [pegawai, setPegawai] = useState(props.dataPegawai)
  const [mitra, setMitra] = useState(props.dataMitra)

  const [values, setValues] = useState({
    jumlahPekerjaan: 0,
    gajiBlnIni: 0,
    jumlahPekerjaanMitra: 0,
    gajiBlnIniMitra: 0,
    gajiBlnSebelumMitra: 0
  })

  const [consistencyRatioP, setConsistencyRatioP] = useState()
  const [consistencyRatioM, setConsistencyRatioM] = useState()

  const [criteriaWeights, setCriteriaWeights] = useState([
    [1, 1],
    [1, 1]
  ]) // Default weights

  const handleWeightChange = (index1, index2, value) => {
    const newWeightsP = [...criteriaWeights]
    newWeightsP[index1][index2] = value
    setCriteriaWeights(newWeightsP)
  }

  const [criteriaWeightsM, setCriteriaWeightsM] = useState([
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
  ]) // Default weights

  const handleWeightMChange = (index1, index2, value) => {
    const newWeights = [...criteriaWeightsM]
    newWeights[index1][index2] = value
    setCriteriaWeightsM(newWeights)
  }

  function createPairwiseMatrix(weights) {
    const n = weights.length
    const pairwiseMatrix = new Array(n).fill(null).map(() => new Array(n).fill(1))

    // Isi diagonal matriks dengan nilai 1
    for (let i = 0; i < n; i++) {
      pairwiseMatrix[i][i] = 1
    }

    // Isi nilai perbandingan berpasangan
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        pairwiseMatrix[i][j] = weights[i][j]
        pairwiseMatrix[j][i] = 1 / pairwiseMatrix[i][j]
      }
    }

    return pairwiseMatrix
  }

  function normalizePairwiseMatrix(pairwiseMatrix) {
    const n = pairwiseMatrix.length
    const normalizedMatrix = []

    // Menghitung total setiap kolom
    const columnTotal = new Array(n).fill(0)
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        columnTotal[j] += pairwiseMatrix[i][j]
      }
    }

    // Menormalisasi matriks
    for (let i = 0; i < n; i++) {
      normalizedMatrix[i] = new Array(n)
      for (let j = 0; j < n; j++) {
        normalizedMatrix[i][j] = pairwiseMatrix[i][j] / columnTotal[j]
      }
    }

    return normalizedMatrix
  }

  function calculatePriorityWeights(normalizedMatrix) {
    const n = normalizedMatrix.length
    const priorityWeights = new Array(n).fill(0)

    for (let i = 0; i < n; i++) {
      let sumRow = 0
      for (let j = 0; j < n; j++) {
        sumRow += normalizedMatrix[i][j]
      }
      priorityWeights[i] = sumRow / n
    }

    return priorityWeights
  }

  function calculateConsistency(priorityWeights, pairwiseMatrix) {
    const n = priorityWeights.length

    // Hitung eigenvalue (λ) dari matriks berpasangan
    // const eigenvalues = numeric.eig(pairwiseMatrix).lambda.x
    // const eigenvalue = math.eigs(pairwiseMatrix, { number })
    // const eigenvalues = eigenvalue.values
    // console.log(eigenvalues)
    const pairwisePriority = new Array(n).fill(null).map(() => new Array(n).fill(1))
    const eigenvalues = new Array(n).fill(0)

    for (let i = 0; i < n; i++) {
      let sumRow = 0
      for (let j = 0; j < n; j++) {
        pairwisePriority[i][j] = pairwiseMatrix[i][j] * priorityWeights[j]
        sumRow += pairwisePriority[i][j]
      }
      eigenvalues[i] = sumRow / priorityWeights[i]
    }

    // Hitung nilai maksimum eigenvalue (λmax)
    const maxEigenvalue = eigenvalues.reduce((a, b) => a + b, 0) / eigenvalues.length
    // console.log(maxEigenvalue)

    // Hitung Consistency Index (CI)
    const CI = (maxEigenvalue - n) / (n - 1)

    const RI_Table = {
      1: 0.0,
      2: 0.0,
      3: 0.58,
      4: 0.9,
      5: 1.12,
      6: 1.24,
      7: 1.32,
      8: 1.41,
      9: 1.45,
      10: 1.49
    }

    // Hitung Random Index (RI)
    const RI = RI_Table[n]

    // Hitung Ratio (CR)
    const CR = 0
    if (n > 2) {
      CR = CI / RI
    } else {
      CR = 0
    }

    return CR
  }

  const handleCekKonsistensi = e => {
    e.preventDefault()
    // Pegawai
    const pairwiseP = createPairwiseMatrix(criteriaWeights)
    const normalizeP = normalizePairwiseMatrix(pairwiseP)
    const priorityWeightsP = calculatePriorityWeights(normalizeP)
    const consistencyP = calculateConsistency(priorityWeightsP, pairwiseP)
    // console.log(priorityWeightsP)
    // console.log(consistencyP)
    // Mitra
    const pairwiseM = createPairwiseMatrix(criteriaWeightsM)
    const normalizeM = normalizePairwiseMatrix(pairwiseM)
    const priorityWeightsM = calculatePriorityWeights(normalizeM)
    const consistencyM = calculateConsistency(priorityWeightsM, pairwiseM)
    // console.log(priorityWeightsM)
    // console.log(consistencyM)
    const currentValues = { ...values }
    currentValues.jumlahPekerjaan = priorityWeightsP[0]
    currentValues.gajiBlnIni = priorityWeightsP[1]
    currentValues.jumlahPekerjaanMitra = priorityWeightsM[0]
    currentValues.gajiBlnIniMitra = priorityWeightsM[1]
    currentValues.gajiBlnSebelumMitra = priorityWeightsM[2]
    setValues(currentValues)
    setConsistencyRatioP(consistencyP)
    setConsistencyRatioM(consistencyM)
  }

  const rowsOBefore = [
    { id: 1, kriteria: 'Jumlah Pekerjaan', prioritas: (pegawai.kriteria1 * 100).toFixed(2) },
    { id: 2, kriteria: 'Jumlah Jam Kerja', prioritas: (pegawai.kriteria2 * 100).toFixed(2) }
  ]

  const rowsMBefore = [
    { id: 1, kriteria: 'Jumlah Pekerjaan', prioritas: (mitra.kriteria1 * 100).toFixed(2) },
    { id: 2, kriteria: 'Gaji Bulan Ini', prioritas: (mitra.kriteria2 * 100).toFixed(2) },
    { id: 3, kriteria: 'Gaji Bulan Sebelumnya', prioritas: (mitra.kriteria3 * 100).toFixed(2) }
  ]

  const rowsO = [
    { id: 1, kriteria: 'Jumlah Pekerjaan', prioritas: (values.jumlahPekerjaan * 100).toFixed(2) },
    { id: 2, kriteria: 'Jumlah Jam Kerja', prioritas: (values.gajiBlnIni * 100).toFixed(2) }
  ]

  const rowsM = [
    { id: 1, kriteria: 'Jumlah Pekerjaan', prioritas: (values.jumlahPekerjaanMitra * 100).toFixed(2) },
    { id: 2, kriteria: 'Gaji Bulan Ini', prioritas: (values.gajiBlnIniMitra * 100).toFixed(2) },
    { id: 3, kriteria: 'Gaji Bulan Sebelumnya', prioritas: (values.gajiBlnSebelumMitra * 100).toFixed(2) }
  ]

  const columns = [
    {
      field: 'kriteria',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Kriteria</Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'prioritas',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Prioritas
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    }
  ]

  const handleBobotKriteria = async e => {
    e.preventDefault()

    try {
      while (true) {
        const res = await axios.post('/pengaturan-rekomendasi', {
          kriteria1P: values.jumlahPekerjaan,
          kriteria2P: values.gajiBlnIni,
          kriteria1M: values.jumlahPekerjaanMitra,
          kriteria2M: values.gajiBlnIniMitra,
          kriteria3M: values.gajiBlnSebelumMitra
        })

        if (res.status === 201) {
          Swal.fire({
            title: 'Ubah Bobot Kriteria Success',
            text: 'Press OK to continue',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          }).then(router.push(`/`))

          setValues({
            kegNama: '',
            kegKetua: 0
          })
        }

        break
      }
    } catch (error) {
      Swal.fire({
        title: 'Ubah Bobot Kriteria Failed',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  const router = useRouter()
  return (
    <Card>
      <form action='post' onSubmit={e => e.preventDefault()}>
        <Grid container spacing={4} sx={{ padding: '32px' }}>
          <Grid item xs={12}>
            <Typography variant='h4'>Bobot Kriteria Beban Kerja Saat Ini</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Pegawai</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            {/* <Typography variant='body1'>Nilai Bobot Kriteria</Typography> */}
            <DataGrid
              initialState={{
                sorting: {
                  sortModel: [{ field: 'prioritas', sort: 'desc' }]
                }
              }}
              rows={rowsOBefore}
              columns={columns}
              hideFooter
              disableSelectionOnClick
              sx={{
                width: '100%',
                m: 2
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Mitra</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            {/* <Typography variant='body1'>Nilai Bobot Kriteria</Typography> */}
            <DataGrid
              initialState={{
                sorting: {
                  sortModel: [{ field: 'prioritas', sort: 'desc' }]
                }
              }}
              rows={rowsMBefore}
              columns={columns}
              hideFooter
              disableSelectionOnClick
              sx={{
                width: '100%',
                m: 2
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h4' sx={{ mt: 5 }}>
              Ubah Bobot Kriteria Beban Kerja
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5' sx={{ mb: 2 }}>
              Kriteria Beban Kerja Pegawai
            </Typography>
          </Grid>
          {/* <Grid item xs={12}>
            <Typography variant='h6'>Seberapa penting Jumlah Pekerjaan terhadap Jam Kerja?</Typography>
          </Grid> */}
          {/* <Grid item xs={4}>
            <Typography variant='body1'>Jumlah Pekerjaan - Jam Kerja</Typography>
          </Grid> */}
          <Grid item container xs={12} md={12}>
            <Grid item xs={5}>
              <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                Seberapa penting Jumlah Pekerjaan dibandingkan Jumlah Jam Kerja?
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='body2'>Sama penting</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant='body2'>Seberapa penting? (semakin besar, semakin penting)</Typography>
            </Grid>
            <Grid xs={12} sx={{ mb: 2 }}>
              <Divider sx={{ margin: 0 }} />
            </Grid>
            <Grid item xs={5}>
              <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                Jumlah Pekerjaan - Jumlah Jam Kerja
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='body2'>
                <FormControl>
                  <RadioGroup
                    row
                    name='row-radio-buttons-group'
                    value={criteriaWeights[0][1]}
                    onChange={e => handleWeightChange(0, 1, parseInt(e.target.value))}
                  >
                    <FormControlLabel value='1' control={<Radio />} label='1' />
                  </RadioGroup>
                </FormControl>
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <FormControl>
                <RadioGroup
                  row
                  name='row-radio-buttons-group'
                  value={criteriaWeights[0][1]}
                  onChange={e => handleWeightChange(0, 1, parseInt(e.target.value))}
                >
                  <FormControlLabel value='2' control={<Radio />} label='2' />
                  <FormControlLabel value='3' control={<Radio />} label='3' />
                  <FormControlLabel value='4' control={<Radio />} label='4' />
                  <FormControlLabel value='5' control={<Radio />} label='5' />
                  <FormControlLabel value='6' control={<Radio />} label='6' />
                  <FormControlLabel value='7' control={<Radio />} label='7' />
                  <FormControlLabel value='8' control={<Radio />} label='8' />
                  <FormControlLabel value='9' control={<Radio />} label='9' />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          {/* AHP Mitra */}
          <Grid item xs={12}>
            <Typography variant='h5' sx={{ mb: 2 }}>
              Kriteria Beban Kerja Mitra
            </Typography>
          </Grid>
          <Grid item container xs={12} md={12}>
            <Grid item xs={5}>
              <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                Seberapa penting Jumlah Pekerjaan dibandingkan Gaji Bulan Ini?
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='body2'>Sama penting</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant='body2'>Seberapa penting? (semakin besar, semakin penting)</Typography>
            </Grid>
            <Grid xs={12} sx={{ mb: 2 }}>
              <Divider sx={{ margin: 0 }} />
            </Grid>
            <Grid item xs={5}>
              <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                Jumlah Pekerjaan - Gaji Bulan Ini
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='body2'>
                <FormControl>
                  <RadioGroup
                    row
                    name='row-radio-buttons-group'
                    value={criteriaWeightsM[0][1]}
                    onChange={e => handleWeightMChange(0, 1, parseInt(e.target.value))}
                  >
                    <FormControlLabel value='1' control={<Radio />} label='1' />
                  </RadioGroup>
                </FormControl>
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <FormControl>
                <RadioGroup
                  row
                  name='row-radio-buttons-group'
                  value={criteriaWeightsM[0][1]}
                  onChange={e => handleWeightMChange(0, 1, parseInt(e.target.value))}
                >
                  <FormControlLabel value='2' control={<Radio />} label='2' />
                  <FormControlLabel value='3' control={<Radio />} label='3' />
                  <FormControlLabel value='4' control={<Radio />} label='4' />
                  <FormControlLabel value='5' control={<Radio />} label='5' />
                  <FormControlLabel value='6' control={<Radio />} label='6' />
                  <FormControlLabel value='7' control={<Radio />} label='7' />
                  <FormControlLabel value='8' control={<Radio />} label='8' />
                  <FormControlLabel value='9' control={<Radio />} label='9' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                Seberapa penting Jumlah Pekerjaan dibandingkan Gaji Bulan Sebelumnya?
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='body2'>Sama penting</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant='body2'>Seberapa penting? (semakin besar, semakin penting)</Typography>
            </Grid>
            <Grid xs={12} sx={{ mb: 2 }}>
              <Divider sx={{ margin: 0 }} />
            </Grid>
            <Grid item xs={5}>
              <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                Jumlah Pekerjaan - Gaji Bulan Sebelumnya
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='body2'>
                <FormControl>
                  <RadioGroup
                    row
                    name='row-radio-buttons-group'
                    value={criteriaWeightsM[0][2]}
                    onChange={e => handleWeightMChange(0, 2, parseInt(e.target.value))}
                  >
                    <FormControlLabel value='1' control={<Radio />} label='1' />
                  </RadioGroup>
                </FormControl>
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <FormControl>
                <RadioGroup
                  row
                  name='row-radio-buttons-group'
                  value={criteriaWeightsM[0][2]}
                  onChange={e => handleWeightMChange(0, 2, parseInt(e.target.value))}
                >
                  <FormControlLabel value='2' control={<Radio />} label='2' />
                  <FormControlLabel value='3' control={<Radio />} label='3' />
                  <FormControlLabel value='4' control={<Radio />} label='4' />
                  <FormControlLabel value='5' control={<Radio />} label='5' />
                  <FormControlLabel value='6' control={<Radio />} label='6' />
                  <FormControlLabel value='7' control={<Radio />} label='7' />
                  <FormControlLabel value='8' control={<Radio />} label='8' />
                  <FormControlLabel value='9' control={<Radio />} label='9' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                Seberapa penting Gaji Bulan Ini dibandingkan Gaji Bulan Sebelumnya?
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='body2'>Sama penting</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant='body2'>Seberapa penting? (semakin besar, semakin penting)</Typography>
            </Grid>
            <Grid xs={12} sx={{ mb: 2 }}>
              <Divider sx={{ margin: 0 }} />
            </Grid>
            <Grid item xs={5}>
              <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                Gaji Bulan Ini - Gaji Bulan Sebelumnya
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='body2'>
                <FormControl>
                  <RadioGroup
                    row
                    name='row-radio-buttons-group'
                    value={criteriaWeightsM[1][2]}
                    onChange={e => handleWeightMChange(1, 2, parseInt(e.target.value))}
                  >
                    <FormControlLabel value='1' control={<Radio />} label='1' />
                  </RadioGroup>
                </FormControl>
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <FormControl>
                <RadioGroup
                  row
                  name='row-radio-buttons-group'
                  value={criteriaWeightsM[1][2]}
                  onChange={e => handleWeightMChange(1, 2, parseInt(e.target.value))}
                >
                  <FormControlLabel value='2' control={<Radio />} label='2' />
                  <FormControlLabel value='3' control={<Radio />} label='3' />
                  <FormControlLabel value='4' control={<Radio />} label='4' />
                  <FormControlLabel value='5' control={<Radio />} label='5' />
                  <FormControlLabel value='6' control={<Radio />} label='6' />
                  <FormControlLabel value='7' control={<Radio />} label='7' />
                  <FormControlLabel value='8' control={<Radio />} label='8' />
                  <FormControlLabel value='9' control={<Radio />} label='9' />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        {/* <TableAddParticipant></TableAddParticipant> */}
        <Divider sx={{ margin: 0 }} />
        <Grid item my={4} mr={4} display={'flex'} justifyContent={'end'}>
          <Button size='medium' type='submit' variant='contained' onClick={handleCekKonsistensi}>
            Cek Konsistensi
          </Button>
        </Grid>
      </form>

      {consistencyRatioM != null ? (
        <form action='post' onSubmit={e => e.preventDefault()}>
          <Grid container spacing={4} sx={{ padding: '32px' }}>
            <Grid item xs={12}>
              <Typography variant='h5'>Hasil Perhitungan</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Pegawai</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant='body1'>Nilai Bobot Kriteria</Typography>
              <DataGrid
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'prioritas', sort: 'desc' }]
                  }
                }}
                rows={rowsO}
                columns={columns}
                hideFooter
                disableSelectionOnClick
                sx={{
                  width: '100%',
                  m: 2
                }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography sx={{ mb: 5 }}></Typography>
              <Typography variant='body1'>
                Nilai Konsistensi: {(consistencyRatioP * 100).toFixed(2)}%{' '}
                {consistencyRatioP < 0.1
                  ? '(Konsisten)'
                  : '(Tidak Konsisten, Disarankan Untuk Melakukan Pembobotan Ulang Pada Kriteria Pegawai)'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Mitra</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant='body1'>Nilai Bobot Kriteria</Typography>
              <DataGrid
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'prioritas', sort: 'desc' }]
                  }
                }}
                rows={rowsM}
                columns={columns}
                hideFooter
                disableSelectionOnClick
                sx={{
                  width: '100%',
                  m: 2
                }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography sx={{ mb: 5 }}></Typography>
              <Typography variant='body1'>
                Nilai Konsistensi: {(consistencyRatioM * 100).toFixed(2)}%{' '}
                {consistencyRatioM < 0.1
                  ? '(Konsisten)'
                  : '(Tidak Konsisten, Disarankan Untuk Melakukan Pembobotan Ulang Pada Kriteria Mitra)'}
              </Typography>
            </Grid>
          </Grid>
          {/* <TableAddParticipant></TableAddParticipant> */}
          <Divider sx={{ margin: 0 }} />
          <Grid item m={4} display={'flex'} justifyContent={'end'}>
            <Button size='medium' type='submit' variant='contained' onClick={handleBobotKriteria}>
              Ubah Bobot Kriteria
            </Button>
          </Grid>
        </form>
      ) : (
        <></>
      )}

      {/* <form action='post' onSubmit={e => e.preventDefault()}>
        <Grid container spacing={4} sx={{ padding: '32px' }}>
          <Grid item xs={12}>
            <Typography variant='h3'>Ubah Bobot Kriteria Beban Kerja</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Kriteria Beban Kerja Pegawai</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              value={values.jumlahPekerjaan}
              onChange={handleChange('jumlahPekerjaan')}
              multiline
              label='Bobot Kriteria Jumlah Pekerjaan Pegawai'
              name='jumlahPekerjaan'
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              value={values.gajiBlnIni}
              onChange={handleChange('gajiBlnIni')}
              multiline
              label='Bobot Kriteria Gaji Bulan Ini Pegawai'
              name='gajiBlnIni'
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Kriteria Beban Kerja Mitra</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              value={values.jumlahPekerjaanMitra}
              onChange={handleChange('jumlahPekerjaanMitra')}
              multiline
              label='Bobot Kriteria Jumlah Pekerjaan Mitra'
              name='jumlahPekerjaanMitra'
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              value={values.gajiBlnIniMitra}
              onChange={handleChange('gajiBlnIniMitra')}
              multiline
              label='Bobot Kriteria Gaji Bulan Ini Mitra'
              name='gajiBlnIniMitra'
            />
          </Grid>
        </Grid>
        <Divider sx={{ margin: 0 }} />
        <Grid item m={4} display={'flex'} justifyContent={'end'}>
          <Button size='medium' type='submit' variant='contained' onClick={handleBobotKriteria}>
            Ubah Bobot Kriteria
          </Button>
        </Grid>
      </form> */}
    </Card>
  )
}

export default CreateKegiatanPerusahaanViews
