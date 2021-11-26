import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Tooltip, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material';
import {
    Search,
    Flag,
    Subscriptions,
    Storefront,
    Groups,
    Forum,
    Notifications,
    ExpandMore,
    Home,
    Settings,
    Logout,
} from '@mui/icons-material';
import logo from '../../assets/logo.png';
import './style.css';

function Topbar() {
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [openMenu, setOpenMenu] = useState(null);

    const handleOpenMenu = (event) => {
        setOpenMenu(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setOpenMenu(null);
    };
    return (
        <div className="header">
            <div className="header__left">
                <NavLink to="/">
                    <Tooltip title="MS Connect">
                        <img alt="MS connect" src={logo} />
                    </Tooltip>
                </NavLink>
                <div className="header__input">
                    <Search className="material-icons" />
                    <input type="text" placeholder="Search MS Connect" />
                </div>
            </div>

            <div className="header__middle">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? 'header__option active' : 'header__option'
                    }
                >
                    <Tooltip title="Home">
                        <Home className="material-icons" />
                    </Tooltip>
                </NavLink>
                <div className="header__option">
                    <Tooltip title="Pages">
                        <Flag className="material-icons" />
                    </Tooltip>
                </div>
                <div className="header__option">
                    <Tooltip title="Videos">
                        <Subscriptions className="material-icons" />
                    </Tooltip>
                </div>
                <div className="header__option">
                    <Tooltip title="Store">
                        <Storefront className="material-icons" />
                    </Tooltip>
                </div>
                <NavLink
                    to="/groups"
                    className={({ isActive }) =>
                        isActive ? 'header__option active' : 'header__option'
                    }
                >
                    <Tooltip title="Groups">
                        <Groups className="material-icons" />
                    </Tooltip>
                </NavLink>
            </div>

            <div className="header__right">
                <NavLink
                    to="/timeline"
                    className={({ isActive }) =>
                        isActive ? 'header__info active' : 'header__info'
                    }
                    style={{ padding: 0 }}
                >
                    <img
                        className="user__avatar"
                        src={
                            currentUser && currentUser.photo
                                ? publicFolder +
                                  `profilePictures/${currentUser.photo}`
                                : publicFolder + `profilePictures/noAvatar.jpg`
                        }
                        alt="profilePicture"
                    />
                    <h4>{currentUser && currentUser.firstName}</h4>
                </NavLink>
                <NavLink
                    to="/messenger"
                    className={({ isActive }) =>
                        isActive ? 'header__info active' : 'header__info'
                    }
                >
                    <Tooltip title="Messenger">
                        <Forum className="material-icons" />
                    </Tooltip>
                </NavLink>
                <div className="header__info">
                    <Tooltip title="Notifications">
                        <Notifications className="material-icons" />
                    </Tooltip>
                </div>
                <div className="header__info">
                    <Tooltip title="Account">
                        <ExpandMore
                            className="material-icons"
                            onClick={handleOpenMenu}
                        />
                    </Tooltip>
                </div>
                <Menu
                    anchorEl={openMenu}
                    open={Boolean(openMenu)}
                    onClose={handleCloseMenu}
                    onClick={handleCloseMenu}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <NavLink to="/timeline">
                        <MenuItem style={{ color: 'black' }}>
                            <img
                                className="user__avatar"
                                src={
                                    currentUser?.photo
                                        ? publicFolder +
                                          `profilePictures/${currentUser.photo}`
                                        : publicFolder +
                                          `profilePictures/noAvatar.jpg`
                                }
                                alt="profilePicture"
                            />
                            {`${currentUser && currentUser.firstName}` +
                                ' ' +
                                `${currentUser && currentUser.lastName}`}
                        </MenuItem>
                    </NavLink>
                    <Divider />
                    <NavLink to="/settings" style={{ color: 'black' }}>
                        <MenuItem>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings & Privacy
                        </MenuItem>
                    </NavLink>
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
}
export default Topbar;
