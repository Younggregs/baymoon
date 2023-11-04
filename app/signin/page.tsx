"use client";
import * as React from "react";
import stylesMain from "../page.module.css";
import {
  TextField,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import FormError from "../components/errors/form-error"
import ActivityIndicator from "../components/activity-indicator";
import { cardWidth } from "../lib/constants";
import { useMutation, useQuery } from 'urql';
import { LOGIN, SIGNUP } from "../utils/mutations";
import { useRouter, useSearchParams } from 'next/navigation'
import { VERIFY_EMAIL_TOKEN } from "../utils/queries";
import Footer2 from "../components/footer/footer-2";
import user from "../lib/user-details";
// import Logo from "../components/logo";

export default function Signup() {
  const router = useRouter()

  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [phone_number, setPhoneNumber] = React.useState("");
  const [errors, setErrors] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false);

  const searchParams = useSearchParams()

  const token = searchParams?.get('token')
  const pollToken = searchParams?.get('poll')

  const [res] = useQuery({query: VERIFY_EMAIL_TOKEN, variables: {token, type: 'signup'}});

  const { data, fetching, error } = res;

  const [signupResult, signup] = useMutation(SIGNUP);
  const [loginResult, login] = useMutation(LOGIN);

  const submit = async () => {
    setIsLoading(true);
    const password = data?.verifyEmailToken.rawToken
    const email = data?.verifyEmailToken.email

    const first_name_ = first_name || data?.verifyEmailToken?.firstName
    const last_name_ = last_name || data?.verifyEmailToken?.lastName
    const phone_number_ = phone_number || data?.verifyEmailToken?.phoneNumber
    const permissions = data?.verifyEmailToken?.permissions || ['*']
    const data_ = {
        first_name: first_name_,
        last_name: last_name_,
        phone_number: phone_number_,
        email,
        password
    }
    signup(data_).then(result => {
      const res = result?.data?.signup as any
      if (result.error) {
        console.error('Oh no!', result.error);
      }else if(!res?.success){
        setErrors(res?.errors.message)
      }
      else{
        localStorage.setItem('first_name', first_name_);
        localStorage.setItem('last_name', last_name_)
        localStorage.setItem('phone_number', phone_number_)
        localStorage.setItem('email', email)
        localStorage.setItem('permissions', permissions)
        processLogin({ email, password})
      }
    });
    
  }

  const processLogin = async (data: any) => {
    login(data).then(result => {
      setIsLoading(false);
      if (result.error) {
        console.error('Oh no!', result.error);
      }
      localStorage.setItem('token', result.data.tokenAuth.token);
      redirectTo()
    });
  }

  const redirectTo = () => {
      router.push('/')
  }

  const mute = () => {
    if(!data?.verifyEmailToken.isReturning){
      return first_name && last_name && phone_number;
    }
    return true;
  }

  return (
    <main className={stylesMain.main1} style={{backgroundColor: '#fff'}}>
      <Grid container>
        <Grid 
          style={styles.headerBox} 
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-end"
        >
          <Typography
            variant="h3"
            sx={{color: '#000'}}
          >
            Baymoon
          </Typography>
        </Grid>
      </Grid>

      <Grid>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >

        {fetching && (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid>
              <h2>Verifying Token...</h2>
            </Grid>
            <ActivityIndicator />
          </Grid>
          )}

          {!fetching && !data.verifyEmailToken && (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
              <h2>Something went wrong.</h2>
              <p>- Invalid link</p>
          </Grid>
        )}

        {!fetching && data.verifyEmailToken && (
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid style={styles.spacing}>
              <p style={styles.title}>Sign In</p>
            </Grid>
          {!data?.verifyEmailToken.isReturning ? (
            <Grid>
              <TextField 
                sx={{ m: 1, width: cardWidth }} 
                id="first_name" 
                label="First Name" 
                variant="outlined" 
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField 
                sx={{ m: 1, width: cardWidth }} 
                id="last_name" 
                label="Last Name" 
                variant="outlined" 
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField 
                sx={{ m: 1, width: cardWidth }} 
                id="phone_number" 
                label="Phone Number" 
                variant="outlined" 
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Grid>
           ) : (
            <Grid>
              <p style={styles.text}>
                Hello {data?.verifyEmailToken.firstName} {data?.verifyEmailToken.lastName}, <br />
                Pick up right where you left off</p>
            </Grid>
           )}
          
          {errors !== '' && (
            <FormError message={errors} />
          )}
          <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ m: 1, width: cardWidth }} 
              >
          {isLoading ? (
              <ActivityIndicator />
          ): (
          <Button 
              sx={styles.button}
              variant="contained"
              onClick={submit}
              disabled={!mute()}
          >
              Continue
          </Button>
          )}
          </Grid>
        </Grid>
        )}
      </Grid>
      </Grid>
      <Grid
        container
      >
        <Footer2 />
      </Grid>
    </main>
  );
}

const styles = {
  input: {
    backgroundColor: "#fff",
  },
  button: {
    m: 2, 
    width: "30ch", 
    backgroundColor: "#E14817", 
    borderRadius: "10px",
    height: "3rem",
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#000',
    margin: '0',
    padding: '0',
  },
  text: {
    fontSize: '1rem',
    fontWeight: 'normal',
    margin: '0',
    padding: '0',
    color: '#000'
  },
  spacing: {
    marginBottom: '3rem',
  },
  headerBox: {
    height: "30vh",
    width: "100%",
    backgroundColor: "#fff",
    backgroundImage: "url(/ellipse.svg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    padding: "0 1rem",
  },
  formBox: {
    backgroundColor: "#fff",
  },
};
