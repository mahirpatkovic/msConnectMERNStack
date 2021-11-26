import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
    Storefront,
    People,
    ExpandMore,
    LocalHospital,
    VideoLibrary,
    EmojiFlags,
    Chat,
} from '@mui/icons-material';
import './style.css';

function Sidebar() {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="sidebar">
            <NavLink
                to="/timeline"
                className={({ isActive }) =>
                    isActive ? 'sidebarRow active' : 'sidebarRow'
                }
            >
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
                <h4>
                    {currentUser &&
                        `${currentUser.firstName} ${currentUser.lastName}`}
                </h4>
            </NavLink>
            <div className="sidebarRow">
                <LocalHospital className="material-icons" />
                <h4>Covid - 19 Information Center</h4>
            </div>

            <div className="sidebarRow">
                <EmojiFlags className="material-icons" />
                <h4>Pages</h4>
            </div>

            <div className="sidebarRow">
                <People className="material-icons" />
                <h4>People</h4>
            </div>
            <NavLink
                to="/messenger"
                className={({ isActive }) =>
                    isActive ? 'sidebarRow active' : 'sidebarRow'
                }
            >
                <Chat className="material-icons" />
                <h4>Messenger</h4>
            </NavLink>
            <div className="sidebarRow">
                <Storefront className="material-icons" />
                <h4>Marketplace</h4>
            </div>

            <div className="sidebarRow">
                <VideoLibrary className="material-icons" />
                <h4>Videos</h4>
            </div>

            <div className="sidebarRow">
                <ExpandMore className="material-icons" />
                <h4>More</h4>
            </div>
        </div>
    );
}
export default Sidebar;
