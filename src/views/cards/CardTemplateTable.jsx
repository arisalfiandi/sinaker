// ** Third Party Imports
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Mui Import
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'

import { useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import { styled } from '@mui/material/styles'

// icon
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import ClipboardFileOutline from 'mdi-material-ui/ClipboardFileOutline'
import LockOutline from 'mdi-material-ui/LockOutline'
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined'
import BackupTableTwoToneIcon from '@mui/icons-material/BackupTableTwoTone'

const CardProjectDetails = props => {
  const [data, setData] = useState(props.dataTemplateTable)
  const router = useRouter()
  console.log(data)
  const { id } = props.dataTemplateTable.id
  return (
    <Card>
      <CardContent key={id} sx={{ padding: theme => `${theme.spacing(0, 0, 0, 0)} !important` }}>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Box padding={4}>
              <Typography variant='body1' sx={{ marginBottom: 3.5, fontWeight: 600 }}>
                {data.nama}
              </Typography>
              <Divider sx={{ marginTop: 1.5 }} />
              <Grid justifyContent='start' display='flex'>
                <Link onClick={e => router.push(`/template-table-detail/${data.id}`)}>
                  <Button sx={{ mt: 1 }} variant='contained' size={'small'}>
                    Selengkapnya
                  </Button>
                </Link>
              </Grid>
            </Box>
          </Grid>
          <Grid
            sx={{ backgroundColor: 'action.hover' }}
            item
            xs={3}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Box alignItems={'center'}>
              <BackupTableTwoToneIcon fontSize='large'></BackupTableTwoToneIcon>
              {/* <Typography textAlign={'center'} variant='h5'>
                1
              </Typography>
              <Typography variant='body2'>Orang</Typography> */}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardProjectDetails
