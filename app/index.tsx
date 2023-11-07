"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
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
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import stylesMain from './page.module.css';
import Button from '@mui/material/Button';
import ProfileMenu from './components/navigation/profile-menu';
import { useRouter } from 'next/navigation'
import Grid from '@mui/material/Grid';
import { PieChart, pieArcClasses } from '@mui/x-charts/PieChart';
import { useQuery } from 'urql';
import { FETCH_SUMMARY } from './utils/queries';
import NameTitle from './components/users/name-title';
import { currencies, currencySymbols } from './lib/constants';
import MenuItem from '@mui/material/MenuItem';
import user from './lib/user-details';

const drawerWidth = 240;

export default function Page() {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currency, setCurrency] = React.useState('naira');

  const features = user().permissions[0] === '*' ? ['Dashboard', 'Properties', 'Tenants', 'Income', 'Expenses', 'Users'] : user().permissions;

  const [res] = useQuery({query: FETCH_SUMMARY, variables: {currency} });
  const { data, fetching, error } = res;

  const transactions = [
    { id: 0, value: data?.summary?.income, label: 'Income' },
    { id: 1, value: data?.summary?.expense, label: 'Expense' }
  ];

  const occupancy = [
    { id: 0, value: data?.summary?.occupiedUnits, label: 'Occupied' },
    { id: 1, value: data?.summary?.vacantUnits, label: 'Vacant' }
  ];

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
      style={{backgroundColor: 'rgb(249, 243, 255)'}}
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
            background: 'rgb(233, 204, 255)',
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
                { text === 'Dashboard' ? 
                  {
                    background: 'rgb(233, 204, 255)',
                    borderRadius: '20px',
                  } : {}}>
              <ListItemIcon>
                {getIcon(text)}
              </ListItemIcon>
              <ListItemText 
                primary={text} 
                primaryTypographyProps={text === 'Dashboard' ? 
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
        main: 'rgb(249, 243, 255)',
      },
    },
  });

  return (
    <main 
      className={stylesMain.main}
      style={{backgroundColor: 'rgb(249, 243, 255)'}}
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
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, color: '#000' }}
      >

      <Grid
        container
        direction="column"
        alignItems="flex-end"
        justifyItems="flex-end"
        width={'80vw'}
        style={{margin: '10px'}}
      >
        <Grid
          spacing={2} 
          style={{margin: '5px'}}
          direction="column"
          container 
          xs={6}
          sm={3}
        >
          <Typography fontWeight={'bold'}>
              Switch Currency
          </Typography>
          <FormControl fullWidth style={{marginTop: '10px'}}>
              <InputLabel id="demo-simple-select-label">Currency</InputLabel>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currency}
                  label="Currency"
                  onChange={(e) => setCurrency(e.target.value)}
              >
                {currencies.map((c, index)=> ( 
                  <MenuItem key={index} value={c.value}>{c.label}</MenuItem>
                ))}
              </Select>
          </FormControl>
        </Grid> 
        </Grid>
        
        {/* Dashboard */}
        <Grid
          container
          style={style.board}
        >
          <Grid item xs={12}>
          <Typography 
                variant="h6" 
                component="div" 
                sx={{ fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}
            >
                Summary
            </Typography>
            <Divider style={{margin: '10px'}} />
          </Grid>

        <Grid
          item
          xs={4}
          container
          direction={'column'}
          alignItems={'center'}
          justifyItems={'center'}
        >
          <Typography
              component="div" 
              sx={style.label}
          >
            Properties
          </Typography>
          <Typography
              variant="h5" 
              component="div" 
              sx={style.value}
          >
              {data?.summary?.properties}
          </Typography>
        </Grid>

        <Grid
          item
          xs={4}
          container
          direction={'column'}
          alignItems={'center'}
          justifyItems={'center'}
        >
            <Typography
                component="div" 
                sx={style.label}
            >
              Units
            </Typography>
            <Typography
                variant="h5" 
                component="div" 
                sx={style.value}
            >
                {data?.summary?.units}
            </Typography>
        </Grid>

        <Grid
          item
          xs={4}
          container
          direction={'column'}
          alignItems={'center'}
          justifyItems={'center'}
        >
            <Typography
                component="div" 
                sx={style.label}
            >
              Total Units
            </Typography>
            <Typography
                variant="h5" 
                component="div" 
                sx={style.value}
            >
                {data?.summary?.totalUnits}
            </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider style={{margin: '10px'}} />
        </Grid>

        <Grid
          item
          xs={6}
          container
          direction={'column'}
          alignItems={'center'}
          justifyItems={'center'}
        >
            <Typography
                component="div" 
                sx={style.label}
            >
              Total Income
            </Typography>
            <Typography
                variant="h5" 
                component="div" 
                sx={style.value}
            >
                {currencySymbols[currency.toUpperCase() as keyof typeof currencySymbols]}{data?.summary?.income}
            </Typography>
        </Grid>

        <Grid
          item
          xs={6}
          container
          direction={'column'}
          alignItems={'center'}
          justifyItems={'center'}
        >
          <Typography
              component="div" 
              sx={style.label}
          >
            Total Expenses
          </Typography>
          <Typography
              variant="h5" 
              component="div" 
              sx={style.value}
          >
             {currencySymbols[currency.toUpperCase() as keyof typeof currencySymbols]}{data?.summary?.expense}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          container
          direction={'column'}
          alignItems={'center'}
          justifyItems={'center'}
        >
            <Typography
                component="div" 
                sx={style.label}
            >
              Total Balance
            </Typography>
            <Typography
                variant="h3" 
                component="div" 
                sx={style.value}
            >
                {currencySymbols[currency.toUpperCase() as keyof typeof currencySymbols]}{data?.summary?.balance}
            </Typography>
        </Grid>

        </Grid>

        <Grid
          container
          spacing={2}
        >
          {/* Add Property Button */}

        <Grid item xs={6} sm={3}>
          <Button 
            variant="contained" 
            style={{
              marginLeft: 'auto', 
              backgroundColor: '#000', 
              height: '50px',
              color: '#fff',
              borderRadius: '10px',
              fontWeight: 'bold',
            }}
            onClick={() => router.push('/properties/create')}
          >
            Add Property
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button 
            variant="contained" 
            style={{
              marginLeft: 'auto', 
              backgroundColor: '#000', 
              height: '50px',
              color: '#fff',
              borderRadius: '10px',
              fontWeight: 'bold',
            }}
            onClick={() => router.push('/tenants/create')}
          >
            Add Tenant/Owner
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button 
            variant="contained" 
            style={{
              marginLeft: 'auto', 
              backgroundColor: '#000', 
              height: '50px',
              color: '#fff',
              borderRadius: '10px',
              fontWeight: 'bold',
            }}
            onClick={() => router.push('/income/create')}
          >
            Record Income
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button 
            variant="contained" 
            style={{
              marginLeft: 'auto', 
              backgroundColor: '#000', 
              height: '50px',
              color: '#fff',
              borderRadius: '10px',
              fontWeight: 'bold',
            }}
            onClick={() => router.push('/expenses/create')}
          >
            Record Expense
          </Button>
        </Grid>


        </Grid>


        <Grid
          container
          spacing={2}
        >
          <Grid item xs={12} sm={6}>
              <Grid style={style.splitboard}>
                  <Typography 
                      variant="h6" 
                      component="div" 
                      sx={{ fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}
                  >
                    Income/Expense Statistics
                  </Typography>
                  <Divider style={{margin: '10px'}} />
                  <PieChart
                    series={[
                      {
                        data: transactions,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30 },
                      },
                    ]}
                    sx={{
                      [`& .${pieArcClasses.faded}`]: {
                        fill: 'gray',
                      },
                    }}
                  height={200}
                />
              </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
          <Grid style={style.splitboard}>
                  <Typography 
                      variant="h6" 
                      component="div" 
                      sx={{ fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}
                  >
                    Occupancy Statistics
                  </Typography>
                  <Divider style={{margin: '10px'}} />
                  <PieChart
                    series={[
                      {
                        data: occupancy,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30 },
                      },
                    ]}
                    sx={{
                      [`& .${pieArcClasses.faded}`]: {
                        fill: 'gray',
                      },
                    }}
                  height={200}
                />
              </Grid>
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
  },
  splitboard: {
    borderRadius: '10px',
    height: '300px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  },
  value: {
    color: 'rgb(43, 92, 159)',
    fontWeight: 'bold',
    marginLeft: '10px',
  },
  label: {
      color: '#000',
      fontWeight: 'bold',
      marginLeft: '10px',
  }
}
