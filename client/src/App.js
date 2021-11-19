import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LoginPage';

function App() {
    return (
        <Fragment>
            <Router>
                <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </Router>
        </Fragment>
    );
}

export default App;
