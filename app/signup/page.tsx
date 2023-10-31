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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import stylesMain from '../page.module.css';
import Button from '@mui/material/Button';
import ProfileMenu from '../components/navigation/profile-menu';
import Link from "next/link"
import { useRouter, useSearchParams } from 'next/navigation'
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 240;


export default function Page() {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [status, setStatus] = React.useState('');

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

  const drawer = (
    <main 
      className={stylesMain.main1}
      style={{backgroundColor: 'rgb(244, 253, 232)'}}
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
            background: 'rgb(212, 246, 161)',
            borderRadius: '20px',
            '&, & .MuiListItemIcon-root': {
              fontWeight: 'bold',
            },
          },
        }}
      >
        {['Dashboard', 'Properties', 'Tenants', 'Income', 'Expenses', 'Users'].map((text, index) => (
          <ListItem style={{marginBottom: '15px'}} key={text} disablePadding>
            <ListItemButton 
              className = {stylesMain.listbutton}
              onClick = {() => router.push(`/${text.toLowerCase() === 'dashboard' ? '' : text.toLowerCase() }`)}
              style = 
                { text === 'Properties' ? 
                  {
                    background: 'rgb(212, 246, 161)',
                    borderRadius: '20px',
                  } : {}}>
              <ListItemIcon>
                {getIcon(text)}
              </ListItemIcon>
              <ListItemText 
                primary={text} 
                primaryTypographyProps={text === 'Properties' ? 
                {fontWeight: 'bold'} : {}} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </main>
  );

  const container = typeof window !== 'undefined' ? window.document.body : undefined

  const darkTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: 'rgb(244, 253, 232)',
      },
    },
  });

  return (
    <main 
      className={stylesMain.main}
      style={{backgroundColor: 'rgb(244, 253, 232)'}}
    >
    <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
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
      </AppBar>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, color: '#000' }}
      >

        <Grid
          container
          spacing={2}
          style={style.board}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
            xs={12}
            spacing={2} 
            style={{marginTop: '5px'}}
          >
            <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ flexGrow: 1, fontWeight: 'bold' }}
              >
                Welcome to Baymoon! Signup!
              </Typography>
          </Grid>
            {/* Form */}
            <Grid 
                container
                alignItems="center"
                justifyContent="center"
                direction="column"
                xs={6}
                spacing={2} 
                style={{marginTop: '5px'}}
            >
                <Typography fontWeight={'bold'}>
                    First Name
                </Typography>
                <input
                    type="text"
                    placeholder="First Name"
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
                alignItems="center"
                justifyContent="center"
                xs={6}
                spacing={2} 
                style={{marginTop: '5px'}}
                direction="column"
            >
                <Typography fontWeight={'bold'}>
                    Last Name
                </Typography>
                <input
                    type="text"
                    placeholder="Last Name"
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
                alignItems="center"
                justifyContent="center"
                xs={6}
                spacing={2} 
                style={{marginTop: '5px'}}
                direction="column"
            >
                <Typography fontWeight={'bold'}>
                    Email
                </Typography>
                <input
                    type="text"
                    placeholder="Last Name"
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
                alignItems="center"
                justifyContent="center"
                xs={6}
                spacing={2} 
                style={{marginTop: '5px'}}
                direction="column"
            >
                <Typography fontWeight={'bold'}>
                    Phone Number
                </Typography>
                <input
                    type="text"
                    placeholder="Last Name"
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
                alignItems="center"
                justifyContent="center"
                xs={6}
                spacing={2} 
                style={{marginTop: '5px'}}
                direction="column"
            >
                <Typography fontWeight={'bold'}>
                    Password
                </Typography>
                <input
                    type="password"
                    placeholder="Password"
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
              alignItems="center"
              justifyContent="center"
              xs={6}
              spacing={2} 
              style={{marginTop: '35px', width: '100%'}}
            >
              {/* Create User button */}
              <Button 
                  variant="contained" 
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
                    Sign up
                  </Link>
              </Button>
          </Grid>

        </Grid>
        
      </Box>

    </Box>
    </ThemeProvider>
    </main>
  );
}


const style = {
  board: {
    width: '80vw',
    borderRadius: '10px',
    minHeight: '200px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    backgroundColor: '#fff',
    color: '#000',
    paddingTop: '20px',
    paddingBottom: '20px'
  },
}