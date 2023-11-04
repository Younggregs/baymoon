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
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import stylesMain from '../page.module.css';
import Button from '@mui/material/Button';
import ProfileMenu from '../components/navigation/profile-menu';
import Link from "next/link"
import { useRouter, useSearchParams } from 'next/navigation'
import Table from '../components/properties/table';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import { FETCH_PROPERTIES } from '../utils/queries';
import { useQuery } from 'urql';
import ActivityIndicator from '../components/activity-indicator';
import user from '../lib/user-details';
import NameTitle from '../components/users/name-title';

const drawerWidth = 240;

export default function Page() {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [search, setSearch] = React.useState(''); 
  const [res] = useQuery({query: FETCH_PROPERTIES, variables: {search} });
  const { data, fetching, error } = res;

  const features = user().permissions[0] === '*' ? ['Dashboard', 'Properties', 'Tenants', 'Income', 'Expenses', 'Users'] : user().permissions;

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
        {features.map((text, index) => (
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
      >
        <Toolbar>
          {/* Search bar */}
          <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{
                  maxWidth: '300px',
                  height: '50px', 
                  padding: '12px 20px',
                  marginRight: '5px',
                  boxSizing: 'border-box',
                  border: '1px solid #000',
                  borderRadius: '25px',
                  backgroundColor: '#fff',
                  color: '#000',
                  fontSize: '16px',
                }}
            >
                <input
                    type="text"
                    placeholder="Search Properties"
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      maxWidth: '200px',
                      height: '50px',
                      backgroundColor: '#fff',
                      color: '#000',
                      fontSize: '16px',
                      border: 'none',
                      outline: 'none',
                    }}
                />
                <IconButton>
                    <SearchIcon />
                </IconButton>
            </Grid>
           
            {/* Create User button */}
            <Button 
                variant="contained" 
                style={{
                  marginLeft: '5px', 
                  backgroundColor: '#000', 
                  height: '50px',
                  color: '#fff',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                }}
            >
                <Link href="/properties/create">
                  Add Property
                </Link>
            </Button>
        </Toolbar>
        {fetching && !search && (
          <ActivityIndicator />
        )}

        {!fetching && data && (
          <Table data={data?.properties?.edges || []}/>
        )}

        {!fetching && !data && (
          <Typography>
            No Properties Created Yet
          </Typography>
        )}
      </Box>

    </Box>
    </ThemeProvider>
    </main>
  );
}
