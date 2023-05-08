import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import Alert from '@mui/material/Alert'
import { GoogleLoginButton } from 'react-social-login-buttons'

import { useApp } from '../helpers/app'

import Page from '../components/structure/page'
import Paper from '../components/presentation/paper'

const FORMS = { LOGIN: 'login', SIGNUP: 'signup', SEND_RESET_PASSWORD_EMAIL: 'sendResetPasswordEmail', RESET_PASSWORD: 'resetPassword' }

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const emailError = email => (email.length > 0 && !EMAIL_REGEX.test(email)) ? 'invalid email' : false
const passwordError = password => (password.length > 0 && password.length < 7) ? 'password must be at least 7 characters' : false
const passwordConfirmationError = (password, confirmation) => (password.length > 0 && confirmation !== password) ? 'confirmation must match password' : false

const MESSAGE_TIME = 3000

export default function Auth () {
  const app = useApp()
  const navigate = useNavigate()
  const [state, setState] = useState({
    login: { email: '', password: '' },
    signup: { email: '', password: '', confirmation: '' },
    sendResetPasswordEmail: { email: '' },
    resetPassword: { token: '', tokenId: '', password: '' },
    focus: FORMS.LOGIN, loading: false, disabled: true,
    errors: {}, message: undefined
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    const tokenId = params.get('tokenId')
    setState(s => ({ ...s, resetPassword: { token, tokenId, password: '' }, focus: (token && tokenId) ? FORMS.RESET_PASSWORD : FORMS.LOGIN }))
  }, [])

  const change = (form, data) => setState({ ...state, [form]: { ...state[form], ...data } })
  const enable = () => setState({ ...state, disabled: false })
  const focus = newFocus => {
    setState({ ...state, focus: newFocus })
  }
  const setMessage = message => {
    setState({ ...state, message })
    setTimeout(() => setMessage(undefined), MESSAGE_TIME)
  }

  const submit = async (form, callback) => {
    await setState({ ...state, loading: true })
    try {
      await callback()
      await setState({ ...state, loading: false })
    } catch (error) {
      await setState({ ...state, errors: { [form]: (error.error || error.message) }, loading: false })
    }
  }

  const input = ({ name, form, placeholder, error, ...props }) => <TextField key={name} id={name} placeholder={placeholder || name} value={state[form][name]} onChange={e => change(form, { [name]: e.target.value })} {...props} error={Boolean(error)} helperText={error || undefined} />

  const login = () => {
    const action = async () => {
      await app.login(state.login)
      navigate('/')
    }

    return <>
      <Typography variant='h6' align='center'>LOGIN</Typography>
      {input({ form: FORMS.LOGIN, name: 'email', error: emailError(state.login.email) })}
      {input({ form: FORMS.LOGIN, name: 'password', type: 'password' })}
      <LoadingButton variant='contained' color='primary' onClick={() => submit(FORMS.LOGIN, action)} disabled={state.disabled} loading={state.loading}>login</LoadingButton>
      <Divider />
      <GoogleLoginButton onClick={() => app.login(app.providers.GOOGLE).then(() => navigate('/'))} />
      <Stack direction='row' justifyContent='space-between'>
        <Button onClick={() => focus(FORMS.SIGNUP)}>Register</Button>
        <Button onClick={() => focus(FORMS.SEND_RESET_PASSWORD_EMAIL)}>Forgot Password</Button>
      </Stack>
      {state.errors.login ? <Alert severity='error'>{state.errors.login}</Alert> : ''}
      {state.message ? <Alert severity='success'>{state.message}</Alert> : ''}
    </>
  }

  const signup = () => {
    const action = async () => {
      await app.registerUser(state.signup)
      navigate('/')
    }

    return <>
      <Typography variant='h6' align='center'>SIGN IN</Typography>
      {input({ form: FORMS.SIGNUP, name: 'email', error: emailError(state.signup.email) })}
      {input({ form: FORMS.SIGNUP, name: 'password', type: 'password', error: passwordError(state.signup.password) })}
      {input({ form: FORMS.SIGNUP, name: 'confirmation', type: 'password', error: passwordConfirmationError(state.signup.password, state.signup.confirmation) })}
      <LoadingButton variant='contained' color='primary' onClick={() => submit(FORMS.SIGNUP, action)} loading={state.loading}>sign up</LoadingButton>
      <Stack direction='row' justifyContent='space-between'>
        <Button onClick={() => focus(FORMS.LOGIN)}>I have a user</Button>
      </Stack>
      {state.errors.signup ? <Alert severity='error'>{state.errors.signup}</Alert> : ''}
    </>
  }

  const sendResetPasswordEmail = () => {
    const action = async () => {
      await app.sendResetPasswordEmail(state.sendResetPasswordEmail)
      focus(FORMS.LOGIN)
      setMessage('Password reset email sent. Please check you inbox.')
    }

    return <>
      <Typography variant='h6' align='center'>RESET PASSWORD</Typography>
      {input({ form: FORMS.SEND_RESET_PASSWORD_EMAIL, name: 'email', error: emailError(state.sendResetPasswordEmail.email) })}
      <LoadingButton variant='contained' color='primary' onClick={() => submit(FORMS.SEND_RESET_PASSWORD_EMAIL, action)} loading={state.loading}>send password reset email</LoadingButton>
      <Stack direction='row' justifyContent='space-between'>
        <Button onClick={() => focus('login')}>Go back to login</Button>
      </Stack>
      {state.errors.sendResetPasswordEmail ? <Alert severity='error'>{state.errors.sendResetPasswordEmail}</Alert> : ''}
    </>
  }

  const resetPassword = () => {
    const action = async () => {
      await app.resetPassword(state.resetPassword)
      focus(FORMS.LOGIN)
      setMessage('Password reset successful')
    }

    return <>
      <Typography variant='h6' align='center'>RESET PASSWORD</Typography>
      {input({ form: FORMS.RESET_PASSWORD, name: 'password', type: 'password', error: passwordError(state.resetPassword.password) })}
      {input({ form: FORMS.RESET_PASSWORD, name: 'confirmation', type: 'password', error: passwordConfirmationError(state.resetPassword.password, state.resetPassword.confirmation) })}
      <LoadingButton variant='contained' color='primary' onClick={() => submit(FORMS.RESET_PASSWORD, action)} loading={state.loading}>save password</LoadingButton>
      {state.errors.resetPassword ? <Alert severity='error'>{state.errors.resetPassword}</Alert> : ''}
    </>
  }

  const renderers = { login, signup, sendResetPasswordEmail, resetPassword }
  return <Page loading={!app} noSideMenu ignore={['narration']} justifyContent='center'>
  </Page>
}
