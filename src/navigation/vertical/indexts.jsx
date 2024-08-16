import { useEffect, useState } from 'react'

// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import Cash from 'mdi-material-ui/HandCoin'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import TimeLine from '@mui/icons-material/CalendarMonth'
import FilterSettings from 'mdi-material-ui/FilterSettings'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Account from 'mdi-material-ui/Account'
import Elevator from 'mdi-material-ui/Elevator'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import Mitra from '@mui/icons-material/Diversity3'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { SettingsConsumer } from 'src/@core/context/settingsContext'
import { useSession } from 'next-auth/react'

const navigation = () => {
  const [userRole, setUserRole] = useState('')
  const session = useSession()

  const getUserRole = async () => {
    setUserRole(session?.data?.role)
  }

  console.log(session.data.role)

  useEffect(() => {
    if (session.status === 'authenticated') {
      getUserRole()
    }
  }, [session])

  if (userRole === 'teamleader') {
    return [
      // {
      //   title: 'Dashboard',
      //   icon: HomeOutline,
      //   path: '/'
      // },
      // {
      //   title: 'Account Settings',
      //   icon: AccountCogOutline,
      //   path: '/account-settings'
      // },
      // {
      //   sectionTitle: 'Pages '
      // },
      // {
      //   title: 'Login',
      //   icon: Login,
      //   path: '/pages/login',
      //   openInNewTab: true
      // },
      // {
      //   title: 'Register',
      //   icon: AccountPlusOutline,
      //   path: '/pages/register',
      //   openInNewTab: true
      // },
      // {
      //   title: 'Error',
      //   icon: AlertCircleOutline,
      //   path: '/pages/error',
      //   openInNewTab: true
      // },

      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/'
      },

      // {
      //   title: 'Pengumuman',
      //   icon: CubeOutline,
      //   path: '/pengumuman'
      // },
      {
        title: 'Timeline',
        icon: TimeLine,
        path: '/timeline'
      },
      // {
      //   sectionTitle: 'Rapat'
      // },
      // {
      //   title: 'Ajukan Rapat',
      //   icon: Login,
      //   path: '/rapat-create'
      // },
      // {
      //   title: 'Daftar Rapat',
      //   icon: Login,
      //   path: '/rapat-ajuan-list'
      // },
      {
        sectionTitle: 'Kegiatan'
      },
      {
        title: 'Buat Kegiatan',
        icon: CreditCardOutline,
        path: '/create-project'
      },

      {
        title: 'List Kegiatan',
        icon: Table,
        path: '/project-list'
      },
      // {
      //   title: 'Sub Kegiatan',
      //   icon: CubeOutline,
      //   path: '/task'
      // },

      // {
      //   sectionTitle: 'Pencairan'
      // },
      // {
      //   title: 'Pencairan',
      //   icon: Cash,
      //   path: '/pencairan'
      // },

      {
        sectionTitle: 'Tim Kerja'
      },
      {
        title: 'Tim Kerja',
        icon: CubeOutline,
        path: '/tim-kerja-list'
      },
      // {
      //   title: 'Buat Tim Kerja',
      //   icon: Login,
      //   path: '/create-tim-kerja'
      // },

      // {
      //   sectionTitle: 'Perusahaan'
      // },
      // {
      //   title: 'List Group Perusahaan',
      //   icon: Table,
      //   path: '/perusahaan-group-list'
      // },
      // {
      //   title: 'Buat Group Perusahaan',
      //   icon: Login,
      //   path: '/create-kegiatan-perusahaan'
      // },

      {
        sectionTitle: 'Pustaka'
      },
      // {
      //   title: 'Beban Kerja',
      //   icon: Elevator,
      //   path: '/beban-kerja'
      // },
      {
        title: 'Daftar Pegawai',
        icon: Account,
        path: '/pegawai'
      },
      // {
      //   title: 'Daftar Perusahaan',
      //   icon: GoogleCirclesExtended,
      //   path: '/perusahaan'
      // },
      {
        title: 'Daftar Mitra',
        icon: Mitra,
        path: '/mitra'
      }
      // {
      //   sectionTitle: 'Pengaturan'
      // },
      // {
      //   title: 'Pengaturan Bobot Kriteria',
      //   icon: FilterSettings,
      //   path: '/pengaturan-rekomendasi'
      // },
      // {
      //   title: 'Table Kegiatan',
      //   icon: Table,
      //   path: '/template-table-list'
      // }

      // {
      //   sectionTitle: 'Pustaka'
      // },
      // {
      //   title: 'Induk Kegiatan',
      //   icon: CubeOutline,
      //   path: '/master-induk-kegiatan'
      // },
      // {
      //   title: 'Kode',
      //   icon: Login,
      //   path: '/master-kode'
      // },

      // {
      //   sectionTitle: 'User Interface'
      // },
      // {
      //   title: 'Typography',
      //   icon: Mitra,
      //   path: '/typography'
      // },
      // {
      //   title: 'Icons',
      //   path: '/icons',
      //   icon: GoogleCirclesExtended
      // },
      // {
      //   title: 'Cards',
      //   icon: CreditCardOutline,
      //   path: '/cards'
      // }
      // {
      //   title: 'Tables',
      //   icon: Table,
      //   path: '/tables'
      // }
      // {
      //   icon: CubeOutline,
      //   title: 'Form Layouts',
      //   path: '/form-layouts'
      // }
      // {
      //   icon: CubeOutline,
      //   title: 'iccon',
      //   path: '/iccon'
      // }
    ]
  } else if (userRole == 'employee' || userRole == 'bendahara' || userRole == 'verifikator' || userRole == 'ppspm') {
    // if (userRole == 'bendahara' || userRole == 'verifikator' || userRole == 'ppspm') {
    //   return [
    //     {
    //       sectionTitle: 'Pencairan'
    //     },
    //     {
    //       title: 'Pencairan',
    //       icon: Cash,
    //       path: '/pencairan'
    //     }
    //   ]
    // }
    return [
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/'
      },

      {
        title: 'Timeline',
        icon: TimeLine,
        path: '/timeline'
      },

      // {
      //   title: 'Daftar Rapat',
      //   icon: Login,
      //   path: '/rapat-ajuan-list'
      // },
      {
        sectionTitle: 'Kegiatan'
      },

      {
        title: 'List Kegiatan',
        icon: Table,
        path: '/project-list'
      },
      // {
      //   title: 'Sub Kegiatan',
      //   icon: CubeOutline,
      //   path: '/task'
      // },

      {
        sectionTitle: 'Tim Kerja'
      },
      {
        title: 'Tim Kerja',
        icon: CubeOutline,
        path: '/tim-kerja-list'
      },

      {
        sectionTitle: 'Pustaka'
      },

      {
        title: 'Daftar Pegawai',
        icon: Account,
        path: '/pegawai'
      },

      {
        title: 'Daftar Mitra',
        icon: Mitra,
        path: '/mitra'
      }
    ]
  } else if (userRole == 'admin') {
    return [
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/'
      },
      {
        title: 'Account Settings',
        icon: AccountCogOutline,
        path: '/account-settings'
      },
      {
        sectionTitle: 'Pages '
      },
      {
        title: 'Login',
        icon: Login,
        path: '/pages/login',
        openInNewTab: true
      },
      {
        title: 'Register',
        icon: AccountPlusOutline,
        path: '/pages/register',
        openInNewTab: true
      },
      {
        title: 'Error',
        icon: AlertCircleOutline,
        path: '/pages/error',
        openInNewTab: true
      },

      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/'
      },

      {
        title: 'Pengumuman',
        icon: CubeOutline,
        path: '/pengumuman'
      },
      {
        title: 'Timeline',
        icon: CubeOutline,
        path: '/timeline'
      },
      {
        sectionTitle: 'Rapat'
      },
      {
        title: 'Ajukan Rapat',
        icon: Login,
        path: '/rapat-create'
      },
      {
        title: 'Daftar Rapat',
        icon: Login,
        path: '/rapat-ajuan-list'
      },
      {
        sectionTitle: 'Kegiatan'
      },
      {
        title: 'Buat Kegiatan',
        icon: CreditCardOutline,
        path: '/create-project'
      },

      {
        title: 'List Kegiatan',
        icon: Table,
        path: '/project-list'
      },
      {
        title: 'Sub Kegiatan',
        icon: CubeOutline,
        path: '/task'
      },

      {
        sectionTitle: 'Pencairan'
      },
      {
        title: 'Pencairan',
        icon: Cash,
        path: '/pencairan'
      },

      {
        sectionTitle: 'Tim Kerja'
      },
      {
        title: 'Tim Kerja',
        icon: CubeOutline,
        path: '/tim-kerja-list'
      },
      {
        title: 'Buat Tim Kerja',
        icon: Login,
        path: '/create-tim-kerja'
      },

      {
        sectionTitle: 'Perusahaan'
      },
      {
        title: 'List Group Perusahaan',
        icon: Table,
        path: '/perusahaan-group-list'
      },
      {
        title: 'Buat Group Perusahaan',
        icon: Login,
        path: '/create-kegiatan-perusahaan'
      },

      {
        sectionTitle: 'Pustaka'
      },
      {
        title: 'Beban Kerja',
        icon: Elevator,
        path: '/beban-kerja'
      },
      {
        title: 'Daftar Pegawai',
        icon: Account,
        path: '/pegawai'
      },
      {
        title: 'Daftar Perusahaan',
        icon: GoogleCirclesExtended,
        path: '/perusahaan'
      },
      {
        title: 'Daftar Mitra',
        icon: FormatLetterCase,
        path: '/mitra'
      },
      {
        sectionTitle: 'Pengaturan'
      },
      {
        title: 'Pengaturan Bobot Kriteria',
        icon: FilterSettings,
        path: '/pengaturan-rekomendasi'
      },
      {
        title: 'Table Kegiatan',
        icon: Table,
        path: '/template-table-list'
      },

      {
        sectionTitle: 'Pustaka'
      },
      {
        title: 'Induk Kegiatan',
        icon: CubeOutline,
        path: '/master-induk-kegiatan'
      },
      {
        title: 'Kode',
        icon: Login,
        path: '/master-kode'
      },

      {
        sectionTitle: 'User Interface'
      },
      {
        title: 'Typography',
        icon: FormatLetterCase,
        path: '/typography'
      },
      {
        title: 'Icons',
        path: '/icons',
        icon: GoogleCirclesExtended
      },
      {
        title: 'Cards',
        icon: CreditCardOutline,
        path: '/cards'
      },
      {
        title: 'Tables',
        icon: Table,
        path: '/tables'
      },
      {
        icon: CubeOutline,
        title: 'Form Layouts',
        path: '/form-layouts'
      },
      {
        icon: CubeOutline,
        title: 'iccon',
        path: '/iccon'
      }
    ]
  }
}

export default navigation
