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
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import stylesMain from '../../page.module.css';
import Button from '@mui/material/Button';
import ProfileMenu from '../../components/navigation/profile-menu';
import Link from "next/link"
import { useRouter, useSearchParams } from 'next/navigation'
import Table from '../../components/properties/units/table';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import { PROPERTY_BY_ID, FETCH_UNITS, DELETE_PROPERTY } from '@/app/utils/queries';
import { useQuery } from 'urql';
import ActivityIndicator from '@/app/components/activity-indicator';
import user from '@/app/lib/user-details';
import NameTitle from '@/app/components/users/name-title';
import formatDate from '@/app/lib/format/date';

const drawerWidth = 240;

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
  const [isLoading, setIsLoading] = React.useState(false);

  const features = user().permissions[0] === '*' ? ['Dashboard', 'Properties', 'Tenants', 'Income', 'Expenses', 'Users'] : user().permissions;

  const [res] = useQuery({query: PROPERTY_BY_ID, variables: {id: params?.id} });
  const { data, fetching, error } = res;

  const [search, setSearch] = React.useState(''); 
  const [res2] = useQuery({query: FETCH_UNITS, variables: {search, id: params?.id} });
  const { data: data2, fetching: fetching2, error: error2 } = res2;

  const [res3, executeDeleteQuery] = useQuery({query: DELETE_PROPERTY, variables: {ids: [params?.id]}, pause: true
  });

  const delete_property = () => {
    setIsLoading(true)
    executeDeleteQuery()
    setIsLoading(false)
    router.push('/properties')
  }

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

      {fetching ? <ActivityIndicator /> : (   
      <Box
        component="main"
        sx={{ overflowX: 'auto', flexGrow: 1, width: '100%', maxWidth: '100vw', color: '#000' }}
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
                {data?.propertyById?.name}
            </Typography>
            <Divider style={{margin: '10px'}} />
          </Grid>

        <Grid
          item
          xs={6}
          sm={3}
          container
          direction={'column'}
        >
            <Grid>
                <Typography
                    component="div" 
                    sx={style.label}
                >
                  Property Name
                </Typography>
                <Typography
                    component="div" 
                    sx={style.value}
                >
                  {data?.propertyById?.name}
                </Typography>
                <Divider style={{margin: '10px'}} />
            </Grid>
        </Grid>

        <Grid
          item
          xs={6}
          sm={3}
          container
          direction={'column'}
        >
            <Grid>
                <Typography
                    component="div" 
                    sx={style.label}
                >
                  Location
                </Typography>
                <Typography
                    component="div" 
                    sx={style.value}
                >
                  {data?.propertyById?.location?.state} {data?.propertyById?.location?.lga}
                </Typography>
                <Divider style={{margin: '10px'}} />
            </Grid>
        </Grid>

        <Grid
          item
          xs={6}
          sm={3}
          container
          direction={'column'}
        >
            <Grid>
                <Typography
                    component="div" 
                    sx={style.label}
                >
                  Tenants
                </Typography>
                <Typography
                    component="div" 
                    sx={style.value}
                >
                  {data?.propertyById?.tenants}
                </Typography>
                <Divider style={{margin: '10px'}} />
            </Grid>
        </Grid>

        <Grid
          item
          xs={6}
          sm={3}
          container
          direction={'column'}
        >
            <Grid>
                <Typography
                    component="div" 
                    sx={style.label}
                >
                  Units
                </Typography>
                <Typography
                    component="div" 
                    sx={style.value}
                >
                  {data?.propertyById?.units}
                </Typography>
                <Divider style={{margin: '10px'}} />
            </Grid>
        </Grid>

        <Grid
          item
          xs={6}
          sm={3}
          container
          direction={'column'}
        >
            <Grid>
                <Typography
                    component="div" 
                    sx={style.label}
                >
                 Created By
                </Typography>
                <Typography
                    component="div" 
                    sx={style.value}
                >
                  {data?.propertyById?.user.firstName} {data?.propertyById?.user.lastName}
                </Typography>
                <Divider style={{margin: '10px'}} />
            </Grid>
        </Grid>

        <Grid
          item
          xs={6}
          sm={3}
          container
          direction={'column'}
        >
            <Grid>
                <Typography
                    component="div" 
                    sx={style.label}
                >
                  Date Created
                </Typography>
                <Typography
                    component="div" 
                    sx={style.value}
                >
                  {formatDate(new Date(data?.propertyById?.createdAt))}
                </Typography>
                <Divider style={{margin: '10px'}} />
            </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          container
          direction={'column'}
          alignItems={'center'}
        >
            <Grid>
                <Typography
                    component="div" 
                    sx={style.value}
                >
                    Details
                </Typography>
                <Typography
                    component="div" 
                    sx={style.label}
                >
                  {data?.propertyById?.description}
                </Typography>
            </Grid>
        </Grid>

        </Grid>

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
                    placeholder="Search Units"
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
                <Link href={`/properties/${params?.id}/unit/create`}>
                  Add Unit
                </Link>
            </Button>
        </Toolbar>
        {fetching && !search && (
          <ActivityIndicator />
        )}

        {!fetching && data && (
          <Table data={data2?.units?.edges || []}/>
        )}

        {!fetching && !data && (
          <Typography>
            No Units Created Yet
          </Typography>
        )}

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
              {isLoading ? <ActivityIndicator /> : 
              (
              <Button 
                  variant="contained" 
                  color="error"
                  onClick={delete_property}
                  style={{
                      height: '50px',
                      color: '#fff',
                      borderRadius: '10px',
                      fontWeight: 'bold',
                      width: '250px'
                  }}
              >
                  <Link href="/properties/1/unit/1/update">
                      Delete Property
                  </Link>
              </Button>
              )}
            </Grid>
          </Grid> 

      </Box>
      )}
    </Box>
    </ThemeProvider>
    </main>
  );
}


const style = {
  board: {
    width: '100%',
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
  }
}