import React from 'react';
import { ThumbUp, ChatBubbleOutlined, NearMe } from '@mui/icons-material';
import './style.css';

function Posts() {
    return (
        <div>
            <div className="post">
                <div className="post__top">
                    <img
                        className="user__avatar post__avatar"
                        src="https://image.pngaaa.com/117/4811117-small.png"
                        alt=""
                    />
                    <div className="post__topInfo">
                        <h3>Somanath Goudar</h3>
                        <p>25 April at 20:30</p>
                    </div>
                </div>

                <div className="post__bottom">
                    <p>Message</p>
                </div>

                <div className="post__image">
                    <img
                        src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                        alt=""
                    />
                </div>

                <div className="post__options">
                    <div className="post__option">
                        <ThumbUp className="material-icons" />
                        <p>Like</p>
                    </div>

                    <div className="post__option">
                        <ChatBubbleOutlined className="material-icons" />
                        <p>Comment</p>
                    </div>

                    <div className="post__option">
                        <NearMe className="material-icons" />
                        <p>Share</p>
                    </div>
                </div>
            </div>
            {/* <!-- post ends --> */}

            {/* <!-- post starts --> */}
            <div className="post">
                <div className="post__top">
                    <img
                        className="user__avatar post__avatar"
                        src="https://image.pngaaa.com/117/4811117-small.png"
                        alt=""
                    />
                    <div className="post__topInfo">
                        <h3>Somanath Goudar</h3>
                        <p>25 April at 20:30</p>
                    </div>
                </div>

                <div className="post__bottom">
                    <p>Post Without Image</p>
                </div>

                <div className="post__options">
                    <div className="post__option">
                        <ThumbUp className="material-icons" />
                        <p>Like</p>
                    </div>

                    <div className="post__option">
                        <ChatBubbleOutlined className="material-icons" />
                        <p>Comment</p>
                    </div>

                    <div className="post__option">
                        <NearMe className="material-icons" />
                        <p>Share</p>
                    </div>
                </div>
            </div>
            {/* <!-- post ends --> */}

            {/* <!-- post starts --> */}
            <div className="post">
                <div className="post__top">
                    <img
                        className="user__avatar post__avatar"
                        src="https://image.pngaaa.com/117/4811117-small.png"
                        alt=""
                    />
                    <div className="post__topInfo">
                        <h3>Somanath Goudar</h3>
                        <p>25 April at 20:30</p>
                    </div>
                </div>

                <div className="post__bottom">
                    <p>Message</p>
                </div>

                <div className="post__image">
                    <img
                        src="https://wallpapercave.com/wp/wp7357832.jpg"
                        alt=""
                    />
                </div>

                <div className="post__options">
                    <div className="post__option">
                        <ThumbUp className="material-icons" />
                        <p>Like</p>
                    </div>

                    <div className="post__option">
                        <ChatBubbleOutlined className="material-icons" />
                        <p>Comment</p>
                    </div>

                    <div className="post__option">
                        <NearMe className="material-icons" />
                        <p>Share</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Posts;
