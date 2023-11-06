"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import stylesMain from '../../../page.module.css';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation'
import Grid from '@mui/material/Grid';
import { TENANT_BY_ID } from '@/app/utils/queries'
import { useMutation, useQuery } from 'urql';
import { UPDATE_TENANT } from '@/app/utils/mutations';
import ActivityIndicator from '../../../components/activity-indicator';
import user from '@/app/lib/user-details';

const drawerWidth = 240;

interface Props {
    params?: any;
}

export default function Page(props: Props) {
  const router = useRouter()
  const { params } = props;

  const [res] = useQuery({query: TENANT_BY_ID, variables: {id: params?.id} });
  const { data, fetching, error } = res;

  const features = user().permissions[0] === '*' ? ['Dashboard', 'Properties', 'Tenants', 'Income', 'Expenses', 'Users'] : user().permissions;

  const [isLoading, setIsLoading] = React.useState(false)
  const [errorMessage, setError] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [first_name, setFirstName] = React.useState('');
  const [last_name, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone_number, setPhoneNumber] = React.useState('');
  const [todos, setTodos] = React.useState([]); 

  const [updateTenantResult, updateTenant] = useMutation(UPDATE_TENANT);

  React.useEffect(() => {
    if (data?.tenantById) {
      setFirstName(data?.tenantById?.firstName)
      setLastName(data?.tenantById?.lastName)
      setEmail(data?.tenantById?.email)
      setPhoneNumber(data?.tenantById?.phoneNumber)
      setTodos(JSON.parse(data?.tenantById?.moreInfo))
    }
  }, [data])


  const submit = () => {
    setIsLoading(true)
    const data = {
      id: params?.id,
      first_name,
      last_name,
      email,
      phone_number,
      more_info: JSON.stringify(todos)
    }
    console.log('data', data)
    updateTenant(data).then((result) => {
      setIsLoading(false)
      if (result.data?.updateTenant?.success) {
        console.log('result', result)
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
    console.log('todos', todos)
  }; 
  
  const handleDeleteTodo = (i: number) => { 
    const newTodos = [...todos]; 
    newTodos.splice(i, 1); 
    setTodos(newTodos); 
  };  

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
          width: { sm: "100%" }
        }}
      >
        <Toolbar>
          <Typography 
            variant="h6" noWrap component="div" 
            sx={{ flexGrow: 1 }}
          >
            Baymoon
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, color: '#000' }}
      >
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
              Tenant Details
            </Typography>
            <Divider style={{margin: '10px'}} />
            <Grid 
              container
              direction={'row'}
              alignItems={'center'}
              sx={{p: 2}}
            > 
              <Typography 
                style={{marginBottom: '10px', marginTop: '20px'}}
                variant="body2"
              >
                Hello {data?.tenantById?.firstName}, you have been been invited by your Landlord to please fill and/or update the form below to complete your tenant registration.
              </Typography>
              <Typography
                style={{marginBottom: '10px', marginTop: '20px', fontStyle: 'italic', fontWeight: 'bold'}}
                variant="body2"
              >
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

