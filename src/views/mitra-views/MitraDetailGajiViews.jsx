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

import router from 'next/router'
import Link from '@mui/material/Link'
// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const MitraDetailGajiViews = props => {
  const [selectedYear, setSelectedYear] = useState(2023)

  const handleYearChange = event => {
    setSelectedYear(parseInt(event.target.value))
  }
  const statusObj = {
    0: { color: 'error', status: 'Overload' },
    1: { color: 'success', status: 'Available' }
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
  const [values, setValues] = useState({
    id: props.data[0].id,
    mitraNama: props.data[0].name,
    mitraNIK: props.data[0].nik,
    mitraJenisKelamin: props.data[0].jenisKelamin,
    mitraUmur: props.data[0].umur,
    mitraPendidikan: props.data[0].pendidikan,
    mitraEmail: props.data[0].email,
    mitraStatus: props.data[0].status,
    mitraTanggalLahir: props.data[0].tanggalLahir
  })

  // const [oktober, setOktober] = useState(() => {
  //   console.log(tpp)
  //   const totalGajiOktober = tpp
  //     .filter(tppRow => tppRow.pclId === values.id)
  //     .filter(tppRow => {
  //       const tppDueDate = new Date(tppRow.task.duedate)
  //       return tppDueDate.getMonth() === 9 // Oktober memiliki indeks bulan 9
  //     })
  //     .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

  //   const perusahaan = tpp
  //     .filter(tppRow => tppRow.pclId === values.id)
  //     .filter(tppRow => {
  //       const tppDueDate = new Date(tppRow.task.duedate)
  //       return tppDueDate.getMonth() === 9 // Oktober memiliki indeks bulan 9
  //     })
  //     .map(data => data.nama)

  //   const subKeg = tpp
  //     .filter(tppRow => tppRow.pclId === values.id)
  //     .filter(tppRow => {
  //       const tppDueDate = new Date(tppRow.task.duedate)
  //       return tppDueDate.getMonth() === 9 // Oktober memiliki indeks bulan 9
  //     })
  //     .reduce((uniqueItems, data) => {
  //       const existingItem = uniqueItems.find(item => item.taskId === data.taskId)

  //       if (existingItem) {
  //         existingItem.taskTotalGaji += data.gajiPcl
  //         existingItem.listPerusahaan.push(data.nama)
  //         existingItem.gajiPerusahaan.push(data.gajiPcl)
  //       } else {
  //         uniqueItems.push({
  //           nama: data.task.title,
  //           taskId: data.taskId,
  //           taskTotalGaji: data.gajiPcl,
  //
  //           listPerusahaan: [data.nama],
  //           gajiPerusahaan: [data.gajiPcl]
  //         })
  //       }

  //       return uniqueItems
  //     }, [])
  //   const totalGajiSubkeg = tpp
  //     .filter(tppRow => tppRow.pclId === values.id)
  //     .filter(tppRow => {
  //       const tppDueDate = new Date(tppRow.task.duedate)
  //       return tppDueDate.getMonth() === 9 // Oktober memiliki indeks bulan 9
  //     })
  //     .map(data => data.task.title)
  //     .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

  //   return { totalGajiOktober, perusahaan, subKeg, totalGajiSubkeg }
  // })\
  console.log(tpp)

  // const [bulanData, setBulanData] = useState(() => {
  //   const bulanData = []

  //   for (let bulan = 0; bulan < 12; bulan++) {
  //     const selectedYear = 2023 // Ganti dengan tahun yang dipilih

  //     const totalGajiBulanPCL = tpp
  //       .filter(tppRow => tppRow.pclId === values.id)
  //       .filter(tppRow => {
  //         const tppDueDate = new Date(tppRow.task.duedate)
  //         return tppDueDate.getMonth() === bulan && tppDueDate.getFullYear() === selectedYear
  //       })
  //       .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

  //     const totalGajiBulanPML = tpp
  //       .filter(tppRow => tppRow.pmlId === values.id)
  //       .filter(tppRow => {
  //         const tppDueDate = new Date(tppRow.task.duedate)
  //         return tppDueDate.getMonth() === bulan && tppDueDate.getFullYear() === selectedYear
  //       })
  //       .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)
  //     const totalGajiBulan = totalGajiBulanPCL + totalGajiBulanPML

  //     const subKeg = tpp
  //       .filter(tppRow => tppRow.pclId === values.id || tppRow.pmlId === values.id)
  //       .filter(tppRow => {
  //         const tppDueDate = new Date(tppRow.task.duedate)
  //         return tppDueDate.getMonth() === bulan && tppDueDate.getFullYear() === selectedYear
  //       })
  //       .reduce((uniqueItems, data) => {
  //         const existingItem = uniqueItems.find(item => item.taskId === data.taskId)

  //         let gajiType
  //         if (data.pclId === values.id) {
  //           gajiType = 'PCL'
  //         } else if (data.pmlId === values.id) {
  //           gajiType = 'PML'
  //         }

  //         if (existingItem) {
  //           existingItem.taskTotalGaji += gajiType === 'PCL' ? data.gajiPcl : data.gajiPml
  //           existingItem.listPerusahaan.push({
  //             nama: data.nama,
  //             nbs: data.nbs,
  //             nks: data.nks,
  //             idSls: data.idSls
  //           })
  //           existingItem.gajiPerusahaan.push({
  //             value: gajiType === 'PCL' ? data.gajiPcl : data.gajiPml,
  //             type: gajiType
  //           })
  //         } else {
  //           uniqueItems.push({
  //             nama: data.task.title,
  //             taskId: data.taskId,
  //             taskTotalGaji: gajiType === 'PCL' ? data.gajiPcl : data.gajiPml,
  //             listPerusahaan: [
  //               {
  //                 nama: data.nama,
  //                 nbs: data.nbs,
  //                 nks: data.nks,
  //                 idSls: data.idSls
  //               }
  //             ],
  //             gajiPerusahaan: [
  //               {
  //                 value: gajiType === 'PCL' ? data.gajiPcl : data.gajiPml,
  //                 type: gajiType
  //               }
  //             ]
  //           })
  //         }

  //         return uniqueItems
  //       }, [])

  //     bulanData.push({ totalGajiBulan, subKeg })
  //   }

  //   return bulanData
  // })
  const [bulanData, setBulanData] = useState([])

  useEffect(() => {
    // Di sini Anda dapat memperbarui bulanData sesuai dengan selectedYear
    const updatedBulanData = []

    for (let bulan = 0; bulan < 12; bulan++) {
      const totalGajiBulanPCL = tpp
        .filter(tppRow => tppRow.pclId === values.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          return tppDueDate.getMonth() === bulan && tppDueDate.getFullYear() === selectedYear
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

      const totalGajiBulanPML = tpp
        .filter(tppRow => tppRow.pmlId === values.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          return tppDueDate.getMonth() === bulan && tppDueDate.getFullYear() === selectedYear
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)
      const totalGajiBulan = totalGajiBulanPCL + totalGajiBulanPML

      const subKeg = tpp
        .filter(tppRow => tppRow.pclId === values.id || tppRow.pmlId === values.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          return tppDueDate.getMonth() === bulan && tppDueDate.getFullYear() === selectedYear
        })
        .reduce((uniqueItems, data) => {
          const existingItem = uniqueItems.find(item => item.taskId === data.taskId)

          let gajiType
          if (data.pclId === values.id) {
            gajiType = 'PCL'
          } else if (data.pmlId === values.id) {
            gajiType = 'PML'
          }

          if (existingItem) {
            existingItem.taskTotalGaji += gajiType === 'PCL' ? data.gajiPcl : data.gajiPml
            existingItem.listPerusahaan.push({
              nama: data.nama,
              nbs: data.nbs,
              nks: data.nks,
              idSls: data.idSls
            })
            existingItem.gajiPerusahaan.push({
              value: gajiType === 'PCL' ? data.gajiPcl : data.gajiPml,
              type: gajiType
            })
          } else {
            uniqueItems.push({
              nama: data.task.title,
              taskId: data.taskId,
              taskTotalGaji: gajiType === 'PCL' ? data.gajiPcl : data.gajiPml,
              listPerusahaan: [
                {
                  nama: data.nama,
                  nbs: data.nbs,
                  nks: data.nks,
                  idSls: data.idSls
                }
              ],
              gajiPerusahaan: [
                {
                  value: gajiType === 'PCL' ? data.gajiPcl : data.gajiPml,
                  type: gajiType
                }
              ]
            })
          }

          return uniqueItems
        }, [])
      updatedBulanData.push({ totalGajiBulan, subKeg })
    }
    setBulanData(updatedBulanData)
  }, [selectedYear])

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
            <Grid item md={12}>
              {subKegData.length > 0 ? (
                subKegData.map((subKeg, index) => (
                  <div key={index}>
                    <CardActions className='card-action-dense'>
                      <Box
                        // bgcolor={'primary.main'}
                        sx={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'start',
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
                        <Typography display={'inline'} variant={'body2'}></Typography>

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
                        {subKeg.listPerusahaan.map((perusahaan, index) => (
                          <div key={index}>
                            {perusahaan.nama ? (
                              <>
                                <Typography variant={'caption'}>Perusahaan/Dinas: {perusahaan.nama}</Typography>
                                <br></br>
                              </>
                            ) : perusahaan.idSls ? (
                              <>
                                <Typography variant={'caption'}>ID SLS: {perusahaan.idSls}</Typography>
                                <br></br>
                              </>
                            ) : (
                              <>
                                <Typography variant={'caption'}>NBS: {perusahaan.nbs}</Typography>
                                <br></br>
                                <Typography variant={'caption'}>NKS: {perusahaan.nks}</Typography>
                                <br></br>
                              </>
                            )}

                            <Typography variant={'caption'}>
                              Gaji sebagai ({subKeg.gajiPerusahaan[index].type}): Rp
                              {subKeg.gajiPerusahaan[index].value.toLocaleString('id-ID')}
                            </Typography>
                            <br />
                            <br />
                          </div>
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
    .filter(tppRow => tppRow.pclId === values.id || tppRow.pmlId === values.id)
    .filter(tppRow => {
      const tppDueDate = new Date(tppRow.task.duedate)
      return tppDueDate.getFullYear() === selectedYear
    })
    .reduce((totalGaji, tppRow) => totalGaji + (tppRow.pclId === values.id ? tppRow.gajiPcl : tppRow.gajiPml), 0)

  const totalGajiBulanNi = tpp
    .filter(tppRow => tppRow.pclId === values.id || tppRow.pmlId === values.id)
    .filter(tppRow => {
      const tppDueDate = new Date(tppRow.task.duedate)
      let sekarang = new Date() // Mendapatkan tanggal dan waktu saat ini
      sekarang.setFullYear(selectedYear)
      return tppDueDate.getMonth() === sekarang.getMonth() && tppDueDate.getFullYear() === selectedYear
    })
    .reduce((totalGaji, tppRow) => totalGaji + (tppRow.pclId === values.id ? tppRow.gajiPcl : tppRow.gajiPml), 0)

  return (
    <>
      <Card sx={{ position: 'relative' }}>
        <CardMedia sx={{ height: '6.625rem' }} image='/images/cards/background-user.png' />
        <Avatar
          alt='Robert Meyer'
          src='/images/avatars/4.png'
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
                <Typography variant='body1'>NIK</Typography>
                <Typography variant='caption'>{values.mitraNIK}</Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Nama</Typography>
                <Typography variant='caption'>{values.mitraNama}</Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Email</Typography>
                <Typography variant='caption'>{values.mitraEmail}</Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Jenis Kelamin</Typography>
                <Typography variant='caption'>{values.mitraJenisKelamin}</Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Tanggal Lahir</Typography>
                <Typography variant='caption'>
                  {new Date(values.mitraTanggalLahir).toLocaleDateString('id-ID')}
                </Typography>
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
                  <Grid item md={6} xs={6} display={'flex'} justifyContent={'start'}>
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
                          router.push(`/mitra-edit/${props.data[0].id}`)
                        }}
                        variant='contained'
                        size='medium'
                      >
                        Edit Mitra
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
      {/* <select value={selectedYear} onChange={handleYearChange}>
        <option value={2023}>2023</option>
        <option value={2024}>2024</option>
        <option value={2025}>2025</option>
      </select> */}
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

export default MitraDetailGajiViews
