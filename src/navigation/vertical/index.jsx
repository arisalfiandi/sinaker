import { useEffect, useState } from 'react'

// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import Cash from 'mdi-material-ui/HandCoin'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import FilterSettings from 'mdi-material-ui/FilterSettings'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Account from 'mdi-material-ui/Account'
import Elevator from 'mdi-material-ui/Elevator'
import FormatLetterCase from 'mdi-material-ui/HandshakeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import Rapat from 'mdi-material-ui/CalendarClock'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { SettingsConsumer } from 'src/@core/context/settingsContext'
import { useSession } from 'next-auth/react'

const navigation = () => {
  const [userRole, setUserRole] = useState({})
  const session = useSession({})

  const getUserRole = async () => {
    setUserRole(session?.data?.role)
  }

  useEffect(() => {
    if (session.status === 'authenticated') {
      getUserRole()
    }
  }, [session])

  // console.log(userRole)
  // console.log('asdasdasdasdasdsa')

  if (userRole === 'teamleader' || userRole === 'pjk') {
    return [
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/'
      },
      {
        title: 'Timeline',
        icon: CalendarMonthIcon,
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
        title: 'Tambah Kegiatan',
        icon: CreditCardOutline,
        path: '/create-project'
      },

      {
        title: 'List Kegiatan',
        icon: Table,
        path: '/project-list'
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
        sectionTitle: 'Pustaka'
      },
      {
        title: 'Daftar Pegawai',
        icon: Account,
        path: '/pegawai'
      },
      {
        title: 'Daftar Mitra',
        icon: FormatLetterCase,
        path: '/mitra'
      },
      {
        title: 'Beban Kerja',
        icon: Elevator,
        path: '/beban-kerja'
      },
      {
        sectionTitle: 'Pengaturan'
      },
      // {
      //   title: 'Pengaturan Bobot Kriteria',
      //   icon: FilterSettings,
      //   path: '/pengaturan-rekomendasi'
      // },
      {
        title: 'Table Kegiatan',
        icon: Table,
        path: '/template-table-list'
      },
      {
        sectionTitle: 'Pencairan'
      },
      {
        title: 'Pencairan',
        icon: Cash,
        path: '/pencairan'
      }
    ]
  } else if (userRole == 'employee') {
    return [
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/'
      },

      {
        title: 'Timeline',
        icon: CalendarMonthIcon,
        path: '/timeline'
      },

      {
        title: 'Daftar Rapat',
        icon: Rapat,
        path: '/rapat-ajuan-list'
      },
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
        icon: FormatLetterCase,
        path: '/mitra'
      }
    ]
  } else if (userRole == 'admin2') {
    return [
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/'
      },
      // {
      //   title: 'Account Settings',
      //   icon: AccountCogOutline,
      //   path: '/account/1'
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

      // {
      //   title: 'Dashboard',
      //   icon: HomeOutline,
      //   path: '/'
      // },

      // {
      //   title: 'Pengumuman',
      //   icon: CubeOutline,
      //   path: '/pengumuman'
      // },
      {
        title: 'Timeline',
        icon: CalendarMonthIcon,
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
        icon: Rapat,
        path: '/rapat-ajuan-list'
      },
      {
        sectionTitle: 'Kegiatan'
      },
      {
        title: 'Tambah Kegiatan',
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
      // {
      //   title: 'Daftar Perusahaan',
      //   icon: GoogleCirclesExtended,
      //   path: '/perusahaan'
      // },
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
      }

      // {
      //   sectionTitle: 'Pustaka'
      // }
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
      //   icon: FormatLetterCase,
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
      // },
      // {
      //   title: 'Tables',
      //   icon: Table,
      //   path: '/tables'
      // },
      // {
      //   icon: CubeOutline,
      //   title: 'Form Layouts',
      //   path: '/form-layouts'
      // },
      // {
      //   icon: CubeOutline,
      //   title: 'iccon',
      //   path: '/iccon'
      // }
    ]
  } else if (userRole == 'verifikator' || userRole == 'ppspm' || userRole == 'bendahara') {
    return [
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/'
      },

      {
        title: 'Timeline',
        icon: CalendarMonthIcon,
        path: '/timeline'
      },

      {
        title: 'Daftar Rapat',
        icon: Rapat,
        path: '/rapat-ajuan-list'
      },
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
        sectionTitle: 'Pustaka'
      },

      {
        title: 'Daftar Pegawai',
        icon: Account,
        path: '/pegawai'
      },

      {
        title: 'Daftar Mitra',
        icon: FormatLetterCase,
        path: '/mitra'
      }
    ]
  } else if (userRole == 'pimpinan') {
    return [
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/'
      },

      {
        title: 'Timeline',
        icon: CalendarMonthIcon,
        path: '/timeline'
      },

      {
        title: 'Daftar Rapat',
        icon: Rapat,
        path: '/rapat-ajuan-list'
      },
      {
        sectionTitle: 'Kegiatan'
      },

      {
        title: 'List Kegiatan',
        icon: Table,
        path: '/project-list'
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
        icon: FormatLetterCase,
        path: '/mitra'
      }
    ]
  } else if (userRole == 'superAdmin') {
    return [
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/'
      },

      {
        title: 'Timeline',
        icon: CalendarMonthIcon,
        path: '/timeline'
      },

      {
        title: 'Daftar Rapat',
        icon: Rapat,
        path: '/rapat-ajuan-list'
      },
      {
        sectionTitle: 'Kegiatan'
      },

      {
        title: 'List Kegiatan',
        icon: Table,
        path: '/project-list'
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
        icon: FormatLetterCase,
        path: '/mitra'
      },
      {
        title: 'Beban Kerja',
        icon: Elevator,
        path: '/beban-kerja'
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
        sectionTitle: 'Pencairan'
      },
      {
        title: 'Pencairan',
        icon: Cash,
        path: '/pencairan'
      }
    ]
  } else if (userRole == 'admin') {
    return [
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
      }
      // {
      //   sectionTitle: 'Pengaturan'
      // },
      // // {
      // //   title: 'Pengaturan Bobot Kriteria',
      // //   icon: FilterSettings,
      // //   path: '/pengaturan-rekomendasi'
      // // },
      // {
      //   title: 'Table Kegiatan',
      //   icon: Table,
      //   path: '/template-table-list'
      // }
    ]
  }
}

export default navigation
