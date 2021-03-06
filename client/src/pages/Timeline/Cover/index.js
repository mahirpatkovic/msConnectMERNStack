import React, { useState } from 'react';
import {
    IconButton,
    Avatar,
    Badge,
    AvatarGroup,
    Stack,
    Button,
    useMediaQuery,
    Divider,
    MenuItem,
    CircularProgress,
    Backdrop,
    Snackbar,
    Alert,
} from '@mui/material';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import {
    CameraAlt,
    AddCircle,
    Edit,
    AddPhotoAlternateOutlined,
    FileUploadOutlined,
    DeleteOutlineOutlined,
} from '@mui/icons-material';
import StyledMenu from './StyledMenu';
import SelectCoverPhotoModal from '../SelectCoverPhotoModal';
import Cropper from 'react-easy-crop';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../store/auth';

import './style.css';
import 'antd/dist/antd.css';
import Service from '../../../api/service';
import SelectProfilePhotoModal from '../SelectProfilePhotoModal';
import ProfilePhotoModal from '../ProfilePhotoModal';

const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
function Cover(props) {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [isEditCoverMenuVisible, setIsEditCoverMenuVisible] = useState(null);
    const [isSelectCoverModalVisible, setIsSelectCoverModalVisible] =
        useState(false);
    const [currentCoverPhoto, setCurrentCoverPhoto] = useState(
        currentUser?.cover
    );
    const [isCoverEditCropperVisible, setIsCoverEditCropperVisible] =
        useState(false);
    const [isSaveCoverBarVisible, setIsSaveCoverBarVisible] = useState(false);
    const [coverEditor, setCoverEditor] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const [isEditProfileMenuVisible, setIsEditProfileMenuVisible] =
        useState(null);
    const [isSelectProfileModalVisible, setIsSelectProfileModalVisible] =
        useState(false);
    const [editableProfilePhoto, setEditableProfilePhoto] = useState();
    const [isEditProfilePhotoModalVisible, setIsEditProfilePhotoModalVisible] =
        useState(false);
    const [errorUpdateCoverMessage, setErrorUpdateCoverMessage] = useState('');
    const [isErrorUpdateCoverAlertVisible, setIsErrorUpdateCoverAlertVisible] =
        useState(false);
    const [errorUpdateProfileMessage, setErrorUpdateProfileMessage] =
        useState('');
    const [
        isErrorUpdateProfileAlertVisible,
        setIsErrorUpdateProfileAlertVisible,
    ] = useState(false);
    const isMobile = useMediaQuery('(max-width:576px)');
    const dispatch = useDispatch();

    const handleOpenEditCoverMenu = (event) => {
        setIsEditCoverMenuVisible(event.currentTarget);
    };
    const handleCloseEditCoverMenu = () => {
        setIsEditCoverMenuVisible(null);
    };

    const handleOpenSelectCoverModal = () => {
        setIsSelectCoverModalVisible(true);
    };

    const handleCloseSelectCoverModal = () => {
        setIsSelectCoverModalVisible(false);
        setIsEditCoverMenuVisible(null);
    };

    const onSelectCurrentCoverPhoto = (photoSrc) => {
        setCurrentCoverPhoto(photoSrc);
        setIsEditCoverMenuVisible(null);
        setIsCoverEditCropperVisible(true);
        setIsSaveCoverBarVisible(true);
        setCoverEditor(photoSrc);
    };

    const saveCoverPhotoHandler = async () => {
        // await Service.updateCoverPhoto({
        //     croppedAreaPixels,
        //     image: coverEditor,
        //     userId: currentUser._id,
        // });
        if (coverEditor) {
            if ((croppedAreaPixels.x || croppedAreaPixels.y) !== 0) {
                setIsLoading(true);
                await Service.updateCoverPhoto({
                    croppedAreaPixels,
                    image: coverEditor,
                    userId: currentUser._id,
                })
                    .then((res) => {
                        setIsCoverEditCropperVisible(false);
                        setIsSaveCoverBarVisible(false);
                        dispatch(
                            authActions.setUserCover(res.data.currentUser.cover)
                        );
                        setCurrentCoverPhoto(res.data.currentUser.cover);
                        setIsLoading(false);
                    })
                    .catch(() => {
                        setErrorUpdateCoverMessage('Cannot update cover photo');
                        setIsErrorUpdateCoverAlertVisible(true);
                        setIsCoverEditCropperVisible(false);
                        setIsSaveCoverBarVisible(false);
                        setIsLoading(false);
                    });
            } else {
                setIsCoverEditCropperVisible(false);
                setIsSaveCoverBarVisible(false);
            }
        }
    };
    const cancelCoverPhotoHandler = () => {
        setCurrentCoverPhoto(currentUser?.cover);
        setIsCoverEditCropperVisible(false);
        setIsSaveCoverBarVisible(false);
    };

    const onCropCoverImageComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleOpenEditProfileMenu = (event) => {
        setIsEditProfileMenuVisible(event.currentTarget);
    };
    const handleCloseEditProfileMenu = () => {
        setIsEditProfileMenuVisible(null);
    };

    const handleOpenSelectProfileModal = () => {
        setIsSelectProfileModalVisible(true);
    };

    const handleCloseSelectProfileModal = () => {
        setIsSelectProfileModalVisible(false);
        setIsEditProfileMenuVisible(null);
    };

    const onSelectCurrentProfilePhoto = (photoSrc) => {
        setEditableProfilePhoto(photoSrc);
        setIsEditProfileMenuVisible(null);
        setIsEditProfilePhotoModalVisible(true);
    };

    const handleCloseProfilePhotoModal = () => {
        setIsEditProfilePhotoModalVisible(false);
    };

    const handleUpdateProfilePhotoError = () => {
        setIsErrorUpdateProfileAlertVisible(true);
        setErrorUpdateProfileMessage('Cannot update profile photo');
    };

    return (
        <div className='coverBar'>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isLoading}
            >
                <CircularProgress color='inherit' />
            </Backdrop>
            {isSaveCoverBarVisible && (
                <div className='saveCoverBar'>
                    <Stack
                        direction='row'
                        spacing={2}
                        justifyContent='flex-end'
                        style={{ zIndex: 3 }}
                    >
                        <Button
                            variant='contained'
                            style={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                backgroundColor: '#bbb',
                            }}
                            onClick={cancelCoverPhotoHandler}
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
                            onClick={saveCoverPhotoHandler}
                        >
                            Save Changes
                        </Button>
                    </Stack>
                </div>
            )}
            {isErrorUpdateCoverAlertVisible && (
                <Snackbar
                    open={isErrorUpdateCoverAlertVisible}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={6000}
                    onClose={() => setIsErrorUpdateCoverAlertVisible(false)}
                >
                    <Alert
                        onClose={() => setIsErrorUpdateCoverAlertVisible(false)}
                        severity='error'
                        sx={{ width: '100%' }}
                    >
                        {errorUpdateCoverMessage}
                    </Alert>
                </Snackbar>
            )}
            {isErrorUpdateProfileAlertVisible && (
                <Snackbar
                    open={isErrorUpdateProfileAlertVisible}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={6000}
                    onClose={() => setIsErrorUpdateProfileAlertVisible(false)}
                >
                    <Alert
                        onClose={() =>
                            setIsErrorUpdateProfileAlertVisible(false)
                        }
                        severity='error'
                        sx={{ width: '100%' }}
                    >
                        {errorUpdateProfileMessage}
                    </Alert>
                </Snackbar>
            )}
            {isCoverEditCropperVisible ? (
                <div className='cropContainer'>
                    <Cropper
                        image={currentCoverPhoto}
                        crop={crop}
                        zoom={zoom}
                        aspect={16 / 9}
                        onCropChange={setCrop}
                        onCropComplete={onCropCoverImageComplete}
                        onZoomChange={setZoom}
                        showGrid={false}
                    />
                </div>
            ) : (
                <div className='coverImage'>
                    <img
                        src={
                            currentUser?.cover
                                ? currentCoverPhoto
                                : publicFolder + `covers/noCover.jpg`
                        }
                        alt=''
                        // width={currentCoverPhotoDimensions.width}
                        // height={currentCoverPhotoDimensions.height}
                    />
                    {isMobile ? (
                        <IconButton
                            aria-label='add photo'
                            size='small'
                            style={{
                                color: 'black',
                                backgroundColor: 'white',
                                float: 'right',
                                marginTop: '32%',
                                marginRight: 10,
                            }}
                            className='profileBtn'
                            onClick={handleOpenEditCoverMenu}
                        >
                            <CameraAlt />
                        </IconButton>
                    ) : (
                        <Button
                            variant='contained'
                            color='primary'
                            startIcon={<CameraAlt />}
                            style={{
                                marginTop: -100,
                                textTransform: 'none',
                                backgroundColor: 'white',
                                color: 'black',
                                marginLeft: '75%',
                                fontWeight: 'bold',
                            }}
                            onClick={handleOpenEditCoverMenu}
                        >
                            Edit Photo
                        </Button>
                    )}
                    <StyledMenu
                        anchorEl={isEditCoverMenuVisible}
                        open={Boolean(isEditCoverMenuVisible)}
                        onClose={handleCloseEditCoverMenu}
                    >
                        <MenuItem
                            disableRipple
                            onClick={handleOpenSelectCoverModal}
                        >
                            <AddPhotoAlternateOutlined />
                            Select photo
                        </MenuItem>
                        <MenuItem disableRipple>
                            <FileUploadOutlined />
                            Upload photo
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem disableRipple>
                            <DeleteOutlineOutlined />
                            Remove
                        </MenuItem>
                    </StyledMenu>
                </div>
            )}
            <div
                className={
                    isCoverEditCropperVisible
                        ? 'profileBarWithCropper'
                        : 'profileBar'
                }
            >
                <Row>
                    <Col
                        md={{ span: 5, offset: 1 }}
                        sm={{ span: 9, offset: 8 }}
                        xs={{ span: 15, offset: 7 }}
                    >
                        <Badge
                            overlap='circular'
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={
                                <IconButton
                                    aria-label='add photo'
                                    size='small'
                                    style={{
                                        color: 'black',
                                        backgroundColor: 'white',
                                    }}
                                    className='profileBtn'
                                    onClick={handleOpenEditProfileMenu}
                                >
                                    <CameraAlt />
                                </IconButton>
                            }
                            className='profileBadge'
                        >
                            <img
                                src={
                                    currentUser?.photo
                                        ? currentUser.photo
                                        : publicFolder +
                                          `profilePictures/noAvatar.jpg`
                                }
                                alt={`${
                                    currentUser &&
                                    currentUser.firstName +
                                        ' ' +
                                        currentUser.lastName
                                }`}
                            />
                        </Badge>
                        <StyledMenu
                            anchorEl={isEditProfileMenuVisible}
                            open={Boolean(isEditProfileMenuVisible)}
                            onClose={handleCloseEditProfileMenu}
                        >
                            <MenuItem
                                disableRipple
                                onClick={handleOpenSelectProfileModal}
                            >
                                <AddPhotoAlternateOutlined />
                                Select photo
                            </MenuItem>
                            <MenuItem disableRipple>
                                <FileUploadOutlined />
                                Upload photo
                            </MenuItem>
                            <Divider sx={{ my: 0.5 }} />
                            <MenuItem disableRipple>
                                <DeleteOutlineOutlined />
                                Remove
                            </MenuItem>
                        </StyledMenu>
                    </Col>
                    <Col
                        md={{ span: 6, offset: 1 }}
                        sm={{ span: 9, offset: 2 }}
                        xs={{ span: 12, offset: 2 }}
                    >
                        <div className='profileDetails'>
                            <h1>
                                {currentUser &&
                                    currentUser.firstName +
                                        ' ' +
                                        currentUser.lastName}
                            </h1>
                            <h3>398 Friends</h3>
                            <AvatarGroup max={4} className='friendsAvatars'>
                                <Avatar
                                    alt='Remy Sharp'
                                    src={
                                        currentUser?.photo
                                            ? currentUser.photo
                                            : publicFolder +
                                              `profilePictures/noAvatar.jpg`
                                    }
                                />
                                <Avatar
                                    alt='Travis Howard'
                                    src={
                                        currentUser?.photo
                                            ? currentUser.photo
                                            : publicFolder +
                                              `profilePictures/noAvatar.jpg`
                                    }
                                />
                                <Avatar
                                    alt='Cindy Baker'
                                    src={
                                        currentUser?.photo
                                            ? currentUser.photo
                                            : publicFolder +
                                              `profilePictures/noAvatar.jpg`
                                    }
                                />
                                <Avatar
                                    alt='Agnes Walker'
                                    src={
                                        currentUser?.photo
                                            ? currentUser.photo
                                            : publicFolder +
                                              `profilePictures/noAvatar.jpg`
                                    }
                                />
                                <Avatar
                                    alt='Trevor Henderson'
                                    src={
                                        currentUser?.photo
                                            ? currentUser.photo
                                            : publicFolder +
                                              `profilePictures/noAvatar.jpg`
                                    }
                                />
                            </AvatarGroup>
                        </div>
                    </Col>
                    <Col
                        md={{ span: 10, offset: 1 }}
                        sm={{ span: 13, offset: 0 }}
                        xs={{ span: 19, offset: 2 }}
                    >
                        <div className='addEditGrid'>
                            <Stack direction='row' spacing={1}>
                                <Button
                                    variant='contained'
                                    startIcon={<AddCircle />}
                                    className='addStoryBtn'
                                    style={{
                                        textTransform: 'none',
                                        backgroundColor: '#1877f2',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Add to story
                                </Button>
                                <Button
                                    variant='contained'
                                    startIcon={<Edit />}
                                    className='editProfileBtn'
                                    color='inherit'
                                    style={{
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Edit profile
                                </Button>
                            </Stack>
                        </div>
                    </Col>
                </Row>
            </div>
            <Divider
                light={true}
                style={{
                    height: 1,
                    marginTop: 20,
                    width: '90%',
                    marginLeft: '5%',
                    marginBottom: 10,
                }}
                textAlign='center'
            />

            {isSelectCoverModalVisible && (
                <SelectCoverPhotoModal
                    visible={isSelectCoverModalVisible}
                    onClose={handleCloseSelectCoverModal}
                    onSelectCover={onSelectCurrentCoverPhoto}
                />
            )}
            {isSelectProfileModalVisible && (
                <SelectProfilePhotoModal
                    visible={isSelectProfileModalVisible}
                    onClose={handleCloseSelectProfileModal}
                    onSelectProfile={onSelectCurrentProfilePhoto}
                />
            )}
            {isEditProfilePhotoModalVisible && (
                <ProfilePhotoModal
                    visible={isEditProfilePhotoModalVisible}
                    onClose={handleCloseProfilePhotoModal}
                    selectedProfilePhoto={editableProfilePhoto}
                    onUpdateError={handleUpdateProfilePhotoError}
                />
            )}
        </div>
    );
}

export default Cover;
