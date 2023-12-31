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
import { useRouter } from 'next/navigation'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CREATE_TRANSACTION } from '@/app/utils/mutations';
import { useMutation, useQuery } from 'urql';
import { FETCH_PROPERTIES, FETCH_UNITS } from '@/app/utils/queries';
import ActivityIndicator from '../../components/activity-indicator';
import { currencies } from '@/app/lib/constants';
import user from '@/app/lib/user-details';
import NameTitle from '@/app/components/users/name-title';

const drawerWidth = 240;


export default function Page() {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const features = user().permissions[0] === '*' ? ['Dashboard', 'Properties', 'Tenants', 'Income', 'Expenses', 'Users'] : user().permissions;

  const [property, setProperty] = React.useState('');
  const [unit, setUnit] = React.useState('');
  const [currency, setCurrency] = React.useState('naira');

  const [res] = useQuery({query: FETCH_PROPERTIES, variables: {search: ""} });
  const { data: properties, fetching, error } = res;

  const [res2] = useQuery({query: FETCH_UNITS, variables: {id: property} });
  const { data: units, fetching: fetching2, error: error2 } = res2;

  // set default amount as price of unit or ''
  const price = units?.units?.edges?.find((u: { node: { id: string | number | readonly string[] | undefined; }; }) => u.node.id === unit)?.node?.price
  const [amount, setAmount] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [payment_method, setPaymentMethod] = React.useState('')
  const [date, setDate] = React.useState<Date | null>(new Date());

  const [createTransactionResult, createTransaction] = useMutation(CREATE_TRANSACTION);

  const submit = async () => {
    setIsLoading(true)
    const data = {
      title,
      amount: parseInt(amount),
      description,
      date,
      type: "income",
      property_id: property,
      unit_id: unit,
      payment_method,
      currency
    }
    createTransaction(data).then((res) => {
      setIsLoading(false)
      if (res.error) {
        console.log('Error creating income')
      } else {
        router.push(`/income/${res.data.createTransaction.transaction.id}`)
      }
    })
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

  const [state, setState] = React.useState({
    dashboard: true,
    properties: false,
    tenants: false,
    income: false,
    expenses: false,
    users: false
  });

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
                { text === 'Income' ? 
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

  // const container = window !== undefined ? () => window.document.body : undefined;

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
          style={styles.board}
        >
            {/* Form */}
            <Grid item xs={12}>
              <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}
                >
                  Create Income Record
                </Typography>
                <Divider style={{margin: '10px'}} />
            </Grid>
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
                    placeholder="Title"
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
                spacing={2} 
                style={{marginTop: '5px'}}
                direction="column"
                item 
                xs={12}
                sm={6}
            >
                <Typography fontWeight={'bold'}>
                    Select Property
                </Typography>
                {fetching ? <ActivityIndicator /> : (
                <FormControl style={{marginTop: '10px', width: '250px'}}>
                    <InputLabel id="demo-simple-select-label">Property</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={property}
                        label="Property"
                        onChange={(e) => setProperty(e.target.value)}
                    >
                      {properties?.properties?.edges?.map((property: { node: { id: string | number | readonly string[] | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; }, index: React.Key | null | undefined) => ( 
                        <MenuItem key={index} value={property.node.id}>{property.node.name}</MenuItem>
                      ))}
                    </Select>
                </FormControl>
                )}
            </Grid>   

            <Grid
                spacing={2} 
                style={{marginTop: '5px'}}
                direction="column"
                item 
                xs={12}
                sm={6}
            >
                <Typography fontWeight={'bold'}>
                    Select Unit
                </Typography>
                {fetching2 ? <ActivityIndicator /> : (
                <FormControl style={{marginTop: '10px', width: '250px'}}>
                    <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={unit}
                        label="Unit"
                        onChange={(e) => {
                          setUnit(e.target.value), 
                          setAmount(units?.units?.edges?.find((u: { node: { id: string | number | readonly string[] | undefined; }; }) => u.node.id === e.target.value)?.node?.price),
                          setCurrency(units?.units?.edges?.find((u: { node: { id: string | number | readonly string[] | undefined; }; }) => u.node.id === e.target.value)?.node?.currency.toLowerCase())
                         }}
                    >
                      {units?.units?.edges?.map((unit: { node: { id: string | number | readonly string[] | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; }, index: React.Key | null | undefined) => ( 
                        <MenuItem key={index} value={unit.node.id}>{unit.node.name}</MenuItem>
                      ))}
                    </Select>
                </FormControl>
                )}
            </Grid>  

            <Grid 
                spacing={2} 
                style={{marginTop: '5px'}}
                direction="column"
                item 
                xs={12}
                sm={6}
            >
                <Typography fontWeight={'bold'}>
                    Amount
                </Typography>
                <input
                    type="number"
                    placeholder="Amount"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
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
                spacing={2} 
                style={{marginTop: '5px'}}
                direction="column"
                item 
                xs={12}
                sm={6}
            >
                <Typography fontWeight={'bold'}>
                    Select Currency
                </Typography>
                <FormControl style={{marginTop: '10px', width: '250px'}}>
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

            <Grid
                spacing={2} 
                style={{marginTop: '5px'}}
                direction="column"
                item 
                xs={12}
                sm={6}
            >
                <Typography fontWeight={'bold'}>
                    Select Payment Method
                </Typography>
                <FormControl style={{marginTop: '10px', width: '250px'}}>
                    <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={payment_method}
                        label="Payment Method"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <MenuItem value={'cash'}>Cash</MenuItem>
                      <MenuItem value={'bank_transfer'}>Bank Transfer</MenuItem>
                      <MenuItem value={'card'}>Card</MenuItem>
                      <MenuItem value={'other'}>Other</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid 
                spacing={2} 
                style={{marginTop: '5px'}}
                direction="column"
                item 
                xs={12}
                sm={6}
            >
                <Typography fontWeight={'bold'}>
                    Date of Payment
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Basic date picker" onChange={(e: Date | null) => setDate(e)}/>
                    </DemoContainer>
                </LocalizationProvider>
            </Grid>

             <Grid 
                container
                spacing={2} 
                style={{marginTop: '5px'}}
                direction="column"
                item 
                xs={12}
            >
                <Typography fontWeight={'bold'}>
                    Details
                </Typography>
                <textarea
                    placeholder="Details"
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    style={{
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

        <Grid
            container 
            spacing={2} 
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
              Create Income
            </Button>
          )}
        </Grid>
        
      </Box>

    </Box>
    </ThemeProvider>
    </main>
  );
}

const styles = {
  board: {
    width: '80vw',
    borderRadius: '10px',
    minHeight: '200px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    backgroundColor: '#fff',
    color: '#000',
    padding: '20px',
  },
}
