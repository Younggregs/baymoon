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
import stylesMain from '../../../../../page.module.css';
import Button from '@mui/material/Button';
import ProfileMenu from '../../../../../components/navigation/profile-menu';
import Link from "next/link"
import { useRouter } from 'next/navigation'
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import user from '@/app/lib/user-details';

const drawerWidth = 240;

export default function Page() {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const features = user().permissions[0] === '*' ? ['Dashboard', 'Properties', 'Tenants', 'Income', 'Expenses', 'Users'] : user().permissions;
  
  const [status, setStatus] = React.useState('');
  const [category, setCategory] = React.useState('');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const [files, setFiles] = React.useState([]);
  // const [files, setFiles] = React.useState<{ preview: string }[]>([]);
  
  const [files, setFiles] = React.useState<{ preview: string }[]>([]);

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
                Unit
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
                xs={5}
            >
                <Typography fontWeight={'bold'}>
                    Name(Title)
                </Typography>
                <input
                    type="text"
                    placeholder="Name"
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
                    Price
                </Typography>
                <input
                    type="number"
                    placeholder="e.g 6000000"
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
                    Quantity
                </Typography>
                <input
                    type="number"
                    placeholder="e.g 6"
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
                        <MenuItem value={10}>Rent</MenuItem>
                        <MenuItem value={20}>Sale</MenuItem>
                        <MenuItem value={30}>Shortlet</MenuItem>
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
                        value={category}
                        label="Type"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value={10}>Flat/Aparment</MenuItem>
                        <MenuItem value={20}>House</MenuItem>
                        <MenuItem value={30}>Land</MenuItem>
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
                    Select Furnishing
                </Typography>
                <FormControl fullWidth style={{marginTop: '10px'}}>
                    <InputLabel id="demo-simple-select-label">Furnishing</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Property"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value={10}>Unfurnished</MenuItem>
                        <MenuItem value={20}>Furnished</MenuItem>
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
                      value={category}
                      label="Property"
                      onChange={(e) => setCategory(e.target.value)}
                  >
                      <MenuItem value={10}>Private</MenuItem>
                      <MenuItem value={20}>Public</MenuItem>
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
                    Update Unit
                </Link>
            </Button>
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
            {/* Create User button */}
            <Button 
                variant="contained" 
                color="error"
                style={{
                    height: '50px',
                    color: '#fff',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    width: '250px'
                }}
            >
                <Link href="/users/create">
                    Delete Unit
                </Link>
            </Button>
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
