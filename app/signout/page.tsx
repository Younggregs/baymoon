"use client"
import * as React from "react"
import { useRouter } from 'next/navigation';
import styles from '../page.module.css'
import Grid from "@mui/material/Grid";
import ActivityIndicator from "../components/activity-indicator";

export default function Signout() {
    const router = useRouter()

    React.useEffect(() => {
        localStorage.clear();
        router.push('/')
    })
    
    return (
        <main className={styles.main}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ m: 2, width: "100%", height: "100vh" }}
            >
                <ActivityIndicator />
            </Grid>
        </main>
    )
}