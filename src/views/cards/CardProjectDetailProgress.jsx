// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import Grid from '@mui/material/Grid'

import Divider from '@mui/material/Divider'

import CardHeader from '@mui/material/CardHeader'
import * as React from 'react'

// circular bar
import CircularProgress from '@mui/material/CircularProgress'

const CardProjectDetailProgress = props => {
  const [task, setTask] = useState(props.data)
  console.log('progres')
  console.log(task)
  const totalRealisasi = task.reduce((accumulator, currentTask) => accumulator + currentTask.realisasi, 0)
  const totalTarget = task.reduce((accumulator, currentTask) => accumulator + currentTask.target, 0)
  const projectProgress =
    task.realisasi !== undefined && task.realisasi !== null ? 100 * (totalRealisasi / totalTarget) : 0

  return (
    <>
      <Card sx={{ height: 350, overflowY: 'scroll' }}>
        <CardHeader
          title='Progress Kegiatan'
          titleTypographyProps={{ sx: { lineHeight: '1.2 !important', letterSpacing: '0.31px !important' } }}
        />
        <CardContent>
          <Grid container>
            <Grid container justifyContent='center' alignItems='center'>
              <Grid
                // bgcolor={'primary.light'}
                justifyContent='center'
                alignItems='center'
                display={'flex'}
                item
                md={12}
                style={{ position: 'relative' }}
              >
                <Typography
                  textAlign={'center'}
                  mt={0}
                  variant='h1'
                  sx={{
                    fontWeight: 600,
                    fontSize: '3.5rem !important',
                    position: 'absolute',
                    zIndex: 1
                  }}
                >
                  {Math.round(
                    task.length > 0 &&
                      task.every(item => item.realisasi !== undefined && item.realisasi !== null) &&
                      task.every(item => item.target !== undefined && item.target !== null)
                      ? task.reduce((acc, cur) => acc + cur.realisasi, 0) == 0
                        ? 0
                        : 100 *
                          (task.reduce((acc, cur) => acc + cur.realisasi, 0) /
                            task.reduce((acc, cur) => acc + cur.target, 0))
                      : 0
                  )}
                  %
                </Typography>
                <CircularProgress
                  size={170}
                  value={Math.round(
                    task.length > 0 &&
                      task.every(item => item.realisasi !== undefined && item.realisasi !== null) &&
                      task.every(item => item.target !== undefined && item.target !== null)
                      ? task.reduce((acc, cur) => acc + cur.realisasi, 0) == 0
                        ? 0
                        : 100 *
                          (task.reduce((acc, cur) => acc + cur.realisasi, 0) /
                            task.reduce((acc, cur) => acc + cur.target, 0))
                      : 0
                  )}
                  variant='determinate'
                  sx={{ marginBottom: 1 }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: 3.5 }} />
          <Typography textAlign={'center'} mt={4} variant={'body2'}>
            {/* "this is for quote lorem ipsum dolor dolor si Amet" */}
          </Typography>
          <Typography textAlign={'center'} variant={'body2'}>
            -
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default CardProjectDetailProgress
