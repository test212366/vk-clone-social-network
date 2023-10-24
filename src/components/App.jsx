import { Route, Redirect } from 'react-router-dom'
import { CSSTransition } from "react-transition-group";

import Login from '../components/Login/Login'
import Home from '../components/Home/Home'
import Welcome from '../components/Welcome/Welcome'
import Regisration from "../components/Registration/Registration";
import Profile from '../components/Profile/Profile'
import Messages from './Messages/Messages';
import Chat from './Chat/Chat';
import FriendsPage from './FriendsPage/FriendsPage'
import NewsFriends from './NewsFriends/NewsFriends'

import './app.css'
import { useEffect, useState } from 'react';
import Music from './Music/Music';
import Friends from './Friends/Friends';


import io from 'socket.io-client'
import jwtDecode from "jwt-decode";
import Settings from './Settings/Settings';
import Photos from './Photos/Photos';
import MusicNews from './YouMusicNews/MusicNews';
import musicAll from './MusicAll/MusicAll';

const App = () => {
	let [user, setUser] = useState(false)
	const routes = [
		{ path: '/', Component: Welcome },
		{ path: '/login', Component: Login },
		{ path: '/reg', Component: Regisration }
	]
	const privateRoutes = [
		{ path: '/', Component: Home },
		{ path: '/profile:userID', Component: Profile },
		{ path: '/messages', Component: Messages },
		{ path: '/messages:id', Component: Chat },
		{ path: '/music', Component: Music },
		{ path: '/newsFriends', Component: NewsFriends },
		{ path: '/friends', Component: Friends },
		{ path: '/settings', Component: Settings },
		{ path: '/newsMusicMy', Component: MusicNews },
		{ path: '/newsMusic', Component: musicAll },
		{ path: '/friendsPage:id', Component: FriendsPage },
		{ path: '/photos:id', Component: Photos },
	]
	const handlerFetch = async (currentUser, URL) => {
		const responce = await fetch(URL, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: currentUser.email })
		})
		const data = await responce.json()
		if (data.user === null) {
			setUser(user = false)
			localStorage.removeItem('user')
		}
		return data
	}
	useEffect(() => {
		if (!localStorage.getItem('user')) {
			setUser(user = false)
		}
	}, [])

	let handlerLinkUser = ''
	let socket = null
	if (user) {
		const currentUser = jwtDecode(localStorage.getItem('user'))
		handlerLinkUser = currentUser.id
		socket = io.connect('https://glacial-forest-97928.herokuapp.com/', { transports: ['websocket'] })
		socket.on('connect', () => {
			try {
				handlerFetch(currentUser, 'https://glacial-forest-97928.herokuapp.com/handlerDisconnect')
				handlerFetch(currentUser, 'https://glacial-forest-97928.herokuapp.com/api/user/online')
			} catch (e) {
				console.log(e)
				setUser(user = false)
				localStorage.removeItem('user')
			}
		})

	}
	const handlerMessage = data => {
		socket.emit('createChat', data)
	}
	const handlerSendMessage = data => {
		socket.emit('sendMessage', data)
	}
	return (
		<>
			{user ?
				privateRoutes.map(({ path, Component }) => (
					<Route key={path} exact path={path}>
						{({ match }) => (
							<CSSTransition
								in={match != null}
								timeout={300}
								classNames="page"
								unmountOnExit
							>

								<div className="page">
									<Component id={handlerLinkUser} user={user} setUser={setUser} sendMessage={handlerSendMessage} socket={socket} handlerMessage={handlerMessage} />
								</div>
							</CSSTransition>
						)}
					</Route>
				))
				:
				routes.map(({ path, Component }) => (
					<Route key={path} exact path={path}>
						{({ match }) => (
							<CSSTransition
								in={match != null}
								timeout={300}
								classNames="page"
								unmountOnExit
							>
								<div className="page">
									<Component userI={user} setUser={setUser} />
								</div>
							</CSSTransition>
						)}
					</Route>
				))
			}
			{user ? <Redirect to='/' /> : <Redirect to='/' />}
		</>
	);
}

export default App;
