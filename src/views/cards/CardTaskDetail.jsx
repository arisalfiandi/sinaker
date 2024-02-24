import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

import { useState, useEffect } from 'react'

const statusObj = {
  0: { color: 'warning', status: 'On Progress' },
  1: { color: 'success', status: 'Done' }
}

const CardTaskDetail = props => {
  return (
    <>
      <Card>
        {/* <CardHeader title='Nama Project' sx={{ color: 'primary.dark' }}></CardHeader> */}
        <Grid container p={4}>
          <Grid item xs={8} md={10}>
            <Typography color={'primary.dark'} variant={'h4'}>
              {props.data.title}
            </Typography>
          </Grid>
          <Grid item xs={4} md={2} display={'flex'} justifyContent={'end'}>
            <Chip
              label={statusObj[props.data.target / props.data.realisasi === 1 ? 1 : 0].status}
              color={statusObj[props.data.target / props.data.realisasi === 1 ? 1 : 0].color}
              sx={{
                height: 24,
                fontSize: '0.75rem',
                width: 100,
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 }
              }}
            />
          </Grid>
          <Grid mt={1} item md={12}>
            <Typography variant={'body1'}></Typography>
          </Grid>
          <Grid justifyContent={'start'} mt={2} xs={6} item md={6}>
            <Typography textAlign={'start'} variant={'body1'}>
              {/* Target Kegiatan : 900 */}
            </Typography>
          </Grid>
          <Grid justifyContent={'end'} mt={2} xs={6} item md={6}>
            <Typography textAlign={'end'} variant={'body2'}>
              Due Date: {new Date(props.data.duedate).toLocaleDateString('id')}
            </Typography>
          </Grid>

          <Grid mt={2} item xs={12} md={12} height={200} overflow={'auto'}>
            <Divider sx={{ marginTop: 3.5 }} />
            <Typography variant={'body1'}>Deskripsi Kegiatan</Typography>
            <Typography variant={'body2'}>{props.data.description}</Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default CardTaskDetail
