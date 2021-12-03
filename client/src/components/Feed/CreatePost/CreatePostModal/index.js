import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Grid,
	TextField,
	Button,
	IconButton,
	Stack,
	MenuItem,
	ListItemIcon,
	MenuList,
	ListItemText,
	Paper,
	Backdrop,
	Alert,
	AlertTitle,
	CircularProgress,
	// LinearProgress,
} from '@mui/material';
import {
	CancelOutlined,
	Lock,
	ArrowDropDown,
	AddPhotoAlternateOutlined,
	PersonAddAlt1,
	EmojiEmotionsOutlined,
	LocationOn,
	Public,
	Group,
	Cancel,
	VideoCameraBack,
	HighlightOff,
} from '@mui/icons-material';
import './style.css';
import Service from '../../../../api/service';

function CreatePostModal(props) {
	const [isPostViewMenuVisible, setIsPostViewMenuVisible] = useState(false);
	const [files, setFiles] = useState([]);
	const [selectedAudienceValue, setSelectedAudienceValue] =
		useState('Only me');
	const [isAddPhotoAreaVisible, setIsAddPhotoAreaVisible] = useState(true);
	const [postValues, setPostValues] = useState({
		description: '',
		visible: 'onlyMe',
	});
	const [isLoading, setIsLoading] = useState(false);
	// const [uploadProgress, setUploadProgress] = useState(0);
	const [errorMessage, setErrorMessage] = useState('');
	const [isAlertVisible, setIsAlertVisible] = useState(false);
	const currentUser = useSelector((state) => state.auth.currentUser);
	const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

	useEffect(() => {
		files.forEach((file) => URL.revokeObjectURL(file.preview));
	}, [files]);

	const { getRootProps, getInputProps } = useDropzone({
		accept: ['image/*', 'video/*'],
		onDrop: (acceptedFiles) => {
			acceptedFiles.map((file, i) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
					fileId: i,
				})
			);
			setFiles(acceptedFiles);
		},
		maxFiles: 4,
	});

	const removeImageFromFiles = (fileId) => {
		const tmpImages = [...files.filter((file) => file.fileId !== fileId)];
		setFiles(tmpImages);
	};

	const images = files.map((file) => (
		<div className='image' key={file.name}>
			<Cancel
				style={{
					cursor: 'pointer',
					position: 'absolute',
					marginLeft: 80,
					marginTop: -20,
				}}
				onClick={() => removeImageFromFiles(file.fileId)}
			/>
			<div className='imageInner'>
				{file.type.startsWith('video') ? (
					<VideoCameraBack
						style={{ fontSize: 60, marginTop: 15, marginLeft: 15 }}
					/>
				) : (
					<img src={file.preview} className='img' alt='post' />
				)}
			</div>
		</div>
	));

	const openPostViewModalHandler = () => {
		setIsPostViewMenuVisible(true);
	};

	const inputAudienceChangeHandler = (value) => {
		switch (value) {
			case 'public':
				setSelectedAudienceValue('Public');
				break;
			case 'friends':
				setSelectedAudienceValue('Friends');
				break;
			case 'onlyMe':
				setSelectedAudienceValue('Only me');
				break;
			default:
				break;
		}
		setPostValues({ ...postValues, visible: value });
		setIsPostViewMenuVisible(false);
	};

	const hideAddPhotoAreaHandler = () => {
		setIsAddPhotoAreaVisible(false);
		setFiles([]);
	};

	// const options = {
	// 	onUploadProgress: (progressEvent) => {
	// 		const { loaded, total } = progressEvent;
	// 		let percent = Math.floor((loaded * 100) / total);
	// 		console.log(`${loaded}kb of ${total}kb | ${percent}%`);

	// 		if (percent <= 100) {
	// 			setUploadProgress(percent);
	// 		}
	// 	},
	// };

	const createPostHandler = () => {
		if (files.length > 0 && files.length < 5) {
			setIsLoading(true);
			let formData = new FormData();

			for (let file of files) {
				formData.append('files', file);
			}

			formData.append('description', postValues.description);
			formData.append('visible', postValues.visible);
			formData.append('user', currentUser._id);
			// axios
			// 	.post('http://127.0.0.1:8800/api/posts/', formData
			Service.createPost(formData).then((res) => {
				console.log(res);
				setIsLoading(false);
				props.onClose();
				props.onUploadMessage();
			});
			console.log(files);
		} else {
			setIsAlertVisible(true);
			setErrorMessage('Please upload file first');
		}
	};
	return (
		<div>
			<Dialog onClose={props.onClose} open={props.visible}>
				<Backdrop
					sx={{
						color: '#fff',
						zIndex: (theme) => theme.zIndex.drawer + 1,
					}}
					open={isLoading}
					onClick={() => setIsLoading(false)}
				>
					<CircularProgress color='inherit' />
					{/* {uploadProgress > 0 && uploadProgress < 100 && (
						<LinearProgress
							sx={{ width: 300, height: 5, borderRadius: 10 }}
							value={uploadProgress}
						/>
					)} */}
				</Backdrop>
				<div>
					<DialogTitle style={{ width: 500 }}>
						<Grid
							container
							spacing={2}
							columns={16}
							style={{ height: 50 }}
						>
							<Grid item xs={14}>
								<h3
									style={{
										textAlign: 'center',
										marginLeft: 20,
									}}
								>
									Create post
								</h3>
							</Grid>
							<Grid item xs={2}>
								<CancelOutlined
									fontSize='large'
									style={{
										color: 'gray',
										cursor: 'pointer',
									}}
									onClick={props.onClose}
								/>
							</Grid>
						</Grid>
					</DialogTitle>
					<DialogContent dividers>
						{isAlertVisible && (
							<Alert
								severity='error'
								action={
									<HighlightOff
										onClick={() => setIsAlertVisible(false)}
										style={{ cursor: 'pointer' }}
									/>
								}
								style={{ marginBottom: 15 }}
							>
								<AlertTitle>Error</AlertTitle>
								{errorMessage} — <strong> Try again !</strong>
							</Alert>
						)}
						<Grid container spacing={1} columns={16}>
							<Grid>
								<img
									className='user__avatar'
									src={
										currentUser && currentUser.photo
											? publicFolder +
											  `profilePictures/${currentUser.photo}`
											: publicFolder +
											  `profilePictures/noAvatar.jpg`
									}
									alt='profilePicture'
								/>
							</Grid>

							<Grid>
								<h4>
									{currentUser &&
										currentUser.firstName +
											' ' +
											currentUser.lastName}
								</h4>
								<div
									className='postViewDetails'
									onClick={openPostViewModalHandler}
								>
									<Lock
										style={{
											fontSize: 15,
											marginLeft: 5,
										}}
									/>
									<h4>{selectedAudienceValue}</h4>
									<ArrowDropDown style={{ fontSize: 17 }} />
								</div>
								{isPostViewMenuVisible && (
									<Paper
										style={{
											position: 'absolute',
											zIndex: 2,
										}}
									>
										<MenuList>
											<MenuItem
												onClick={() =>
													inputAudienceChangeHandler(
														'public'
													)
												}
											>
												<ListItemIcon>
													<Public
														style={{
															color: 'black',
														}}
													/>
												</ListItemIcon>
												<ListItemText>
													Public
												</ListItemText>
											</MenuItem>
											<MenuItem
												onClick={() =>
													inputAudienceChangeHandler(
														'friends'
													)
												}
											>
												<ListItemIcon>
													<Group
														style={{
															color: 'black',
														}}
													/>
												</ListItemIcon>
												<ListItemText>
													Friends
												</ListItemText>
											</MenuItem>
											<MenuItem
												onClick={() =>
													inputAudienceChangeHandler(
														'onlyMe'
													)
												}
											>
												<ListItemIcon>
													<Lock
														style={{
															color: 'black',
														}}
													/>
												</ListItemIcon>
												<ListItemText>
													Only me
												</ListItemText>
											</MenuItem>
										</MenuList>
									</Paper>
								)}
							</Grid>
						</Grid>
						<form>
							<TextField
								multiline
								fullWidth
								sx={{ fontSize: 5 }}
								rows={2}
								variant='standard'
								placeholder={`What's on your mind ${
									currentUser && currentUser.firstName
								} ?`}
								onChange={(e) =>
									setPostValues({
										...postValues,
										description: e.target.value,
									})
								}
							/>
							{isAddPhotoAreaVisible && (
								<div>
									<Cancel
										style={{
											cursor: 'pointer',
											float: 'right',
										}}
										onClick={hideAddPhotoAreaHandler}
									/>
									<div
										className='dragArea'
										{...getRootProps()}
									>
										<AddPhotoAlternateOutlined className='icon' />
										<h3>Add Photos/Videos</h3>
										<p>or drag and drop</p>
										<p>maximum 4 files per post</p>
										<input
											type='file'
											hidden
											{...getInputProps()}
											// onChange={(e) =>
											// 	setFiles(e.target.files)
											// }
										/>
									</div>

									<div className='imageContainer'>
										{images}
									</div>
								</div>
							)}
							<Grid
								container
								columns={16}
								className='addToYourPost'
							>
								<Grid item xs={8}>
									<h3>Add to your post</h3>
								</Grid>

								<Grid item xs={8}>
									<Stack
										direction='row'
										alignItems='center'
										spacing={1}
										justifyContent='flex-end'
									>
										<IconButton
											aria-label='add photo'
											size='small'
											onClick={() =>
												setIsAddPhotoAreaVisible(true)
											}
										>
											<AddPhotoAlternateOutlined
												style={{ color: '#00A400' }}
											/>
										</IconButton>
										<IconButton
											aria-label='add person'
											size='small'
										>
											<PersonAddAlt1
												style={{ color: '#2e81f4' }}
											/>
										</IconButton>
										<IconButton
											aria-label='add emotion'
											size='small'
										>
											<EmojiEmotionsOutlined
												style={{ color: '#F5C33B' }}
											/>
										</IconButton>
										<IconButton
											aria-label='add location'
											size='small'
										>
											<LocationOn
												style={{ color: '#FA383E' }}
											/>
										</IconButton>
									</Stack>
								</Grid>
							</Grid>
							<Button
								className='loginBtn'
								variant='contained'
								style={{
									textTransform: 'none',
									fontWeight: 'bold',
									backgroundColor: '#1877f2',
									marginTop: 10,
									borderRadius: 10,
								}}
								onClick={createPostHandler}
								// disabled={files.length === 0 ? true : false}
							>
								Post
							</Button>
						</form>
					</DialogContent>
				</div>
				{/* ) : (
					<div>
						<DialogTitle style={{ width: 500 }}>
							<Grid
								container
								spacing={3}
								columns={16}
								style={{ height: 50 }}
							>
								<Grid item xs={2}>
									<KeyboardBackspace
										style={{
											marginTop: 5,
											marginLeft: -10,
											color: 'gray',
											cursor: 'pointer',
										}}
										onClick={() =>
											setIsPostViewModalVisible(false)
										}
									/>
								</Grid>
								<Grid item xs={14}>
									<p
										style={{
											textAlign: 'center',
											marginLeft: -50,
										}}
									>
										Select audience
									</p>
								</Grid>
							</Grid>
						</DialogTitle>
						<DialogContent dividers>
							<h3>Who can see your post?</h3>
							<p style={{ color: 'gray' }}>
								Your post will show up in News Feed, on your
								profile and in search results.
							</p>
							<MenuList>
								<MenuItem onChange={inputAudienceChangeHandler}>
									<ListItemIcon>
										<Public
											style={{
												color: 'black',
											}}
										/>
									</ListItemIcon>
									<ListItemText>Public</ListItemText>
									<Typography
										variant='body2'
										color='text.secondary'
									>
										<Radio
											value='public'
											name='radio-buttons'
											checked={
												selectedAudienceValue ===
												'Public'
											}
										/>
									</Typography>
								</MenuItem>
								<MenuItem onChange={inputAudienceChangeHandler}>
									<ListItemIcon>
										<Group
											style={{
												color: 'black',
											}}
										/>
									</ListItemIcon>
									<ListItemText>Friends</ListItemText>
									<Typography
										variant='body2'
										color='text.secondary'
									>
										<Radio
											value='friends'
											name='radio-buttons'
											checked={
												selectedAudienceValue ===
												'Friends'
											}
										/>
									</Typography>
								</MenuItem>
								<MenuItem onChange={inputAudienceChangeHandler}>
									<ListItemIcon>
										<Lock
											style={{
												color: 'black',
											}}
										/>
									</ListItemIcon>
									<ListItemText>Only me</ListItemText>
									<Typography
										variant='body2'
										color='text.secondary'
									>
										<Radio
											value='onlyMe'
											name='radio-buttons'
											checked={
												selectedAudienceValue ===
												'Only me'
											}
										/>
									</Typography>
								</MenuItem>
							</MenuList>
						</DialogContent>
					</div>
				)} */}
			</Dialog>
		</div>
	);
}

export default CreatePostModal;
