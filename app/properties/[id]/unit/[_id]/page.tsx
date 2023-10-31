"use client"
import * as React from 'react';
import {useDropzone} from 'react-dropzone';
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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import stylesMain from '../../../../page.module.css'
import Button from '@mui/material/Button';
import ProfileMenu from '../../../../components/navigation/profile-menu';
import Link from "next/link"
import { useRouter, useSearchParams } from 'next/navigation'
import Grid from '@mui/material/Grid';
import ImageCarousel from '@/app/components/properties/units/image-carousel';
import { UNIT_BY_ID } from '@/app/utils/queries';
import { useQuery } from 'urql';

const drawerWidth = 240;
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  params?: any;
}

export default function Page(props: Props) {
  const router = useRouter()
  const { params } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [res] = useQuery({query: UNIT_BY_ID, variables: {id: params?._id} });
  const { data, fetching, error } = res;

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
          <Typography 
            variant="h6" noWrap component="div" 
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }}}
          >
            Hello Retzam
          </Typography>
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
               {data?.unitById?.name}
            </Typography>
            <Divider style={{margin: '10px'}} />

            <Grid
              container
              justifyContent={'space-between'}
              sx={{margin: '10px'}}
            >
              <Grid
                item
                xs={8}
              >
                <Typography
                  variant={'h5'}
                  style={style.label}
                >
                  {data?.unitById?.name}
                </Typography>
                <Grid
                  container
                  alignContent={'center'}
                >
                  <LocationOnIcon />
                  <Typography
                    style={style.value}
                  >
                    Allen, Ikeja, Lagos
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                xs={4}
              >
                <Typography
                  variant={'h5'}
                  style={style.value}
                >
                  ${data?.unitById?.price}
                </Typography>
              </Grid>

            </Grid>
            <ImageCarousel images={data?.unitById?.images || []}/>
          </Grid>

          {/* Details */}
          <Grid item xs={12}>
          <Typography 
              variant="h6" 
              component="div" 
              sx={{ fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}
            >
                Details
            </Typography>
            <Divider style={{margin: '10px'}} />
            <Divider style={{margin: '10px'}} />
            <Grid
              container
              rowSpacing={2}
            >
              <Grid
                item
                xs={12}
              >
                <Typography
                  style={style.value}
                >
                  Description
                </Typography>
                <Typography
                  style={style.label}
                >
                  {data?.unitById?.description}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography
                  style={style.label}
                >
                  Price
                </Typography>
                <Typography
                  style={style.value}
                >
                  ${data?.unitById?.price}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography
                  style={style.label}
                >
                  Location
                </Typography>
                <Typography
                  style={style.value}
                >
                  Allen Ikeja, Lagos
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography
                  style={style.label}
                >
                  Bedrooms
                </Typography>
                <Typography
                  style={style.value}
                >
                  {data?.unitById?.propertyUnitFeatures.bedrooms}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography
                  style={style.label}
                >
                  Bathrooms
                </Typography>
                <Typography
                  style={style.value}
                >
                  {data?.unitById?.propertyUnitFeatures.bathrooms}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography
                  style={style.label}
                >
                  Property Type
                </Typography>
                <Typography
                  style={style.value}
                >
                  {data?.unitById?.type}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography
                  style={style.label}
                >
                  Furnishing
                </Typography>
                <Typography
                  style={style.value}
                >
                  {data?.unitById?.furnishing}
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
              >
              <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}
                >
                    Property Contact
                </Typography>
                <Divider style={{margin: '10px'}} />
                <Divider style={{margin: '10px'}} />
              </Grid>

              <Grid
                item
                xs={6}
              >
                <Typography
                  style={style.label}
                >
                  Phone number
                </Typography>
                <Typography
                  style={style.value}
                >
                  08109599594
                </Typography>
                
              </Grid>

            </Grid>
          </Grid>
          {/* End of Details */}

          <Grid 
            item 
            xs={12}
          >
            <Grid
              container 
              spacing={2} 
              style={{margin: '25px'}}
              alignItems={'center'}
              justifyContent={'center'}
              item
              xs={10}
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
                  <Link href="/properties/1/unit/1/update">
                      Update Unit
                  </Link>
              </Button>
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
    backgroundColor: '#fff',
    color: '#000',
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
  },
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  },
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '100%'
  },
}
