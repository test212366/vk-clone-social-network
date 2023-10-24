import c from '../css/home.module.css'
import comments from '../../../assets/comment.svg'
import like from '../../../assets/like.svg'
import share from '../../../assets/share.svg'
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { NavLink } from 'react-router-dom'
const Post = ({ setIsReposts, isReposts, photoPost, user, description, temp, name, data, likes, setCommentsItem, commentsItem, commentsItems, src, reposts, id = false, setIsComments, isComments, repostMess }) => {
	let [onlineMess, setOnline] = useState(false)
	let [allLikes, setAllLikes] = useState(0)
	let [allReposts, setAllReposts] = useState(0)
	let [likedPost, setLikedPost] = useState(false)
	useEffect(async () => {
		if (likes.length > 0 && user) {
			await likes.forEach(like => {
				if (like.user === user.userName) setLikedPost(likedPost = true)
			})
		}
		if (likes) setAllLikes(allLikes = likes.length)
		setAllReposts(allReposts = reposts.length)
	}, [])
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

	let lastOnline = false
	if (data) {
		const handlerMonths = async () => {
			lastOnline = data
			lastOnline = lastOnline.slice(4, 21)
			let monthF = lastOnline.slice(0, 3)
			let day = lastOnline.slice(4, 6)
			let year = lastOnline.slice(6, 11)
			let time = lastOnline.slice(11)
			let handlerTemp = false
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
			let date = day + monthF + year + ' в ' + time
			setOnline(onlineMess = date)
		}
		handlerMonths()


	}
	const handlerLike = async () => {
		if (likedPost) {
			const temp = jwtDecode(localStorage.getItem('user'))
			setLikedPost(likedPost = false)
			setAllLikes(allLikes = allLikes - 1)
			const responceI = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/getUser', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ id: temp.id })
			})
			const currentUserLike = await responceI.json()

			const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/handlerDelLike', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ name, userLike: currentUserLike.user.userName, description, data, })
			})
			await responce.json()
		} else {
			const temp = jwtDecode(localStorage.getItem('user'))
			setLikedPost(likedPost = true)
			setAllLikes(allLikes = allLikes + 1)
			const responceI = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/getUser', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ id: temp.id })
			})
			const currentUserLike = await responceI.json()

			const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/handler', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ name, userLike: currentUserLike.user.userName, description, data, })
			})
			await responce.json()

		}
	}
	const handlerOpenComments = () => {
		setCommentsItem(commentsItem = { name, description, data })
		if (isComments === true) {
			setIsComments(isComments = false)
			document.body.style.overflowY = 'auto'
		} else {
			setIsComments(isComments = true)
			document.body.style.overflowY = 'hidden'
		}
	}
	const handlerRepost = () => {
		setCommentsItem(commentsItem = { name, description, data })
		if (isReposts === true) {
			setIsReposts(isReposts = false)
			document.body.style.overflowY = 'auto'
		} else {
			setIsReposts(isReposts = true)
			document.body.style.overflowY = 'hidden'
		}
	}

	return (
		<div className={repostMess ? `${c.post} ${c.widthPost}` : c.post}>
			<div className={c.post__header}>
				<div className="post__logo">
					<img
						width='43px'
						className={c.post__img}
						height='43px'
						src={`${src != 'false' ? `${`https://glacial-forest-97928.herokuapp.com/` + src}` : "https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png"}`} alt="postIMG" />
				</div>
				<div className={c.desc}>
					{id ? <NavLink to={`/profile:${id}`} className={c.none} >
						<div className={c.wrapper__post}>
							<div className={c.post__title}>
								{name}
							</div>
							<div className={c.post__date}>
								{onlineMess}
							</div>
						</div>
					</NavLink> : <div className={c.wrapper__post}>
						<div className={c.post__title}>
							{name}
						</div>
						<div className={c.post__date}>
							{onlineMess}
						</div>
					</div>}



					<div className={c.post__description}>
						{description}
					</div>

				</div>

			</div>

			<div className="post__body">
				{photoPost ? <img src={`https://glacial-forest-97928.herokuapp.com/` + photoPost}
					className={c.img__post_body}
					alt="post" /> : ''}

			</div>
			{repostMess ? "" : <div className={c.post__footer}>
				<div className={c.post__footer_wrapper}>
					<button className={c.buttonLike} onClick={() => handlerLike()}>
						<div className={c.item}>
							<img
								className={c.count}
								src={like}
								width='20px'
								alt="like"

							/>
							<div className={likedPost ? `${c.activePostLi} ${c.removePost} ` : c.removePost}></div>
							{allLikes}
						</div>
					</button>
					{temp ? "" : <>
						<div className={c.item} onClick={() => handlerOpenComments()}>
							<img
								width='20px' className={c.count}
								src={comments} alt="comments" />
							{commentsItems ? commentsItems.length : ""}
						</div>
						<div className={c.item} onClick={() => handlerRepost()}>
							<img
								width='20px'
								height='20px' className={c.count}
								src={share} alt="share" />
							{allReposts}
						</div>
					</>}

				</div>

			</div>}


		</div>
	)
}
export default Post