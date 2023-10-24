import { useEffect, useState } from "react"
import Sidebar from "../Home/components/Sidebar"
import Friend from "./components/Friend"

import c from './css/friends.module.css'
import Burger from "../Home/components/Burger";
import jwtDecode from "jwt-decode";
import FriendCall from "./components/FriendCall";
import info from '../../assets/info.svg'
const Friends = ({ id }) => {
	let [newFriends, setNewFriends] = useState(false)
	let [valueI, setValueI] = useState('')
	let [isSide, setSide] = useState(false)
	let [loading, setLoading] = useState(false)
	let [user, setUser] = useState(false)
	let [userFind, setUserFind] = useState(false)
	let [errors, setErrors] = useState(false)
	const openSide = () => {
		setSide(isSide = !isSide)
		document.body.style.overflowY = 'hidden'
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
			setUser(user = data)
			const resp = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/updateFriends', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ array: user.user.friends })
			})
			const array = await resp.json()
			setNewFriends(newFriends = array)
		}
		api()
	}, [])
	const handlerFindUser = async () => {
		setErrors(errors = false)
		setLoading(loading = true)
		const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/findUser', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ userName: valueI })
		})
		const data = await responce.json()
		setLoading(loading = false)
		if (data.message) setErrors(errors = true)
		if (!data.message) setUserFind(userFind = data)
		setValueI(valueI = '')
	}

	return (
		<div className={c.container}>
			<header className={c.header}>
				<input type="text"
					placeholder='Поиск друзей'
					className={c.input}
					value={valueI}
					onChange={e => setValueI(valueI = e.target.value)}
				/>
				{valueI ? <button className={c.search} onClick={() => handlerFindUser()}>Найти</button> : ''}
			</header>
			<Sidebar />
			<div className={c.content}>
				{loading ? <p>Загрузка...</p> : ''}
				{errors ? <div> <small className={c.find}>Пользователь не найден</small> </div> : ''}
				{userFind ? <Friend name={userFind.userName} userPhoto={userFind.userPhoto} id={userFind._id} /> : ''}
				<small className={c.call}>Заявки в друзья</small>
				<div className="callAddFriends">
					{user ? user.user.subscribers.length === 0 ? <p className={c.noneFriends}><img src={info} alt='info' className={c.infoItem} height='20px' width='20px' />Нет заявок в друзья</p> : '' : ''}
					{user ? user.user.subscribers.map((sub, i) => <FriendCall key={i} setUser={setUser} user={user} name={sub.user.userName} userPhoto={sub.user.userPhoto} id={sub.user._id} currentUser={user.user._id} addFriendId={sub.user._id} />) : ''}
				</div>
				<small className={c.call}>Ваши друзья</small>
				<div className="friends">
					{user ? user.user.friends.length === 0 ? <p className={c.noneFriends}><img src={info} alt='info' className={c.infoItem} height='20px' width='20px' />Нет друзей</p> : '' : ''}
					{newFriends ? newFriends.array.map((friend, i) => <Friend key={i} name={friend.userName} id={friend._id} userPhoto={friend.userPhoto} online={friend.online} />)
						: user ? user.user.friends.map((friend, i) => <Friend key={i} id={friend.user._id} userPhoto={friend.user.userPhoto} name={friend.user.userName} online={'offline'} />) : ''}
				</div>
			</div>
			<Sidebar isSide={isSide} setSide={setSide} id={id} user={user} />
			<Burger openSide={openSide} />
		</div >
	)
}
export default Friends