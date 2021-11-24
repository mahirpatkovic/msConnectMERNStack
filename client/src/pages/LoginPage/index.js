import React, { useState, useRef, useEffect } from 'react';
import {
    TextField,
    InputAdornment,
    IconButton,
    Grid,
    Button,
    Alert,
    AlertTitle,
    Backdrop,
    CircularProgress,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SignupModal from '../../components/SignupModal';
import Service from '../../api/service';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import Cookies from 'js-cookie';
import './style.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);
    const [userValues, setUserValues] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    let isMounted = useRef(true);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const handleInputChange = (val) => (event) => {
        setUserValues({ ...userValues, [val]: event.target.value });
    };

    const openSigunpModalHandler = () => {
        setIsSignupModalVisible(true);
    };

    const closeSignupModalHandler = () => {
        if (isMounted) {
            setIsSignupModalVisible(false);
        }
    };

    const handleLogin = async () => {
        setIsLoading(true);
        await Service.login(userValues)
            .then((res) => {
                if (isMounted && res.status === 200) {
                    dispatch(authActions.login());
                    dispatch(authActions.setUser(res.data.user));
                    Cookies.set('token', `${res.data.token}`, { expires: 1 });
                    setIsLoading(false);
                } else {
                    console.log(res);
                    setErrorMessage('error');
                }
            })
            .catch((err) => {
                setIsAlertVisible(true);
                setErrorMessage(
                    err.response
                        ? err.response.data.message
                        : 'Connection to server has failed!'
                );
                setIsLoading(false);
            });
    };

    return (
        <div className="loginsignup">
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isLoading}
                onClick={() => setIsLoading(false)}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
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
                                {isAlertVisible && (
                                    <Alert
                                        severity="error"
                                        action={
                                            <HighlightOffIcon
                                                onClick={() =>
                                                    setIsAlertVisible(false)
                                                }
                                                style={{ cursor: 'pointer' }}
                                            />
                                        }
                                        style={{
                                            marginBottom: 15,
                                        }}
                                    >
                                        <AlertTitle>Error</AlertTitle>
                                        {errorMessage}
                                        <strong> Try again!</strong>
                                    </Alert>
                                )}
                                <TextField
                                    id="email"
                                    placeholder="Email address"
                                    type="email"
                                    fullWidth
                                    required
                                    onChange={handleInputChange('email')}
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
                                    onChange={handleInputChange('password')}
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
                                    onClick={handleLogin}
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
                                    onClick={openSigunpModalHandler}
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

            {isSignupModalVisible && (
                <SignupModal
                    visible={isSignupModalVisible}
                    onClose={closeSignupModalHandler}
                />
            )}
        </div>
    );
};

export default Login;
