import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const defaultTheme = createTheme();

export default function SignIn() {

  const [emptyEmailError, setEmptyEmailError] = useState(false)
  const [emptyPassError, setEmptyPassError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passError, setPassError] = useState(false)

  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const curUser = {
      email: data.get('email'),
      password: data.get('password'),
    }

    if (curUser.email === '')
      setEmptyEmailError(true)
    else setEmptyEmailError(false)


    if (curUser.password === '')
      setEmptyPassError(true)
    else setEmptyPassError(false)




    if (curUser.email === '' || curUser.password === '') return

    const oriPass = localStorage.getItem(curUser.email)

    if (oriPass === null) {
      console.log('not exist')
      setEmailError(true)
      setPassError(false)
    }
    else if (oriPass !== curUser.password) {
      console.log('wrong pass')
      setEmailError(false)
      setPassError(true)
    } else {
      localStorage.setItem("active", curUser.email);
      navigate('/')
    }

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emptyEmailError}
            />
            {emailError ?
              <Link href="/signup" color={'#FF0000'}>
                {"Email Doesn't Exists CREATE AN ACCOUNT"}
              </Link>
              :
              <></>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={emptyPassError}
            />
            {passError ? <div className=' text-red-500'>{`Wrong Password !!`}</div> : <></>}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}