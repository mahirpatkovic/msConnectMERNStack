import React, { Fragment, useEffect, useRef, useState } from 'react';

import Dashboard from './layout/Dashboard';
import { useDispatch } from 'react-redux';
import Service from './api/service';
import Cookies from 'js-cookie';
import { authActions } from './store/auth';
import { Backdrop, CircularProgress } from '@mui/material';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    let isMounted = useRef(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = Cookies.get('token');
        const isUserAutheticated = async () => {
            if (token) {
                await Service.userAuthenticated()
                    .then((res) => {
                        dispatch(authActions.login());
                        dispatch(authActions.setUser(res.data.user));
                        Cookies.set('token', `${res.data.token}`, {
                            expires: 1,
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        };

        isUserAutheticated();
        setIsLoading(false);

        return () => {
            isMounted.current = false;
        };
    }, [dispatch]);

    return (
        <Fragment>
            {isLoading ? (
                <Backdrop
                    sx={{
                        color: '#000',
                        backgroundColor: '#ddd',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={isLoading}
                    // onClick={() => setIsLoading(false)}
                >
                    <CircularProgress color='inherit' />
                </Backdrop>
            ) : (
                <Dashboard />
            )}
        </Fragment>
    );
}

export default App;
