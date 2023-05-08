import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

export default function Loader ({ loading }) {
  return <Backdrop sx={{ zIndex: theme => theme.zIndex.drawer + 1, position: 'absolute', margin: '0 !important' }} open={loading}>
    <CircularProgress color='white' size={100} />
  </Backdrop>
}
