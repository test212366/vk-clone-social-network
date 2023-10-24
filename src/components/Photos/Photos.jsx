import jwtDecode from "jwt-decode"
import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router"
import { NavLink } from "react-router-dom"

import backArrow from '../../assets/backArrow.svg'

import c from './css/photos.module.css'
import info from '../../assets/info.svg'
const Photos = () => {
	const location = useLocation()
	const uploaderPhoto = useRef(null)
	var userId = false
	let [isUser, setIsUser] = useState(false)
	let [user, setUser] = useState(false)
	if (location.pathname.includes('/photos:')) {
		userId = location.pathname.slice(8)
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
			const temp = jwtDecode(localStorage.getItem('user'))
			if (`${user.user._id}` === temp.id) setIsUser(isUser = true)
		}
		api()
	}, [])
	const uploaderPhotoI = async e => {
		const formData = new FormData()
		formData.append('file', e.target.files[0])
		formData.append('id', `${user.user._id}`)
		const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/uploadPhotoUs', {
			method: 'POST',
			body: formData
		})
		const data = await responce.json()

		setUser(user = { user: data.user })

	}

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
				<p>Фотографии пользователя</p>
			</header>
			<div className={c.content}>
				{user ? user.user.photos.length === 0 ? <p className={c.noneFriends}> <img src={info} alt='info' className={c.infoItem} height='20px' width='20px' /> Нет Фотографий пользователя </p> : '' : ''}
				{user ? user.user.photos.map(ph => <img src={`https://glacial-forest-97928.herokuapp.com/` + ph.src} height='100px' width='100px' className={c.photo} alt="UserPh" />) : ''}

				{isUser ? <button className={c.addNewPhoto} onClick={() => uploaderPhoto.current.click()}>Добавить фото</button> : ''}

				<input type="file" ref={uploaderPhoto} onChange={e => uploaderPhotoI(e)} accept='image/*' className={c.file} />
			</div>
		</div>
	)
}
export default Photos