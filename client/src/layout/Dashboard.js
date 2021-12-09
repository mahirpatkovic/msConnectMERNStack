import React, { Fragment, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/LoginPage';
import Messenger from '../pages/Messenger';
import Groups from '../pages/Groups';
import Timeline from '../pages/Timeline';
import Settings from '../pages/SettingsPage';
import { useSelector, useDispatch } from 'react-redux';

function App() {
	// const [isLoading, setIsLoading] = useState(true);
	const isUserLoggedIn = useSelector((state) => state.auth.isAuthenticated);
	let isMounted = useRef(true);
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, [dispatch]);

	return (
		<Fragment>
			<Router>
				<Routes>
					<Route
						path='/'
						element={
							isUserLoggedIn && isMounted.current ? (
								<Home />
							) : (
								<Login />
							)
						}
					/>
					<Route
						path='/messenger'
						element={isUserLoggedIn ? <Messenger /> : <Login />}
					/>
					<Route
						path='/groups'
						element={isUserLoggedIn ? <Groups /> : <Login />}
					/>
					<Route
						path='/timeline'
						element={isUserLoggedIn ? <Timeline /> : <Login />}
					/>
					<Route
						path='/settings'
						element={isUserLoggedIn ? <Settings /> : <Login />}
					/>
				</Routes>
			</Router>
		</Fragment>
	);
}

export default App;
