import { deepPurple } from "@mui/material/colors"

export const style = {
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    flexDirection: { sm: "column", md: "row" },
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
    
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',

    width: { sm: 'auto', md: '400px'},
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    width: { sm: 'auto', md: '400px'},
    marginTop: { sm: 20 },
    justifyContent: { sm: 'center', md: 'space-between' },
    
  },
  logout: {
    marginLeft: '20px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: 'white',
    backgroundColor: deepPurple[500],
    marginRight: '10px',
  },
}