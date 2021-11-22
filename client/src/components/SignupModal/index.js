import React, { useState, useRef, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    TextField,
    DialogContent,
    Grid,
    InputAdornment,
    IconButton,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
    Button,
    DialogActions,
    Alert,
    AlertTitle,
    Backdrop,
    CircularProgress,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Service from '../../api/service';
import Cookies from 'js-cookie';
import { authActions } from '../../store/auth';
import { useDispatch } from 'react-redux';

function SignupModal(props) {
    const [userValues, setUserValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dob: null,
        gender: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let isMounted = useRef(false);
    const dispatch = useDispatch();

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    const handleInputChange = (val) => (event) => {
        if (val === 'dob') {
            return setUserValues({ ...userValues, [val]: event.toJSON() });
        }
        setUserValues({ ...userValues, [val]: event.target.value });
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleSignup = async () => {
        setIsLoading(true);
        try {
            await Service.signup(userValues).then((res) => {
                if (isMounted && res.status === 200) {
                    dispatch(authActions.login());
                    Cookies.set('token', `${res.data.token}`, { expires: 1 });
                    setIsLoading(false);
                    props.onClose();
                }
            });
        } catch (err) {
            setErrorMessage(err.response?.data.message);
            setIsAlertVisible(true);
            setIsLoading(false);
        }
    };

    const isDisabled =
        !userValues.firstName ||
        !userValues.lastName ||
        !userValues.email ||
        !userValues.password ||
        !userValues.dob ||
        !userValues.gender;

    return (
        <Dialog onClose={props.onClose} open={props.visible}>
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
            <DialogTitle>
                <p>Sign Up</p>
                <p style={{ fontSize: 15, color: 'grey' }}>
                    It's quick and easy
                </p>
            </DialogTitle>

            <DialogContent dividers>
                {isAlertVisible && (
                    <Alert
                        severity="error"
                        action={
                            <HighlightOffIcon
                                onClick={() => setIsAlertVisible(false)}
                                style={{ cursor: 'pointer' }}
                            />
                        }
                        style={{ marginBottom: 15 }}
                    >
                        <AlertTitle>Error</AlertTitle>
                        {errorMessage} — <strong> Try again !</strong>
                    </Alert>
                )}
                <form>
                    <Grid container spacing={2} columns={16}>
                        <Grid item xs={8}>
                            <TextField
                                id="firstName"
                                placeholder="First Name"
                                fullWidth
                                onChange={handleInputChange('firstName')}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="lastName"
                                placeholder="Last Name"
                                fullWidth
                                onChange={handleInputChange('lastName')}
                            />
                        </Grid>
                        <Grid item xs={16}>
                            <TextField
                                id="email"
                                placeholder="Email"
                                type="email"
                                fullWidth
                                // style={{ marginTop: 10 }}
                                onChange={handleInputChange('email')}
                            />
                        </Grid>
                        <Grid item xs={16}>
                            <TextField
                                id="password"
                                placeholder="New password"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                onChange={handleInputChange('password')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
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
                        </Grid>
                        <Grid item xs={8} style={{ width: 500 }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    inputFormat="dd/MM/yyyy"
                                    value={userValues.dob}
                                    label="Birthday"
                                    onChange={handleInputChange('dob')}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="row-radio-buttons-group"
                                    onChange={handleInputChange('gender')}
                                >
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        label="Female"
                                    />
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio />}
                                        label="Male"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Button
                            variant="contained"
                            style={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                backgroundColor: isDisabled
                                    ? '#1DA57A'
                                    : '#42b72a',
                                marginTop: 15,
                                width: 270,
                                cursor: isDisabled ? 'not-allowed' : 'pointer',
                            }}
                            onClick={handleSignup}
                            disabled={isDisabled}
                        >
                            Sign Up
                        </Button>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={props.onClose}
                    variant="contained"
                    style={{
                        textTransform: 'none',
                        backgroundColor: 'black',
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SignupModal;
