import React from 'react';
import {
    IconButton,
    Avatar,
    Badge,
    AvatarGroup,
    Stack,
    Button,
    useMediaQuery,
    Divider,
} from '@mui/material';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { CameraAlt, AddCircle, Edit } from '@mui/icons-material';
import './style.css';
import 'antd/dist/antd.css';

function Cover() {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const isMobile = useMediaQuery('(max-width:576px)');
    return (
        <div className='coverBar'>
            <div className='coverImage'>
                <img
                    src={
                        currentUser && currentUser.cover
                            ? publicFolder + `covers/${currentUser.cover}`
                            : publicFolder + `covers/noCover.jpg`
                    }
                    alt=''
                />
                <Button
                    variant='contained'
                    color='primary'
                    startIcon={<CameraAlt />}
                    style={{
                        marginTop: -100,
                        textTransform: 'none',
                        backgroundColor: 'white',
                        color: 'black',
                        marginLeft: isMobile ? '65%' : '75%',
                        fontWeight: 'bold',
                    }}
                >
                    Edit Photo
                </Button>
            </div>

            <div className='profileBar'>
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
                                    }}
                                    className='profileBtn'
                                >
                                    <CameraAlt />
                                </IconButton>
                            }
                            className='profileBadge'
                        >
                            <img
                                src={
                                    currentUser && currentUser.photo
                                        ? publicFolder +
                                          `profilePictures/${currentUser.photo}`
                                        : publicFolder +
                                          `profilePictures/noAvatar.jpg`
                                }
                                alt={`${
                                    currentUser &&
                                    currentUser.firstName +
                                        ' ' +
                                        currentUser.lastName
                                }`}
                            />{' '}
                        </Badge>
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
                                        currentUser && currentUser.photo
                                            ? publicFolder +
                                              `profilePictures/${currentUser.photo}`
                                            : publicFolder +
                                              `profilePictures/noAvatar.jpg`
                                    }
                                />
                                <Avatar
                                    alt='Travis Howard'
                                    src={
                                        currentUser && currentUser.photo
                                            ? publicFolder +
                                              `profilePictures/${currentUser.photo}`
                                            : publicFolder +
                                              `profilePictures/noAvatar.jpg`
                                    }
                                />
                                <Avatar
                                    alt='Cindy Baker'
                                    src={
                                        currentUser && currentUser.photo
                                            ? publicFolder +
                                              `profilePictures/${currentUser.photo}`
                                            : publicFolder +
                                              `profilePictures/noAvatar.jpg`
                                    }
                                />
                                <Avatar
                                    alt='Agnes Walker'
                                    src={
                                        currentUser && currentUser.photo
                                            ? publicFolder +
                                              `profilePictures/${currentUser.photo}`
                                            : publicFolder +
                                              `profilePictures/noAvatar.jpg`
                                    }
                                />
                                <Avatar
                                    alt='Trevor Henderson'
                                    src={
                                        currentUser && currentUser.photo
                                            ? publicFolder +
                                              `profilePictures/${currentUser.photo}`
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
            {/* <div className='crop-container'>
                <Cropper
                    image='https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'
                    crop={crop}
                    zoom={zoom}
                    aspect={4 / 3}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
            <div className='controls'>
                <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby='Zoom'
                    onChange={(e, zoom) => setZoom(zoom)}
                    classes={{ root: 'slider' }}
                />
            </div> */}
        </div>
    );
}

export default Cover;
