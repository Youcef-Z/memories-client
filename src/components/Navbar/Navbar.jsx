import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom'
import memories from '../../images/memories.png'
import { style } from './styles'
import { useState, useEffect } from "react";
import { selectUser, setUser, logout } from "../../redux/auth";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from 'jwt-decode'

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)

  const logoutUser = () => {
    dispatch(logout())
    navigate('/')
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('profile'))?.token
      if (token) {
      const decodedToken = jwtDecode(token)
      if (decodedToken.exp < Date.now() / 1000) {
        logoutUser()
      }
    }

  }, [])

  return (
    <AppBar sx={style.appBar} position="static" color="inherit">
      <div style={style.brandContainer}>
        <Typography component={Link} to="/" sx={style.heading} variant="h2" align="center">Memories</Typography>
        <img style={style.image} src={memories} alt="memories" height="60" />
      </div>
      <Toolbar sx={style.toolbar}>
        {user ? ( // if user is logged in
          <div style={style.profile}>
            <Avatar sx={style.purple} alt={user.name} src={user.imageUrl}>
              {user.name.charAt(0)}
            </Avatar>
            <Typography sx={style.userName} variant="h6">{user.name}</Typography>
            <Button variant="contained" sx={style.logout} color="secondary" onClick={logoutUser}>Logout</Button>
          </div>
        ) : ( // if user is not logged in
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}