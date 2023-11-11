import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ActivityIndicator from "../activity-indicator";
import { useDropzone } from "react-dropzone";
import Image from 'next/image';
import { UPDATE_TENANT_FILE } from "@/app/utils/mutations";
import { useMutation } from "urql";
import Divider from "@mui/material/Divider";
import Link from "next/link";

export default function FileView({file}: {file: any}) {

    return(
        <Box>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
                <Grid 
                    style={style.imageContainer}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid
                        container
                        style={{width: '200px', height: '200px'}}
                    >
                        {!file?.image ? (
                            <ContactPageIcon style={{margin: 'auto', fontSize: 200}}/>
                        ) : (
                            <Link href={file?.image}>
                                <Image 
                                    src={file?.image} 
                                    style={{backgroundSize: 'cover', borderRadius: '20px'}}
                                    height={200}
                                    width={200}
                                    alt="profile image"
                                />
                            </Link>
                        )}

                    </Grid>
                </Grid>
          </Grid>

        <Grid 
            sx={{mt: 1}}
            container
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Typography fontWeight={'bold'}>
                {file?.title}
            </Typography>
        </Grid>
        <Divider style={{margin: '10px'}} />
        </Box>
    )
}

const style = {
    imageContainer: {
        display: 'flex',
        height: 250,
        width: 250,
        borderRadius: '20px',
    },
  };