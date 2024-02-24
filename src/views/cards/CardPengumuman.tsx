// ** React Imports
import { SyntheticEvent, useState } from 'react'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Tab from '@mui/material/Tab'
import CardContent from '@mui/material/CardContent'

import { useRouter } from 'next/dist/client/router'

const TabPanel1 = () => {
  return (
    <>
      <Typography variant='h6' sx={{ marginBottom: 2 }}>
        Isi Pengumuman
      </Typography>
      <Typography variant='body2' sx={{ marginBottom: 2 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </Typography>
    </>
  )
}

const TabPanel2 = () => {
  return (
    <>
      <Typography variant='h6' sx={{ marginBottom: 2 }}>
        Lampiran
      </Typography>
    </>
  )
}
const CardPengumuman = () => {
  const router = useRouter()
  // ** State
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  return (
    <>
      <Card>
        <Grid container spacing={4} p={4}>
          <Grid item md={12}>
            <Typography variant={'h5'}>Judul Pengumuman</Typography>
          </Grid>
          <Grid item md={6}>
            <Typography variant={'body1'}>Pembuat Pengumuman</Typography>
          </Grid>
          <Grid item md={6} display={'flex'} justifyContent={'end'}>
            <Typography variant={'body1'}>Tanggal dibuat</Typography>
          </Grid>
        </Grid>
        <Divider></Divider>
        <Grid container spacing={4}>
          <Grid item md={12}>
            <TabContext value={value}>
              <TabList onChange={handleChange} aria-label='card navigation example'>
                <Tab value='1' label='Informasi' />
                <Tab value='2' label='Lampiran' />
              </TabList>
              <CardContent>
                <TabPanel value='1' sx={{ p: 0, height: 100, overflowY: 'scroll' }}>
                  <TabPanel1 />
                </TabPanel>

                <TabPanel value='2' sx={{ p: 0, height: 100, overflowY: 'scroll' }}>
                  <TabPanel2 />
                </TabPanel>
              </CardContent>
            </TabContext>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default CardPengumuman
