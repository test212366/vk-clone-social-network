import c from './css/messages.module.css'

import { useEffect, useState } from "react";

import Burger from '../Home/components/Burger'
import Sidebar from '../Home/components/Sidebar'
import Chat from './components/Chat'

import { NavLink } from 'react-router-dom'
import info from '../../assets/info.svg'
import jwtDecode from "jwt-decode";


const Messages = ({ id, myUser }) => {
	let [findChat, setFindChat] = useState('')
	let [findMessages, setFindMessages] = useState(false)
	let [isSide, setSide] = useState(false)
	let [userMessages, setUserMessages] = useState(false)
	let [user, setUser] = useState(false)
	const openSide = () => {
		setSide(isSide = !isSide)
		document.body.style.overflowY = 'hidden'
	}
	useEffect(() => {
		const userId = jwtDecode(localStorage.getItem('user'))
		const api = async () => {
			const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/getMessages', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ id: userId.id })
			})
			const data = await responce.json()
			setUserMessages(userMessages = data)
		}
		api()
	}, [])
	useEffect(() => {
		const userId = jwtDecode(localStorage.getItem('user'))
		const api = async () => {
			const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/getUser', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ id: userId.id })
			})
			const data = await responce.json()
			setUser(user = data)
		}
		api()
	}, [])


	if (userMessages) {
		document.scrollTop = document.clientHeight;

	}
	const handlerFilterChats = e => {
		setFindChat(findChat = e.target.value)
		if (findChat) {
			setFindMessages(findMessages = userMessages)
			findMessages.filter(message => {
				if (message.name.includes(findChat)) return message
				else setFindMessages(findMessages = false)
			})
		} else {
			setFindMessages(findMessages = false)
		}

	}
	return (
		<div className={c.container}>
			<div className={c.searchChats}>
				<input className={c.input} type="text" placeholder='Найти чат' value={findChat} onChange={e => handlerFilterChats(e)} />
			</div>
			<div className={c.wrapper__chats}>
				{findMessages ? <p>Найденные чаты: </p> : ''}
				{findMessages ? findMessages.map((message, i) => <NavLink key={i} to={`/messages:${message.currentIdChat}`} className={c.itemLink}><Chat props={{ name: message.name, date: message.lastMessageData, online: message.online, lastMessage: message.lastMessage, userPhoto: message.userPhoto }} /></NavLink>) : ''}
				{userMessages.message ? <p className={c.noneFriends}><img src={info} alt='info' className={c.infoItem} height='20px' width='20px' />Добавьте новых друзей и начните чат</p> : ''}

				{userMessages && !userMessages.message ? userMessages.map((message, i) => <NavLink key={i} to={`/messages:${message.currentIdChat}`} className={c.itemLink}><Chat props={{ name: message.name, date: message.lastMessageData, online: message.online, userPhoto: message.userPhoto, lastMessage: message.lastMessage }} /></NavLink>) : ''}
				{!userMessages ? <small className={c.load}>Загрузка</small> : ''}
			</div>
			<Sidebar isSide={isSide} setSide={setSide} id={id} user={user} />
			<Burger openSide={openSide} />
		</div>

	)
}
export default Messages
