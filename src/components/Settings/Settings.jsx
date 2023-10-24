import { NavLink, useHistory } from 'react-router-dom'
import c from './css/settings.module.css'

import groups from '../../assets/groups.svg'
import info from '../../assets/info.svg'
import message from '../../assets/message.svg'
import home from '../../assets/home.svg'

import backArrow from '../../assets/backArrow.svg'
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import Post from '../Home/components/Post'
import Chat from '../Messages/components/Chat'
import Friend from '../Friends/components/Friend'



const Settings = ({ setUser, user }) => {
	let [close, setIsClose] = useState(true)
	let [userMess, setUserMess] = useState(false)
	let [app, setApp] = useState(false)
	let [userFriends, setFriends] = useState(false)
	let [subs, setSubs] = useState(false)
	let [userMy, setUserMy] = useState()
	let [temp, setTemp] = useState(false)
	let [allPosts, setPosts] = useState()
	const history = useHistory()
	const handlerExit = () => {
		localStorage.removeItem('user')
		setUser(user = false)
		history.push('/')
	}
	useEffect(() => {
		const temp = jwtDecode(localStorage.getItem('user'))
		const api = async () => {
			const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/getUser', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ id: temp.id })
			})
			const data = await responce.json()
			setUserMy(userMy = data.user)
		}
		api()
	}, [])

	const handlerOpen = () => {
		const api = async () => {
			try {
				const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/giveAllPosts', {
					headers: {
						'Content-Type': 'application/json'
					},
					method: 'POST',
					body: JSON.stringify({ id: userMy._id })
				})
				const data = await responce.json()
				setPosts(allPosts = data)

			} catch {
				setTemp(temp = 'temp')
			}

		}
		api()


		setIsClose(close = !close)
	}
	const handlerClose = () => {
		setIsClose(close = !close)
		setUserMess(userMess = false)
		setPosts(allPosts = false)
		setSubs(subs = false)
		setApp(app = false)
		setTemp(temp = false)
		setFriends(userFriends = false)
	}
	const handlerMessages = () => {

		const api = async () => {
			const temp = jwtDecode(localStorage.getItem('user'))
			const responceI = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/getMessages', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ id: temp.id })
			})
			const data = await responceI.json()
			setUserMess(userMess = data)
		}

		api()
		setIsClose(close = !close)
	}
	const handlerFriends = () => {
		setFriends(userFriends = true)
		setIsClose(close = !close)
	}
	const handlerSubs = () => {
		setSubs(subs = true)
		setIsClose(close = !close)
	}
	const handlerApp = () => {
		setApp(app = true)
		setIsClose(close = !close)
	}
	console.log(temp)
	console.log(userMess)
	return (
		<>
			<div className={!close ? ` ${c.wrapperBC} ${c.wrapperB}` : c.wrapperBC} onClick={() => handlerClose()}>
			</div>
			<div className={!close ? ` ${c.contentWrapC} ${c.contentWrap}` : c.contentWrapC}>
				{temp ? temp ? <p className={c.noneFriends}><img src={info} alt='info' className={c.infoItem} height='20px' width='20px' />Нет записей</p> : '' : ''}
				{allPosts ? allPosts.posts.map(post => <Post temp={true} commentsItem={post.comments} user={userMy} likes={post.likes} data={post.data} description={post.description} photoPost={post.src} src={post.userPhoto} reposts={post.reposts} commentsItems={post.comments} userId={post.userId} name={post.userName} userPhoto={post.userPhoto} />) : ''}
				{userMess ? userMess.message === 'undefined chats 404' ? <p className={c.noneFriends}><img src={info} alt='info' className={c.infoItem} height='20px' width='20px' />Нет сообщений</p> : '' : ''}
				{!userMess.message && userMess != false ? userMess.map(message => <Chat props={{ name: message.name, online: message.online, lastMessage: message.lastMessage, userPhoto: message.userPhoto }} />) : ''}
				{userFriends ? userMy.friends.length === 0 ? <p className={c.noneFriends}><img src={info} alt='info' className={c.infoItem} height='20px' width='20px' />Нет друзей</p> : '' : ''}
				{userFriends ? userMy.friends.map((friend, i) => <Friend key={i} name={friend.user.userName} userPhoto={friend.user.userPhoto} id={friend.user._id} online={friend.user.online} />) : ''}
				{subs ? userMy.subscribers.length === 0 ? <p className={c.noneFriends}><img src={info} alt='info' className={c.infoItem} height='20px' width='20px' />Нет подписчиков</p> : '' : ''}
				{subs ? userMy.subscribers.map((sub, i) => <Friend key={i} name={sub.user.userName} userPhoto={sub.user.userPhoto} id={sub.user._id} online={sub.user.online} />) : ''}
				{app ? <p className={c.sm}>Приложение Ease это социальная сеть, создатель Никита Змановский</p> : ''}
			</div>
			<div className={c.container}>



				<header className={c.header}>

					<NavLink to={`/`} activeClassName='none' className={c.none}>

						<img src={backArrow}
							width='15px'
							height='15px'
							className={c.backArrow}
							alt="back" />
					</NavLink>
					<p>Настройки</p>
				</header>
				<div className={c.content}>
					<NavLink to={`/profile:${userMy ? userMy._id : ''}`} className={c.link}>
						<div className={c.profile}>
							{userMy ? <img src={`${userMy.userPhoto != 'false' ? `${`https://glacial-forest-97928.herokuapp.com/` + userMy.userPhoto}` : "https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png"}`} alt="userImg" width='60px' height='60px' className={c.userImg} /> : ''}

							<div className={c.wrapper}>
								<div className={c.user__name}>
									{userMy ? userMy.userName : ''}
								</div>
								<div className={c.sendLink}>
									Перейти в профиль:
								</div>
							</div>

						</div>
					</NavLink>
					<div className={c.hr} ></div>
					<p className={c.button} onClick={() => handlerOpen()}>
						<img src={home} height='20px' width='20px' className={c.info} alt="info" />
						Ваши посты
					</p>
					<p className={c.button} onClick={() => handlerMessages()}>
						<img src={message} height='20px' width='20px' className={c.info} alt="info" />
						Ваши чаты
					</p>
					<div className={c.hr} ></div>
					<p className={c.button} onClick={() => handlerFriends()}>
						<img src={groups} height='20px' width='20px' className={c.info} alt="info" />
						Список друзей
					</p>
					<p className={c.button} onClick={() => handlerSubs()}>
						<img src={groups} height='20px' width='20px' className={c.info} alt="info" />
						Подписчики
					</p>
					<div className={c.hr} ></div>
					<p className={c.button} onClick={() => handlerApp()}>
						<img src={info} height='20px' width='20px' className={c.info} alt="info" />
						О приложении
					</p>
					<div className={c.ex}>
						<button className={c.exit} onClick={() => handlerExit()}>Выйти</button>
					</div>

				</div>
			</div>
		</>
	)
}
export default Settings