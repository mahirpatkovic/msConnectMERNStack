import React, { Fragment, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LoginPage';
import { useSelector } from 'react-redux';

function App() {
    const isUserLoggedIn = useSelector((state) => state.auth.isAuthenticated);
    let isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);
    return (
        <Fragment>
            <Router>
                <Routes>
                    {isUserLoggedIn && isMounted ? (
                        <Route path="/" exact element={<Home />} />
                    ) : (
                        <Route path="/" element={<Login />} />
                    )}
                </Routes>
            </Router>
        </Fragment>
    );
}

export default App;
