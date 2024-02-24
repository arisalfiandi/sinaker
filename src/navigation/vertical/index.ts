// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import FilterSettings from 'mdi-material-ui/FilterSettings'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Account from 'mdi-material-ui/Account'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { SettingsConsumer } from 'src/@core/context/settingsContext'

const navigation = (): VerticalNavItemsType => {
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
      icon: CubeOutline,
      path: '/timeline'
    },
    // {
    //   title: 'Buat Rapat',
    //   icon: Login,
    //   path: '/rapat-create'
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
    {
      title: 'Sub Kegiatan',
      icon: CubeOutline,
      path: '/task'
    },

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
    }

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
    //   title: 'Daftar Rapat',
    //   icon: GoogleCirclesExtended,
    //   path: '/rapat-list'
    // }
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
}

export default navigation
