import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
    ThumbUp,
    ChatBubbleOutlined,
    NearMe,
    Lock,
    Group,
    Public,
} from '@mui/icons-material';
import SwiperCore, { Zoom, Navigation, Pagination } from 'swiper';

import './style.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
SwiperCore.use([Zoom, Navigation, Pagination]);

function Posts(props) {
    const posts = props.posts;

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const currentUser = useSelector((state) => state.auth.currentUser);

    const postVisibilityHandler = (option) => {
        switch (option) {
            case 'onlyMe':
                return (
                    <Lock
                        fontSize='small'
                        style={{ marginLeft: 5, marginTop: -5 }}
                    />
                );
            case 'friends':
                return (
                    <Group
                        fontSize='small'
                        style={{ marginLeft: 5, marginTop: -5 }}
                    />
                );
            case 'public':
                return (
                    <Public
                        fontSize='small'
                        style={{ marginLeft: 5, marginTop: -5 }}
                    />
                );
            default:
                break;
        }
    };
    return (
        <div>
            {posts &&
                posts.map((post, index) => {
                    return (
                        <div className='post' key={index}>
                            <div className='post__top'>
                                <img
                                    className='user__avatar post__avatar'
                                    src={
                                        currentUser && currentUser.photo
                                            ? publicFolder +
                                              `profilePictures/${currentUser.photo}`
                                            : publicFolder +
                                              `profilePictures/noAvatar.jpg`
                                    }
                                    alt=''
                                />
                                <div className='post__topInfo'>
                                    <h3>
                                        {post.user.firstName +
                                            ' ' +
                                            post.user.lastName}
                                    </h3>
                                    <div className='postCreated'>
                                        <h4>
                                            {moment(post.createdAt).fromNow()}
                                        </h4>
                                        {postVisibilityHandler(post.visible)}
                                    </div>
                                </div>
                            </div>

                            {post.description && (
                                <div className='post__description'>
                                    <p>{post.description}</p>
                                </div>
                            )}

                            <div className='post__image'>
                                <Swiper
                                    className='swiper'
                                    style={{
                                        '--swiper-navigation-color': '#000',
                                        '--swiper-pagination-color': '#000',
                                    }}
                                    zoom={true}
                                    navigation={true}
                                    pagination={{
                                        clickable: true,
                                    }}
                                >
                                    {/* `data:video/${file.type.substring(1)};base64, */}
                                    {post.files.map((file, index) =>
                                        file.type ===
                                        ('.mp4' || '.MPEG-4' || '.mkv') ? (
                                            <SwiperSlide
                                                className='swiperSlide'
                                                key={index}
                                            >
                                                <div className='swiper-zoom-container'>
                                                    <video
                                                        width='100%'
                                                        controls
                                                        src={`${file.file}`}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ) : (
                                            <SwiperSlide
                                                className='swiperSlide'
                                                key={index}
                                            >
                                                <div className='swiper-zoom-container'>
                                                    <img
                                                        width='100%'
                                                        src={`${file.file}`}
                                                        alt=''
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        )
                                    )}
                                </Swiper>
                            </div>

                            <div className='post__options'>
                                <div className='post__option'>
                                    <ThumbUp className='material-icons' />
                                    <p>Like</p>
                                </div>

                                <div className='post__option'>
                                    <ChatBubbleOutlined className='material-icons' />
                                    <p>Comment</p>
                                </div>

                                <div className='post__option'>
                                    <NearMe className='material-icons' />
                                    <p>Share</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
export default Posts;
