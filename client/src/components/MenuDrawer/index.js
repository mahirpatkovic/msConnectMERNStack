import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth';
import Cookies from 'js-cookie';
import { Drawer, Divider } from '@mui/material';
import {
    Chat,
    Groups,
    AccountCircle,
    Home,
    Settings,
    Logout,
} from '@mui/icons-material';
import logo from '../../assets/logo.png';
import './style.css';

function MenuDrawer(props) {
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const currentUser = useSelector((state) => state.auth.currentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        Cookies.remove('token');
        dispatch(authActions.logout());
        navigate('/');
    };

    const list = () => (
        <div role='presentation'>
            <NavLink
                to='/'
                className={({ isActive }) =>
                    isActive ? 'menuRow active' : 'menuRow'
                }
            >
                <div className='menuRow'>
                    <Home className='material-icons' />
                    <h4>Home</h4>
                </div>
            </NavLink>
            <NavLink
                to='/messenger'
                className={({ isActive }) =>
                    isActive ? 'menuRow active' : 'menuRow'
                }
            >
                <div className='menuRow'>
                    <Chat className='material-icons' />
                    <h4>Messenger</h4>
                </div>
            </NavLink>
            <NavLink
                to='/groups'
                className={({ isActive }) =>
                    isActive ? 'menuRow active' : 'menuRow'
                }
            >
                <div className='menuRow'>
                    <Groups className='material-icons' />
                    <h4>Groups</h4>
                </div>
            </NavLink>
            <NavLink
                to='/timeline'
                className={({ isActive }) =>
                    isActive ? 'menuRow active' : 'menuRow'
                }
            >
                <div className='menuRow'>
                    <AccountCircle className='material-icons' />
                    <h4>Profile</h4>
                </div>
            </NavLink>
            <NavLink
                to='/settings'
                className={({ isActive }) =>
                    isActive ? 'menuRow active' : 'menuRow'
                }
            >
                <div className='menuRow'>
                    <Settings className='material-icons' />
                    <h4>Settings & Privacy</h4>
                </div>
            </NavLink>
            <div
                className='menuRow'
                onClick={logoutHandler}
                style={{ marginLeft: 30, padding: 10 }}
            >
                <Logout className='material-icons' />
                <h4>Logout</h4>
            </div>

            <Divider
                light={true}
                style={{
                    height: 1,
                    marginTop: 30,
                    width: '90%',
                    marginLeft: '5%',
                }}
                textAlign='center'
            />
            <div className='signature'>
                <h4 style={{ width: 170, color: 'grey' }}>
                    {' '}
                    MSConnect ©2021 Created by General IT and Software Solutions
                    d.o.o. Sarajevo by Mahir Patkovic
                </h4>
                <img alt='MS connect' src={logo} />
            </div>
        </div>
    );
    return (
        <div>
            <Drawer
                anchor='left'
                open={props.visible}
                onClose={props.onClose}
                sx={{ width: 500 }}
            >
                <div className='profile__avatar'>
                    <img
                        src={
                            currentUser?.photo
                                ? currentUser.photo
                                : publicFolder + `profilePictures/noAvatar.jpg`
                        }
                        alt='profilePicture'
                    />
                    <h3>
                        {currentUser &&
                            currentUser.firstName + ' ' + currentUser.lastName}
                    </h3>
                    <p>{currentUser && currentUser.email}</p>
                </div>
                <Divider
                    light={true}
                    style={{
                        height: 1,
                        marginTop: 20,
                        width: '90%',
                        marginLeft: '5%',
                        marginBottom: 20,
                    }}
                    textAlign='center'
                />
                {list()}
            </Drawer>
        </div>
    );
}

export default MenuDrawer;
