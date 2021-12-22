import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    ImageList,
    ImageListItem,
} from '@mui/material';
import { CancelOutlined } from '@mui/icons-material';
import Service from '../../../api/service';

function SelectCoverPhotoModal(props) {
    const [userImages, setUserImages] = useState([]);
    const currentUser = useSelector((state) => state.auth.currentUser);

    const isMounted = useRef(true);
    useEffect(() => {
        const getAllUserImages = async () => {
            if (isMounted.current) {
                await Service.getAllImages(currentUser._id).then((res) => {
                    setUserImages(res.data.data);
                });
            }
        };

        getAllUserImages();
        return () => {
            isMounted.current = false;
        };
    }, [currentUser._id]);

    const selectCoverPhotoHandler = (photoSrc) => {
        props.onSelectCover(photoSrc);
        props.onClose();
    };
    return (
        <Dialog onClose={props.onClose} open={props.visible} fullWidth>
            <DialogTitle>
                <Grid container spacing={2} columns={14} style={{ height: 50 }}>
                    <Grid item xs={13}>
                        <h3
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            Select Photo
                        </h3>
                    </Grid>
                    <Grid item xs={1}>
                        <CancelOutlined
                            style={{
                                color: 'gray',
                                cursor: 'pointer',
                                marginTop: 7,
                            }}
                            onClick={props.onClose}
                        />
                    </Grid>
                </Grid>
            </DialogTitle>

            <DialogContent>
                <ImageList sx={{ width: 'auto', height: 450 }} cols={3}>
                    {userImages.map((item, index) => (
                        <ImageListItem key={index}>
                            <img
                                src={item}
                                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt='user Pictures'
                                loading='lazy'
                                style={{ cursor: 'pointer' }}
                                onClick={() => selectCoverPhotoHandler(item)}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </DialogContent>
        </Dialog>
    );
}

export default SelectCoverPhotoModal;
