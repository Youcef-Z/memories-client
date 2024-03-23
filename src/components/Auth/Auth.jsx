import { Avatar, Button, Paper, Grid, Typography, Container, TextField, Grow } from '@mui/material'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode"

import { style } from './styles'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Input from './Input'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, signup, setUser, selectError, selectLoading, selectUser } from '../../redux/auth'
import { useNavigate } from 'react-router-dom'
import { doesEmailExist } from '../../api'

import axios from 'axios'

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector(selectError)
  const loading = useSelector(selectLoading)
  const user = useSelector(selectUser)

  useEffect(() => {
    if(user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignup) {
      dispatch(signup(formData))
    } else {
      dispatch(login(formData))
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
    setShowPassword(false)
  }

  const validateEmail = async () => {
    const email = formData.email
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      const { data } = await doesEmailExist(email)
      if (data.result === true) {
        setEmailError('Email already exists')
      } else {
        setEmailError('')
      } 
    } else {
      setEmailError('Invalid email')
    }
  }

  const googleSuccess = async (res) => {
    if (res) {
      const userObj = jwtDecode(res.credential)
      try {
        dispatch(setUser(userObj))
        const data = await axios.post('http://localhost:5000/user/auth/google', { token: res.credential })
        localStorage.setItem('profile', JSON.stringify({ ...data.data }))
        navigate('/')

      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Container sx={style.container} component="main" maxWidth="xs">
      <Grow in>
      <Paper sx={style.paper} elevation={3}>
        <Avatar sx={style.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form style={style.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} handleValidation={validateEmail} type="email" />
            {isSignup && emailError && <Typography sx={style.error}>{emailError}</Typography>}
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={() => setShowPassword(!showPassword)} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={style.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
            <GoogleLogin 
              onSuccess={googleSuccess}
              onError={() => {
                console.log('Login Failed')
              }}
              useOneTap 
            />
          </div>
          {error && <Typography sx={style.error}>{error}</Typography>}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>{isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      </Grow>
    </Container>
  )
}