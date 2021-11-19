import React, { useState } from 'react';
import {
    TextField,
    InputAdornment,
    IconButton,
    Grid,
    Button,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './style.css';
// import style from './style';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    // const classes = style();
    return (
        <div className="loginsignup">
            <div className="container">
                <Grid container columns={{ xs: 16, sm: 16 }}>
                    <Grid>
                        <div className="content-left">
                            <h1>MS Connect</h1>
                            <h2>
                                Social application, connect with friends and the
                                world around you on MS Connect..
                            </h2>
                        </div>
                    </Grid>
                    <Grid>
                        <div className="content-right">
                            <form>
                                <TextField
                                    id="email"
                                    placeholder="Email address"
                                    type="email"
                                    fullWidth
                                    required
                                    // onChange={handleInputChange('email')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <TextField
                                    id="password"
                                    placeholder="Enter password"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    required
                                    style={{ marginTop: 15, marginBottom: 15 }}
                                    // onChange={handleInputChange('password')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button
                                    className="loginBtn"
                                    variant="contained"
                                    style={{
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                        backgroundColor: '#1877f2',
                                    }}
                                >
                                    Log In
                                </Button>
                                <div className="forgot">
                                    <p>Forgot password?</p>
                                </div>
                                <hr className="underline" />
                                <Button
                                    className="signupBtn"
                                    variant="contained"
                                    style={{
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                        backgroundColor: '#42b72a',
                                        marginTop: 15,
                                    }}
                                >
                                    Create new account
                                </Button>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <Grid
                container
                direction="column"
                justifyContent="center"
                className="credits"
            >
                <p>MS Connect ©2021</p>
                <p>Created by Mahir Patkovic</p>
                <p>General IT and Software Solutions d.o.o. Sarajevo</p>
            </Grid>
        </div>
    );
};

export default Login;
