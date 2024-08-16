//  ** React
import { useState, useEffect } from 'react'

// ** Icon
import Close from 'mdi-material-ui/Close'

// ** Import Mui
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'

// ** Import multer
import axios from 'src/pages/api/axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded'

const DragAndDrop = props => {
  const [files, setFiles] = useState([])
  const [file, setFile] = useState(null)

  const [message, setMessage] = useState()

  const [showUpload, setShowUpload] = useState(true)

  const [showButton, setShowButton] = useState(false)

  const [isFile, setIsFile] = useState(true)

  const router = useRouter()
  console.log(props.dataMeet)

  let inputRef

  const handleFile = e => {
    setIsFile(false)
    setShowUpload(false)
    setShowButton(true)
    setMessage('')
    let file = e.target.files

    for (let i = 0; i < file.length; i++) {
      setFiles(files => [...files, file[i]])
    }
    setFile(e.target.files[0])
  }

  const removeImage = i => {
    setIsFile(true)
    setShowUpload(true)
    setShowButton(false)
    setFiles(files.filter(x => x.name !== i))
    inputRef.value = null
    setFile(null)
  }

  const handleSubmitFile = async e => {
    e.preventDefault()

    console.log(file)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await axios.post(`rapat-notulensi/${props.dataMeet.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (res.status === 201) {
        Swal.fire({
          title: 'Upload berhasil',
          text: '',
          icon: 'success',
          confirmButtonColor: '#68B92E',
          confirmButtonText: 'OK'
        }).then(res => {
          Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: ''
          })
          router.push(`/rapat-detail/${props.dataMeet.id}`, undefined)
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Upload dokumen gagal',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  return (
    <>
      <form onSubmit={e => e.preventDefault()} encType='multipart/form-data'>
        <div className='py-3 w-full rounded-md'>
          <Grid container spacing={1} display={'flex'} justifyContent={'center'}>
            <span className='flex justify-center items-center bg-white text-[12px] mb-1 text-red-500'>{message}</span>
            <div
              style={{ display: showUpload ? 'flex' : 'none' }}
              className='h-32 w-full relative border-2 flex justify-center items-center rounded-md border-gray-400 border-solid'
            >
              <Grid item xs={12} sx={{ height: 130, width: 400 }}>
                {' '}
                <Grid display={'flex'} justifyContent={'center'} item xs={12}>
                  <IconButton>
                    <CloudUploadRoundedIcon sx={{ fontSize: 60 }} size={'large'}>
                      <input
                        style={{ display: 'none' }}
                        id='raised-button-file'
                        multiple
                        type='file'
                        onChange={handleFile}
                        className='h-full w-full bg-green-200 opacity-0 z-10 absolute cursor-pointer'
                        name='upfile'
                        ref={refParam => (inputRef = refParam)}
                      />
                    </CloudUploadRoundedIcon>
                  </IconButton>
                </Grid>
                <input
                  style={{ display: 'none' }}
                  id='raised-button-file'
                  multiple
                  type='file'
                  onChange={handleFile}
                  className='h-full w-full bg-green-200 opacity-0 z-10 absolute cursor-pointer'
                  name='upfile'
                  ref={refParam => (inputRef = refParam)}
                />
                <label htmlFor='raised-button-file'>
                  <Button size='small ' sx={{ mr: 2 }} variant='contained' component='span'>
                    Browse
                  </Button>
                </label>
              </Grid>
            </div>
          </Grid>

          <div className='flex flex-wrap gap-2 mt-2'>
            {files.map((file, key) => {
              return (
                <div key={file.name} className='w-full h-16 flex items-center justify-between rounded bg-white'>
                  <div className='flex flex-row justify-center items-center gap-2'>
                    <div className='h-12 w-12'>
                      {/* <img
                        alt='...'
                        className='w-full h-full rounded'
                        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8mJiYODg4bGxsUFBQAAACbm5uysrIeHh5zc3MFBQXX19fS0tLHx8djY2N9fX3v7+8WFhb5+fnd3d1CQkIrKytubm5WVlZPT09JSUkwMDAoKCjl5eVdXV07Ozs0NDSlpaWQkJC9vb2FhYWYmJiKioqioqK5ubmsrKzo6nhaAAAEh0lEQVR4nO3dgVKyQBSGYVhYQ0QFQUPS/sws7/8K/8QB1mEtc87Zw9T33MDypiwYC3geAAAAAAAAAAAAAADcZ9GX2iykt3PysdvPW+OzlWFW29Yea2VtXStqz2f/asuaX4ui5fN2P5WrzOeVUmEW2EW38L8VZXG1k2ncbHXw/QaSCPWDQODRWd+JHjv/GOfaYd+nsHScOFduA30/e3QauHP8CZ6oucPARCDQ9+MXd4XrG2Z5jsTEVeBD3I0aZSpuqJ7wLKv1D5Pm5j/Vzsf7ZdVYZpmZmDoqLLtNU8XuddpITJNOfrYxXJ6ZnU7ZzmduvbHyg5EYrd1MqHm3F6oR/5CJMW2HY/bhTl7aIdWLi/GmxrwWv7sYcdyczEQzF8N9/kmN/V5PHQxYNLth7GK0k3HYJQYb/vGW7d/T2YmUcXhyMdu0Z9yKfahGakyo4Yp9OIHCiwlVv3GPJlHodrYRKbz4NRMxzzYyhd66+8UdPfPONkKF6VM3oWa8s41Q4eVsw3puI1XoHY3TN825K4oVevvuUww4zxjlCr2ym21UzjeMYGFatbNNeOAbRrDQS9pz8KjgO2JIFho/ThnnGtFCr2pGZ/ztJlu4b35mMP6DQbbwofmahiO2MVDIC4UUUMgLhRRQyAuFFFDIC4UUUMhLvHCRT6nk1n9TSBceKx1T0YXtV7xw4Yh0KVGkX4dWmMdXtvVeqv9FlS3chVe29F5x/0OULZxTLzlV/QswsoX77MqW3l3YXxssWzilXrNo+a+v8Fw6o90R9b4/unDhYqvDK0v3fy7UtjWz0kd8L3mbUxlZr5+JF7JDIQUU8kIhBRTyQiEFFPJCIQUU8kIhBRTyQiEFFPJCIQUU8kIhha8L84SKfR23dGFSZP278u8UPNoahQtfNeXTFoJ4MrTC9Imwzz/dUzG0wg/qq9y6f+kCV7l5C9+pn8tjueP3l63FiIe2FsMb036ItjtFpY+HK33t8W13XAOOd5bRpQu96WFMZYdrwGxjoJAXCimgkBcKKaCQFwopoJAXCimgkBcKKaCQFwopoJAXCin89cI0n9Cw3wYsXpiUms5qgNeAp6TXgDPf8l9v2cJFRftKgaAcWuEH+R2WQ7sG/IZrwD81uGvAE/Jv6a+/BmyJkL4PeKazm97VdYMgs93oLF34eUTcz4isDtbXyogXskMhBRTyQiEFFPJCIQUU8kIhBRTyQiEFFPJCIQUU8kIhBRTyQiEFFPJCIQUU8kIhhT9UGLMN8QUXhQJvHjeMmtUQjO/OWzt/e7ypbEa3PM2cSvts+ciyoIdb91Jgy1obKsd2EMW3K1yRFu2qqyXfPrLpniugDm53xaRop7mA88XV2271WujPjw+ujErVjWxZLkXn1Xw4RED2xJ1vhca6QNuDXQg90i5BvIftBS2EcurVXT8WbFkDL99yLiFapsyF3o76OS0/C7QtHqb2JvgpBpWDwNOSbuqXytwo0lv2r+jZYh8o93NqEBe8s+iFzXsZahU6o5SuVg77amlyfB+58vKRO/p+AgAAAAAAAAAAAAAM13/9aXcs8MW9BQAAAABJRU5ErkJggg=='
                      /> */}
                      <ArticleRoundedIcon sx={{ fontSize: 100 }} size={'large'}></ArticleRoundedIcon>
                    </div>
                    <div className='flex flex-col justify-between items-start'>
                      <span className='truncate w-36 md:w-96 lg:text-clip lg:w-32'>
                        <strong>{file.name}</strong>
                      </span>
                      <span className='truncate'>{file.name.split('.').pop().toLowerCase()}</span>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      removeImage(file.name)
                    }}
                    className='h-10 w-10 hover:bg-gray-100 flex items-center cursor-pointer justify-center rounded-full'
                  >
                    <Close />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <Grid container display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <div className='flex flex-col justify-center'>
            <Typography variant='body2' sx={{ marginBottom: 6.75 }} style={{ display: isFile ? 'block' : 'none' }}>
              No submitted file.
            </Typography>
            <Divider sx={{ marginTop: 0, marginBottom: 6.75 }} />
            <Grid item xs={12}>
              <Button
                type='submit'
                variant='contained'
                sx={{ padding: theme => theme.spacing(1.75, 5.5) }}
                style={{ display: showButton ? 'block' : 'none' }}
                onClick={handleSubmitFile}
              >
                Submit
              </Button>
            </Grid>
          </div>
        </Grid>
      </form>
    </>
  )
}

export default DragAndDrop
