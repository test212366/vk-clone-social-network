import React, { useEffect, useRef } from 'react';

import Burger from '../Home/components/Burger'
import Post from '../Home/components/Post'
import Sidebar from '../Home/components/Sidebar'
import Comments from '../NewsFriends/components/Comments'
import Friend from './components/Friend'
import Repost from '../NewsFriends/components/Repost';

import info from '../../assets/info.svg'

import phone from '../../assets/phone.svg'
import sub from '../../assets/sub.svg'
import pen from '../../assets/pen.svg'
import backArrow from '../../assets/backArrow.svg'

import c from "./css/profile.module.css";
import { useState } from "react";
import { useHistory, useLocation, NavLink } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Profile = ({ id, handlerMessage }) => {
	let [countSelect, setCountSel] = useState(0)
	const header = useRef(null)
	let [src, setSrc] = useState('')
	const fileUploader = useRef(null)
	const fileNewPhoto = useRef(null)
	const fileUploaderForPosts = useRef(null)
	let [statusV, setStatusV] = useState('')
	let [isStatus, setStatusUser] = useState(false)
	let [isReposts, setIsReposts] = useState(false)
	let [statusLocal, setStatusLocal] = useState('')
	let [isComments, setIsComments] = useState(false)
	let [commentsItem, setCommentsItem] = useState(false)
	const history = useHistory()
	const myUserCurrentId = jwtDecode(localStorage.getItem('user'))
	let [createPostV, setCreatePostV] = useState('')
	let [inFriend, setInFriend] = useState(false)
	let [openCreatePost, setOpenCreatePost] = useState(false)
	let [myCurrentUser, setMyCurrentUser] = useState(false)
	let [newFriends, setNewFriends] = useState(false)
	let [allUserPosts, setAllUserPosts] = useState(false)
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
			setMyCurrentUser(myCurrentUser = data)
		}
		api()
	}, [])

	// logic for close and open sidebar
	let [isSide, setSide] = useState(false)
	const openSide = () => {
		setSide(isSide = !isSide)
		document.body.style.overflowY = 'hidden'
	}
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
	// logic for auth user in page
	// не делать логику по проверке localstorage потому что пользователь без токена не попал бы сюда
	// возвращает пользователя из url запроса
	// этот блок можно добавить во все компоненты но его нужно редактировать в зависимости от компонента
	const location = useLocation()
	let [myUser, setMyUser] = useState(false)


	let [myUserStatus, setStatus] = useState(false)

	var userId = false
	if (location.pathname.includes('/profile:')) {
		userId = location.pathname.slice(9)
	}
	useEffect(() => {
		const api = async () => {
			const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/getUser', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ id: userId })
			})
			const data = await responce.json()
			setMyUser(myUser = data.user)

			setStatusLocal(statusLocal = myUser.status)
			if (myUser) {
				const api = async () => {
					const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/giveAllPosts', {
						headers: {
							'Content-Type': 'application/json'
						},
						method: 'POST',
						body: JSON.stringify({ id: myUser._id })
					})
					const data = await responce.json()
					setAllUserPosts(allUserPosts = data)

				}
				api()
			}
			const temp = jwtDecode(localStorage.getItem('user'))
			if (temp.id === myUser._id) setStatus(myUserStatus = true)
			myUser.friends.map(friend => {
				if (friend.user._id === temp.id) return setInFriend(inFriend = true)
			})
			const resp = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/updateFriends', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ array: myUser.friends })
			})
			const array = await resp.json()
			setNewFriends(newFriends = array)


		}
		api()
	}, [])

	let [onlineL, setOnlineL] = useState(false)
	let lastOnline = myUser.online
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
	const handlerMessageItem = async () => {
		const temp = jwtDecode(localStorage.getItem('user'))
		const dataUsersForChat = { users: `${temp.id}${myUser._id}`, start: temp.id }
		await handlerMessage(dataUsersForChat)
		setTimeout(async () => {
			const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/getUser', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ id: temp.id })
			})
			const data = await responce.json()
			data.user.chats.forEach(chat => {
				if (chat.handlerIdForUsers.includes(`${temp.id}${myUser._id}`) || chat.handlerIdForUsers.includes(`${myUser._id}${temp.id}`)) {
					return history.push(`/messages:${chat.id}`)
				}
			})

		}, 500)

	}
	const handlerAddFriend = async () => {
		const temp = jwtDecode(localStorage.getItem('user'))
		const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/addFriend', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ userSub: temp.id, currentUser: userId })
		})
		const data = await responce.json()
		if (data.message) {
			const responceI = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/getUser', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ id: userId })
			})
			const dataI = await responceI.json()
			setMyUser(myUser = dataI.user)
		}
	}
	const handlerCreatePost = () => {
		setOpenCreatePost(openCreatePost = !openCreatePost)
		openCreatePost ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'auto'
		setCreatePostV(createPostV = '')
		setCountSel(countSelect = 0)
		setSrc(src = '')
	}
	const createPostItem = async () => {
		if (!createPostV) return
		const temp = jwtDecode(localStorage.getItem('user'))
		const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/createNewPost', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ description: createPostV, data: `${new Date}`, id: temp.id, src: src })
		})
		const data = await responce.json()
		if (data) {
			if (allUserPosts) {
				setAllUserPosts(allUserPosts = { posts: [...allUserPosts.posts, { ...data.post }] })
			} else {
				setAllUserPosts(allUserPosts = { posts: [{ ...data.post }] })
			}

			setCreatePostV(createPostV = '')
			handlerCreatePost()
		}
	}
	const handlerDeleteFriend = async () => {
		const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/deleteUser', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ userY: `${myCurrentUser.user._id}`, userH: `${myUser._id}` })
		})
		const data = await responce.json()
		if (data.message) {
			setInFriend(inFriend = false)
		}
		const responceI = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/getUser', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ id: userId })
		})
		const dataI = await responceI.json()
		setMyUser(myUser = dataI.user)
		const resp = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/updateFriends', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ array: myUser.friends })
		})
		const array = await resp.json()
		setNewFriends(newFriends = array)
	}
	const handlerSetStatus = () => {
		if (myUserStatus) {
			console.log(myCurrentUser)
			setStatusUser(isStatus = !isStatus)
		} else {
			return
		}
	}
	const handlerCloseStatus = () => {
		setStatusUser(isStatus = false)
		document.body.style.overflowY = 'auto'
	}
	const handlerSet = async () => {
		const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/setStatus', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ id: `${myCurrentUser.user._id}`, value: statusV })
		})
		const data = await responce.json()
		setStatusLocal(statusLocal = data)
		setStatusV(statusV = '')
		handlerCloseStatus()
	}
	const uploadPhoto = () => {
		if (myUserStatus) {
			fileUploader.current.click()
		}
	}
	const fileUp = async e => {
		if (myCurrentUser.user.userPhoto != 'false') {
			const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/deleteAvatar', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ id: `${myCurrentUser.user._id}` })
			})
			await responce.json()
		}
		const formData = new FormData()
		formData.append('file', e.target.files[0])
		formData.append('id', `${myCurrentUser.user._id}`)
		console.log(formData)
		const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/uploadAvatar', {
			method: 'POST',
			body: formData
		})
		const data = await responce.json()
		setMyUser(myUser = data.user)
	}

	const handlerSelectPhoto = () => {
		fileUploaderForPosts.current.click()
	}
	const handlerUpload = async e => {
		const formData = new FormData()
		formData.append('file', e.target.files[0])
		const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/uploadPhoto', {
			method: 'POST',
			body: formData
		})
		const data = await responce.json()
		setCountSel(countSelect = countSelect + 1)
		setSrc(src = data.src)

	}
	const handlerChosePhoto = () => {
		fileNewPhoto.current.click()
	}
	const handlerNewPhotoProfile = async e => {
		const formData = new FormData()
		formData.append('file', e.target.files[0])
		formData.append('id', `${myCurrentUser.user._id}`)
		const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/uploadPhotoUs', {
			method: 'POST',
			body: formData
		})
		const data = await responce.json()
		setMyUser(myUser = data.user)
	}

	return (
		<>
			{myUser ? <>
				<div className={openCreatePost ? `${c.createPost} ${c.openCreatePost}` : c.createPost} onClick={() => handlerCreatePost()}>

				</div>
				<div className={openCreatePost ? `${c.wrapCreate} ${c.f}` : c.wrapCreate}>
					<textarea type="text" className={c.inputCreate} value={createPostV} onChange={(e) => setCreatePostV(createPostV = e.target.value)} placeholder='что у вас нового?' />
					<div className={c.handlerCreate}>
						<button className={c.addPhotoForPost} onClick={() => handlerSelectPhoto()}>+</button>
						<input type="file" accept='image/*' className={c.file} onChange={e => handlerUpload(e)} ref={fileUploaderForPosts} />
						<p className={c.countPhoto}>{countSelect}</p>
						<img width='20px' height='20px' className={`${c.pen} ${c.p}`} src={pen} alt="pen" />
						<button className={c.create} onClick={() => createPostItem()}>Создать запись</button>
					</div>
				</div>

				<div className={isStatus ? `${c.setUserStatusWrapper} ${c.statusCloser}` : c.statusCloser} onClick={() => handlerCloseStatus()}></div>
				<div className={isStatus ? `${c.setUserStatus} ${c.closeUserStatus}` : c.closeUserStatus}>
					<input type="text" placeholder='Установите статус..' className={c.inputUserStatus} value={statusV} onChange={(e) => setStatusV(statusV = e.target.value)} />
					<button className={c.buttonSetUserStatus} onClick={() => handlerSet()}>Установить</button>
				</div>


				<Burger openSide={openSide} />
				<Comments setIsComments={setIsComments} isComments={isComments} setCommentsItem={setCommentsItem} commentsItem={commentsItem} />
				<Repost setIsReposts={setIsReposts} isReposts={isReposts} setCommentsItem={setCommentsItem} commentsItem={commentsItem} />
				<Sidebar isSide={isSide} setSide={setSide} id={id} user={myCurrentUser} />
				<div className={c.container}>
					<div className={c.wrapper}>
						<header className={c.header} ref={header}>
							<p className={c.header__url}>@{myUser._id}</p>
						</header>
						<div className={c.user}>
							<div className={c.user__desc}>
								<div className={c.handler}>
									<div className={c.user__item}>
										<div className={c.user__photo} onClick={() => uploadPhoto()}>
											<img src={`${myUser.userPhoto != 'false' ? `${`https://glacial-forest-97928.herokuapp.com/` + myUser.userPhoto}` : "https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png"}`}
												width='70px'
												height='70px'
												className={c.user__img}
												alt="userPhoto" />
											{myUserStatus ? <div className={c.addNewPhoto}>+</div> : ""}
											<input type="file" accept='image/*' className={c.file} onChange={e => fileUp(e)} ref={fileUploader} />
										</div>
										<div className={c.desc}>
											<div className={c.user__name}>
												{myUser.userName}
											</div>
											<div className={c.user__status}>

												{myUser.status == '' && myUserStatus ? <a href="#" className={c.status} onClick={() => handlerSetStatus()}>{statusLocal ? statusLocal : setStatusLocal(setStatusLocal = 'Установить статус')}</a> : <a href="#" className={c.status} onClick={() => handlerSetStatus()}>{statusLocal}</a>}
											</div>
											<div className={c.user__isonline}>
												{myUser.online !== 'online' && myUser.female === 'man' ? 'был в сети: ' : ''}
												{myUser.online !== 'online' && myUser.female === 'woman' ? 'была в сети: ' : ''}
												{onlineL || 'online'}
												{myUser.online === 'online' ? <img
													width='13px'
													height='13px'
													src={phone} alt="phone" /> : ''}

											</div>
										</div>


									</div>
									<div className={c.user__return}>
										{myUser ? myUser.role == 'lera' ? <small className={c.best}>Самая лучшая девушка на свете</small> : '' : ''}
										{!myUserStatus ? <div className={c.navUser}>

											{inFriend ? <>
												<button className={c.message} onClick={() => handlerMessageItem()}>сообщение</button>
												<button className={c.message} onClick={() => handlerDeleteFriend()}>удалить из друзей</button>
											</> : <> <button className={c.message} onClick={() => handlerMessageItem()}>сообщение</button>
												{myUser.subscribers.map((sub, i) => sub.userId === myUserCurrentId.id ? <button key={i} className={c.message}>заявка отправлена</button> : '')}
												{myUser.subscribers.map((sub, i) => sub.userId !== myUserCurrentId.id ? <button key={i} className={c.message} onClick={() => handlerAddFriend()}>добавить в друзья</button> : "")}
												{myUser.subscribers.length === 0 ? <button className={c.message} onClick={() => handlerAddFriend()}>добавить в друзья</button> : ''} </>}
										</div> : ''}

									</div>
								</div>


								<div className={c.user__info}>
									<div className={c.subscribers}>
										<img
											width='17px'
											height='17px'
											className={c.sub}
											src={sub} alt="sub" />
										{myUser.subscribers.length > 9 ? `${myUser.subscribers.length} подписчиков` : `${myUser.subscribers.length} ${myUser.subscribers.length === 1 ? 'подписчик' : 'подписчиков'}`}
									</div>
								</div>
								<div className={c.user__friends}>
									<NavLink to={`/friendsPage:${myUser._id}`} className={c.none}>
										<div className={c.item}>
											Друзья

											<div className={c.friends__count}>
												{myUser ? myUser.friends.length : ''}

											</div>
											<img src={backArrow} height='10px' className={c.next} alt="next" />
										</div>
									</NavLink>

									<div className={c.friends}>
										{myUser ? myUser.friends.length === 0 ? <>
											<img src={info} alt='info' height='20px' width='20px' />
											<small className={c.addInfoFriend}> добавьте друзей</small>
										</> : '' : ''}
										{newFriends ? newFriends.array.map((friend, i) => <Friend key={i} userPhoto={friend.userPhoto} name={friend.userName} online={friend.online} />)
											: myUser.friends.map((friend, i) => <Friend key={i} userPhoto={friend.user.userPhoto} name={friend.user.userName} online={'offline'} />)}
									</div>
								</div>
								<div className={c.user__photo_item}>
									<NavLink to={`/photos:${myUser._id}`} className={c.none}>
										<p className={c.user__photoTitle}>Фотографии <p className={c.count}>{myUser ? myUser.photos.length : 0}</p> </p>
										<img src={backArrow} height='10px' className={c.next} alt="next" />
									</NavLink>

									<div className={c.photos}>
										{myUser ? myUser.photos.length === 1 ? <img
											width='120px'
											height='120px'
											className={c.user__photos_item}
											src={`https://glacial-forest-97928.herokuapp.com/` + myUser.photos[0].src} alt="usersPhoto" /> : '' : ''}
										{myUser ? myUser.photos.length === 0 && myUserStatus ? <div>
											<img src={info} alt='info' height='20px' width='20px' />
											<button className={c.addPhotoFriend} onClick={() => handlerChosePhoto()}>
												добавьте фото
											</button> <input type="file" onChange={e => handlerNewPhotoProfile(e)} ref={fileNewPhoto} accept='image/*' className={c.file} /> </div> : '' : ''}
										{myUser ? myUser.photos.length === 2 ? <div>
											<img
												width='120px'
												height='120px'
												className={c.user__photos_item}
												src={`https://glacial-forest-97928.herokuapp.com/` + myUser.photos[0].src} alt="usersPhoto" />
											<img
												width='120px'
												height='120px'
												className={c.user__photos_item}
												src={`https://glacial-forest-97928.herokuapp.com/` + myUser.photos[1].src} alt="usersPhoto" />
										</div> : '' : ''}
										{myUser ? myUser.photos.length >= 3 ? <div>
											<img
												width='120px'
												height='120px'
												className={c.user__photos_item}
												src={`https://glacial-forest-97928.herokuapp.com/` + myUser.photos[0].src} alt="usersPhoto" />
											<img
												width='120px'
												height='120px'
												className={c.user__photos_item}
												src={`https://glacial-forest-97928.herokuapp.com/` + myUser.photos[1].src} alt="usersPhoto" />
											<img
												width='120px'
												height='120px'
												className={c.user__photos_item}
												src={`https://glacial-forest-97928.herokuapp.com/` + myUser.photos[2].src} alt="usersPhoto" />
										</div> : '' : ''}
									</div>
								</div>
								{myUserStatus ?
									<div className={c.create__newpost}>
										<img width='20px' height='20px' className={c.pen} src={pen} alt="pen" />
										<button className={c.create} onClick={() => handlerCreatePost()}>Создать запись</button>
									</div>
									: ''}

								<div className={c.user__content}>
									{allUserPosts && myCurrentUser ? allUserPosts.posts.map((post, i) => <Post setIsReposts={setIsReposts} src={myUser.userPhoto} photoPost={post.src} isReposts={isReposts} setCommentsItem={setCommentsItem} commentsItem={commentsItem} setIsComments={setIsComments} isComments={isComments} key={i} user={myCurrentUser.user} description={post.description} name={myUser.userName} data={post.data} likes={post.likes} commentsItems={post.comments} reposts={post.reposts} />) : <div className={c.center}><img src={info} alt='info' height='20px' width='20px' /> <small className={c.sm}>Нет записей</small> </div>}

								</div>
							</div>
						</div>
					</div>
				</div>
			</> : <div className={c.preloader}>
				<div className={c.wrapperPrel}>
					<span className={c.let1}>з</span>
					<span className={c.let2}>а</span>
					<span className={c.let3}>г</span>
					<span className={c.let4}>р</span>
					<span className={c.let5}>у</span>
					<span className={c.let6}>з</span>
					<span className={c.let7}>к</span>
					<span className={c.let8}>а</span>
					<span className={c.let9}>д</span>
					<span className={c.let10}>а</span>
					<span className={c.let11}>н</span>
					<span className={c.let12}>н</span>
					<span className={c.let13}>ы</span>
					<span className={c.let14}>х</span>
				</div>
			</div>
			}
		</>

	)
}

export default Profile;