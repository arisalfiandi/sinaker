// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'

import { Doughnut } from 'react-chartjs-2'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

// circular bar
import CircularProgress from '@mui/material/CircularProgress'

const CardProjectDetailProgress = props => {
  const [task, setTask] = useState(props.data)

  const theme = useTheme()
  const images = [
    {
      label: 'San Francisco – Oakland Bay Bridge, United States',
      imgPath: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60'
    },
    {
      label: 'Bird',
      imgPath: 'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60'
    },
    {
      label: 'Bali, Indonesia',
      imgPath: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250'
    },
    {
      label: 'Goč, Serbia',
      imgPath: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
    }
  ]
  const untukChart =
    props.data.length > 0
      ? props.data.map(subkeg => ({
          label: subkeg.title,
          target: subkeg.target,
          realisasi: subkeg.realisasi
        }))
      : [{ label: 'Belum ada sub kegiatan', target: 0, realisasi: 0 }]
  console.log(untukChart)

  const dataDoughnut = {
    datasets: [
      {
        data: [30, 10],
        backgroundColor: [
          // 'rgba(49, 10, 49,1)',
          // 'rgba(115, 93, 120,1)'
          'rgba(167, 196, 194,1)',
          'rgba(151, 239, 233,1)'
          // 'rgba(255, 159, 64,1)'
        ]
      }
    ],

    // labels: ['Sosial', 'Produksi', 'IPDS', 'Distribusi', 'Nerwilis']
    labels: ['Total Target yang Belum Terealisasi', 'Total Realisasi ']
  }

  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = untukChart.length

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleStepChange = step => {
    setActiveStep(step)
  }

  const totalRealisasi = task.reduce((accumulator, currentTask) => accumulator + currentTask.realisasi, 0)
  const totalTarget = task.reduce((accumulator, currentTask) => accumulator + currentTask.target, 0)
  const projectProgress =
    task.realisasi !== undefined && task.realisasi !== null ? 100 * (totalRealisasi / totalTarget) : 0

  return (
    <>
      <Card sx={{ height: 350, overflowY: 'none' }}>
        <CardHeader
          title='Progress Kegiatan'
          sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}
          titleTypographyProps={{ sx: { lineHeight: '1.2 !important', letterSpacing: '0.31px !important' } }}
        />
        <CardContent>
          {/* <Grid container>
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
          </Grid> */}
          <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
            <Paper
              square
              elevation={0}
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: 50,
                pl: 2
              }}
            >
              <Typography>{untukChart[activeStep].label}</Typography>
            </Paper>
            <AutoPlaySwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {untukChart.map((step, index) => (
                <div key={step.label}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <>
                      {/* <Box
                        component='img'
                        sx={{
                          height: 255,
                          display: 'block',
                          maxWidth: 400,
                          overflow: 'hidden',
                          width: '100%'
                        }}
                        src={step.imgPath}
                        alt={step.label}
                      /> */}
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
                              {step.target !== undefined &&
                              step.target !== null &&
                              step.target !== 0 &&
                              step.realisasi !== 0 &&
                              step.realisasi !== undefined &&
                              step.realisasi !== null
                                ? Math.round((100 * step.realisasi) / step.target)
                                : 0}
                              %
                              {/* {Math.round(
                                task.length > 0 &&
                                  task.every(item => item.realisasi !== undefined && item.realisasi !== null) &&
                                  task.every(item => item.target !== undefined && item.target !== null)
                                  ? task.reduce((acc, cur) => acc + cur.realisasi, 0) == 0
                                    ? 0
                                    : 100 *
                                      (task.reduce((acc, cur) => acc + cur.realisasi, 0) /
                                        task.reduce((acc, cur) => acc + cur.target, 0))
                                  : 0
                              )} */}
                            </Typography>
                            <CircularProgress
                              size={170}
                              value={Math.round(
                                step.target !== undefined &&
                                  step.target !== null &&
                                  step.target !== 0 &&
                                  step.realisasi !== 0 &&
                                  step.realisasi !== undefined &&
                                  step.realisasi !== null
                                  ? Math.round((100 * step.realisasi) / step.target)
                                  : 0
                              )}
                              variant='determinate'
                              sx={{ marginBottom: 1 }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      {/* <Doughnut data={dataDoughnut} key={step.label} width={200} height={100} /> */}
                    </>
                  ) : // <Typography>{step.imgPath} - {step.imgPath} </Typography>
                  null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
              steps={maxSteps}
              position='static'
              activeStep={activeStep}
              nextButton={
                <Button size='small' onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                  Next
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
                </Button>
              }
            />
          </Box>
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
