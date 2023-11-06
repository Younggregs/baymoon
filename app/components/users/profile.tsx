import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import React from "react";
import Button from "@mui/material/Button";
import ActivityIndicator from "../activity-indicator";
import user from "@/app/lib/user-details";
import { useDropzone } from "react-dropzone";
import Image from 'next/image'
import { UPDATE_USER } from "@/app/utils/mutations";
import { useMutation } from "urql";

export default function Profiel() {
    const [first_name, setFirstName] = React.useState(user().first_name);
    const [last_name, setLastName] = React.useState(user().last_name);
    const email = user().email;
    const title = user().title;
    const [phone_number, setPhoneNumber] = React.useState(user().phone_number);
    const [file, setFile] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const [updateUserResult, updateUser] = useMutation(UPDATE_USER);

    console.log('file', file)

    const submit = () => {
        setIsLoading(true);
        const data = {
            first_name,
            last_name,
            phone_number,
            file
        }
        console.log('data', data)
        updateUser(data).then(result => {
            setIsLoading(false)
            const res = result?.data?.updateUser as any
            if (result.error) {
              console.error('Oh no!', result.error);
            }else if(!res?.success){
              console.log(res?.errors.message)
            }
            else{
                console.log('control reached here', res)
                localStorage.setItem('first_name', res?.user.firstName);
                localStorage.setItem('last_name', res?.user.lastName);
                localStorage.setItem('phone_number', res?.user.phoneNumber);
                localStorage.setItem('profile_picture', res?.user.profilePicture)
                localStorage.setItem('title', res?.user?.title || '')
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
        <Box sx={style.container}>
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
                        {!file.preview && !user().profile_picture && (
                            <ContactPageIcon style={{margin: 'auto', fontSize: 200}}/>
                        )}

                        {!file.preview && user().profile_picture && (
                            <Image 
                                src={user().profile_picture} 
                                style={{backgroundSize: 'cover', borderRadius: '20px'}}
                                height={200}
                                width={200}
                                alt="profile image"
                            />
                        )}

                        {file.preview && (
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
                                <EditIcon style={{color: '#ff0000'}}/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
          </Grid>

          <Grid sx={{mt: 5}}>
                <Grid item xs={12} md={6}>
                    <Grid
                    spacing={2} 
                    style={{marginTop: '5px'}}
                    direction="column"
                    item 
                    xs={12}
                    sm={6}
                    >
                        <Typography fontWeight={'bold'}>
                            First Name
                        </Typography>
                        <input
                            type="text"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            style={{
                                width: '100%',
                                height: '50px', 
                                padding: '12px 20px',
                                margin: '8px 0',
                                backgroundColor: '#fff',
                                color: '#000',
                                fontSize: '16px',
                                outline: 'none',
                                boxSizing: 'border-box',
                                border: '1px solid #000',
                                borderRadius: '5px',
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid
                    spacing={2} 
                    style={{marginTop: '5px'}}
                    direction="column"
                    item 
                    xs={12}
                    sm={6}
                    >
                        <Typography fontWeight={'bold'}>
                            Last Name
                        </Typography>
                        <input
                            type="text"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            style={{
                                width: '100%',
                                height: '50px', 
                                padding: '12px 20px',
                                margin: '8px 0',
                                backgroundColor: '#fff',
                                color: '#000',
                                fontSize: '16px',
                                outline: 'none',
                                boxSizing: 'border-box',
                                border: '1px solid #000',
                                borderRadius: '5px',
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid
                        spacing={2} 
                        style={{marginTop: '5px'}}
                        direction="column"
                        item 
                        xs={12}
                        sm={6}
                    >
                        <Typography fontWeight={'bold'}>
                            Title
                        </Typography>
                        <input
                            type="text"
                            value={title}
                            style={{
                                width: '100%',
                                height: '50px', 
                                padding: '12px 20px',
                                margin: '8px 0',
                                backgroundColor: '#fff',
                                color: '#000',
                                fontSize: '16px',
                                outline: 'none',
                                boxSizing: 'border-box',
                                border: '1px solid #000',
                                borderRadius: '5px',
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid
                    spacing={2} 
                    style={{marginTop: '5px'}}
                    direction="column"
                    item 
                    xs={12}
                    sm={6}
                    >
                        <Typography fontWeight={'bold'}>
                            Email
                        </Typography>
                        <input
                            type="text"
                            value={email}
                            style={{
                                width: '100%',
                                height: '50px', 
                                padding: '12px 20px',
                                margin: '8px 0',
                                backgroundColor: '#fff',
                                color: '#000',
                                fontSize: '16px',
                                outline: 'none',
                                boxSizing: 'border-box',
                                border: '1px solid #000',
                                borderRadius: '5px',
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid
                        spacing={2} 
                        style={{marginTop: '5px'}}
                        direction="column"
                        item 
                        xs={12}
                        sm={6}
                    >
                        <Typography fontWeight={'bold'}>
                            Phone Number
                        </Typography>
                        <input
                            type="text"
                            value={phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            style={{
                                width: '100%',
                                height: '50px', 
                                padding: '12px 20px',
                                margin: '8px 0',
                                backgroundColor: '#fff',
                                color: '#000',
                                fontSize: '16px',
                                outline: 'none',
                                boxSizing: 'border-box',
                                border: '1px solid #000',
                                borderRadius: '5px',
                            }}
                        />
                    </Grid>

                    <Grid sx={{m: 2}}>
                        <Typography fontWeight={'bold'}>
                            LandLord: {user().landlord}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid
                    container
                    style={{marginTop: '15px'}}
                    alignItems="center"
                    justifyContent="center"
                >
                {isLoading ? <ActivityIndicator /> : 
                (
                    <Button 
                        variant="contained" 
                        onClick={submit}
                        style={{
                            backgroundColor: '#000', 
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
        </Box>
    )
}

const style = {
    container: {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '100%',
        height: '100vh',
        bgcolor: 'background.paper',
        boxShadow: 24,
        color: '#000',
        p: 4,
        overflow: 'auto',
        overflowY: 'auto',
    },
    imageContainer: {
        display: 'flex',
        height: 250,
        width: 250,
        borderRadius: '20px',
    },
  };