import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Topbar from '../../components/Topbar';
import Sidebar from '../../components/Sidebar';
import Posts from '../../components/Feed/Posts';
import Service from '../../api/service';
import SkeletonLoader from '../../components/SkeletonLoader';
import './style.css';

function TimelinePage() {
	const [posts, setPosts] = useState([]);
	const [isSkeletonVisible, setIsSkeletonVisible] = useState(true);
	const currentUser = useSelector((state) => state.auth.currentUser);
	useEffect(() => {
		Service.getTimelinePosts(currentUser._id).then((res) => {
			setPosts(res.data.data);
			setIsSkeletonVisible(false);
		});
	}, [currentUser._id]);
	return (
		<div>
			<Topbar />
			<div className='main__body'>
				<Sidebar />

				<div className='feed'>
					<h4>This is Timeline page</h4>
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
