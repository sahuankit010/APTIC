import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                {/* <Typography sx={{ minWidth: 100 }}>Menu</Typography> */}
                <Tooltip title="Account settings">
                    <IconButton onClick={handleClick} size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}>
                        <Avatar sx={{ width: 32, height: 32 }} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                <MenuItem><a className="dropdown-item" href="/login">Login</a></MenuItem>
                <MenuItem><a className="dropdown-item" href="/usersignup">User Signup</a></MenuItem>
                <MenuItem><a className="dropdown-item" href="/hostRegistration">Host Registration</a></MenuItem>
                <Divider />
                <MenuItem><a className="dropdown-item" href="/hostDashboard">Switch to Host</a></MenuItem>
                <MenuItem><a className="dropdown-item" href="/favourites">Favourites</a></MenuItem>
                <MenuItem><a className="dropdown-item" href="/reservations">Reservations</a></MenuItem>
                <MenuItem><a className="dropdown-item" href="/logout">Logout</a></MenuItem>
            </Menu>
        </React.Fragment>
    );
}