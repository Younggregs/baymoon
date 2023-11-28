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
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import stylesMain from '../../../page.module.css';
import Button from '@mui/material/Button';
import ProfileMenu from '../../../components/navigation/profile-menu';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRouter, useSearchParams } from 'next/navigation'
import Grid from '@mui/material/Grid';
import File from '@/app/components/tenants/file';
import user from '@/app/lib/user-details';
import NameTitle from '@/app/components/users/name-title';
import { UPDATE_TENANT } from '@/app/utils/mutations';
import { useMutation, useQuery } from 'urql';
import { TENANT_BY_ID } from '@/app/utils/queries';
import ActivityIndicator from '@/app/components/activity-indicator';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 240;

interface Props {
  params?: any;
}

export default function Page(props: Props) {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { params } = props;
  
  const [checked, setChecked] = React.useState(true);
  const [start_date, setStartDate] = React.useState<Date | null>(new Date());
  const [end_date, setEndDate] = React.useState<Date | null>(new Date());
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorMessage, setError] = React.useState('')
  const [success, setSuccess] = React.useState(false)
  const [first_name, setFirstName] = React.useState('');
  const [last_name, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone_number, setPhoneNumber] = React.useState('');
  const [todos, setTodos] = React.useState([{ name: "", type: "", value: "" }]);
  const [extraFields, setExtraFields] = React.useState([{ name: "", type: "", value: "" }]); 
  const [newFiles, setNewFiles] = React.useState([{name: ""}]);

  const [res] = useQuery({query: TENANT_BY_ID, variables: {id: params?.id} });
  const { data, fetching, error } = res;

  const features = user().permissions[0] === '*' ? ['Dashboard', 'Properties', 'Tenants', 'Income', 'Expenses', 'Users'] : user().permissions;

  const [updateTenantResult, updateTenant] = useMutation(UPDATE_TENANT);

  React.useEffect(() => {
    if (data?.tenantById) {
      setFirstName(data?.tenantById?.firstName)
      setLastName(data?.tenantById?.lastName)
      setEmail(data?.tenantById?.email)
      setPhoneNumber(data?.tenantById?.phoneNumber)
      setTodos(JSON.parse(data?.tenantById?.moreInfo))
      setStartDate( new Date(data?.tenantById?.startDuration))
      setEndDate( new Date(data?.tenantById?.endDuration))
    }
  }, [data])


  const submit = () => {
    setIsLoading(true)
    setError('')
    // Verify extraFields values are not empty
    let emptyFields = false;
    extraFields.forEach((field) => {
      if (field.name === '' || field.type === '') {
        emptyFields = true;
      }
    })

    if (emptyFields) {
      setIsLoading(false)
      setError('Please fill all new fields')
      return;
    }

    const data = {
      id: params?.id,
      first_name,
      last_name,
      email,
      phone_number,
      more_info: JSON.stringify(todos.concat(extraFields)),
      files: newFiles.map((file) => file.name),
      start_duration: start_date,
      end_duration: end_date
    }
    console.log('data: ', data)
    updateTenant(data).then((result) => {
      setIsLoading(false)
      if (result.data?.updateTenant?.success) {
        setExtraFields([])
        setSuccess(result.data?.updateTenant?.success)
      }
      else{
        setError(result.data?.updateTenant?.errors[0]?.message)
      }
    })
  }
  
  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => { 
    const field = e.target.name as keyof typeof todos[number]; 
    const newTodos = [...todos];
    newTodos[i][field] = e.target.value as never; 
    setTodos(newTodos);
  }; 
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  }; 

  const handleExtraFieldsChange = (e: any, i: number) => { 
    const field = e.target.name as keyof typeof extraFields[number]; 
    const newExtraFields = [...extraFields];
    newExtraFields[i][field] = e.target.value; 
    setExtraFields(newExtraFields); 
  }; 
  
  const handleAddExtraFields = () => { 
    setExtraFields([...extraFields, { name: "", type: "", value: "" }]); 
  }; 
  
  const handleDeleteExtraFields = (i: number) => { 
    const newExtraFields = [...extraFields]; 
    newExtraFields.splice(i, 1); 
    setExtraFields(newExtraFields); 
  }; 

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Handle files
  const handleFileChange = (e: any, i: number) => {
    const field = e.target.name as keyof typeof newFiles[number]; 
    const nFiles = [...newFiles];
    nFiles[i][field] = e.target.value; 
    setNewFiles(nFiles); 
  }

  const handleAddFile = () => {
    setNewFiles([...newFiles, {name: ""}]);
  }

  const handleDeleteFile = (i: number) => {
    const nFiles = [...newFiles]; 
    nFiles.splice(i, 1); 
    setNewFiles(nFiles); 
  }

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

        {fetching ? <ActivityIndicator /> : (

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
              Update Tenant Details
            </Typography>
            <Divider style={{margin: '10px'}} />
            <Grid 
              container
              direction={'row'}
              alignItems={'center'}
              sx={{p: 2}}
            >
              <Typography
                style={{marginBottom: '10px', marginTop: '20px', fontStyle: 'italic', fontWeight: 'bold'}}
                variant="body2"
              >
                Tenant: {data?.tenantById?.firstName} {data?.tenantById?.lastName} <br />
                Property: {data?.tenantById?.property} <br />
                Unit: {data?.tenantById?.unit} <br />
                Landlord: {data?.tenantById?.landlord}
              </Typography>
            </Grid>

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
                    First Name
                </Typography>
                <input
                    type="text"
                    placeholder="First Name"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
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
                  Last Name
                </Typography>
                <input
                    type="text"
                    placeholder="Last Name"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
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
                    Email Address
                </Typography>
                <input
                    type="text"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                xs={12}
                sm={5}
            >
                <Typography fontWeight={'bold'}>
                    Phone Number
                </Typography>
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone_number}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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

            {/* Add Fields from moreInfo json string */}
            {data?.tenantById?.moreInfo && JSON.parse(data?.tenantById?.moreInfo).map((todo: any, index: number) => (
                <Grid 
                container 
                spacing={2} 
                style={{margin: '5px'}}
                direction="column"
                item
                xs={12}
                sm={5}
                key={index}
            >
                <Typography fontWeight={'bold'}>
                  {todo?.name}
                </Typography>
                <input
                  type="text"
                  placeholder={todo?.name}
                  name="value"
                  value={(todos[index] as { value: string })?.value}
                  onChange={(e) => handleTodoChange(e, index)}
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
            ))}


            <Grid item xs={12} style={{margin: '5px'}}>
              <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}
              >
                Add New Fields
              </Typography>
              <Divider style={{margin: '10px'}} />
              {extraFields.map((extraField, index) => ( 
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
                  xs={12}
                  sm={4}
                  key={index}
                  >
                    <input 
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={extraField.name} 
                      onChange={(e) => handleExtraFieldsChange(e, index)} 
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
                    style={{margin: '5px', marginTop: '0px'}}
                    direction="column"
                    item
                    xs={12}
                    sm={4}
                >
                    <FormControl fullWidth style={{marginTop: '10px'}}>
                        <InputLabel id="demo-simple-select-label">
                          Field Type
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={extraField.type} 
                            onChange={(e) => handleExtraFieldsChange(e, index)}
                            label="Type"
                            name="type"
                        >
                            <MenuItem value={'text'}>Text</MenuItem>
                            <MenuItem value={'number'}>Number</MenuItem>
                            <MenuItem value={'boolean'}>Yes/No</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid 
                    container 
                    spacing={2} 
                    style={{margin: '5px'}}
                    direction="column"
                    alignItems={'flex-end'}
                    item
                    xs={12}
                    sm={3}
                >
                  <Button 
                    variant="outlined" 
                    onClick={() => handleDeleteExtraFields(index)}
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
                  onClick={handleAddExtraFields}
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
          </Grid>

            <Grid item xs={12}>
              <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}
              >
                Duration of Lease/Rent
              </Typography>
              <Divider style={{margin: '10px'}} />

              <Grid 
                container
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Grid 
                  spacing={2} 
                  style={{margin: '5px'}}
                  direction="column"
                  item 
                  xs={12}
                  sm={5}
                >
                  <Typography fontWeight={'bold'}>
                    Start date
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                          <DatePicker 
                            label="Select start date" 
                            onChange={(e: Date | null) => setStartDate(e)}/>
                      </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid 
                  spacing={2} 
                  style={{margin: '5px'}}
                  direction="column"
                  item
                  xs={12}
                  sm={5}
                >
                  <Typography fontWeight={'bold'}>
                    End date
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                          <DatePicker 
                            label="Select end date" 
                            onChange={(e: Date | null) => setEndDate(e)}/>
                      </DemoContainer>
                  </LocalizationProvider>
                </Grid>
            </Grid>
            </Grid>

          <Grid item xs={12}>
            <Typography 
                variant="h6" 
                component="div" 
                sx={{ fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}
            >
                Files
            </Typography>
            <Divider style={{margin: '10px'}} />

            {data?.tenantById?.files.map((file: any, index: number) => (
              <File 
                key={index}
                fileObj={file}
              />
            ))}
          </Grid>

          <Grid item xs={12}>
            <Typography 
                variant="h6" 
                component="div" 
                sx={{ fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}
            >
                Request Files
            </Typography>
            <Divider style={{margin: '10px'}} />

            <Grid 
              container
              direction={'row'}
              alignItems={'center'}
            > 
              <Typography 
                style={{marginBottom: '10px', marginTop: '20px', fontStyle: 'italic'}}
                variant="body2"
              >
                Add fields to request files from tenant.
                This requested fields would be sent to the tenant via email to submit. The filled information would be stored in the tenant&rsquo;s profile.
              </Typography>
            </Grid>

            {newFiles.map((file, index) => ( 
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
                  xs={12}
                  sm={4}
                  key={index}
                  >
                    <input 
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={file.name} 
                      onChange={(e) => handleFileChange(e, index)} 
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
                    alignItems={'flex-end'}
                    item
                    xs={12}
                    sm={3}
                >
                  <Button 
                    variant="outlined" 
                    onClick={() => handleDeleteFile(index)}
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
              onClick={handleAddFile}
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
              Add File
            </Button>
          </Grid>

          </Grid>
          </Grid>

          <Grid item xs={12}>
                  
          
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
            direction={'column'}
            item
            xs={10}
          >
            {success ? (
                <Typography style={{color: 'green'}}>
                    Submitted Successfully
                </Typography>
            ) : (
                <Typography style={{color: 'red'}}>
                    {errorMessage}
                </Typography>
            )}
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
                Submit
            </Button>
          )}
        </Grid>

        </Grid>
        </Grid>  
        </Grid>
        )}
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
