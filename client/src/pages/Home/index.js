import React, { useEffect, useState, useRef } from 'react';
import { Snackbar, Alert } from '@mui/material';
// import Service from '../../api/service';
import { useSelector } from 'react-redux';
import Topbar from '../../components/Topbar';
import './style.css';
import Sidebar from '../../components/Sidebar';
import Feed from '../../components/Feed';
function Home() {
    // const [users, setUsers] = useState([]);
    const [isLoginMessageVisible, setIsLoginMessageVisible] = useState(false);
    const currentUser = useSelector((state) => state.auth.currentUser);
    let isMounted = useRef(true);

    useEffect(() => {
        setIsLoginMessageVisible(false);

        // const getUsers = async () => {
        //     await Service.getAllUser()
        //         .then((res) => {
        //             if (isMounted.current) setUsers(res.data.allUsers);
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         });
        // };

        // getUsers();

        return () => {
            isMounted.current = false;
        };
    }, []);
    return (
        <div>
            {/* Home Page Users:
            <img src={logo} alt="logo" />
            {users &&
                users.map((user, index) => (
                    <p key={index}>{user.firstName + ' ' + user.lastName}</p>
                ))}*/}
            {isLoginMessageVisible && (
                <Snackbar
                    open={isLoginMessageVisible}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={6000}
                    onClose={() => setIsLoginMessageVisible(false)}
                >
                    <Alert
                        onClose={() => setIsLoginMessageVisible(false)}
                        severity='success'
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
            <Topbar />
            <div className='main__body'>
                <Sidebar />
                <Feed />
            </div>
        </div>
    );
}

export default Home;
