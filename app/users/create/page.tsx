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
import { Search } from '@mui/icons-material';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { CREATE_USER } from '@/app/utils/mutations';
import { useMutation } from "urql";
import ActivityIndicator from '../../components/activity-indicator';
import user from '@/app/lib/user-details';
import NameTitle from '@/app/components/users/name-title';

const drawerWidth = 240;

export default function Page() {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const features = user().permissions[0] === '*' ? ['Dashboard', 'Properties', 'Tenants', 'Income', 'Expenses', 'Users'] : user().permissions;

  const [first_name, setFirstName] = React.useState('');
  const [last_name, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone_number, setPhoneNumber] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [userCreated, setUserCreated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [createUserResult, createUser] = useMutation(CREATE_USER);

  const submit = async () => {
    setIsLoading(true);
    // Set permissions based on state
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
      first_name,
      last_name,
      email,
      phone_number,
      title,
      permissions
    };
    
    createUser(data).then((result) => {
      setIsLoading(false);
      if (result.error) {
        console.error("Oh no!", result.error);
      }
      router.push('/users')
    });
    
  };

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

  const [state, setState] = React.useState({
    dashboard: true,
    properties: false,
    tenants: false,
    income: false,
    expenses: false,
    users: false
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
                    onChange={(e) => setFirstName(e.target.value)}
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
                    onChange={(e) => setLastName(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                    onChange={(e) => setTitle(e.target.value)}
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
            alignItems="center"
            justifyContent="center"
        >
          {/* Create User button */}
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
                <Link href="/users/create">
                    Create New User
                </Link>
            </Button>
          )}
            
        </Grid>
        
      </Box>

    </Box>
    </ThemeProvider>
    </main>
  );
}
