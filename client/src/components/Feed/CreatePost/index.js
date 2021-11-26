import React from 'react';
import { useSelector } from 'react-redux';
import {
    Person,
    Videocam,
    PhotoLibrary,
    InsertEmoticon,
} from '@mui/icons-material';
import './style.css';

function CreatePost() {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="messageSender">
            <div className="messageSender__top">
                <img
                    className="user__avatar"
                    src={
                        currentUser?.photo
                            ? publicFolder +
                              `profilePictures/${currentUser.photo}`
                            : publicFolder + `profilePictures/noAvatar.jpg`
                    }
                    alt="profilePicture"
                />
                <form>
                    <input
                        className="messageSender__input"
                        placeholder={`What's on your mind ${
                            currentUser && currentUser.firstName
                        } ?`}
                        type="text"
                    />
                </form>
            </div>

            <div className="messageSender__bottom">
                <div className="messageSender__option">
                    <Videocam />
                    <h3>Live</h3>
                </div>

                <div className="messageSender__option">
                    <PhotoLibrary />
                    <h3>Photo</h3>
                </div>

                <div className="messageSender__option">
                    <InsertEmoticon />
                    <h3>Feeling</h3>
                </div>
            </div>
        </div>
    );
}
export default CreatePost;
