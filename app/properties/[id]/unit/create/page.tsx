"use client"
import * as React from 'react';
import {useDropzone} from 'react-dropzone';
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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import stylesMain from '../../../../page.module.css';
import Button from '@mui/material/Button';
import ProfileMenu from '../../../../components/navigation/profile-menu';
import { useRouter } from 'next/navigation'
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { CREATE_UNIT } from '@/app/utils/mutations';
import { useMutation, useQuery } from "urql";
import Image from 'next/image'
import ActivityIndicator from '@/app/components/activity-indicator';
import { currencies, paymentPlan } from '@/app/lib/constants';
import { FETCH_USERS } from '@/app/utils/queries';
import user from '@/app/lib/user-details';
import NameTitle from '@/app/components/users/name-title';

const drawerWidth = 240;
interface Props {
  params?: any;
}


export default function Page(props: Props) {
  const router = useRouter()
  const { params } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const features = user().permissions[0] === '*' ? ['Dashboard', 'Properties', 'Tenants', 'Income', 'Expenses', 'Users'] : user().permissions;

  const [isLoading, setIsLoading] = React.useState(false)
  const [published, setPublished] = React.useState(0);
  const [category, setCategory] = React.useState('');
  const [currency, setCurrency] = React.useState('');
  const [contacts, setContacts] = React.useState<string[]>([]);
  const [payment_plan, setPaymentPlan] = React.useState('');
  const [type, setType] = React.useState('');
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const [bathrooms, setBathrooms] = React.useState(0);
  const [bedrooms, setBedrooms] = React.useState(0);
  const [toilets, setToilets] = React.useState(0);
  const [parking_space, setParkingSpace] = React.useState(0);
  const [floor_number, setFloorNumber] = React.useState(0);
  const [furnishing, setFurnishing] = React.useState('')
  const [files, setFiles] = React.useState<{ preview: string }[]>([]);

  const [res] = useQuery({query: FETCH_USERS, variables: {search: ''} });
  const { data, fetching, error } = res;

  const [createUnitResult, createUnit] = useMutation(CREATE_UNIT);

  const handleChange = (event: SelectChangeEvent<typeof contacts>) => {
    const {
      target: { value },
    } = event;
    setContacts(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  console.log('contacts: ', contacts)

  const submit = async () => {
    setIsLoading(true)
    const data = {
        property_id: params.id,
        name,
        category,
        description,
        price,
        currency,
        payment_plan,
        quantity,
        contacts,
        bathrooms,
        bedrooms,
        toilets,
        parking_space,
        floor_number,
        furnishing,
        type,
        published: published === 1 ? true : false,
        images: files
    }
    
    createUnit(data).then(result => {
      setIsLoading(false)
      const res = result?.data?.createPropertyUnit as any
      if (result.error) {
        console.error('Oh no!', result.error);
      }else if(!res?.success){
        console.log(res?.errors.message)
      }
      else{
        router.push(`/properties/${params?.id}`)
      }
      
    });
    
  }

  const unit_type = [
    {value: 'flat', label: 'Flat/Apartment'},
    {value: 'house', label: 'House'},
    {value: 'land', label: 'Land'},
    {value: 'office', label: 'Office'},
    {value: 'shop', label: 'Shop'},
    {value: 'warehouse', label: 'Warehouse'},
    {value: 'event_center', label: 'Event Center'},
    {value: 'hotel', label: 'Hotel'},
    {value: 'school', label: 'School'},
    {value: 'other', label: 'Other'},
  ]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      
    }
  });
  
  const thumbs = files.map(file => (
    <Grid sx={style.thumb} key={file.preview}>
      <Grid style={style.thumbInner}>
        <Image
          src={file.preview}
          style={style.img}
          width={150}
          height={150}
          alt="Preview"
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </Grid>
    </Grid>
  ));

  React.useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

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
                Create Unit
            </Typography>
            <Divider style={{margin: '10px'}} />

          <Grid
            container
            alignItems={'center'}
            justifyContent={'center'}
          >
            {/* Form */}
            <Grid 
                container 
                spacing={2} 
                style={{margin: '5px'}}
                direction="column"
                item
                xs={12}
                sm={5}
            >
                <Typography fontWeight={'bold'}>
                    Name(Title)
                </Typography>
                <input
                    type="text"
                    placeholder="Name"
                    onChange = {(e) => setName(e.target.value)}
                    style={{
                        width: '100%',
                        height: '50px', 
                        padding: '12px 20px',
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
                style={{margin: '5px'}}
                direction="column"
                item
                xs={12}
                sm={5}
            >
                <Typography fontWeight={'bold'}>
                    Price
                </Typography>
                <input
                    type="number"
                    placeholder="e.g 6000000"
                    onChange = {(e) => setPrice(parseInt(e.target.value))}
                    style={{
                        width: '100%',
                        height: '50px', 
                        padding: '12px 20px',
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
                style={{margin: '5px'}}
                direction="column"
                item 
                xs={5}
            >
                <Typography fontWeight={'bold'}>
                    Select Currency
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

            <Grid
                container
                spacing={2} 
                style={{margin: '5px'}}
                direction="column"
                item 
                xs={5}
            >
                <Typography fontWeight={'bold'}>
                    Select Payment Plan
                </Typography>
                <FormControl fullWidth style={{marginTop: '10px'}}>
                    <InputLabel id="demo-simple-select-label">Payment Plan</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={payment_plan}
                        label="Payment Plan"
                        onChange={(e) => setPaymentPlan(e.target.value)}
                    >
                      {paymentPlan.map((c, index)=> ( 
                        <MenuItem key={index} value={c.value}>{c.label}</MenuItem>
                      ))}
                    </Select>
                </FormControl>
            </Grid> 

            <Grid 
                container 
                spacing={2} 
                style={{margin: '5px'}}
                direction="column"
                item
                xs={5}
            >
                <Typography fontWeight={'bold'}>
                    Quantity
                </Typography>
                <input
                    type="number"
                    placeholder="e.g 6"
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    style={{
                        width: '100%',
                        height: '60px', 
                        padding: '12px 20px',
                        backgroundColor: '#fff',
                        marginTop: '5px',
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
                style={{margin: '5px'}}
                direction="column"
                item
                xs={5}
            >
                <Typography fontWeight={'bold'}>
                    Select Category
                </Typography>
                <FormControl fullWidth style={{marginTop: '10px'}}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Property"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value={'rent'}>Rent</MenuItem>
                        <MenuItem value={'sale'}>Sale</MenuItem>
                        <MenuItem value={'shortlet'}>Shortlet</MenuItem>
                    </Select>
                </FormControl>
            </Grid> 

            <Grid 
                container 
                spacing={2} 
                style={{margin: '5px'}}
                direction="column"
                item
                xs={5}
            >
                <Typography fontWeight={'bold'}>
                    Select Contact Persons
                </Typography>
                <FormControl fullWidth style={{marginTop: '10px'}}>
                    <InputLabel id="demo-simple-select-label">Contact Persons</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={contacts}
                        label="Contact Persons"
                        multiple
                        onChange={handleChange}
                    >
                      {data?.users?.edges?.map((user: any) => (
                          <MenuItem key={user.node.id} value={user.node.id}>{user.node.firstName} {user.node.lastName}</MenuItem>
                      ))}
                    </Select>
                </FormControl>
            </Grid>

          </Grid>
          </Grid>

          {/* Images */}
          <Grid item xs={12}>
          <Typography 
                variant="h6" 
                component="div" 
                sx={{ fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}
            >
                Images
            </Typography>
            <Divider style={{margin: '10px'}} />
            
            
            <Grid
              container
              alignItems={'center'}
              justifyContent={'center'}
              direction={'column'}
            >
              <Grid {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
              </Grid>
              <aside style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 16 }}>
                {thumbs}
              </aside>
            </Grid>

            <Divider style={{margin: '10px'}} />
          </Grid>
          {/* End of Images */}

          <Grid item xs={12}>
            <Typography 
                variant="h6" 
                component="div" 
                sx={{ fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}
            >
                Details
            </Typography>
            <Divider style={{margin: '10px'}} />
          
          <Grid
          container
          alignItems={'center'}
          justifyContent={'center'}
          >
            <Grid 
              container 
              spacing={2} 
              style={{margin: '5px'}}
              direction="column"
              item
              xs={5}
            >
                <Typography fontWeight={'bold'}>
                    Bedrooms
                </Typography>
                <input
                    type="number"
                    placeholder="e.g 2"
                    onChange={(e) => setBedrooms(parseInt(e.target.value))}
                    style={{
                        width: '100%',
                        height: '50px', 
                        padding: '12px 20px',
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
                style={{margin: '5px'}}
                direction="column"
                item
                xs={5}
            >
                <Typography fontWeight={'bold'}>
                    Bathrooms
                </Typography>
                <input
                    type="number"
                    placeholder="e.g 4"
                    onChange={(e) => setBathrooms(parseInt(e.target.value))}
                    style={{
                        width: '100%',
                        height: '50px', 
                        padding: '12px 20px',
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
                style={{margin: '5px'}}
                direction="column"
                item
                xs={5}
            >
                <Typography fontWeight={'bold'}>
                    Toilets
                </Typography>
                <input
                  type="number"
                  placeholder="e.g 4"
                  onChange={(e) => setToilets(parseInt(e.target.value))}
                  style={{
                      width: '100%',
                      height: '50px', 
                      padding: '12px 20px',
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
            style={{margin: '5px'}}
            direction="column"
            item
            xs={5}
            >
                <Typography fontWeight={'bold'}>
                    Select Type
                </Typography>
                <FormControl fullWidth style={{marginTop: '10px'}}>
                    <InputLabel id="demo-simple-select-label">Types</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Type"
                        onChange={(e) => setType(e.target.value)}
                    >
                      {unit_type.map((item) => (
                        <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                      ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid 
                container 
                spacing={2} 
                style={{margin: '5px'}}
                direction="column"
                item
                xs={5}
            >
                <Typography fontWeight={'bold'}>
                    Parking Space
                </Typography>
                <input
                    type="number"
                    placeholder="e.g 4"
                    onChange={(e) => setParkingSpace(parseInt(e.target.value))}
                    style={{
                        width: '100%',
                        height: '50px', 
                        padding: '12px 20px',
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
                style={{margin: '5px'}}
                direction="column"
                item
                xs={5}
            >
                <Typography fontWeight={'bold'}>
                    Select Furnishing
                </Typography>
                <FormControl fullWidth style={{marginTop: '10px'}}>
                    <InputLabel id="demo-simple-select-label">Furnishing</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={furnishing}
                        label="Property"
                        onChange={(e) => setFurnishing(e.target.value)}
                    >
                        <MenuItem value={'unfurnished'}>Unfurnished</MenuItem>
                        <MenuItem value={'furnished'}>Furnished</MenuItem>
                        <MenuItem value={'semi_furnished'}>Semi Furnished</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid 
                container 
                spacing={2} 
                style={{marginTop: '5px'}}
                direction="column"
                item
                xs={10}
            >
                <Typography fontWeight={'bold'}>
                    Description
                </Typography>
                <textarea
                    placeholder="Description"
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

          <Grid 
              container 
              spacing={2} 
              style={{margin: '5px'}}
              direction="column"
              item
              xs={5}
          >
              <Typography fontWeight={'bold'}>
                  Publish this unit to public listing
              </Typography>
              <FormControl fullWidth style={{marginTop: '10px'}}>
                  <InputLabel id="demo-simple-select-label">Publish</InputLabel>
                  <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={published}
                      label="Property"
                      onChange={(e) => setPublished(e.target.value as number)}
                  >
                      <MenuItem value={0}>Private</MenuItem>
                      <MenuItem value={1}>Public</MenuItem>
                  </Select>
              </FormControl>
            </Grid>

          <Grid
            container 
            spacing={2} 
            style={{margin: '25px'}}
            alignItems={'center'}
            justifyContent={'center'}
            item
            xs={10}
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
              Create Unit
            </Button>
            )}  
        </Grid>

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
  }
}
