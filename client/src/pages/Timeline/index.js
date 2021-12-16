import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Topbar from '../../components/Topbar';
import Sidebar from '../../components/Sidebar';
import Posts from '../../components/Feed/Posts';
import Service from '../../api/service';
import SkeletonLoader from '../../components/SkeletonLoader';

import './style.css';
import Cover from './Cover';

function TimelinePage() {
    const [posts, setPosts] = useState([]);
    const [isSkeletonVisible, setIsSkeletonVisible] = useState(true);
    const currentUser = useSelector((state) => state.auth.currentUser);
    useEffect(() => {
        const getTimeLinePosts = async () => {
            await Service.getTimelinePosts(currentUser._id).then((res) => {
                if (res.data.status === 'success') {
                    let dataArr = [];
                    for (let data of res.data.data) {
                        dataArr.unshift(data);
                    }
                    setPosts(dataArr);
                }

                setIsSkeletonVisible(false);
            });
        };

        getTimeLinePosts();
    }, [currentUser._id]);
    return (
        <div>
            <Topbar />
            <div className='main__body'>
                <Sidebar />

                <div className='timelineFeed'>
                    <Cover className='cover' />
                    {isSkeletonVisible ? (
                        <SkeletonLoader />
                    ) : (
                        <Posts posts={posts} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default TimelinePage;
