import c from './css/chat.module.css'

import backArrow from '../../assets/backArrow.svg'
import phone from '../../assets/phone.svg'
import { NavLink, useLocation } from 'react-router-dom'

import strech from '../../assets/photo.svg'

import info from '../../assets/info.svg'

import React, { useEffect, useRef, useState } from 'react'
import Message from './components/Message'
import jwtDecode from "jwt-decode";

const Chat = ({ sendMessage, socket }) => {
	const uploader = useRef(null)
	const messageItem = useRef(null)
	let [src, setSrc] = useState('')
	let [photosH, setPhotosH] = useState(0)
	let [localMessages, setLocalMess] = useState([])
	let [messages, setMessages] = useState(false)
	let dateNow = new Date()
	const dataL = dateNow.getUTCDate()
	const month = dateNow.getMonth()
	const yearNow = dateNow.getFullYear()
	const months = [
		{ name: 'Jan', cMonth: ' января ', id: 0 },
		{ name: 'Feb', cMonth: ' февраля ', id: 1 },
		{ name: 'Mar', cMonth: ' марта ', id: 2 },
		{ name: 'Apr', cMonth: ' апреля ', id: 3 },
		{ name: 'May', cMonth: ' мая ', id: 4 },
		{ name: 'Jun', cMonth: ' июня ', id: 5 },
		{ name: 'Jul', cMonth: ' июля ', id: 6 },
		{ name: 'Aug', cMonth: ' августа ', id: 7 },
		{ name: 'Sep', cMonth: ' сентября ', id: 8 },
		{ name: 'Oct', cMonth: ' октября ', id: 9 },
		{ name: 'Nov', cMonth: ' ноября ', id: 10 },
		{ name: 'Dec', cMonth: ' декабря ', id: 11 }
	]

	const location = useLocation()
	let [chatUser, setChatUser] = useState(false)
	let chatId = ''
	const myUserId = jwtDecode(localStorage.getItem('user'))
	if (location.pathname.includes('/messages:')) {
		chatId = location.pathname.slice(10)
	}
	useEffect(() => {
		const api = async () => {
			const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/getChat', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ chatId, myUserId: myUserId.id })
			})
			const data = await responce.json()
			setChatUser(chatUser = data)
			setLocalMess(localMessages = data.messages)
		}
		api()
	}, [])
	let [onlineL, setOnlineL] = useState(false)
	let [inputV, setInputV] = useState('')
	const Input = e => {
		setInputV(inputV = e.target.value)
	}
	if (chatUser) {
		let lastOnline = chatUser.user.online
		if (lastOnline !== 'online' && lastOnline) {
			lastOnline = lastOnline.slice(4, 21)
			let monthF = lastOnline.slice(0, 3)
			let day = lastOnline.slice(4, 6)
			let year = lastOnline.slice(6, 11)
			let time = lastOnline.slice(11)
			let handlerTemp = false
			const handlerMonths = async () => {
				await months.forEach(mon => {
					if (mon.name === monthF) {
						handlerTemp = mon.id
						if (mon.id === month && +day === dataL && +year === yearNow || mon.id === month && +day + 1 === dataL && +year === yearNow && +year === yearNow || mon.id === month && +day + 2 === dataL && +year === yearNow) {
							return monthF = ''
						}
						monthF = mon.cMonth
					}
				})
				if (+day == dataL && handlerTemp === month && year == yearNow) day = 'сегодня'
				if (+day + 1 == dataL && handlerTemp === month && year == yearNow) day = 'вчера'
				if (+day + 2 == dataL && handlerTemp === month && year == yearNow) day = 'позавчера'
				if (year == yearNow) year = ''
				if (time.length === 6 && +day < 10) day = +day
				setOnlineL(onlineL = day + monthF + year + ' в ' + time)
			}
			handlerMonths()

		}
	}
	const handlerSendMessage = () => {
		const dateNowMess = new Date()
		const message = { message: inputV, date: `${dateNowMess}`, userSend: myUserId.id, chatId, src }
		sendMessage(message)
		setInputV(inputV = '')
		setPhotosH(photosH = 0)
	}
	useEffect(() => {
		if (socket) {
			socket.on('responceServerMessage', data => {
				setMessages(messages = data)
				if (messages.chatId === chatId) {
					setLocalMess(localMessages = [...localMessages, messages])
				}
			})
		}



	}, [])
	const scrollToBottom = () => {
		messageItem.current?.scrollIntoView({ behavior: 'smooth' })
	}
	useEffect(() => {
		scrollToBottom()
	}, [localMessages])

	const uploadPhoto = async (e) => {
		const formData = new FormData()
		formData.append('file', e.target.files[0])
		const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/uploadPhoto', {
			method: 'POST',
			body: formData
		})
		const data = await responce.json()
		setPhotosH(photosH = photosH + 1)
		setSrc(src = data.src)
	}

	return (
		<>
			<div className={c.container}>
				<header className={c.header}>
					<NavLink to="/messages" className={c.back} activeClassName='ac'>
						<div className="backArrow">
							<img src={backArrow}
								width='15px'
								height='15px'
								className={c.backArrow}
								alt="back" />
						</div>
					</NavLink>
					<NavLink className={c.noneLink} to={`/profile:${chatUser ? chatUser.userId : ''}`} >
						<div className="user__img">
							<img src={chatUser ? `${chatUser.user.userPhoto != 'false' ? `${`https://glacial-forest-97928.herokuapp.com/` + chatUser.user.userPhoto}` : "https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png"}` : ''}
								alt="user"
								width='34px'
								height='34px'
								className={c.user__photo}
							/>
						</div>
						<div className={c.wrapper}>
							<div className={c.user__name}>
								{chatUser ? chatUser.user.userName : ''}
							</div>
							<div className={c.user__isonline}>
								{chatUser.user ?
									<p>
										{chatUser.user.online !== 'online' && chatUser.user.female === 'man' ? 'был в сети: ' : ''}
										{chatUser.user.online !== 'online' && chatUser.user.female === 'woman' ? 'была в сети: ' : ''}
										{onlineL || 'online'}
										{chatUser.user.online === 'online' ? <img
											width='12px'
											height='12px'
											src={phone} alt="phone" />
											: ''}
									</p>
									: ""}

							</div>
						</div>

					</NavLink>

				</header>
				<div className={c.messages}>
					{localMessages && !localMessages.length ? <p className={c.noneFriends}><img src={info} alt='info' className={c.infoItem} height='20px' width='20px' />Чат начат</p> : ''}
					{localMessages && localMessages.map((message, i) => <Message isRepost={message.currentPostRepost} key={i} photoPost={message.currentPostRepost ? message.currentPostRepost.src : ''} userPhoto={message.currentPostRepost ? message.currentPostRepost.userPhoto : ''} src={message.src} message={message.message} user={message.userSend === myUserId.id ? true : false} timeMess={message.date} />)}
					<div ref={messageItem} className='endPosition' ></div>
				</div>
				<div className={c.navbar}>
					<div className={c.wrap}>

						<img src={strech}
							onClick={() => uploader.current.click()}
							width='25px'
							height='25px'
							className={c.photoI}
							alt="strech" />
						<div className={c.countPhotoItem}>{photosH}</div>
						<input ref={uploader} type="file" onChange={(e) => uploadPhoto(e)} className={c.file} accept='image/*' />
						<textarea autoFocus type="text"
							value={inputV}
							onChange={(e) => Input(e)}
							placeholder="Напишите что-нибудь"
							className={c.input} />
						{inputV ? <button className={c.send} onClick={() => handlerSendMessage()} >Отправить</button> : ''}
					</div>


				</div>

			</div>
		</>

	)
}
export default Chat