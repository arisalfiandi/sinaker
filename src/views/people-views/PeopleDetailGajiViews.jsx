// ** React Imports
import { useState, useEffect } from 'react'
// next
import { useRouter } from 'next/dist/client/router'
// ** MUI Imports
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import AvatarGroup from '@mui/material/AvatarGroup'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import CardActions from '@mui/material/CardActions'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'

import Link from '@mui/material/Link'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const PeopleDetailGajiViews = props => {
  const [selectedYear, setSelectedYear] = useState(2023)

  const handleYearChange = event => {
    setSelectedYear(parseInt(event.target.value))
  }
  const statusObj = {
    0: { color: 'error', status: 'Overload' },
    1: { color: 'success', status: 'Available' }
  }

  const jenisFungsi = {
    2: { bagFungsi: 'Bagian', color: 'warning' },
    3: { bagFungsi: 'Statistik Sosial', color: 'warning' },
    4: { bagFungsi: 'Statistik Produksi', color: 'warning' },
    5: { bagFungsi: 'Statistik Distribusi', color: 'warning' },
    6: { bagFungsi: 'Neraca Wilayah dan Analisis Statistik', color: 'warning' },
    7: { bagFungsi: 'Integrasi Pengolahan dan Diseminasi Statistik', color: 'warning' }
  }

  const namaBulan = {
    0: { n: 'Januari', status: 'Overload' },
    1: { n: 'Februari', status: 'Available' },
    2: { n: 'Maret', status: 'Overload' },
    3: { n: 'April', status: 'Available' },
    4: { n: 'Mei', status: 'Overload' },
    5: { n: 'Juni', status: 'Available' },
    6: { n: 'Juli', status: 'Overload' },
    7: { n: 'Agustus', status: 'Available' },
    8: { n: 'September', status: 'Overload' },
    9: { n: 'Oktober', status: 'Available' },
    10: { n: 'November', status: 'Overload' },
    11: { n: 'Desember', status: 'Available' }
  }

  const namaBulanArr = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ]
  const router = useRouter()
  const [tpp, setTpp] = useState(props.dataTpp)
  console.log(props.data)
  const [values, setValues] = useState({
    id: props.data[0].id,
    pegawaiNama: props.data[0].name,
    pegawaiNIK: props.data[0].nip,
    pegawaiJenisKelamin: props.data[0].fungsi,
    pegawaiUmur: props.data[0].name,
    pegawaiPendidikan: props.data[0].name,
    pegawaiEmail: props.data[0].email,
    pegawaiStatus: props.data[0].name,
    pegawaiTanggalLahir: props.data[0].fungsi
  })

  const [bulanData, setBulanData] = useState([])

  useEffect(() => {
    // Di sini Anda dapat memperbarui bulanData sesuai dengan selectedYear
    const updatedBulanData = []

    for (let bulan = 0; bulan < 12; bulan++) {
      const totalGajiBulan = tpp
        .filter(tppRow => tppRow.pmlId === values.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          return tppDueDate.getMonth() === bulan && tppDueDate.getFullYear() === selectedYear
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

      const subKeg = tpp
        .filter(tppRow => tppRow.pmlId === values.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          return tppDueDate.getMonth() === bulan && tppDueDate.getFullYear() === selectedYear
        })
        .reduce((uniqueItems, data) => {
          const existingItem = uniqueItems.find(item => item.taskId === data.taskId)

          if (existingItem) {
            existingItem.taskTotalGaji += data.gajiPml
            existingItem.listPerusahaan.push(data.nama)
            existingItem.gajiPerusahaan.push(data.gajiPml)
          } else {
            uniqueItems.push({
              nama: data.task.title,
              taskId: data.taskId,
              taskTotalGaji: data.gajiPml,
              listPerusahaan: [data.nama],
              gajiPerusahaan: [data.gajiPml]
            })
          }

          return uniqueItems
        }, [])

      updatedBulanData.push({ totalGajiBulan, subKeg })
    }
    setBulanData(updatedBulanData)
  }, [selectedYear])

  // const [bulanData, setBulanData] = useState(() => {
  //   const bulanData = []

  //   for (let bulan = 0; bulan < 12; bulan++) {
  //     const totalGajiBulan = tpp
  //       .filter(tppRow => tppRow.pmlId === values.id)
  //       .filter(tppRow => {
  //         const tppDueDate = new Date(tppRow.task.duedate)
  //         return tppDueDate.getMonth() === bulan
  //       })
  //       .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

  //     const subKeg = tpp
  //       .filter(tppRow => tppRow.pmlId === values.id)
  //       .filter(tppRow => {
  //         const tppDueDate = new Date(tppRow.task.duedate)
  //         return tppDueDate.getMonth() === bulan
  //       })
  //       .reduce((uniqueItems, data) => {
  //         const existingItem = uniqueItems.find(item => item.taskId === data.taskId)

  //         if (existingItem) {
  //           existingItem.taskTotalGaji += data.gajiPml
  //           existingItem.listPerusahaan.push(data.nama)
  //           existingItem.gajiPerusahaan.push(data.gajiPml)
  //         } else {
  //           uniqueItems.push({
  //             nama: data.task.title,
  //             taskId: data.taskId,
  //             taskTotalGaji: data.gajiPml,
  //             listPerusahaan: [data.nama],
  //             gajiPerusahaan: [data.gajiPml]
  //           })
  //         }

  //         return uniqueItems
  //       }, [])

  //     bulanData.push({ totalGajiBulan, subKeg })
  //   }

  //   return bulanData
  // })

  function BulanCard({ namaBulan, totalGaji, subKegData }) {
    const [collapseStates, setCollapseStates] = useState(subKegData.map(() => false))

    const handleClick = index => {
      const newCollapseStates = [...collapseStates]
      newCollapseStates[index] = !newCollapseStates[index]
      setCollapseStates(newCollapseStates)
    }

    return (
      <Grid item md={4} xs={12}>
        <Card>
          <CardMedia sx={{ height: '0.5rem' }} image='/images/cards/rec.png' />
          <CardContent>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              {namaBulan}
            </Typography>
            <Typography textAlign={'end'} variant={'body1'}>
              Gaji Bulanan :{' '}
              <span style={{ fontWeight: 500, color: `${totalGaji < 3000000 ? '#804BDF' : '#FF6166'}` }}>
                {' '}
                Rp{totalGaji.toLocaleString('id-ID')}
              </span>
            </Typography>
            <Divider sx={{ margin: 0 }} />
          </CardContent>
          <Grid container sx={{ height: 150, overflowY: 'auto' }}>
            <Grid item md={12} xs={12}>
              {subKegData.length > 0 ? (
                subKegData.map((subKeg, index) => (
                  <div key={index}>
                    <CardActions className='card-action-dense'>
                      <Box
                        // bgcolor={'primary.main'}
                        sx={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography display={'inline'} variant={'body2'}>
                          <Link
                            onClick={async e => {
                              router.push(`/task-detail/${subKeg.taskId}`)
                            }}
                            sx={{ color: '#777B82', textDecoration: 'underline', cursor: 'pointer' }}
                          >
                            {subKeg.nama}
                          </Link>
                          : Rp
                          {subKeg.taskTotalGaji.toLocaleString('id-ID')}
                        </Typography>

                        <IconButton size='small' onClick={() => handleClick(index)}>
                          {collapseStates[index] ? (
                            <ChevronUp sx={{ fontSize: '1.875rem' }} />
                          ) : (
                            <ChevronDown sx={{ fontSize: '1.875rem' }} />
                          )}
                        </IconButton>
                      </Box>
                    </CardActions>
                    <Collapse in={collapseStates[index]}>
                      <CardContent>
                        {subKeg.listPerusahaan.map((nama, index) => (
                          <>
                            <Typography key={nama} variant={'caption'}>
                              Perusahaan: {nama}
                            </Typography>
                            <br></br>
                            <Typography key={nama} variant={'caption'}>
                              Gaji : Rp{subKeg.gajiPerusahaan[index].toLocaleString('id-ID')}
                            </Typography>
                            <br></br>
                            <br></br>
                          </>
                        ))}
                      </CardContent>
                      <Divider sx={{ margin: 0 }} />
                    </Collapse>
                  </div>
                ))
              ) : (
                <>
                  <Grid container spacing={1}>
                    <Grid item md={12}>
                      <Box height={120} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Typography variant={'caption'} color={'secondary'}>
                          {' '}
                          Available!
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Card>
      </Grid>
    )
  }
  const totalGaji = tpp
    .filter(tppRow => tppRow.pmlId === values.id)
    .filter(tppRow => {
      const tppDueDate = new Date(tppRow.task.duedate)
      return tppDueDate.getFullYear() === selectedYear
    })
    .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

  const totalGajiBulanNi = tpp
    .filter(tppRow => tppRow.pmlId === values.id)
    .filter(tppRow => {
      const tppDueDate = new Date(tppRow.task.duedate)
      let sekarang = new Date() // Mendapatkan tanggal dan waktu saat ini
      sekarang.setFullYear(selectedYear)
      return tppDueDate.getMonth() === sekarang.getMonth() && tppDueDate.getFullYear() === selectedYear
    })
    .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)
  const angkaRandom = Math.floor(Math.random() * 7) + 1
  return (
    <>
      <Card sx={{ position: 'relative' }}>
        <CardMedia sx={{ height: '6.625rem' }} image='/images/cards/background-user.png' />
        <Avatar
          alt='Robert Meyer'
          src='/images/avatars/5.png'
          sx={{
            width: 75,
            height: 75,
            left: '1.313rem',
            top: '4.28125rem',
            position: 'absolute',
            border: theme => `0.25rem solid ${theme.palette.common.white}`
          }}
        />
        <CardContent>
          <Box
            // bgcolor={'success.main'}
            sx={{
              mt: 5.75,
              mb: 1.75,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Grid container spacing={6}>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>NIP</Typography>
                <Typography variant='caption'>{values.pegawaiNIK}</Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Nama</Typography>
                <Typography variant='caption'>{values.pegawaiNama}</Typography>
              </Grid>
              <Grid item md={3} xs={6}>
                <Typography variant='body1'>Email</Typography>
                <Typography variant='caption'>{values.pegawaiEmail}</Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Fungsi</Typography>
                <Typography variant='caption'>{jenisFungsi[values.pegawaiJenisKelamin].bagFungsi}</Typography>
              </Grid>

              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Status Bulan Ini</Typography>
                <Chip
                  label={statusObj[totalGajiBulanNi < 3000000 ? 1 : 0].status}
                  color={statusObj[totalGajiBulanNi < 3000000 ? 1 : 0].color}
                  sx={{
                    height: 24,
                    fontSize: '0.75rem',
                    width: 100,
                    textTransform: 'capitalize',
                    '& .MuiChip-label': { fontWeight: 500 }
                  }}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Divider sx={{ marginTop: 1.5, marginBottom: 1.75 }} />
              </Grid>
              <Grid item md={12} xs={12}>
                <Grid container>
                  <Grid item md={6} xs={6}>
                    <Typography display='inline' variant='h6'>
                      Total Gaji : Rp
                    </Typography>
                    <Typography
                      display='inline'
                      sx={{ marginRight: 30, fontWeight: 500, fontSize: '1.2rem !important', textAlign: 'center' }}
                    >
                      {`${totalGaji.toLocaleString('id-ID')}`}
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <Box display='flex' justifyContent='flex-end'>
                      <Button
                        onClick={e => {
                          e.preventDefault()
                          router.push(`/people-edit/${props.data[0].id}`)
                        }}
                        variant='contained'
                        size='medium'
                      >
                        Edit pegawai
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      <Grid mt={3} item xs={12} md={12} justifyContent={'end'} display={'flex'}>
        <Card sx={{ padding: 3 }}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id='demo-simple-select-helper-label'>Tahun</InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={selectedYear}
              label='Tahun'
              size={'small'}
              onChange={handleYearChange}
            >
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2024}>2024</MenuItem>
              <MenuItem value={2025}>2025</MenuItem>
            </Select>
          </FormControl>
        </Card>
      </Grid>
      <Grid container spacing={4} mt={5}>
        {bulanData.map((data, index) => (
          <BulanCard
            key={index}
            namaBulan={namaBulan[index].n}
            totalGaji={data.totalGajiBulan}
            subKegData={data.subKeg}
          />
        ))}
      </Grid>
      {/* <Grid container spacing={4} mt={5}>
        <Grid item md={3} xs={6}>
          <Card>
            <CardMedia sx={{ height: '0.5rem' }} image='/images/cards/paper-boat.png' />
            <CardContent>
              <Typography variant='h5' sx={{ marginBottom: 2 }}>
                Oktober
              </Typography>
              <Divider sx={{ margin: 0 }} />
              <p>Total Gaji: Rp{oktober.totalGajiOktober.toLocaleString('id-ID')}</p>

              {oktober.subKeg.map(subKeg => (
                <>
                  <Typography key={subKeg.taskId}>
                    {subKeg.nama}: Rp{subKeg.taskTotalGaji.toLocaleString('id-ID')}
                  </Typography>
                  <ul>
                    {subKeg.listPerusahaan.map((nama, index) => (
                      <li key={nama}>
                        <p>Nama Perusahaan: {nama}</p>
                        <p>Gaji Perusahaan: {subKeg.gajiPerusahaan[index]}</p>
                      </li>
                    ))}
                  </ul>
                </>
              ))}
            </CardContent>
            <CardActions className='card-action-dense'>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Button onClick={handleClick}>Details</Button>
                <IconButton size='small' onClick={handleClick}>
                  {collapse ? (
                    <ChevronUp sx={{ fontSize: '1.875rem' }} />
                  ) : (
                    <ChevronDown sx={{ fontSize: '1.875rem' }} />
                  )}
                </IconButton>
              </Box>
            </CardActions>
            <Collapse in={collapse}>
              <Divider sx={{ margin: 0 }} />
              <CardContent>
                <Typography variant='body2'>
                  I&prime;m a thing. But, like most politicians, he promised more than he could deliver. You won&prime;t
                  have time for sleeping, soldier, not with all the bed making you&prime;ll be doing. Then we&prime;ll
                  go with that data file! Hey, you add a one and two zeros to that or we walk! You&prime;re going to do
                  his laundry? I&prime;ve got to find a way to escape.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Grid> */}
    </>
  )
}

export default PeopleDetailGajiViews
