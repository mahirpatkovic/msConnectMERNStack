import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../../store/auth';
import Cropper from 'react-easy-crop';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField,
    Slider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    Backdrop,
    CircularProgress,
} from '@mui/material';
import { Close, Public } from '@mui/icons-material';
import './style.css';
import Service from '../../../api/service';

function ProfilePhotoModal(props) {
    const [imageZoom, setImageZoom] = useState(1.2);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();

    const handleSliderChange = (event, val) => {
        setImageZoom(val);
    };

    const onCropImageComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleSaveImage = async () => {
        setIsLoading(true);
        await Service.updateProfilePhoto({
            croppedAreaPixels,
            image: props.selectedProfilePhoto,
            userId: currentUser._id,
        }).then((res) => {
            dispatch(authActions.setUserProfile(res.data.currentUser.photo));
            setIsLoading(false);
            props.onClose();
        });
    };

    return (
        <Dialog onClose={props.onClose} open={props.visible} fullWidth>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isLoading}
            >
                <CircularProgress color='inherit' />
            </Backdrop>
            <DialogTitle>
                <Grid container spacing={2} columns={14} style={{ height: 50 }}>
                    <Grid item xs={13}>
                        <h3
                            style={{
                                textAlign: 'center',
                                marginLeft: '10%',
                            }}
                        >
                            Update photo
                        </h3>
                    </Grid>
                    <Grid item xs={1}>
                        <Close
                            style={{
                                color: 'gray',
                                cursor: 'pointer',
                                backgroundColor: 'lightGray',
                                borderRadius: 50,
                                fontSize: 30,
                                marginTop: 3,
                            }}
                            onClick={props.onClose}
                        />
                    </Grid>
                </Grid>
            </DialogTitle>

            <DialogContent dividers>
                <TextField
                    multiline
                    fullWidth
                    sx={{ fontSize: 5 }}
                    rows={2}
                    // variant='standard'
                    variant='filled'
                    placeholder='Description'
                    // onChange={(e) =>
                    //     setPostValues({
                    //         ...postValues,
                    //         description: e.target.value,
                    //     })
                    // }
                />
                <Grid container justifyContent='center'>
                    <div className='profileCropContainer'>
                        <Cropper
                            image={props.selectedProfilePhoto}
                            crop={crop}
                            zoom={imageZoom}
                            aspect={1}
                            cropShape='round'
                            onCropChange={setCrop}
                            onCropComplete={onCropImageComplete}
                            onZoomChange={setImageZoom}
                            showGrid={false}
                        />
                    </div>

                    <Slider
                        value={imageZoom}
                        onChange={handleSliderChange}
                        min={1}
                        max={2}
                        step={0.1}
                        style={{ width: 250, marginTop: 350 }}
                    />
                </Grid>
                <ListItem>
                    <ListItemIcon>
                        <Public fontSize='large' />
                    </ListItemIcon>
                    <ListItemText
                        primary='Your profile picture is public.'
                        style={{ marginLeft: -15 }}
                    />
                </ListItem>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    style={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        color: 'black',
                        backgroundColor: '#ddd',
                    }}
                    onClick={props.onClose}
                >
                    Cancel
                </Button>
                <Button
                    variant='contained'
                    style={{
                        textTransform: 'none',
                        backgroundColor: '#2e81f4',
                        fontWeight: 'bold',
                    }}
                    onClick={handleSaveImage}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ProfilePhotoModal;
