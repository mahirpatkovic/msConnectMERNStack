import React, { Fragment, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LoginPage';
import Messenger from './pages/Messenger';
import Groups from './pages/Groups';
import Timeline from './pages/Timeline';
import Settings from './pages/SettingsPage';
import { useSelector, useDispatch } from 'react-redux';
import Service from './api/service';
import Cookies from 'js-cookie';
import { authActions } from './store/auth';
import { Backdrop, CircularProgress } from '@mui/material';

function App() {
    const isUserLoggedIn = useSelector((state) => state.auth.isAuthenticated);
    let isMounted = useRef(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = Cookies.get('token');
        const isUserAutheticated = async () => {
            if (token) {
                await Service.userAuthenticated()
                    .then((res) => {
                        dispatch(authActions.login());
                        dispatch(authActions.setUser(res.data.currentUser));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        };
        isUserAutheticated();

        return () => {
            isMounted.current = false;
        };
    }, [dispatch]);

    return (
        <Fragment>
            <Router>
                {!isUserLoggedIn && (
                    <Backdrop
                        sx={{
                            color: '#000',
                            backgroundColor: '#ddd',
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                        open={!isUserLoggedIn}
                        // onClick={() => setIsLoading(false)}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                )}
                <Routes>
                    <Route
                        path="/"
                        element={
                            isUserLoggedIn && isMounted ? <Home /> : <Login />
                        }
                    />
                    <Route
                        path="/messenger"
                        element={isUserLoggedIn ? <Messenger /> : <Login />}
                    />
                    <Route
                        path="/groups"
                        element={isUserLoggedIn ? <Groups /> : <Login />}
                    />
                    <Route
                        path="/timeline"
                        element={isUserLoggedIn ? <Timeline /> : <Login />}
                    />
                    <Route
                        path="/settings"
                        element={isUserLoggedIn ? <Settings /> : <Login />}
                    />
                </Routes>
            </Router>
        </Fragment>
    );
}

export default App;
