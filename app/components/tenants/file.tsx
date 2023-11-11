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

export default function File({fileObj}: {fileObj: any}) {
    const [file, setFile] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [errorMessage, setError] = React.useState(false)
    const [success, setSuccess] = React.useState(false)

    const [updateTenantFileResult, updateTenantFile] = useMutation(UPDATE_TENANT_FILE);

    const submit = () => {
        setIsLoading(true);
        const data = {
            id: fileObj?.id,
            file
        }
        updateTenantFile(data).then(result => {
            setIsLoading(false)
            const res = result?.data?.updateTenantFile as any
            if (result.error) {
                setError(res?.errors[0]?.message)
            }else if(!res?.success){
                setError(res?.errors.message)
            }
            else{
                setSuccess(true)
            }
            
        });
    }

    const {getRootProps, getInputProps} = useDropzone({
        accept: {
          'image/*': []
        },
        onDrop: acceptedFiles => {
            setFile( Object.assign(acceptedFiles[0], {preview: URL.createObjectURL(acceptedFiles[0])} ));
        }
      });

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
                        {!file?.preview && !fileObj?.image && (
                            <ContactPageIcon style={{margin: 'auto', fontSize: 200}}/>
                        )}

                        {!file?.preview && fileObj?.image && (
                            <Image 
                                src={fileObj?.image} 
                                style={{backgroundSize: 'cover', borderRadius: '20px'}}
                                height={200}
                                width={200}
                                alt="profile image"
                            />
                        )}

                        {file?.preview && (
                            <Image 
                                src={file.preview} 
                                style={{backgroundSize: 'cover', borderRadius: '20px'}}
                                height={200}
                                width={200}
                                alt="profile image"
                            />
                        )}   
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Grid {...getRootProps({className: 'dropzone'})}>
                            <input {...getInputProps()} />
                            <IconButton>
                                <EditIcon style={{color: '#228B22'}}/>
                            </IconButton>
                        </Grid>
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
                    {fileObj?.title}
                </Typography>

                <Grid
                    container
                    style={{marginTop: '15px'}}
                    alignItems="center"
                    justifyContent="center"
                    direction={'column'}
                >
                    {success ? (
                        <Typography style={{color: 'green'}}>
                            File Saved Successfully
                        </Typography>
                    ) : (
                        <Typography style={{color: 'red'}}>
                            {errorMessage}
                        </Typography>
                    )}
                {isLoading ? <ActivityIndicator /> : 
                (
                    <Button 
                        variant="contained" 
                        onClick={submit}
                        style={{
                            backgroundColor: '#228B22', 
                            height: '50px',
                            color: '#fff',
                            borderRadius: '10px',
                            fontWeight: 'bold',
                            width: '250px'
                        }}
                    >
                        Save
                    </Button>
                )}
                </Grid>
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