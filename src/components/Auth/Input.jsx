import { TextField, Grid, InputAdornment, IconButton } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export default function Input({ name, label, autoFocus, type, half,  handleShowPassword, handleValidation, handleChange }) {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField 
        name={name}
        onChange={handleChange}
        onBlur={handleValidation}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={name === 'password' ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                {type === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        } : null}
      />

    </Grid>
  )
}