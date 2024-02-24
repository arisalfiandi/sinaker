import { useState, useEffect } from 'react'

import FormMitraEdit from 'src/views/form-layouts/FormMitraEdit'
const MitraEditViews = props => {
  const [mitra, setMira] = useState(props.data)
  return (
    <>
      <FormMitraEdit data={mitra}></FormMitraEdit>
    </>
  )
}

export default MitraEditViews
