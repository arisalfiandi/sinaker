// ** Third Party Imports
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Mui Import

import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/dist/client/router'
import { styled } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'

// icon

import CardTemplateTable from 'src/views/cards/CardTemplateTable'

const TemplateTableListViews = props => {
  const router = useRouter()
  const [cardTemplateTable, setCardTemplateTable] = useState(
    props.dataTemplateTable.map(data => {
      return {
        ...data
      }
    })
  )

  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <Typography variant='h5'>Template Table</Typography>
        </Grid>

        <Grid item md={6} xs={12} display={'flex'} justifyContent={'end'}>
          <Link onClick={e => router.push(`/create-template-table`)}>
            <Button variant={'contained'}>Buat Template Table</Button>
          </Link>
        </Grid>
        <Grid item md={12}>
          {' '}
          <Grid container spacing={6}>
            {cardTemplateTable.length > 0 ? (
              cardTemplateTable.map(group => (
                <>
                  <Grid key={group.id} item md={4} xs={12}>
                    <CardTemplateTable dataTemplateTable={group}></CardTemplateTable>
                  </Grid>
                </>
              ))
            ) : (
              <>
                <Grid item md={12} xs={12}>
                  <Typography>Tidak Template Table</Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default TemplateTableListViews
