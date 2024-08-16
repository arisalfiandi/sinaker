import { useRouter } from 'next/dist/client/router'
import { useSession } from 'next-auth/react'
import { useState, useEffect, useRef } from 'react'

import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import FolderIcon from '@mui/icons-material/Folder'
import DeleteIcon from '@mui/icons-material/Delete'

import Box from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import axios from 'src/pages/api/axios'
import Swal from 'sweetalert2'
import router from 'next/router'
import { DataGrid } from '@mui/x-data-grid'

// tab
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

// export pdf undangan
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import DragAndDrop from 'src/views/form-layouts/DragAndDrop'

// icon
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner'

const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const RapatDetailViews = props => {
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
  const [tampil, setTampil] = useState('none')
  const pdfRef = useRef()
  const pdfRef2 = useRef()
  const [value, setValue] = useState('1')
  const [fileTambahan, setFileTambahan] = useState([])
  const [dokumenRapat, setDokumenRapat] = useState(props.dataDokumen)

  const handleChangeTab = (event, newValue) => {
    setValue(newValue)
  }
  const session = useSession()

  const rows = props.dataPesertaRapat.map(row => {
    return {
      id: row.id,
      peserta: row.user.name
    }
  })

  const LampiranRapat = () => {
    const Img = styled('img')(({ theme }) => ({ height: 110 }))

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
                            : {props.dataRapat.nomor}
                          </Typography>
                          <Typography color={'black'} variant={'body2'}>
                            : {props.dataRapat.lampiran}
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
                            Daftar Peserta Rapat {props.dataRapat.namaRapat}
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
                                {rows.map((row, index) => (
                                  <tr key={index}>
                                    <td style={styles.tableCellNo}>{index + 1}</td>
                                    <td style={styles.tableCell}>{row.peserta}</td>
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
  const UndanganRapat = () => {
    const Img = styled('img')(({ theme }) => ({ height: 110 }))
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
          <Grid container sx={{ height: 900 }}>
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
                            : {props.dataRapat.nomor}
                            {/* menambahkan karakter tertentu ke awal sebuah string sehingga panjang total string tersebut menjadi setidaknya sama dengan panjang target yang ditentukan.
                             Jika panjang string awal sudah mencapai atau melebihi panjang target, maka metode padStart tidak melakukan apa pun. */}
                          </Typography>
                          <Typography color={'black'} variant={'body2'}>
                            : {props.dataRapat.lampiran}
                          </Typography>
                          <Typography color={'black'} variant={'body2'}>
                            {/* : Undangan {props.dataRapat.namaRapat} */}: {props.dataRapat.perihal}
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
                    <Grid sx={{ height: 650 }} item xs={12}>
                      <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={11}>
                          <Typography color={'black'} variant={'body2'}>
                            Yth.
                          </Typography>
                          <Typography color={'black'} variant={'body2'}>
                            {props.dataRapat.ditujukan}
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
                            {props.dataRapat.description}
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
                                {new Date().toLocaleDateString('id-ID', {
                                  weekday: 'long'
                                })}
                              </Typography>
                              <Typography color={'black'} variant={'body2'}>
                                :{' '}
                                {new Date(props.dataRapat.meetDate).toLocaleDateString('id-ID', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </Typography>
                              <Typography color={'black'} variant={'body2'}>
                                :{' '}
                                {new Date(props.dataRapat.startTime).toLocaleTimeString('id-ID', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}{' '}
                                -
                                {new Date(props.dataRapat.endTime).toLocaleTimeString('id-ID', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}{' '}
                                WIB
                              </Typography>

                              <Typography color={'black'} variant={'body2'}>
                                : {props.dataRapat.tempatRapat}
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
                            <Grid mt={5} height={50} container></Grid>
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
  const handleDelete = id => () => {
    Swal.fire({
      title: 'Hapus Rapat?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#68B92E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus Rapat',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .delete(`/rapat/${id}`)
          .then(async res => {
            await Swal.fire({
              icon: 'success',
              title: '',
              text: 'Rapat Berhasil Dihapus'
            })
            router.push('/timeline')
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err
            })
          })
      }
    })
  }

  const handleSendUndangan = async e => {
    e.preventDefault()

    try {
      if (dokumenRapat.statusSendEmail == 0) {
        while (true) {
          const res = await axios.put(`/rapat-send-undangan/${props.dataRapat.id}`, {
            namaRapat: props.dataRapat.namaRapat,
            meetDate: props.dataRapat.meetDate,
            startTime: props.dataRapat.startTime,
            endTime: props.dataRapat.endTime,
            duration: props.dataRapat.duration,
            tempatRapat: props.dataRapat.tempatRapat,
            description: props.dataRapat.deskRapat,
            nomor: props.dataRapat.nomor,
            lampiran: props.dataRapat.lampiran,
            perihal: props.dataRapat.perihal,
            ditujukan: props.dataRapat.ditujukan,
            pesertaRapatId: props.dataPesertaRapat,
            // fileUndangan: props.dataRapat.undangan_file ? props.dataRapat.undangan_file : 'tidak ada'
            fileUndangan: props.dataUndanganPersetujuan[0] ? props.dataUndanganPersetujuan[0].taskfile : 'tidak ada'
          })

          if (res.status === 201) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Undangan berhasil dikirim',
              showConfirmButton: false,
              timer: 1000,
              width: 300
            })
          }

          break
        }
      } else {
        Swal.fire({
          title: 'Anda sudah pernah mengirimkan email sebelumnya',
          text: 'Apa anda ingin mengirimkan email lagi?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya Kirim'
        }).then(result => {
          if (result.isConfirmed) {
            axios
              .put(`/rapat-send-undangan/${props.dataRapat.id}`, {
                namaRapat: props.dataRapat.namaRapat,
                meetDate: props.dataRapat.meetDate,
                startTime: props.dataRapat.startTime,
                endTime: props.dataRapat.endTime,
                duration: props.dataRapat.duration,
                tempatRapat: props.dataRapat.tempatRapat,
                description: props.dataRapat.deskRapat,
                nomor: props.dataRapat.nomor,
                lampiran: props.dataRapat.lampiran,
                perihal: props.dataRapat.perihal,
                ditujukan: props.dataRapat.ditujukan,
                pesertaRapatId: props.dataPesertaRapat,
                // fileUndangan: props.dataRapat.undangan_file ? props.dataRapat.undangan_file : 'tidak ada'
                fileUndangan: props.dataUndanganPersetujuan[0] ? props.dataUndanganPersetujuan[0].taskfile : 'tidak ada'
              })
              .then(async res => {
                await Swal.fire({
                  icon: 'success',
                  title: '',
                  text: 'Undangan berhasil dikirim'
                })
              })
              .catch(err => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Something went wrong'
                })
              })
          } else {
          }
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Kirim undangan gagal',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  const handleUnduhUndangan = async () => {
    setTampil('flex')

    const input1 = pdfRef.current
    const input2 = pdfRef2.current
    const scale = 2 // Meningkatkan resolusi canvas

    try {
      const canvas1 = await html2canvas(input1, { scale })
      const imgData1 = canvas1.toDataURL('image/png')

      const canvas2 = await html2canvas(input2, { scale })
      const imgData2 = canvas2.toDataURL('image/png')

      const pdf = new jsPDF('p', 'mm', 'a4', true)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      // Menambahkan canvas pertama ke halaman pertama
      const imgWidth1 = canvas1.width / scale
      const imgHeight1 = canvas1.height / scale
      const ratio1 = Math.min(pdfWidth / imgWidth1, pdfHeight / imgHeight1)
      const imgX1 = (pdfWidth - imgWidth1 * ratio1) / 2
      const imgY1 = 10

      pdf.addImage(imgData1, 'PNG', imgX1, imgY1, imgWidth1 * ratio1, imgHeight1 * ratio1)

      // Menambahkan canvas kedua ke halaman baru
      pdf.addPage()
      const imgWidth2 = canvas2.width / scale
      const imgHeight2 = canvas2.height / scale
      const ratio2 = Math.min(pdfWidth / imgWidth2, pdfHeight / imgHeight2)
      const imgX2 = (pdfWidth - imgWidth2 * ratio2) / 2
      const imgY2 = 10

      pdf.addImage(imgData2, 'PNG', imgX2, imgY2, imgWidth2 * ratio2, imgHeight2 * ratio2)

      pdf.save(`Undangan${props.dataRapat.namaRapat}.pdf`)
    } catch (error) {
      console.error('Error while processing:', error)
    } finally {
      setTampil('none')
    }
  }

  // const handleUnduhUndangan = () => {
  //   setTampil('flex')
  //   const input = pdfRef.current
  //   const scale = 4 // Meningkatkan resolusi canvas
  //   try {
  //     html2canvas(input, { scale }).then(canvas => {
  //       const imgData = canvas.toDataURL('image/png')
  //       const pdf = new jsPDF('p', 'mm', 'a4', true)

  //       // Ukuran halaman PDF
  //       const pdfWidth = pdf.internal.pageSize.getWidth()
  //       const pdfHeight = pdf.internal.pageSize.getHeight()

  //       // Ukuran gambar
  //       const imgWidth = canvas.width / scale // Sesuaikan dengan skala
  //       const imgHeight = canvas.height / scale // Sesuaikan dengan skala

  //       // Rasio untuk menyesuaikan ukuran gambar dalam PDF
  //       const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)

  //       // Menempatkan gambar di tengah halaman PDF
  //       const imgX = (pdfWidth - imgWidth * ratio) / 2
  //       const imgY = (pdfHeight - imgHeight * ratio) / 2

  //       pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
  //       pdf.save('invoice.pdf')

  //       // Convert PDF to Blob
  //       // const blob = pdf.output('blob')
  //       // const file = new File([blob], 'invoice.pdf', { type: 'application/pdf' })

  //       // // Create FormData and append file
  //       // const formData = new FormData()
  //       // formData.append('file', file)

  //       // // Upload the PDF file to the server
  //       // axios
  //       //   .post('/rapat-download-undangan', formData)
  //       //   .then(res => {
  //       //     console.log(res.data)
  //       //     alert('File uploaded successfully')
  //       //   })
  //       //   .catch(err => {
  //       //     console.error('Error while uploading the file:', err)
  //       //   })
  //     })
  //   } catch (error) {
  //     console.error('Error while processing:', error)
  //   } finally {
  //     setTampil('none')
  //   }
  // }

  const handleSubmitFile = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('file', file)

    axios
      .post(`rapat-notulensi/${props.dataRapat.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: '',
          text: 'Berhasil diupload'
        })
        router.push(`/rapat-detail/${props.dataRapat.id}`)
      })
  }

  const handleUploadUpdate = abc => {
    setFileTambahan(abc)
  }

  useEffect(() => {
    fileTambahan.length > 0 ? setDokumenRapat(prevValues => [...prevValues, ...fileTambahan]) : 0
  }, [fileTambahan])
  let button
  button = (
    <>
      <DragAndDrop dataMeet={props.dataRapat} dataUpdateUpload={handleUploadUpdate}></DragAndDrop>
    </>
  )

  const handleDeleteDokumen = async id => {
    axios
      .delete(`rapat-notulensi-delete/${id}`)
      .then(async res => {
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Dokumen dihapus'
        }).then(() => {
          const updatedDokumen = dokumenRapat.filter(item => item.id !== id)
          // Perbarui state dengan array baru
          setDokumenRapat(updatedDokumen)
        })
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err
        })
      })
  }

  const handleDownloadDokumen = fileName => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const link = document.createElement('a')
      link.href = `${process.env.BASE_URL}/public/uploads/${fileName}`
      link.setAttribute('download', fileName) // Nama file untuk diunduh
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleTampil = () => {
    tampil === 'none' ? setTampil('flex') : setTampil('none')
  }
  return (
    <>
      <Grid container spacing={5}>
        <Grid item md={6} xs={6} display={'flex'} justifyContent={'start'}>
          {/* <Typography variant={'h5'}>Detail Rapat</Typography> */}
        </Grid>
      </Grid>
      <Card>
        <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
                {props.dataRapat.namaRapat}
              </Typography>
            </Grid>
            <Grid item xs={6} flexDirection={'column'} display={'flex'} alignItems={'end'}>
              <Chip
                label={
                  props.dataRapat.status === 'diajukan'
                    ? 'Diajukan'
                    : props.dataRapat.status === 'ditolak'
                    ? 'Ditolak'
                    : 'Disetujui'
                }
                color={
                  props.dataRapat.status === 'diajukan'
                    ? 'warning'
                    : props.dataRapat.status === 'ditolak'
                    ? 'error'
                    : 'success'
                }
                sx={{
                  height: 24,
                  fontSize: '0.75rem',
                  width: 100,
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { fontWeight: 500 }
                }}
              />
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: 0 }} />
          <TabContext value={value}>
            <TabList variant='fullWidth' onChange={handleChangeTab} aria-label='card navigation example'>
              <Tab value='1' label='Informasi Rapat' />
              <Tab value='2' label='Undangan Rapat' />
              <Tab value='3' label='Notulensi Rapat' />
            </TabList>
            <TabPanel value='1' sx={{ p: 0, height: 435 }}>
              <Grid container mt={4} spacing={6}>
                <Grid item xs={12} sm={5} md={4} lg={3}>
                  <StyledBox>
                    <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                      <Typography variant='body2'>Meeting Start</Typography>
                    </Box>
                    <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                      <Typography variant='body2'>Meeting End</Typography>
                    </Box>
                    <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                      <Typography variant='body2'>Description</Typography>
                    </Box>
                    <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                      <Typography variant='body2'>Meeting Place</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant='body2'>Participant</Typography>
                    </Box>
                  </StyledBox>
                </Grid>
                <Grid item xs={12} sm={7} md={8} lg={9}>
                  <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                    <Typography variant='body2'>
                      {new Date(props.dataRapat.startTime).toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}{' '}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                    <Typography variant='body2'>
                      {new Date(props.dataRapat.endTime).toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}{' '}
                      WIB
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                    <Typography variant='body2'>{props.dataRapat.description}</Typography>
                  </Box>
                  <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                    <a style={{ textDecoration: 'none' }} target='_blank' rel='noreferrer'>
                      <Typography variant='body2' sx={{ color: 'blue' }}>
                        {props.dataRapat.tempatRapat}
                      </Typography>
                    </a>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='body2'>
                      {props.dataPesertaRapat.map(pr => {
                        return pr.user.name + ', '
                      })}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ marginTop: 2.5 }} />
              {session.status === 'authenticated' &&
                (session.data.uid === 1099999 || session.data.role == 'teamleader') && (
                  <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
                    <Button
                      onClick={e => router.push(`/rapat-edit/${props.dataRapat.id}`)}
                      size='medium'
                      type='submit'
                      sx={{ mr: 2 }}
                      variant='contained'
                      disabled={props.dataRapat.status === 'disetujui' ? true : false}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={handleDelete(props.dataRapat.id)}
                      size='medium'
                      color='error'
                      type='submit'
                      sx={{ mr: 2 }}
                      variant='contained'
                    >
                      Hapus
                    </Button>
                  </CardActions>
                )}
            </TabPanel>
            <TabPanel
              value='2'
              sx={{
                p: 0,
                height:
                  tampil === 'flex'
                    ? props.dataRapat.ditujukan != 'Seluruh Pegawai BPS Kabupaten Bogor'
                      ? 2235
                      : 1295
                    : 335
              }}
            >
              <Grid mt={4} container spacing={4}>
                <Grid display={'flex'} justifyContent={'center'} item xs={5} height={330}>
                  <Card sx={{ backgroundColor: '#F2F2F2', width: 270, height: 300 }}>
                    <Link>
                      <CardContent
                        height={270}
                        sx={{
                          // backgroundColor: 'black',
                          marginTop: 5,
                          width: 270,
                          heigth: 300,
                          justifyContent: 'center',
                          display: 'flex',
                          aligItems: 'center'
                        }}
                      >
                        <IconButton
                          type='submit'
                          onClick={handleTampil}
                          edge='end'
                          aria-label='toggle password visibility'
                        >
                          <DocumentScannerIcon sx={{ fontSize: 200 }} size={'large'}></DocumentScannerIcon>
                        </IconButton>
                      </CardContent>
                    </Link>
                  </Card>
                </Grid>
                <Grid item xs={7} height={330} bgcolor={'white'}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      {/* <Typography variant='body2'>Peserta Rapat:</Typography>
                      <Typography variant='body2'>
                        {props.dataPesertaRapat.map(pr => {
                          return pr.user.name + ', '
                        })}
                      </Typography> */}
                    </Grid>
                    <Grid item xs={12}>
                      {props.dataUndanganPersetujuan.length > 0 ? (
                        props.dataUndanganPersetujuan[0] ? (
                          <>
                            <Link
                              href={`https://sinaker-tapv.onrender.com/upload/${props.dataUndanganPersetujuan[0].taskfile}`}
                              target='_blank'
                            >
                              <Typography sx={{ textDecoration: 'underline' }}>
                                {props.dataUndanganPersetujuan[0].taskfile}
                              </Typography>
                            </Link>
                          </>
                        ) : (
                          <Typography sx={{ textDecoration: 'underline' }}>Belum Ada Persetujuan Undangan</Typography>
                        )
                      ) : (
                        <Typography sx={{ textDecoration: 'underline' }}>Belum Ada Persetujuan Undangan</Typography>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        disabled={props.dataUndanganPersetujuan.length > 0 ? false : true}
                        sx={{ width: 160 }}
                        onClick={handleSendUndangan}
                        size='small'
                        variant='contained'
                      >
                        Kirim undangan
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button sx={{ width: 160 }} onClick={handleUnduhUndangan} mt={4} size='small' variant='contained'>
                        Unduh undangan
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={12} mt={10}>
                  <Grid container spacing={4}>
                    <Grid item xs={1.5} height={800}></Grid>
                    <Grid item xs={9} height={800} bgcolor={'white'}>
                      <UndanganRapat></UndanganRapat>
                    </Grid>
                    <Grid item xs={1.5} height={800} bgcolor={'primary'}></Grid>
                  </Grid>
                </Grid>
                <Grid xs={12} mt={50}>
                  <Grid container spacing={4}>
                    <Grid item xs={1.5} height={800}></Grid>
                    <Grid item xs={9} height={800} bgcolor={'white'}>
                      <LampiranRapat></LampiranRapat>
                    </Grid>
                    <Grid item xs={1.5} height={800} bgcolor={'primary'}></Grid>
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value='3' sx={{ p: 0, height: 350 }}>
              <Grid container>
                <Grid item xs={6} height={330}>
                  <Card sx={{ backgroundColor: '#F4F4F4', borderSpacing: 50, border: '4px dashed #E7E7E7' }}>
                    <CardContent sx={{ height: 300, textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                      {/* <Grid container display={'flex'} justifyContent={'center'}>
                        <Grid display={'flex'} justifyContent={'center'} item xs={12}>
                          <IconButton>
                            <CloudUploadRoundedIcon sx={{ fontSize: 100 }} size={'large'}></CloudUploadRoundedIcon>
                          </IconButton>
                        </Grid>
                        <Grid display={'flex'} justifyContent={'center'} item xs={12}>
                          <Typography>Upload your files here!</Typography>
                        </Grid>
                      </Grid> */}
                      <Grid display={'flex'} justifyContent={'center'} item xs={12} sx={{ overflowX: 'scroll' }}>
                        {button}
                      </Grid>
                    </CardContent>
                    <CardActions className='card-action-dense'></CardActions>
                  </Card>
                </Grid>
                <Grid item xs={6} height={330} sx={{ overflowX: 'scroll' }}>
                  <>
                    {dokumenRapat.length > 0 ? (
                      dokumenRapat.map(dok => (
                        <>
                          <List key={dok.id}>
                            <ListItem
                              secondaryAction={
                                <IconButton
                                  onClick={() => {
                                    Swal.fire({
                                      title: 'Hapus Dokumen?',
                                      text: '',
                                      icon: 'warning',
                                      showCancelButton: true,
                                      confirmButtonColor: '#3085d6',
                                      cancelButtonColor: '#d33',
                                      confirmButtonText: 'Ya'
                                    }).then(result => {
                                      if (result.isConfirmed) {
                                        handleDeleteDokumen(dok.id)
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
                              {/* <Link href={`https://sinaker-tapv.onrender.com/uploads/${dok.taskfile}`} target='_blank'>
                                {/* <Link
                                href={`http://localhost:3000/public/uploads/1715757780583-xe9nj6-bab III (2).pdf`}
                                target='_blank'
                              > 

                                <ListItemText sx={{ textDecoration: 'underline' }} primary={dok.taskfile} />
                              </Link> */}
                              <Link
                                href={`https://sinaker-tapv.onrender.com/upload/${dok.taskfile}`}
                                target='_blank'
                                download
                              >
                                <ListItemText sx={{ textDecoration: 'underline' }} primary={dok.taskfile} />
                              </Link>
                              {/* <Button onClick={handleDownloadDokumen('1715757780583-xe9nj6-bab III (2).pdf')}>
                                download {dok.filename}
                              </Button> */}
                            </ListItem>
                          </List>
                        </>
                      ))
                    ) : (
                      <>
                        <Grid item xs={12} padding={6}>
                          <Typography>Tidak Ada Dokumen yang Diupload </Typography>
                        </Grid>
                      </>
                    )}
                  </>
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
      <br />
    </>
  )
}

export default RapatDetailViews
