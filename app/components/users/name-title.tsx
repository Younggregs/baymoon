import Typography from '@mui/material/Typography';
import user from '../../lib/user-details'

const NameTitle = () => {
  return (
    <Typography 
        variant="h6" noWrap component="div" 
        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }}}
        >
        Hello {user().first_name}
    </Typography>
  );
}

export default NameTitle