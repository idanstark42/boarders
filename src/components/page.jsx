import { Fragment } from 'react'
import Stack from '@mui/material/Stack'

import { Protected } from '../helpers/app'
import Loader from './loader'

export default function Page ({ children, loading, authorizedOnly, fullWidth, fullHeight, ...props }) {
  const Container = authorizedOnly ? Protected : Fragment
  const padding = fullWidth ? 0 : Page.padding

  return <Container>
    <Loader loading={Boolean(loading)} />
    <Stack alignItems='center' justifyContent='flex-start' sx={{ width: '100vw', paddingLeft: padding, paddingRight: padding, marginTop: fullHeight ? 0 : '4rem', height: fullHeight ? '100%' : 'calc(100% - 4rem)', '> :only-child': { width: '100%', height: 'calc(100% - 2rem)' } }} spacing={2} {...props}>
      {children}
    </Stack>
  </Container>
}

Page.padding = ['1rem', '5vw', '10vw', '10vw']
