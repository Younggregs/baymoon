"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Groups3Icon from '@mui/icons-material/Groups3';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
import CottageIcon from '@mui/icons-material/Cottage';
import SellIcon from '@mui/icons-material/Sell';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MailIcon from '@mui/icons-material/Mail';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import stylesMain from '../../page.module.css';
import Button from '@mui/material/Button';
import ProfileMenu from '../../components/navigation/profile-menu';
import Link from "next/link"
import Table from '../../components/users/table';
import { useRouter, useSearchParams } from 'next/navigation'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { USER_BY_ID, DELETE_USER } from '@/app/utils/queries';
import { useMutation, useQuery } from 'urql';
import user from '@/app/lib/user-details';
import NameTitle from '@/app/components/users/name-title';
import ActivityIndicator from '@/app/components/activity-indicator';
import { useDropzone } from "react-dropzone";
import Image from 'next/image'
import { UPDATE_USER } from '@/app/utils/mutations';

const drawerWidth = 240;

interface Props {
  params?: any;
}

export default function Page(props: Props) {
  const router = useRouter()
  const { params } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [first_name, setFirstName] = React.useState('');
  const [last_name, setLastName] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [phone_number, setPhoneNumber] = React.useState('');
  const [file, setFile] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setError] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const features = user().permissions[0] === '*' ? ['Dashboard', 'Properties', 'Tenants', 'Income', 'Expenses', 'Users'] : user().permissions;

  const [res] = useQuery({query: USER_BY_ID, variables: {id: params?.id} });
  const { data, fetching, error: error_ } = res;


  const [res2, executeQuery] = useQuery({query: DELETE_USER, variables: {ids: [params?.id]}, pause: true
  });
  const { data: data2, fetching: fetching2, error: error2 } = res2;
 
  const [updateUserResult, updateUser] = useMutation(UPDATE_USER);

  const update_user = () => {
    const p = [
      state.dashboard ? 'Dashboard' : null,
      state.properties ? 'Properties' : null,
      state.tenants ? 'Tenants' : null,
      state.income ? 'Income' : null,
      state.expenses ? 'Expenses' : null,
      state.users ? 'Users' : null,
    ]
    const permissions = p.filter((v) => v !== null)

    const data = {
      id: params?.id,
      first_name,
      last_name,
      phone_number,
      title,
      file,
      permissions
    }
    updateUser(data).then(result => {
      setIsLoading(false)
      const res = result?.data?.updateUser as any
      if (result.error) {
        console.error('Oh no!', result.error);
        setError(res?.errors[0]?.message)
      }else if(!res?.success){
        console.log(res?.errors.message)
          setError(res?.errors.message)
      }
      else{
          setSuccess(true)
      }
      
    });
  }

  const delete_user =  async () => {
    // Delete User Query
    await executeQuery()
    router.push('/users')
  }


  React.useEffect(() => {
    if (data?.userById) {
      setFirstName(data?.userById?.firstName)
      setLastName(data?.userById?.lastName)
      setPhoneNumber(data?.userById?.phoneNumber)
      setTitle(data?.userById?.title)

      // Initialize state with data?.userById?.permissions
      const permissions = data?.userById?.permissions
      setState({
        dashboard: permissions?.includes('Dashboard'),
        properties: permissions?.includes('Properties'),
        tenants: permissions?.includes('Tenants'),
        income: permissions?.includes('Income'),
        expenses: permissions?.includes('Expenses'),
        users: permissions?.includes('Users'),
      });
    }
  }, [data])

  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
        setFile( Object.assign(acceptedFiles[0], {preview: URL.createObjectURL(acceptedFiles[0])} ));
    }
  });


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getIcon = (key: string) => {
    switch (key) {
      case 'Dashboard':
        return <DashboardIcon />
      case 'Properties':
        return <AccountBalanceIcon />
      case 'Tenants':
        return <Groups3Icon />
      case 'Income':
        return <PaidIcon />
      case 'Expenses':
        return <SellIcon />
      case 'Users':
        return <PeopleIcon />
    
      default:
        break;
    }
  }
  // Initialize state with data?.userById?.permissions
  const [state, setState] = React.useState({
    dashboard: false,
    properties: false,
    tenants: false,
    income: false,
    expenses: false,
    users: false,
  });

  const { dashboard, properties, tenants, income, expenses, users } = state;
  const error = [dashboard, properties, tenants, income, expenses, users].filter((v) => v).length !== 2;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const drawer = (
    <main 
      className={stylesMain.main1}
      style={{backgroundColor: '#fff'}}
    >
      <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <CottageIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Baymoon
        </Typography>
      </Toolbar>
      <Divider />
      <List
        sx={{
          // hover states
          '& .MuiListItemButton-root:hover': {
            bgcolor: 'orange',
            background: 'rgb(229, 228, 224)',
            borderRadius: '20px',
            '&, & .MuiListItemIcon-root': {
              fontWeight: 'bold',
            },
          },
        }}
      >
        {features.map((text, index) => (
          <ListItem style={{marginBottom: '15px'}} key={text} disablePadding>
            <ListItemButton 
              className = {stylesMain.listbutton}
              onClick = {() => router.push(`/${text.toLowerCase() === 'dashboard' ? '' : text.toLowerCase() }`)}
              style = 
                { text === 'Users' ? 
                  {
                    background: 'rgb(229, 228, 224)',
                    borderRadius: '20px',
                  } : {}}>
              <ListItemIcon>
                {getIcon(text)}
              </ListItemIcon>
              <ListItemText 
                primary={text} 
                primaryTypographyProps={text === 'Users' ? 
                {fontWeight: 'bold'} : {}} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </main>
  );

  const container = typeof window !== 'undefined' ? window.document.body : undefined;

  const darkTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#fff',
      },
    },
  });

  return (
    <main 
      className={stylesMain.main}
      style={{backgroundColor: '#fff'}}
    >
    <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <NameTitle />
          <Typography 
            variant="h6" noWrap component="div" 
            sx={{ flexGrow: 1, display: { sm: 'none' }}}
          >
            Baymoon
          </Typography>
          <ProfileMenu />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {fetching ? <ActivityIndicator /> : (
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, color: '#000' }}
      >

        <Toolbar>
            <IconButton
                edge="start"
                onClick={() => router.back()}
            >
                <ArrowBackIosIcon />
            </IconButton>
            <Typography 
                variant="h6" 
                component="div" 
                sx={{ flexGrow: 1, fontWeight: 'bold' }}

            >
                Go Back
            </Typography>
        </Toolbar>

        <Grid>
            {/* Form */}
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
                        {!file?.preview && !data?.userById?.profilePicture && (
                            <ContactPageIcon style={{margin: 'auto', fontSize: 200}}/>
                        )}

                        {!file?.preview && data?.userById?.profilePicture && (
                            <Image 
                                src={data?.userById?.profilePicture} 
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
                                <EditIcon style={{color: '#ff0000'}}/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
          </Grid>

            <Grid 
                container 
                spacing={2} 
                style={{marginTop: '5px'}}
                direction="column"
            >
                <Typography fontWeight={'bold'}>
                    Firstname
                </Typography>
                <input
                    type="text"
                    placeholder="Firstname"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{
                        width: '250px',
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

            <Grid 
                container 
                spacing={2} 
                style={{marginTop: '5px'}}
                direction="column"
            >
                <Typography fontWeight={'bold'}>
                    Lastname
                </Typography>
                <input
                    type="text"
                    placeholder="Lastname"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{
                        width: '250px',
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

            <Grid 
                container 
                spacing={2} 
                style={{marginTop: '5px'}}
                direction="column"
            >
                <Typography fontWeight={'bold'}>
                    Email
                </Typography>
                <input
                    type="text"
                    placeholder="Email"
                    value = {data?.userById?.email}
                    style={{
                        width: '250px',
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

            <Grid 
                container 
                spacing={2} 
                style={{marginTop: '5px'}}
                direction="column"
            >
                <Typography fontWeight={'bold'}>
                    Phone Number
                </Typography>
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone_number}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={{
                        width: '250px',
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

             <Grid 
                container 
                spacing={2} 
                style={{marginTop: '5px'}}
                direction="column"
            >
                <Typography fontWeight={'bold'}>
                    Title
                </Typography>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                        width: '250px',
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

            <Grid 
                container 
                spacing={2} 
                style={{marginTop: '5px'}}
                direction="column"
            >
                <Typography fontWeight={'bold'}>
                    Permissions and Access
                </Typography>
                    <FormControl sx={{ m: 3 }} component="fieldset"     variant="standard">
                        <FormGroup>
                        <FormControlLabel
                            control={
                            <Checkbox 
                                checked={dashboard} 
                                onChange={handleChange} 
                                name="dashboard" 
                                sx={{
                                    color: '#000',
                                    '&.Mui-checked': {
                                      color: '#000',
                                    },
                                  }}
                                />
                            }
                            label="Dashboard"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox 
                                checked={properties} 
                                onChange={handleChange} 
                                name="properties" 
                                sx={{
                                    color: '#000',
                                    '&.Mui-checked': {
                                      color: '#000',
                                    },
                                  }}
                            />
                            }
                            label="Properties"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox 
                                checked={tenants} 
                                onChange={handleChange} 
                                name="tenants" 
                                sx={{
                                    color: '#000',
                                    '&.Mui-checked': {
                                      color: '#000',
                                    },
                                  }}
                                />
                            }
                            label="Tenants"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox 
                                checked={income} 
                                onChange={handleChange} 
                                name="income" 
                                sx={{
                                    color: '#000',
                                    '&.Mui-checked': {
                                      color: '#000',
                                    },
                                  }}
                                />
                            }
                            label="Income"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox 
                                checked={expenses} 
                                onChange={handleChange} 
                                name="expenses" 
                                sx={{
                                    color: '#000',
                                    '&.Mui-checked': {
                                      color: '#000',
                                    },
                                }}
                            />
                            }
                            label="Expenses"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox 
                                checked={users} 
                                onChange={handleChange} 
                                name="users" 
                                sx={{
                                    color: '#000',
                                    '&.Mui-checked': {
                                      color: '#000',
                                    },
                                }}
                                />
                            }
                            label="Users"
                        />
                        </FormGroup>
                    <FormHelperText>Assign roles to users</FormHelperText>
                </FormControl>
            </Grid>

        </Grid>

        <Grid
            container 
            spacing={2} 
            style={{marginTop: '15px'}}
            direction="column"
        >
            {success ? (
                <Typography style={{color: 'green'}}>
                    Updated Successfully
                </Typography>
            ) : (
                <Typography style={{color: 'red'}}>
                    {errorMessage}
                </Typography>
            )}
            {fetching2 ? <ActivityIndicator /> : 
            (
            <Grid
              container
              direction={'column'}
            >
            <Button 
                variant="contained" 
                onClick={update_user}
                style={{
                    backgroundColor: '#000', 
                    height: '50px',
                    color: '#fff',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    width: '200px',
                    margin: '10px'
                }}
            >
              Update User
            </Button>
            <Button 
                variant="contained" 
                color="error"
                onClick={delete_user}
                style={{
                    height: '50px',
                    color: '#fff',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    width: '200px',
                    margin: '10px'
                }}
            >
              Delete User
            </Button>
            </Grid>
            )}
            
        </Grid>
      </Box>
      )}
    </Box>
    </ThemeProvider>
    </main>
  );
}

const style = {
  imageContainer: {
    display: 'flex',
    height: 250,
    width: 250,
    borderRadius: '20px',
},
}
