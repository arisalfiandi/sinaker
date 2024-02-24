'use strict'
// import linearAlgebra from 'linear-algebra'

// const Matrix = linearAlgebra.Matrix

import { create, all } from 'mathjs'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'

const config = {}
const math = create(all, config)

// General function to sort JSON array by attribute:
function sortedBy(elm) {
  return function order(a, b) {
    if (b[elm] > a[elm]) {
      return 1
    }
    if (b[elm] < a[elm]) {
      return -1
    }
    return 0
  }
}

const TableManageTaskList = () => {
  return (
    <>
      <Grid item md={12} xs={11}>
        test
      </Grid>
    </>
  )
}
function getBest(m, w, ia) {
  // ERROR HANDLERS

  // if (!m.data) {
  //   console.log('ERROR. Matrix argument MUST be a linear-algebra module matrix.')
  //   return 'ERROR'
  // }

  // if (Array.isArray(ia) === false) {
  //   console.log('ERROR. Impact argument MUST be an array.')
  //   return 'ERROR'
  // }

  // if (ia.length !== m._size[1]) {
  //   console.log('ERROR. Impact argument size MUST be equal to Alternative Matrix columns size.')
  //   return 'ERROR'
  // }

  // if (ia.every(i => typeof i === 'string') === false) {
  //   console.log('ERROR. Impact argument MUST contain string type elements.')
  //   return 'ERROR'
  // }

  // const c1 = ia.indexOf('max') > -1
  // const c2 = ia.indexOf('min') > -1

  // if (!(c1 || c2)) {
  //   console.log('ERROR. Impact argument MUST contain string type element exactly named "max" or "min" accordingly.')
  //   return 'ERROR'
  // }

  // if (Array.isArray(w) === false) {
  //   console.log('ERROR. Weights argument MUST be an array.')
  //   return 'ERROR'
  // }

  // if (w.length !== m._size[1]) {
  //   console.log('ERROR. Weights argument size MUST be equal to Alternative Matrix columns size.')
  //   return 'ERROR'
  // }

  let i = 0

  // for (i = 0; i < m._size[1]; i += 1) {
  //   if (w[i] > 1) {
  //     console.log('ERROR. The value from an element in the weights argument cannot be higher than 1.')
  //     return 'ERROR'
  //   }
  // }

  // function add(a, b) {
  //   return a + b
  // }

  // if (w.reduce(add, 0) > 1) {
  //   console.log('ERROR. Elements from the weights argument must sum exactly 1.')
  //   return 'ERROR'
  // }

  // Hitung jumlah kuadrat masing-masing kolom
  const columnSumsSquared = []

  // Hitung jumlah kuadrat masing-masing kolom
  for (let j = 0; j < m._size[1]; j++) {
    let sumSquared = 0
    for (let i = 0; i < m._size[0]; i++) {
      sumSquared += m._data[i][j] * m._data[i][j]
    }
    columnSumsSquared.push(Math.sqrt(sumSquared))
  }

  // Normalisasi matriks
  const nm = m._data.map(row => {
    return row.map((value, columnIndex) => {
      return value / columnSumsSquared[columnIndex]
    })
  })

  // Weighted normalised alternative matrix
  const wnm = nm.map(row => {
    return row.map((value, columnIndex) => {
      return value * w[columnIndex]
    })
  })

  // Computing ideal and anti-ideal solution
  const numberOfColumns = m._size[1]
  const idealSolutions = new Array(numberOfColumns).fill(0)
  for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
    let values = wnm.map(row => row[columnIndex])
    if (ia[columnIndex] == 'max') {
      idealSolutions[columnIndex] = Math.max(...values)
    } else {
      idealSolutions[columnIndex] = Math.min(...values)
    }
  }

  const aidealSolutions = new Array(numberOfColumns).fill(0)
  for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
    let values = wnm.map(row => row[columnIndex])
    if (ia[columnIndex] == 'max') {
      aidealSolutions[columnIndex] = Math.min(...values)
    } else {
      aidealSolutions[columnIndex] = Math.max(...values)
    }
  }

  // Calculate distance to ideal and antiideal solution
  const idistances = []
  const aidistances = []

  for (let row of wnm) {
    let idistance = 0
    let aidistance = 0
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      idistance += Math.pow(row[columnIndex] - idealSolutions[columnIndex], 2)
      aidistance += Math.pow(row[columnIndex] - aidealSolutions[columnIndex], 2)
    }
    idistance = Math.sqrt(idistance)
    idistances.push(idistance)
    aidistance = Math.sqrt(aidistance)
    aidistances.push(aidistance)
  }

  // calculate preference values
  const proximityScores = []

  for (let i = 0; i < idistances.length; i++) {
    const positiveDistance = idistances[i]
    const negativeDistance = aidistances[i]

    const proximityScore = negativeDistance / (positiveDistance + negativeDistance)
    proximityScores.push(proximityScore)
  }

  const indexedPerformanceScore = []
  i = 0
  for (i = 0; i < m._size[0]; i += 1) {
    const dp = {
      index: i,
      ps: proximityScores[i]
    }
    indexedPerformanceScore.push(dp)
  }

  const rankedPerformanceScore = indexedPerformanceScore.sort(sortedBy('index'))

  return rankedPerformanceScore
} // TERMINA FUNCION

export { getBest, TableManageTaskList }
