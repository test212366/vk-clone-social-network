import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import backArrow from '../../assets/backArrow.svg'
import c from './css/friend.module.css'
import info from '../../assets/info.svg'
import Friend from "../Friends/components/Friend"

const FriendsPage = () => {
	const location = useLocation()
	var userId = false
	let [user, setUser] = useState(false)
	if (location.pathname.includes('/friendsPage:')) {
		userId = location.pathname.slice(13)
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
			setUser(user = data)
		}
		api()
	}, [])

	return (
		<div className={c.container}>
			<header className={c.header}>
				<NavLink to={`/profile:${userId}`} activeClassName='none'>
					<img src={backArrow}
						width='15px'
						height='15px'
						className={c.backArrow}
						alt="back" />
				</NavLink>
				<p>Друзья</p>
			</header>
			<div className={c.content}>
				{user ? user.user.friends.length === 0 ? <p className={c.noneFriends}><img src={info} alt='info' className={c.infoItem} height='20px' width='20px' />Добавьте новых друзей</p> : '' : ''}
				{user ? user.user.friends.map((friend, i) => <Friend key={i} name={friend.user.userName} userPhoto={friend.user.userPhoto} id={friend.user._id} online={friend.user.online} />) : ''}
			</div>
		</div>

	)
}
export default FriendsPage
