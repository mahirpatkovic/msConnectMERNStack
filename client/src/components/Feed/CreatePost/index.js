import React from 'react';
import {
    Person,
    Videocam,
    PhotoLibrary,
    InsertEmoticon,
} from '@mui/icons-material';
import './style.css';

function CreatePost() {
    return (
        <div className="messageSender">
            <div className="messageSender__top">
                <Person />
                <form>
                    <input
                        className="messageSender__input"
                        placeholder="What's on your mind?"
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
