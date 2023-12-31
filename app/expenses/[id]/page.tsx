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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import stylesMain from '../../page.module.css';
import Button from '@mui/material/Button';
import ProfileMenu from '../../components/navigation/profile-menu';
import Link from "next/link"
import { useRouter } from 'next/navigation'
import Grid from '@mui/material/Grid';
import { DELETE_TRANSACTION, TRANSACTION_BY_ID } from '@/app/utils/queries';
import { useQuery } from 'urql';
import { currencyFormat, currencySymbols } from '@/app/lib/constants';
import user from '@/app/lib/user-details';
import NameTitle from '@/app/components/users/name-title';
import formatDate from '@/app/lib/format/date';
import ActivityIndicator from '@/app/components/activity-indicator';

const drawerWidth = 240;

interface Props {
  params?: any;
}

export default function Page(props: Props) {
  const router = useRouter()
  const { params } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const features = user().permissions[0] === '*' ? ['Dashboard', 'Properties', 'Tenants', 'Income', 'Expenses', 'Users'] : user().permissions;

  const [res] = useQuery({query: TRANSACTION_BY_ID, variables: {id: params?.id} });
  const { data, fetching, error: error_ } = res;

  const [res2, executeQuery] = useQuery({query: DELETE_TRANSACTION, variables: {ids: [params?.id]}, pause: true
  });

  const { data: data2, fetching: fetching2, error: error2 } = res2;

  const delete_transaction = () => {
    executeQuery()
  }

  React.useEffect(() => {
    if (!fetching2 && !error2 && data2) {
      router.push('/expenses')
    }
  }, [fetching2, data2, error2, router])


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

  const [property, setProperty] = React.useState('')

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
                { text === 'Expenses' ? 
                  {
                    background: 'rgb(212, 246, 161)',
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
        sx={{ flexGrow: 1, width: '100%', maxWidth: '100vw', color: '#000' }}
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
            style={{
                border: '1px solid #000',
                width: '80vw',
                minHeight: '80vh',
                borderRadius: '10px',
                backgroundColor: '#fff',
            }}
        >
            {/* Expense schedule */}
            <Typography 
                variant="h6" 
                component="div" 
                sx={{ fontWeight: 'bold', marginTop: '20px', textAlign: 'center' }}
            >
                Expenses Schedule
            </Typography>
            <Divider style={{margin: '20px'}} />
                
            <Grid
                container 
                spacing={2} 
                style={{marginTop: '15px'}}
                justifyContent={'center'}
                alignItems={'center'}
                direction={'column'}
            >
                <Typography
                    variant="h4" 
                    component="div" 
                            sx={{ fontWeight: 'bold', marginTop: '20px', textAlign: 'center' }}
                        >
                          {currencyFormat[data?.transactionById?.currency as keyof typeof currencyFormat].format.format(data?.transactionById?.amount)}
                        </Typography>
                        <Typography
                    variant="h6" 
                    component="div" 
                    sx={{ fontWeight: 'bold', marginTop: '20px', textAlign: 'center' }}
                >
                  {data?.transactionById?.title}
                </Typography>
            </Grid>

            <Grid
                container 
                spacing={2} 
                style={{margin: '15px', padding: '15px'}}
                justifyContent={'center'}
                alignItems={'center'}
                direction={'row'}
            >
                <Grid
                    item
                    xs={12}
                    sm={6}
                    container
                    direction={'column'}
                >
                    <Grid>
                        <Typography
                            variant="h6" 
                            component="div" 
                            sx={styles.label}
                        >
                            Total Amount
                        </Typography>
                        <Typography
                            variant="h6" 
                            component="div" 
                            sx={styles.value}
                        >
                            {currencyFormat[data?.transactionById?.currency as keyof typeof currencyFormat].format.format(data?.transactionById?.amount)}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    container
                    direction={'column'}
                >
                    <Grid>
                        <Typography
                            variant="h6" 
                            component="div" 
                            sx={styles.label}
                        >
                            Title
                        </Typography>
                        <Typography
                            variant="h6" 
                            component="div"
                            sx={styles.value}
                        >
                            {data?.transactionById?.title}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    container
                    direction={'column'}
                >
                    <Grid>
                        <Typography
                            variant="h6" 
                            component="div" 
                            sx={styles.label}
                        >
                            Payment Date
                        </Typography>
                        <Typography
                            variant="h6" 
                            component="div"
                            sx={styles.value}
                        >
                          {formatDate(new Date(data?.transactionById?.transactionDate))}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    container
                    direction={'column'}
                >
                    <Grid>
                        <Typography
                            variant="h6" 
                            component="div" 
                            sx={styles.label}
                        >
                          Date Created
                        </Typography>
                        <Typography
                            variant="h6" 
                            component="div"
                            sx={styles.value}
                        >
                          {formatDate(new Date(data?.transactionById?.createdAt))}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    container
                    direction={'column'}
                >
                    <Grid>
                        <Typography
                            variant="h6" 
                            component="div" 
                            sx={styles.label}
                        >
                            Payment Method
                        </Typography>
                        <Typography
                            variant="h6" 
                            component="div"
                            sx={styles.value}
                        >
                            {data?.transactionById?.paymentMethod}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    container
                    direction={'column'}
                >
                    <Grid>
                        <Typography
                            variant="h6" 
                            component="div" 
                            sx={styles.label}
                        >
                            Created By
                        </Typography>
                        <Typography
                            variant="h6" 
                            component="div"
                            sx={styles.value}
                        >
                            {data?.transactionById?.user.firstName} {data?.transactionById?.user.lastName}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    container
                    direction={'column'}
                >
                    <Grid>
                        <Typography
                            variant="h6" 
                            component="div" 
                            sx={styles.label}
                        >
                            Details
                        </Typography>
                        <Typography
                            variant="h6" 
                            component="div"
                            sx={styles.value}
                        >
                            {data?.transactionById?.description}
                        </Typography>
                    </Grid>
                </Grid>

            </Grid>


        </Grid>

        <Grid
            container 
            spacing={2} 
            style={{marginTop: '15px'}}
            alignContent={'center'}
            justifyContent={'center'}
        >
            {/* Create User button */}
            {fetching2 ? <ActivityIndicator /> : 
            (
            <Button 
                variant="contained" 
                color="error"
                onClick={delete_transaction}
                style={{ 
                    height: '50px',
                    color: '#fff',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    width: '250px'
                }}
            >
              Delete Expense
            </Button>
            )}
        </Grid>
        
      </Box>
      )}
    </Box>
    </ThemeProvider>
    </main>
  );
}

const styles = {
    label: {
        color: 'rgb(43, 92, 159)',
        fontWeight: 'bold',
    },
    value: {
        color: '#000',
    }
}
