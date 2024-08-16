import { useState, useEffect, useLayoutEffect } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// Mui Import
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'

import { useRouter } from 'next/dist/client/router'
import { useSession } from 'next-auth/react'

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

import CardProjectInfo from 'src/views/cards/CardProjectInfo'
import TableProjectDetailTask from 'src/views/tables/TableProjectDetailTask'
import CardProjectDetailProgress from 'src/views/cards/CardProjectDetailProgress'

const ProjectDetailsViews = props => {
  const router = useRouter()
  const [project, setProject] = useState(props.data)
  const [upmId, setUpmId] = useState(
    props.dataUpm.map(dupm => ({
      id: dupm.userId
    }))
  )

  const [arridForpass, setArridForpass] = useState(props.dataUpm.map(dupm => dupm.userId))
  const [arrId, setArrId] = useState([])
  const [tampil, setTampil] = useState(false)
  const session = useSession()

  // console.log(session)
  useEffect(() => {
    let ar = []
    // let idUserLogin = session.data.uid
    upmId.map(p => {
      ar.push(p.id)
    })
    setArrId(ar)
    //   // idUserLogin in ar || idUserLogin === 1099999 ? setTampil(true) : setTampil(false)
  }, [])

  const handleEdit = () => {
    Swal.fire({
      title: 'Apa Anda Yakin?',
      text: 'You will not be able to recover this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, archive it!'
    }).then(result => {
      if (result.isConfirmed) {
        router.push('/project-edit')
      } else {
        router.push('/project-detail')
      }
    })
  }
  const handleDelete = () => {
    Swal.fire({
      title: 'Hapus Kegiatan?',
      text: 'Semua data pada kegiatan ini akan dihapus',
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
          .delete(`/project/${project.id}`)
          .then(res => {
            Swal.fire('Berhasil terhapus', 'success')

            router.push('/project-list')
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
  }
  const handleArchieve = () => {
    Swal.fire({
      title: 'Apa Anda Yakin?',
      text: 'Untuk Mengarsipkan Kegiatan Ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, arsipkan!'
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire('project di arsipkan')
      }
    })
  }
  return session
    ? session.status === 'authenticated' && (
        <>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <CardProjectInfo dataArrayIdProjectMember={arridForpass} data={project}></CardProjectInfo>
            </Grid>
            <Grid item xs={12} md={4}>
              <CardProjectDetailProgress
                dataArrayIdProjectMember={arridForpass}
                data={project.Task}
              ></CardProjectDetailProgress>
            </Grid>
            <Grid item xs={12} md={12}>
              <TableProjectDetailTask
                dataArrayIdProjectMember={arridForpass}
                data={project.Task}
              ></TableProjectDetailTask>
            </Grid>
          </Grid>
          {/* {session.status === 'authenticated' && (arrId.includes(session.data.uid) || session.data.uid === 1099999) && ( */}
          {session.status === 'authenticated' &&
            (session.data.role == 'teamleader' || session.data.role == 'pjk' || session.data.role == 'admin') && (
              <>
                <Grid mt={2} container>
                  <Grid item md={12} display={'flex'} justifyContent={'end'} flexDirection={'row'}>
                    <Button
                      onClick={e => {
                        router.push(`/project-edit/${project.id}`)
                      }}
                      size='medium'
                      variant={'contained'}
                      sx={{ margin: 2 }}
                      disabled={arrId.includes(session.data.uid) ? false : true}
                    >
                      Edit
                    </Button>

                    {/* <Link onClick={e => router.push('/project-edit')}>
     <Button onClick={handleEdit} size='medium' variant={'contained'} sx={{ margin: 2 }}>
       Edit
     </Button>
   </Link> */}
                    <Button
                      disabled={
                        session.status === 'authenticated' ? (arrId.includes(session.data.uid) ? false : true) : true
                      }
                      color={'error'}
                      onClick={handleDelete}
                      size='medium'
                      variant={'contained'}
                      sx={{ margin: 2 }}
                    >
                      Delete
                    </Button>
                    {/* <Button onClick={handleArchieve} size='medium' variant={'contained'} sx={{ margin: 2 }}>
     Archieve
   </Button> */}
                  </Grid>
                </Grid>
              </>
            )}
        </>
      )
    : console.log('no session')
}

export default ProjectDetailsViews
