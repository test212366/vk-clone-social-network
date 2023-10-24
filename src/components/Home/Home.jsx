import c from './css/home.module.css'

import Navbar from './components/Navbar'

import Sidebar from "./components/Sidebar";
import Comments from '../NewsFriends/components/Comments'
import Burger from './components/Burger'
import Repost from '../NewsFriends/components/Repost'
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";


import Post from './components/Post'

const Home = ({ id }) => {
	let [isSide, setSide] = useState(false)
	let [isComments, setIsComments] = useState(false)
	let [localNews, setLocalNews] = useState(false)
	let [isReposts, setIsReposts] = useState(false)
	let [commentsItem, setCommentsItem] = useState(false)
	let [user, setUser] = useState(false)
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
		}
		api()
	}, [])
	useEffect(() => {

		const api = async () => {
			const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/getNews', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
			})
			const data = await responce.json()
			setLocalNews(localNews = data.news)
		}
		api()
	}, [])


	return (
		<div className={c.container}>
			<Comments setIsComments={setIsComments} isComments={isComments} setCommentsItem={setCommentsItem} commentsItem={commentsItem} />
			<Navbar />
			<Repost setIsReposts={setIsReposts} isReposts={isReposts} setCommentsItem={setCommentsItem} commentsItem={commentsItem} />
			<Sidebar isSide={isSide} setSide={setSide} id={id} user={user} />

			<div className={c.content}>
				{localNews ? localNews.map((friend, i) => <Post setIsReposts={setIsReposts} isReposts={isReposts} setCommentsItem={setCommentsItem} commentsItem={commentsItem} setIsComments={setIsComments} isComments={isComments} key={i} user={user.user} src={friend.userPhoto} photoPost={friend.src} id={friend.userId} description={friend.description} name={friend.userName} reposts={friend.reposts} data={friend.data} likes={friend.likes} commentsItems={friend.comments} />) : ""}
			</div>
			<Burger openSide={openSide} />

		</div>
	)

}
export default Home