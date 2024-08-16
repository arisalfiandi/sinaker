// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Login from 'mdi-material-ui/Login'
import Account from 'mdi-material-ui/Account'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import CalendarCheckOutline from 'mdi-material-ui/CalendarCheckOutline'
import ClipboardFileOutline from 'mdi-material-ui/ClipboardFileOutline'
import TextBoxMultipleOutline from 'mdi-material-ui/TextBoxMultipleOutline'
import MessageVideo from 'mdi-material-ui/MessageVideo'
import Plus from 'mdi-material-ui/Plus'
import AccountGroupOutline from 'mdi-material-ui/AccountGroupOutline'
import VideoOutline from 'mdi-material-ui/VideoOutline'
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import Rapat from 'mdi-material-ui/CalendarClock'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Import Router
import { useRouter } from 'next/router'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import { Typography } from '@mui/material'
import { PrismaClient } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { getToken } from 'next-auth/jwt'

// interface Props {
//   hidden: boolean
//   settings: Settings
//   toggleNavVisibility: () => void
//   saveSettings: (values: Settings) => void
// }

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  // ** Router
  const route = useRouter()

  // ** Hook
  // const hiddenSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null}
        <TextField
          size='small'
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Magnify fontSize='small' />
              </InputAdornment>
            )
          }}
        />
      </Box> */}
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null}
        {route.asPath === '/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <HomeOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Dashboard
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/timeline/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <CalendarMonthIcon />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Timeline
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/rapat-create/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <Login />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Pengajuan Rapat
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/rapat-ajuan-list/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <Rapat />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Daftar Rapat
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/rapat-detail/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <Rapat />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Detail Rapat
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/tim-kerja-list/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <CubeOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Tim Kerja
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/project-detail/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <TextBoxMultipleOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Detail Kegiatan
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/create-project/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <TextBoxMultipleOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Tambah Kegiatan
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/task-manage-add/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <TextBoxMultipleOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Tambah Sub Kegiatan
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/task-manage-add/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <TextBoxMultipleOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Tambah Sub Kegiatan
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/project-detail-create-project-task/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <TextBoxMultipleOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Add Task
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/project-edit/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <TextBoxMultipleOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Kegiatan
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/task-manage/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <TextBoxMultipleOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Sub Kegiatan
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/task/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <ClipboardFileOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Task List
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/task-detail/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <ClipboardFileOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Task Detail
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/pegawai/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <Account />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Pegawai
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/create-task/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <ClipboardFileOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Create Task
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/edit-task/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <ClipboardFileOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Edit Task
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/meeting-schedule/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <MessageVideo />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Meeting Schedule
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/meeting-admin/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <VideoOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Meeting List
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/create-meeting/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <MessageVideo />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Create Meeting
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/edit-meeting/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <VideoOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Change Meeting
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/meeting-schedule-detail/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <MessageVideo />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Meeting Detail
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/people/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <AccountGroupOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Members
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/add-people/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <AccountGroupOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Tambah Pengguna
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/mitra-import/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <AccountGroupOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Import Mitra
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/create-tim-kerja/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <Login />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Buat Tim Kerja
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/template-table-list/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <Table />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Table Kegiatan
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/create-template-table/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <Table />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Tambah Table Kegiatan
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/account/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <Table />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Profile
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/mitra/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <AccountGroupOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Daftar Mitra
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/mitra-edit/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <AccountGroupOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Edit Data Mitra
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/edit-people/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <AccountGroupOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Edit Members
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/account-settings/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <AccountOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Account Settings
            </Typography>
          </Box>
        ) : null}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {/* {hiddenSm ? null : (
          <Box
            component='a'
            target='_blank'
            rel='noreferrer'
            sx={{ mr: 4, display: 'flex' }}
            href='https://github.com/themeselection/materio-mui-react-nextjs-admin-template-free'
          >
            <img
              height={24}
              alt='github stars'
              src='https://img.shields.io/github/stars/themeselection/materio-mui-react-nextjs-admin-template-free?style=social'
            />
          </Box>
        )} */}
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        {/* <NotificationDropdown /> */}
        <UserDropdown />
      </Box>
    </Box>
  )
}

export default AppBarContent
