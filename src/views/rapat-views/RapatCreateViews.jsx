// react import
import { useState, forwardRef, useEffect, useRef } from 'react'

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

// usesession
import { useSession } from 'next-auth/react'

// Mui Import
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

import { useRouter } from 'next/dist/client/router'
import Autocomplete from '@mui/material/Autocomplete'

import TableAddParticipant from 'src/views/tables/TableAddParticipant'
import DragAndDrop from 'src/views/form-layouts/DragAndDrop'

// datepicker
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// export pdf undangan
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const RapatCreateViews = props => {
  const pdfRef = useRef()
  const pdfRef2 = useRef()

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTimeS, setSelectedTimeS] = useState(new Date())
  const [selectedTimeE, setSelectedTimeE] = useState(new Date())
  const session = useSession()
  const [timKerja, setTimKerja] = useState(props.dataTim)
  const [dataUser, setDataUser] = useState(props.data)
  const [isiAll, setIsiAll] = useState('0')
  const [values, setValues] = useState({
    namaRapat: '',
    nomor: '',
    perihal: '',
    lampiran: '',
    ditujukan: '',
    tempatRapat: '',
    deskRapat:
      ' .... , bersama ini kami mengundang Bapak/Ibu untuk menghadiri rapat perihal tersebut diatas yang akan dilaksanakan pada:',
    kegAnggotaId: '',
    kegAnggota: []
  })

  const [valuesKetua, setValuesKetua] = useState({
    kegTim: '',
    kegKetuaId: '',
    pesertaRapat: 7
  })

  let button
  button = (
    <>
      {/* <input accept='image/*' style={{ display: 'none' }} id='raised-button-file' multiple type='file' />
      <label htmlFor='raised-button-file'>
        <Button onClick={handleSubmitFile} size='medium' sx={{ mr: 2 }} variant='contained' component='span'>
          Browse
        </Button>
      </label> */}
      {/* <DragAndDrop dataMeet={values}></DragAndDrop> */}
    </>
  )

  const UndanganRapat = () => {
    const Img = styled('img')(({ theme }) => ({ height: 110 }))
    return (
      <>
        <Paper sx={{ display: 'flex' }}>
          <Grid container sx={{ height: 800 }}>
            <Grid item xs={12}>
              <Grid ref={pdfRef} container sx={{ height: 1000 }}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                  <Grid container>
                    <Grid sx={{ height: 110 }} item xs={1}></Grid>
                    <Grid
                      sx={{
                        height: 110,

                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      item
                      xs={3}
                    >
                      <Img alt='BPS Logo' src='/images/logos/BPS1.png' sx={{ width: '70%', height: 'auto' }} />
                    </Grid>
                    <Grid sx={{ height: 110 }} item xs={8}>
                      <Grid container>
                        <Grid sx={{}} item xs={12}>
                          <Typography
                            sx={{
                              fontSize: 24,
                              color: 'black',
                              fontWeight: 900,
                              fontStyle: 'italic',
                              fontFamily: 'Times New Roman'
                            }}
                          >
                            BADAN PUSAT STATISTIK
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 24,
                              color: 'black',
                              fontWeight: 900,
                              fontStyle: 'italic',
                              fontFamily: 'Times New Roman'
                            }}
                          >
                            KABUPATEN BOGOR
                          </Typography>
                          <Typography sx={{ fontSize: 12, color: 'black', fontFamily: 'Times New Roman' }}>
                            Jl.Bersih, Komplek Perkantoran Pemda Kabupaten Bogor, Cibinong
                          </Typography>
                          <Typography sx={{ fontSize: 12, color: 'black', fontFamily: 'Times New Roman' }}>
                            Telp. 021 8751070, website:http://bogorkab.go.id, email : bps3201@bps.go.id
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid sx={{ height: 5 }} item xs={12}></Grid>
                    <Grid sx={{ height: 15 }} item xs={1}></Grid>
                    <Grid sx={{ height: 2, backgroundColor: 'black' }} item xs={11}></Grid>

                    <Grid sx={{ height: 20 }} item xs={12}></Grid>
                    {/* nomor dan perihal */}
                    <Grid sx={{ height: 100 }} item xs={12}>
                      <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={2}>
                          <Typography color={'black'} variant={'body2'}>
                            Nomor
                          </Typography>
                          <Typography color={'black'} variant={'body2'}>
                            Lampiran
                          </Typography>
                          <Typography color={'black'} variant={'body2'}>
                            Perihal
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography color={'black'} variant={'body2'}>
                            {/* : B-406/32010/PL.200/{(new Date().getMonth() + 1).toString().padStart(2, '0')}/
                            {new Date().getFullYear()} */}
                            : {values.nomor}
                            {/* menambahkan karakter tertentu ke awal sebuah string sehingga panjang total string tersebut menjadi setidaknya sama dengan panjang target yang ditentukan.
                             Jika panjang string awal sudah mencapai atau melebihi panjang target, maka metode padStart tidak melakukan apa pun. */}
                          </Typography>
                          <Typography color={'black'} variant={'body2'}>
                            : {values.lampiran}
                          </Typography>
                          <Typography color={'black'} variant={'body2'}>
                            {/* : Undangan {values.namaRapat} */}: {values.perihal}
                          </Typography>
                        </Grid>
                        <Grid display={'flex'} justifyContent={'end'} item xs={2}>
                          <Typography color={'black'} variant={'body2'}>
                            {/* Bogor, 16 Maret 2024 */}
                            Cibinong,{' '}
                            {new Date().toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </Typography>
                        </Grid>
                        <Grid display={'flex'} justifyContent={'end'} item xs={1}></Grid>
                      </Grid>
                    </Grid>
                    {/* isi */}
                    <Grid sx={{ height: 400 }} item xs={12}>
                      <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={11}>
                          <Typography color={'black'} variant={'body2'}>
                            Yth.
                          </Typography>
                          <Typography color={'black'} variant={'body2'}>
                            {values.ditujukan}
                          </Typography>
                          <Typography color={'black'} variant={'body2'}>
                            Di
                          </Typography>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={11}>
                          <Typography sx={{ marginLeft: 5 }} color={'black'} variant={'body2'}>
                            Cibinong
                          </Typography>
                        </Grid>
                        <Grid item xs={12} height={20}></Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                          <Typography sx={{ marginLeft: 10 }} color={'black'} variant={'body2'}>
                            {values.deskRapat}
                          </Typography>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={12} height={20}></Grid>
                        {/* haritanggal rapat, dll */}
                        <Grid item xs={2}></Grid>
                        <Grid item xs={9}>
                          <Grid container>
                            <Grid item xs={3}>
                              <Typography color={'black'} variant={'body2'}>
                                Hari
                              </Typography>
                              <Typography color={'black'} variant={'body2'}>
                                Tanggal
                              </Typography>
                              <Typography color={'black'} variant={'body2'}>
                                Waktu
                              </Typography>

                              <Typography color={'black'} variant={'body2'}>
                                Tempat
                              </Typography>
                            </Grid>
                            <Grid item xs={9}>
                              <Typography color={'black'} variant={'body2'}>
                                :{' '}
                                {new Date(selectedDate).toLocaleDateString('id-ID', {
                                  weekday: 'long'
                                })}
                              </Typography>
                              <Typography color={'black'} variant={'body2'}>
                                :{' '}
                                {new Date(selectedDate).toLocaleDateString('id-ID', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </Typography>
                              <Typography color={'black'} variant={'body2'}>
                                :{' '}
                                {new Date(selectedTimeS).toLocaleTimeString('id-ID', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}{' '}
                                -
                                {new Date(selectedTimeE).toLocaleTimeString('id-ID', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}{' '}
                                WIB
                              </Typography>

                              <Typography color={'black'} variant={'body2'}>
                                : {values.tempatRapat}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        {/* Penutup */}
                        <Grid item xs={12} height={20}></Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                          <Typography sx={{ marginLeft: 10 }} color={'black'} variant={'body2'}>
                            Demikian atas perhatian dan kerja samanya, diucapkan terima kasih.
                          </Typography>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        {/* ttd */}
                        <Grid item xs={12} height={20}></Grid>
                        <Grid item xs={12} height={20}></Grid>
                        <Grid item xs={12} height={20}></Grid>
                        <Grid container>
                          <Grid item xs={8}></Grid>
                          <Grid item xs={3}>
                            <Typography textAlign={'center'} color={'black'} variant={'body2'}>
                              Kepala Badan Pusat Statistik
                            </Typography>
                            <Typography textAlign={'center'} color={'black'} variant={'body2'}>
                              Kabupaten Bogor
                            </Typography>
                            <Grid mt={5} height={50} container>
                              {/* <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                                {values.status === 'disetujui' ? (
                                  <>
                                    <img alt='Stumptown Roasters' src='/images/logos/e-ttd.png' />
                                  </>
                                ) : (
                                  ''
                                )}
                              </Grid> */}
                            </Grid>
                            <Typography mt={5} textAlign={'center'} color={'black'} variant={'body2'}>
                              Dr. Daryanto, S.ST, M.M
                            </Typography>
                          </Grid>
                          <Grid item xs={1}></Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* <Grid sx={{ height: 150 }} item xs={12} bgcolor={'success.dark'}></Grid> */}
                  </Grid>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </>
    )
  }

  const LampiranRapat = () => {
    const Img = styled('img')(({ theme }) => ({ height: 110 }))
    const styles = {
      tableHeader: {
        border: '1px solid black',
        backgroundColor: '#E2EFD9',
        padding: '8px',
        textAlign: 'center',
        color: 'black',
        lineHeight: '1.5' // Mengatur tinggi baris untuk header
      },
      tableNo: {
        border: '1px solid black',
        padding: '8px',
        textAlign: 'center',
        fontSize: 14,
        backgroundColor: '#E2EFD9',
        color: 'black',
        lineHeight: '0.5' // Mengatur tinggi baris untuk header
      },
      tableCell: {
        border: '1px solid black',
        padding: '8px',
        textAlign: 'left',
        fontSize: 14,
        color: 'black',
        lineHeight: '0.5' // Mengatur tinggi baris untuk sel
      },
      tableCellNo: {
        border: '1px solid black',
        padding: '8px',
        textAlign: 'center',
        fontSize: 14,
        color: 'black',
        lineHeight: '0.5' // Mengatur tinggi baris untuk sel
      }
    }

    return (
      <>
        <Paper
          sx={{
            display: 'flex',
            backgroundColor: '#FFFFFF',
            paddingTop: 10,
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' // Atur shadow dan blur di sini
          }}
        >
          <Grid container sx={{ height: 800 }}>
            <Grid item xs={12}>
              <Grid ref={pdfRef2} container sx={{ height: 1000 }}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                  <Grid container>
                    <Grid sx={{ height: 110 }} item xs={1}></Grid>
                    <Grid
                      sx={{
                        height: 110,

                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      item
                      xs={3}
                    >
                      <Img alt='BPS Logo' src='/images/logos/BPS1.png' sx={{ width: '70%', height: 'auto' }} />
                    </Grid>
                    <Grid sx={{ height: 110 }} item xs={8}>
                      <Grid container>
                        <Grid sx={{}} item xs={12}>
                          <Typography
                            sx={{
                              fontSize: 24,
                              color: 'black',
                              fontWeight: 900,
                              fontStyle: 'italic',
                              fontFamily: 'Times New Roman'
                            }}
                          >
                            BADAN PUSAT STATISTIK
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 24,
                              color: 'black',
                              fontWeight: 900,
                              fontStyle: 'italic',
                              fontFamily: 'Times New Roman'
                            }}
                          >
                            KABUPATEN BOGOR
                          </Typography>
                          <Typography sx={{ fontSize: 12, color: 'black', fontFamily: 'Times New Roman' }}>
                            Jl.Bersih, Komplek Perkantoran Pemda Kabupaten Bogor, Cibinong
                          </Typography>
                          <Typography sx={{ fontSize: 12, color: 'black', fontFamily: 'Times New Roman' }}>
                            Telp. 021 8751070, website:http://bogorkab.go.id, email : bps3201@bps.go.id
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid sx={{ height: 5 }} item xs={12}></Grid>
                    <Grid sx={{ height: 15 }} item xs={1}></Grid>
                    <Grid sx={{ height: 2, backgroundColor: 'black' }} item xs={11}></Grid>
                    <Grid sx={{ height: 100 }} item xs={12}>
                      <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={2}>
                          <Typography color={'black'} variant={'body2'}>
                            Nomor
                          </Typography>
                          <Typography color={'black'} variant={'body2'}>
                            Lampiran
                          </Typography>
                          <Typography color={'black'} variant={'body2'}>
                            Tanggal
                          </Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <Typography color={'black'} variant={'body2'}>
                            {/* : B-406/32010/PL.200/{(new Date().getMonth() + 1).toString().padStart(2, '0')}/
                            {new Date().getFullYear()} */}
                            : {values.nomor}
                          </Typography>
                          <Typography color={'black'} variant={'body2'}>
                            : {values.lampiran}
                          </Typography>
                          <Typography color={'black'} variant={'body2'}>
                            :{' '}
                            {new Date().toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </Typography>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid mt={10} item xs={8}>
                          <Typography variant='body1' sx={{ marginBottom: 3.5, color: 'black', fontWeight: 900 }}>
                            Daftar Peserta Rapat {values.namaRapat}
                          </Typography>
                          <div>
                            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                              <thead>
                                <tr>
                                  <th style={styles.tableHeader}>No</th>
                                  <th style={styles.tableHeader}>Nama</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td style={styles.tableNo}>(1)</td>
                                  <td style={styles.tableNo}>(2)</td>
                                </tr>
                              </tbody>
                              <tbody>
                                {values.kegAnggota.map((row, index) => (
                                  <tr key={index}>
                                    <td style={styles.tableCellNo}>{index + 1}</td>
                                    <td style={styles.tableCell}>{row}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* <Grid sx={{ height: 150 }} item xs={12} bgcolor={'success.dark'}></Grid> */}
                  </Grid>
                </Grid>
                <Grid item xs={5}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </>
    )
  }

  const handleTempatRapat = e => {
    setValues(values => ({
      ...values,
      tempatRapat: e.target.value
    }))
  }

  const handlePJ = event => {
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      kegTim: event.target.value // Perbarui nilai kegRentang
    }))
  }

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
  }
  const kalimatTetap = ' kami mengundang untuk menghadiri rapat pada:'
  useEffect(() => {
    // Pada saat komponen pertama kali dirender,
    // pastikan deskRapat diisi dengan kalimat tetap
    setValues({
      ...values,
      deskRapat: ', kami mengundang untuk menghadiri rapat pada:'
    })
  }, [])
  const handleDateChange = date => {
    setSelectedDate(date)
  }
  const handleTimeChangeS = date => {
    setSelectedTimeS(date)
  }
  const handleTimeChangeE = date => {
    setSelectedTimeE(date)
  }

  // buat nyimpen di [values] dari input pilih tim kerja sama anggota tim (intinya handle tim dan anggotanya)
  useEffect(() => {
    const dataAnggota = {}
    const dataAnggotaId = []
    const ketuaTimId = 0

    timKerja.map(data => {
      data.id === values.kegTim ? (dataAnggota = data.timKerjaPegawai) : 0
    })

    timKerja.map(data => {
      data.id === values.kegTim ? (ketuaTimId = data.ketuaTim) : 0
    })

    if (Object.keys(dataAnggota).length > 0) {
      dataAnggota.map(member => {
        dataAnggotaId.push(member.userId)
      })
    }

    const userNames = dataUser
      .map(pengguna => (dataAnggotaId.includes(parseInt(pengguna.id)) ? pengguna.name : null))
      .filter(id => id !== null)

    // const userIds = dataUser
    //   .map(pengguna => (dataAnggotaId.includes(parseInt(pengguna.id)) ? pengguna.id : null))
    //   .filter(id => id !== null)

    setValues({ ...values, kegAnggota: userNames, kegKetuaId: ketuaTimId })
  }, [values.kegTim])

  // const res = await axios.post('/rapat', {
  //   namaRapat: values.namaRapat,
  //   meetDate: selectedDate,
  //   startTime: selectedTimeS,
  //   endTime: selectedTimeE,
  //   duration: selectedTimeE - selectedTimeS,
  //   tempatRapat: values.tempatRapat,
  //   description: values.deskRapat,
  //   createdById: session.data.uid,
  //   pesertaRapatId: values.kegAnggotaId,
  //   nomor: values.nomor,
  //   lampiran: values.lampiran,
  //   perihal: values.perihal,
  //   ditujukan: values.ditujukan
  // })
  // masih nyambung sama atas, input autocomplete cuma handle berdasar dropdown tim kerja,
  // disini diatur lagi kalo misal ada inputan pegawai lain di luar anggota tim
  useEffect(() => {
    const tmpId = []
    const testId = dataUser.map(itemB => {
      // Periksa apakah nama pada itemB ada di arrayA
      if (values.kegAnggota.includes(itemB.name)) {
        // klo ad push ngab
        tmpId.push(itemB.id)
      }
    })

    setValues({ ...values, kegAnggotaId: tmpId })
  }, [values.kegAnggota])
  const router = useRouter()

  const handleCreateRapat1 = async e => {
    e.preventDefault()
    const input = pdfRef.current
    try {
      if (isiAll == '1') {
        html2canvas(input).then(canvas => {
          const imgData = canvas.toDataURL('image/png')
          const pdf = new jsPDF('p', 'mm', 'a4', true)
          const pdfWidth = pdf.internal.pageSize.getWidth() + 1
          const pdfHeight = pdf.internal.pageSize.getHeight()
          const imgWidth = canvas.width + 100
          const imgHeight = canvas.height + 100
          const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
          const imgX = (pdfWidth - imgWidth * ratio) / 2
          const imgY = 30
          pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
          // pdf.save('invoice.pdf')
          // Convert PDF to Blob
          const blob = pdf.output('blob')
          const file = new File([blob], 'invoice.pdf', { type: 'application/pdf' })

          // Create FormData and append file
          const formData = new FormData()

          formData.append('namaRapat', values.namaRapat)
          formData.append('meetDate', selectedDate)
          formData.append('startTime', selectedTimeS)
          formData.append('endTime', selectedTimeE)
          formData.append('duration', selectedTimeE - selectedTimeS)
          formData.append('tempatRapat', values.tempatRapat)
          formData.append('description', values.deskRapat)
          formData.append('createdById', session.data.uid)
          formData.append('pesertaRapatId', JSON.stringify(values.kegAnggotaId)) // Array needs to be stringified
          formData.append('nomor', values.nomor)
          formData.append('lampiran', values.lampiran)
          formData.append('perihal', values.perihal)
          formData.append('ditujukan', values.ditujukan)

          // Assuming formData is your file input
          formData.append('file', file) // Ensure 'file' corresponds to the name attribute in your input

          // Upload the PDF file to the server
          axios
            .post('/rapat-create-rapat-undangan', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(res => {
              console.log(res.data)
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Rapat berhasil diajukan',
                showConfirmButton: false,
                timer: 1000,
                width: 300
              }).then(router.push('/rapat-create'))

              setValues({
                namaRapat: '',
                nomor: '',
                perihal: '',
                ditujukan: '',
                lampiran: '',
                tempatRapat: '',
                deskRapat: '-',
                pesertaRapat: 7,
                kegAnggota: []
              })

              setSelectedDate(new Date())
              setSelectedTimeS(new Date())
              setSelectedTimeE(new Date())
            })
            .catch(err => {
              console.log(err)
              Swal.fire({
                title: 'Rapat gagal diajukan',
                text: err,
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK'
              })
            })
        })
      } else {
        Swal.fire({
          title: 'Form belum lengkap',
          text: 'Pastikan semua field telah terisi',
          icon: 'warning',
          confirmButtonColor: 'warning.main',
          confirmButtonText: 'OK'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Rapat gagal diajukan',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }
  const handleCreateRapat = async e => {
    e.preventDefault()
    const input1 = pdfRef.current
    const input2 = pdfRef2.current // Menambahkan referensi untuk input2

    try {
      if (isiAll === '1') {
        const canvas1 = await html2canvas(input1, { scale: 2 })
        const imgData1 = canvas1.toDataURL('image/png')
        const pdf = new jsPDF('p', 'mm', 'a4', true)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()

        const addImageToPdf = (canvas, imgData) => {
          const imgWidth = canvas.width / 2
          const imgHeight = canvas.height / 2
          const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
          // const imgX = (pdfWidth - imgWidth * ratio) / 2
          const imgX = (pdfWidth - imgWidth * ratio) / 2
          const imgY = 10
          pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
        }

        // Menambahkan gambar pertama ke halaman pertama
        addImageToPdf(canvas1, imgData1)

        if (values.ditujukan != 'Seluruh Pegawai BPS Kabupaten Bogor') {
          // Membuat canvas untuk input2
          const canvas2 = await html2canvas(input2, { scale: 2 })
          const imgData2 = canvas2.toDataURL('image/png')

          // Menambahkan halaman baru dan gambar kedua
          pdf.addPage()
          addImageToPdf(canvas2, imgData2)
        }

        // Mengonversi PDF ke Blob
        const blob = pdf.output('blob')
        const file = new File([blob], `${values.namaRapat}`, { type: 'application/pdf' })

        // Membuat FormData dan menambahkan file
        const formData = new FormData()

        formData.append('namaRapat', values.namaRapat)
        formData.append('meetDate', selectedDate)
        formData.append('startTime', selectedTimeS)
        formData.append('endTime', selectedTimeE)
        formData.append('duration', selectedTimeE - selectedTimeS)
        formData.append('tempatRapat', values.tempatRapat)
        formData.append('description', values.deskRapat)
        formData.append('createdById', session.data.uid)
        formData.append('pesertaRapatId', JSON.stringify(values.kegAnggotaId)) // Array needs to be stringified
        formData.append('nomor', values.nomor)
        formData.append('lampiran', values.lampiran)
        formData.append('perihal', values.perihal)
        formData.append('ditujukan', values.ditujukan)
        formData.append('file', file) // Pastikan 'file' sesuai dengan atribut name di input Anda

        // Mengunggah file PDF ke server
        axios
          .post('/rapat-create-rapat-undangan', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(res => {
            console.log(res.data)
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Rapat berhasil diajukan',
              showConfirmButton: false,
              timer: 1000,
              width: 300
            }).then(router.push('/rapat-create'))
            setValues({
              namaRapat: '',
              nomor: '',
              perihal: '',
              ditujukan: '',
              lampiran: '',
              tempatRapat: '',
              deskRapat: '-',
              pesertaRapat: 7,
              kegAnggota: []
            })

            setSelectedDate(new Date())
            setSelectedTimeS(new Date())
            setSelectedTimeE(new Date())
          })
          .catch(err => {
            console.log(err)
            Swal.fire({
              title: 'Rapat gagal diajukan',
              text: err,
              icon: 'error',
              confirmButtonColor: '#d33',
              confirmButtonText: 'OK'
            })
          })
      } else {
        console.log('isikan')
        Swal.fire({
          title: 'Form belum lengkap',
          text: 'Pastikan semua field telah terisi',
          icon: 'warning',
          confirmButtonColor: 'warning.main',
          confirmButtonText: 'OK'
        })
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Rapat gagal diajukan',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  // cek input isi all
  useEffect(() => {
    const allFilled = Object.values(values).every(
      value =>
        (typeof value === 'string' && value.trim() !== '') ||
        (Array.isArray(value) && value.length > 0) ||
        (typeof value === 'number' && value !== null)
    )
    setIsiAll(allFilled ? '1' : '0')
  }, [values])

  const handleCreate = e => {
    Swal.fire({
      text: 'Ajukan Rapat?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(result => {
      if (result.isConfirmed) {
        router.push('/project-list')
      } else {
        router.push('/create-project')
      }
    })
  }
  const CustomInputDateStart = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Hari/Tanggal Rapat' autoComplete='on' />
  })

  const CustomInputTimeStart = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Waktu Mulai' autoComplete='off' />
  })

  const CustomInputTimeEnd = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Waktu Selesai' autoComplete='off' />
  })

  console.log(values.kegAnggota)

  return (
    <>
      <Card>
        <form>
          <Grid container spacing={5} sx={{ padding: '32px' }}>
            <Grid item xs={12}>
              <Typography variant='h5'>Ajukan Rapat</Typography>
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                value={values.namaRapat}
                onChange={handleChange('namaRapat')}
                fullWidth
                multiline
                label='Tema Rapat'
                placeholder='Tema Rapat'
                required
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                value={values.nomor}
                onChange={handleChange('nomor')}
                fullWidth
                multiline
                label='Nomor Surat'
                placeholder='Nomor Surat'
                required
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                value={values.lampiran}
                onChange={handleChange('lampiran')}
                fullWidth
                multiline
                label='Lampiran'
                placeholder='Lampiran'
                required
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                value={values.perihal}
                onChange={handleChange('perihal')}
                fullWidth
                multiline
                label='Perihal'
                placeholder='Perihal'
                required
              />
            </Grid>
            <Grid item xs={12} md={12}>
              {/* <TextField
                value={values.ditujukan}
                onChange={handleChange('ditujukan')}
                fullWidth
                multiline
                label='Ditujukan kepada'
                placeholder='Seluruh Pegawai BPS Kabupaten Bogor'
                required
              /> */}
              <Autocomplete
                disablePortal
                freeSolo
                id='combo-box-demo'
                fullWidth
                options={['Peserta Rapat BPS Kabupaten Bogor', 'Seluruh Pegawai BPS Kabupaten Bogor']}
                value={values.ditujukan}
                onChange={(event, newValue) => {
                  setValues({ ...values, ['ditujukan']: newValue })
                }}
                renderInput={params => <TextField required fullWidth {...params} label='Ditujukan kepada' />}
              />
            </Grid>

            <Grid item xs={12} sm={12} lg={4}>
              <DatePickerWrapper>
                <DatePicker
                  sx={{ width: 1000 }}
                  selected={selectedDate}
                  showYearDropdown
                  showMonthDropdown
                  placeholderText='Hari/Tanggal Rapat'
                  value={selectedDate}
                  onChange={handleDateChange}
                  dateFormat='dd/MM/yyyy'
                  className='custom-datepicker'
                  customInput={<CustomInputDateStart />}
                  name='tanggalMulai'
                  required
                />
              </DatePickerWrapper>
            </Grid>
            <Grid item xs={12} sm={12} lg={4}>
              <DatePickerWrapper>
                <DatePicker
                  selected={selectedTimeS}
                  sx={{ width: 1000 }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  dateFormat='HH:mm'
                  value={selectedTimeS}
                  onChange={handleTimeChangeS}
                  className='custom-datepicker'
                  customInput={<CustomInputTimeStart />}
                  name='tanggalBerakhir'
                  required
                />
              </DatePickerWrapper>
            </Grid>
            <Grid item xs={12} sm={12} lg={4}>
              <DatePickerWrapper>
                <DatePicker
                  selected={selectedTimeE}
                  sx={{ width: 1000 }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  dateFormat='HH:mm'
                  placeholderText='Waktu Selesai'
                  value={selectedTimeE}
                  onChange={handleTimeChangeE}
                  className='custom-datepicker'
                  customInput={<CustomInputTimeEnd />}
                  name='tanggalBerakhir'
                  required
                />
              </DatePickerWrapper>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-helper-label'>Meeting Place</InputLabel>
                <Select
                  fullWidth
                  labelId='demo-simple-select-helper-label'
                  id='demo-simple-select-helper'
                  label='Meeting Place'
                  onChange={handleTempatRapat}
                  value={values.tempatRapat}
                  required
                >
                  <MenuItem key={''} value={''}>
                    {''}
                  </MenuItem>
                  <MenuItem value={'Ruang Kepala'}>Ruang Kepala</MenuItem>
                  <MenuItem value={'Aula BPS Kabupaten Bogor'}>Aula BPS Kabupaten Bogor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                value={values.deskRapat}
                onChange={handleChange('deskRapat')}
                multiline
                minRows={3}
                label='Isi surat'
                placeholder='Isi surat'
                required
              />
            </Grid>
            {/* <Grid item xs={12} md={12}>
          {/* <Typography variant='h6' sx={{ py: '5px' }}>
              Penanggung Jawab Kegiatan
            </Typography> 

          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-helper-label'>Peserta Rapat</InputLabel>
            <Select
              fullWidth
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={values.kegTim}
              onChange={handlePJ}
              label='Peserta Rapat'
              name='pesertaRapat'
            >
              {timKerja.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.nama}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}
            <Grid item xs={12} md={12} lg={12}>
              <Autocomplete
                multiple
                // options={dataUser}
                id='tags-filled'
                value={values.kegAnggota}
                // options={dataPengguna}
                options={dataUser.map(data => data.name)}
                onChange={(event, newValue) => {
                  setValues({ ...values, kegAnggota: newValue })
                }}
                filterSelectedOptions
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip key={index} variant='outlined' label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={params => (
                  <TextField {...params} variant='outlined' label='Peserta Rapat' placeholder='Tambah Peserta Rapat' />
                )}
              />
            </Grid>
            {/* <TableAddParticipant></TableAddParticipant> */}
            <Divider sx={{ margin: 0 }} />

            <Grid item xs={12} display={'flex'} justifyContent={'end'}>
              <Button onClick={handleCreateRapat} size='medium' type='submit' variant='contained'>
                Ajukan Rapat
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
      <Card mt={400} height={4000}>
        <Grid container sx={{ height: 10 }}>
          <Grid mt={1} item xs={9} height={1}>
            <UndanganRapat></UndanganRapat>
            <LampiranRapat></LampiranRapat>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default RapatCreateViews
