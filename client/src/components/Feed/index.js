import React from 'react';
import CreatePost from './CreatePost';
import Story from './Story';
import Posts from './Posts';
import './style.css';

function Feed() {
    return (
        <div className="feed">
            <Story />
            <CreatePost />
            <Posts />
        </div>
    );
}
export default Feed;
