import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Videocam, PhotoLibrary, InsertEmoticon } from '@mui/icons-material';
import './style.css';
import CreatePostModal from './CreatePostModal';
import { Snackbar, Alert } from '@mui/material';

function CreatePost() {
	const [isCreatePostModalVisible, setIsCreatePostModalVisible] =
		useState(false);
	const [isUploadMessageVisible, setIsUploadMessageVisible] = useState(false);
	const currentUser = useSelector((state) => state.auth.currentUser);
	const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

	const openCreatePostModal = () => {
		setIsCreatePostModalVisible(true);
	};

	const closeCreatePostModal = () => {
		setIsCreatePostModalVisible(false);
	};

	return (
		<div className='messageSender'>
			{isUploadMessageVisible && (
				<Snackbar
					open={isUploadMessageVisible}
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					autoHideDuration={6000}
					onClose={() => setIsUploadMessageVisible(false)}
				>
					<Alert
						onClose={() => setIsUploadMessageVisible(false)}
						severity='success'
						sx={{ width: '100%' }}
					>
						Post Created Successfully
					</Alert>
				</Snackbar>
			)}
			<div className='messageSender__top'>
				<img
					className='user__avatar'
					src={
						currentUser?.photo
							? publicFolder +
							  `profilePictures/${currentUser.photo}`
							: publicFolder + `profilePictures/noAvatar.jpg`
					}
					alt='profilePicture'
				/>
				<form>
					<input
						className='messageSender__input'
						placeholder={`What's on your mind ${
							currentUser && currentUser.firstName
						}?`}
						onClick={openCreatePostModal}
						style={{ cursor: 'pointer' }}
					/>
				</form>
			</div>

			<div
				className='messageSender__bottom'
				onClick={openCreatePostModal}
			>
				<div className='messageSender__option'>
					<Videocam style={{ color: '#F35369' }} />
					<h3>Video</h3>
				</div>

				<div
					className='messageSender__option'
					onClick={openCreatePostModal}
				>
					<PhotoLibrary style={{ color: '#00A400' }} />
					<h3>Photo</h3>
				</div>

				<div
					className='messageSender__option'
					onClick={openCreatePostModal}
				>
					<InsertEmoticon style={{ color: '#F5C33B' }} />
					<h3>Feeling</h3>
				</div>
			</div>
			{isCreatePostModalVisible && (
				<CreatePostModal
					visible={isCreatePostModalVisible}
					onClose={closeCreatePostModal}
					onUploadMessage={() => setIsUploadMessageVisible(true)}
				/>
			)}
		</div>
	);
}
export default CreatePost;
