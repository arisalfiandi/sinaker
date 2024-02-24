import TableTask from '../tables/TableTask'
import Grid from '@mui/material/Grid'

const TaskViews = props => {
  return (
    <>
      <Grid container spacing={4}>
        <TableTask data={props.data}></TableTask>
      </Grid>
    </>
  )
}

export default TaskViews
