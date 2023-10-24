import c from '../../Home/css/home.module.css'
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react'
import Chat from '../../Messages/components/Chat'
import info from '../../../assets/info.svg'

const Repost = ({ setIsReposts, isReposts, setCommentsItem, commentsItem }) => {
	let [userMess, setUserMess] = useState(false)
	const temp = jwtDecode(localStorage.getItem('user'))
	useEffect(() => {
		const api = async () => {
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
	}, [])
	const handlerCloser = () => {
		setIsReposts(setIsReposts = false)
		document.body.style.overflowY = 'auto'
	}
	const sendPost = async (id) => {
		if (commentsItem) {
			const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/getComments', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ item: commentsItem })

			})
			const data = await responce.json()
			await fetch('https://glacial-forest-97928.herokuapp.com/api/user/repost', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ id, postName: data.post.userName, postDesc: data.post.description, postData: data.post.data, userSend: temp.id })

			})
		}
		handlerCloser()
	}
	return (
		<>
			<div className={isReposts ? `${c.repostInMessageWrapper} ${c.closerReposts}` : c.closerReposts} onClick={() => handlerCloser()}></div>
			<div className={isReposts ? `${c.repostInMessage} ${c.closerRepostsMess}` : c.closerRepostsMess}>
				<p className={c.repostTitle}>Поделиться публикацией в личном сообщении:</p>
				<div className={c.content}>
					{userMess.message ? <p className={c.noneFriends}><img src={info} alt='info' className={c.infoItem} height='20px' width='20px' />Добавьте чаты</p> : ''}
					{userMess && !userMess.message ? userMess.map((message, i) => <div className={c.repostButton} key={i} onClick={() => sendPost(message.currentIdChat)}><Chat props={{ name: message.name, online: message.online, lastMessage: message.lastMessage, userPhoto: message.userPhoto }} /></div>) : ''}
					{!userMess ? <p>Загрузка</p> : ''}
				</div>
			</div>
		</>

	)
}
export default Repost