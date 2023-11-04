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
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import stylesMain from '../../../page.module.css';
import Button from '@mui/material/Button';
import ProfileMenu from '../../../components/navigation/profile-menu';
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
import user from '@/app/lib/user-details';
import NameTitle from '@/app/components/users/name-title';

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

export default function Page() {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const [category, setCategory] = React.useState('');

  const features = user().permissions[0] === '*' ? ['Dashboard', 'Properties', 'Tenants', 'Income', 'Expenses', 'Users'] : user().permissions;

  const [todos, setTodos] = React.useState<{ name: string; label: string }[]>([{ name: "", label: "" }]); 
  
  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => { 
    const field = e.target.name; 
    const newTodos = [...todos]; 
    newTodos[i][field as keyof typeof todos[0]] = e.target.value; 
    setTodos(newTodos); 
  }; 
  
  const handleAddTodo = () => { 
    setTodos([...todos, { name: "", label: "" }]); 
  }; 
  
  const handleDeleteTodo = (i: number) => { 
    const newTodos = [...todos]; 
    newTodos.splice(i, 1); 
    setTodos(newTodos); 
  }; 
  

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
                { text === 'Tenants' ? 
                  {
                    background: 'rgb(212, 246, 161)',
                    borderRadius: '20px',
                  } : {}}>
              <ListItemIcon>
                {getIcon(text)}
              </ListItemIcon>
              <ListItemText 
                primary={text} 
                primaryTypographyProps={text === 'Tenants' ? 
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
              Tenant Details
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
                    First Name
                </Typography>
                <input
                    type="text"
                    placeholder="First Name"
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
                  Last Name
                </Typography>
                <input
                    type="text"
                    placeholder="Last Name"
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
                    Email Address
                </Typography>
                <input
                    type="text"
                    placeholder="Email Address"
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
                    Phone Number
                </Typography>
                <input
                    type="text"
                    placeholder="Phone Number"
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
                    Select Property
                </Typography>
                <FormControl fullWidth style={{marginTop: '10px'}}>
                    <InputLabel id="demo-simple-select-label">Property</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Property"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value={10}>A</MenuItem>
                        <MenuItem value={20}>Number</MenuItem>
                        <MenuItem value={30}>Z</MenuItem>
                        <MenuItem value={30}>Image</MenuItem>
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
                    Select Unit
                </Typography>
                <FormControl fullWidth style={{marginTop: '10px'}}>
                    <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Unit"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value={10}>A</MenuItem>
                        <MenuItem value={20}>Number</MenuItem>
                        <MenuItem value={30}>Z</MenuItem>
                        <MenuItem value={30}>Image</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

          </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography 
                variant="h6" 
                component="div" 
                sx={{ fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}
            >
                Request More Details
            </Typography>
            <Divider style={{margin: '10px'}} />

            <Grid 
                container
                direction={'row'}
                alignItems={'center'}
              > 
                <Grid 
                  container 
                  spacing={2} 
                  style={{margin: '5px'}}
                  direction="column"
                  item
                  xs={4}
                  > 
                  <Typography fontWeight={'bold'} style={{marginBottom: '5px'}}>
                        Field Name
                    </Typography>
              </Grid>

              <Grid 
                  container 
                  spacing={2} 
                  style={{margin: '5px'}}
                  direction="column"
                  item
                  xs={4}
                  > 
                  <Typography fontWeight={'bold'} style={{marginBottom: '5px'}}>
                        Field Type
                    </Typography>
              </Grid>

              <Grid 
                  container 
                  spacing={2} 
                  style={{margin: '5px'}}
                  direction="column"
                  item
                  xs={2}
                  > 
                  <Typography fontWeight={'bold'} style={{marginBottom: '5px'}}>
                        Action
                    </Typography>
              </Grid>
            </Grid>
            

            {todos.map((todo, index) => ( 
              <Grid 
                key={index}
                container
                direction={'row'}
                alignItems={'center'}
              > 
                <Grid 
                  container 
                  spacing={2} 
                  style={{margin: '5px'}}
                  direction="column"
                  item
                  xs={4}
                  key={index}
                  >
                    <input 
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={todo.name} 
                      onChange={(e) => handleTodoChange(e, index)} 
                      required 
                      style={{
                        width: '100%',
                        height: '55px', 
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
                    xs={4}
                >
                    <FormControl fullWidth style={{marginTop: '10px'}}>
                        <InputLabel id="demo-simple-select-label">Field Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Type"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <MenuItem value={10}>Text</MenuItem>
                            <MenuItem value={20}>Number</MenuItem>
                            <MenuItem value={30}>Yes/No</MenuItem>
                            <MenuItem value={30}>Image</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid 
                    container 
                    spacing={2} 
                    style={{margin: '5px'}}
                    direction="column"
                    item
                    xs={1}
                >
                  <Button 
                    variant="outlined" 
                    onClick={() => handleDeleteTodo(index)}
                    color="error"
                    style={{
                      height: '50px',
                      color: 'red',
                      borderRadius: '10px',
                      fontWeight: 'bold',
                      width: '150px',
                      margin: '10px'
                    }}
                    startIcon={
                    <DeleteIcon 
                      style={{color: 'red'}}
                    />
                    }
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid> 
            ))} 
            <Grid 
                container 
                spacing={2} 
                style={{margin: '5px'}}
                direction="column"
                item
                xs={1}
              >
                <Button 
                  variant="outlined" 
                  onClick={handleAddTodo}
                  style={{
                      backgroundColor: 'green', 
                      height: '50px',
                      color: '#fff',
                      borderRadius: '10px',
                      fontWeight: 'bold',
                      width: '150px'
                  }}
                  startIcon={
                  <AddCircleIcon 
                    style={{color: '#fff'}}
                  />
                  }
                >
                  Add Field
                </Button>
            </Grid>

          
          <Grid
          container
          alignItems={'center'}
          justifyContent={'center'}
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
                <Link href="/tenants/create">
                    Create Tenant
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
