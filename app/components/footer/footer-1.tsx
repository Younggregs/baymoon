import Link from 'next/link'
import { Grid } from '@mui/material'
import Image from 'next/image'
import Logo from './logo'
import Icon from './icons'

export default function Footer1() {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={styles.container}
        >
            <Logo shade="dark" />
            <Grid 
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid style={styles.spacing}>
                    <Link href={'/privacy-policy'}>
                        <p>Features</p>
                    </Link>
                </Grid>
                
                <Grid style={styles.spacing}>
                    <Link href={'/terms-of-service'}>
                        <p>How it works</p>
                    </Link>
                </Grid>

                <Grid style={styles.spacing}>
                    <Link href={'/terms-of-service'}>
                        <p>Signin</p>
                    </Link>
                </Grid>
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
                        <Icon name="twitter" />
                    </Link>
                </Grid>
                
                <Grid style={styles.spacing}>
                    <Link href={'/terms-of-service'}>
                        <Icon name="facebook" />
                    </Link>
                </Grid>

                <Grid style={styles.spacing}>
                    <Link href={'/privacy-policy'}>
                        <Icon name="instagram" />
                    </Link>
                </Grid>
                
                <Grid style={styles.spacing}>
                    <Link href={'/terms-of-service'}>
                        <Icon name="linkedin" />
                    </Link>
                </Grid>
            </Grid>
        </Grid>
        )

}

const styles = {
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#D4D4D8',
        margin: 10
    },
    spacing: {
        margin: 10
    },
    gridSpacing: {
        marginTop: 30,
        marginBottom: 20
    },
    container: {
        color: '#000',
        backgroundColor: '#fff'
    }
}
