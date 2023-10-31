import Link from 'next/link'
import { Grid } from '@mui/material'

export default function Footer2() {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={styles.container}
        >
            <Grid style={styles.line} />
            <Grid style={styles.gridSpacing}>
                <p>&copy; Copyright 2023, All Rights Reserved</p>
            </Grid>
            <Grid 
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={styles.spacing}
            >
                <Grid style={styles.spacing}>
                    <Link href={'/privacy-policy'}>
                        <p>Privacy Policy</p>
                    </Link>
                </Grid>
                
                <Grid style={styles.spacing}>
                    <Link href={'/terms-of-service'}>
                        <p>Terms & Conditions</p>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
        )

}

const styles = {
    line: {
        width: '90%',
        height: 1,
        backgroundColor: '#D4D4D8',
        marginTop: '1rem',
        marginBottom: '1rem'
    },
    spacing: {
        margin: 10
    },
    gridSpacing: {
        marginTop: 30,
        marginBottom: 20
    },
    container: {
        color: '#797B89',
        backgroundColor: '#fff',
    }
}
