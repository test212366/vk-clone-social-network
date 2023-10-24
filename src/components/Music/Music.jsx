
import { NavLink } from 'react-router-dom'
import c from './css/music.module.css'
import backArrow from '../../assets/backArrow.svg'
import jwtDecode from 'jwt-decode'
import { useEffect, useRef, useState } from 'react'

import MusItem from './components/MusItem'
import info from '../../assets/info.svg'
const Music = () => {
	let [user, setUser] = useState(false)
	let [isOpen, setIsOpen] = useState(false)
	let [countPhoto, setCountPhoto] = useState(0)
	let [countFile, setCountFile] = useState(0)
	let [srcPhoto, setSrcPhoto] = useState(false)
	let [srcFile, setSrcFile] = useState(false)
	let [valuePhoto, setValuePhot] = useState('')

	const photoForTitle = useRef(null)
	const fileTrack = useRef(null)
	useEffect(() => {
		const api = async () => {
			const temp = jwtDecode(localStorage.getItem('user'))
			const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/getUser', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ id: temp.id })
			})
			const data = await responce.json()
			setUser(user = data.user)
		}
		api()
	}, [])

	const handlerImage = async e => {
		const formData = new FormData()
		formData.append('file', e.target.files[0])
		const responce = await fetch('https://glacial-forest-97928.herokuapp.com/user/uploadPhoto', {
			method: 'POST',
			body: formData
		})
		const data = await responce.json()
		setCountPhoto(countPhoto = countPhoto + 1)
		setSrcPhoto(srcPhoto = data.src)

	}
	const handlerAudio = async e => {
		const formData = new FormData()
		formData.append('file', e.target.files[0])
		const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/uploadFile', {
			method: 'POST',
			body: formData
		})
		const data = await responce.json()
		setSrcFile(srcFile = data.src)
		setCountFile(countFile = countFile + 1)

	}
	const handlerCreatePost = async (e) => {
		e.preventDefault()
		if (!srcFile || !srcPhoto || !valuePhoto) return
		const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/uploadTrack', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ id: `${user._id}`, srcPhoto, srcFile, nameTrack: valuePhoto })
		})
		const data = await responce.json()
		if (data.user) {
			setUser(user = data.user)
			setValuePhot(valuePhoto = '')
			setSrcFile(srcFile = false)
			setSrcPhoto(srcPhoto = false)
			setCountFile(countFile = 0)
			setCountPhoto(countPhoto = 0)
			setIsOpen(isOpen = false)
		}
	}
	const handlerOpenMus = () => {
		setIsOpen(isOpen = !isOpen)
	}
	return (
		<div className={c.container}>
			<header className={c.header}>

				<NavLink to={`/`} activeClassName='none'>

					<img src={backArrow}
						width='15px'
						height='15px'
						className={c.backArrow}
						alt="back" />
				</NavLink>
				<p>Ваша музыка</p>
			</header>
			<div className={c.content}>
				<div className={isOpen ? `${c.wrapper} ${c.wrapperC}` : c.wrapperC}>
					<form onSubmit={(e) => handlerCreatePost(e)}>
						<input type="text" required onChange={e => setValuePhot(valuePhoto = e.target.value)} value={valuePhoto} placeholder='Введите название трека' className={c.input} />
						<div className={c.title}>
							<small>фото для обложки трека</small>
							<div className={c.selectFile} onClick={() => photoForTitle.current.click()}>
								+
								<div className={c.selectFileItems}>{countPhoto}</div>
							</div>
							<input accept='image/*' onChange={e => handlerImage(e)} ref={photoForTitle} type="file" className={c.file} />
							<small>добавьте ваш трек</small>
							<div className={c.selectFile} onClick={() => fileTrack.current.click()}>
								+
								<div className={c.selectFileItems}>{countFile}</div>
							</div>
							<input accept='audio/*' ref={fileTrack} onChange={e => handlerAudio(e)} type="file" className={c.file} />
							<button type='submit' className={c.buttonSave}>Сохранить</button>
						</div>

					</form>
				</div>
				{user ? user.music.map((mus, i) => <MusItem key={i} nameTrack={mus.nameTrack} srcFile={mus.srcFile} srcPhoto={mus.srcPhoto} />) : ''}
				{user ? user.music.length === 0 ? <p className={c.noneFriends}><img src={info} alt='info' className={c.infoItem} height='20px' width='20px' />Добавьте музыку</p> : "" : ''}

				<button className={isOpen ? `${c.buttonM} ${c.buttonMC}` : c.buttonM} onClick={() => handlerOpenMus()}>+</button>
			</div>
		</div>
	)
}
export default Music