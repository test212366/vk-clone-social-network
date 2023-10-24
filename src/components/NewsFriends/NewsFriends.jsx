import c from '../Home/css/home.module.css'

import Navbar from '../Home/components/Navbar'
import Post from '../Home/components/Post'
import Sidebar from "../Home/components/Sidebar";
import { useEffect, useState } from "react";
import jwtDecode from 'jwt-decode';
import Burger from '../Home/components/Burger';
import Comments from './components/Comments'
import Repost from './components/Repost'


import info from '../../assets/info.svg'
const NewsFriends = ({ id }) => {
	let [isSide, setSide] = useState(false)
	let [isComments, setIsComments] = useState(false)
	let [isReposts, setIsReposts] = useState(false)
	let [commentsItem, setCommentsItem] = useState(false)
	let [user, setUser] = useState(false)
	let [friendsNews, setFriendsNews] = useState([])

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
			user && user.user.friends.forEach(async friend => {
				const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/giveFriendPost', {
					headers: {
						'Content-Type': 'application/json'
					},
					method: 'POST',
					body: JSON.stringify({ id: friend.user._id })
				})
				const data = await responce.json()
				setFriendsNews(friendsNews = [...data.arrayNews])

			});
			user && user.user.subsUser.forEach(async sub => {

				const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/giveFriendPost', {
					headers: {
						'Content-Type': 'application/json'
					},
					method: 'POST',
					body: JSON.stringify({ id: sub.userId })
				})
				const dataI = await responce.json()
				setFriendsNews(friendsNews = [...dataI.arrayNews])

			});

		}
		api()




	}, [])
	return (

		<div className={c.container}>
			<Comments setIsComments={setIsComments} isComments={isComments} setCommentsItem={setCommentsItem} commentsItem={commentsItem} />
			<Repost setIsReposts={setIsReposts} isReposts={isReposts} setCommentsItem={setCommentsItem} commentsItem={commentsItem} />
			<Navbar />
			<Sidebar isSide={isSide} setSide={setSide} id={id} user={user} />

			<div className={c.content}>
				{friendsNews ? friendsNews.length === 0 ? <p className={c.noneFriends}><img src={info} alt='info' className={c.infoItem} height='20px' width='20px' />Добавьте новых друзей</p> : '' : ''}
				{friendsNews ? friendsNews.map((friend, i) => <Post setIsReposts={setIsReposts} isReposts={isReposts} setCommentsItem={setCommentsItem} commentsItem={commentsItem} setIsComments={setIsComments} isComments={isComments} key={i} user={user.user} src={friend.userPhoto} photoPost={friend.src} id={friend.userId} description={friend.description} name={friend.userName} reposts={friend.reposts} data={friend.data} likes={friend.likes} commentsItems={friend.comments} />) : ""}
			</div>
			<Burger openSide={openSide} />
		</div>
	)
}
export default NewsFriends