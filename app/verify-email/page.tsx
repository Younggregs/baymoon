"use client";
import * as React from "react";
import styles_ from "../page.module.css";
import {
  TextField,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import ActivityIndicator from "../components/activity-indicator";
import { cardWidth } from "../lib/constants";
import { useMutation } from "urql";
import { VERIFY_EMAIL } from "../utils/mutations";
import { useSearchParams } from "next/navigation";
import Footer2 from "../components/footer/footer-2";
// import Logo from "../components/logo";

export default function VerifyEmail() {
  const [emailSent, setEmailSent] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const searchParams = useSearchParams()
  const token = searchParams?.get('token')

  const [verifyEmailResult, verifyEmail] = useMutation(VERIFY_EMAIL);

  const submit = async () => {
    setIsLoading(true);
    const data = {
      email,
      type: "signup"
    };
    verifyEmail(data).then((result) => {
      setIsLoading(false);
      if (result.error) {
        console.error("Oh no!", result.error);
      }
      setEmailSent(true);
    });
    
  };

  const mute = () => {
    return email.length > 0;
  };

  return (
    <main className={styles_.main1} style={{backgroundColor: '#fff'}}>

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

      <Grid 
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          
          {emailSent ? (
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{m:2, width: cardWidth, color: '#000'}}
            >
              <h2>
                  Email Sent!
              </h2>
              <p>
                  Signin email sent. <br />
                  Check your email for a magic link to continue.
              </p>
          </Grid>

          ): (
          <Grid>
            <Grid style={styles.spacing}>
              <p style={styles.title}>Sign In</p>
              <p style={styles.text}>Enter your email address to proceed</p>
            </Grid>

            <TextField
              sx={{ m: 1, width: cardWidth }}
              id="email"
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ m: 1, width: cardWidth }}
            >
              {isLoading ? (
                <ActivityIndicator />
              ) : (
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
  containerTitle: {
    backgroundColor: '#fff',
    height: '100vh',
    padding: '0 1rem',
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
  }
};
