import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import Service from '../../api/service';
import logo from '../../assets/logo.png';
import { useSelector } from 'react-redux';
function Home() {
    const [users, setUsers] = useState([]);
    const [isLoginMessageVisible, setIsLoginMessageVisible] = useState(false);
    const currentUser = useSelector((state) => state.auth.currentUser);
    useEffect(() => {
        setIsLoginMessageVisible(true);

        const getUsers = async () => {
            await Service.getAllUser()
                .then((res) => {
                    setUsers(res.data.allUsers);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getUsers();
    }, []);
    return (
        <div>
            Home Page Users:
            <img src={logo} alt="logo" />
            {users &&
                users.map((user, index) => (
                    <p key={index}>{user.firstName + ' ' + user.lastName}</p>
                ))}
            {isLoginMessageVisible && (
                <Snackbar
                    open={isLoginMessageVisible}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={6000}
                    onClose={() => setIsLoginMessageVisible(false)}
                >
                    <Alert
                        onClose={() => setIsLoginMessageVisible(false)}
                        severity="success"
                        sx={{ width: '100%' }}
                    >
                        {currentUser &&
                            'Welcome ' +
                                ' ' +
                                currentUser.firstName +
                                ' ' +
                                currentUser.lastName}
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
}

export default Home;
