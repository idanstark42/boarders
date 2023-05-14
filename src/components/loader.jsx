import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

export default function Loader ({ open }) {
  return <Backdrop sx={{ zIndex: theme => theme.zIndex.drawer + 1, position: 'absolute', margin: '0 !important' }} open={open}>
    <CircularProgress color='primary' size={100} />
  </Backdrop>
}
