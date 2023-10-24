import c from './css/musicAll.module.css'

import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'
import Burger from '../Home/components/Burger'
import Navbar from '../Home/components/Navbar'
import Sidebar from '../Home/components/Sidebar'
import MusItem from '../Music/components/MusItem'

const MusicAll = ({ id }) => {
	let [isSide, setSide] = useState(false)
	let [user, setUser] = useState(false)
	let [allMusic, setAllMusic] = useState(false)
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
			const responceI = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/getAppUsers', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
			})
			const dataI = await responceI.json()
			setAllMusic(allMusic = dataI.music)
		}
		api()
	}, [])

	return (
		<div className={c.container}>
			<Navbar />
			<Sidebar isSide={isSide} setSide={setSide} id={id} user={user} />
			<Burger openSide={openSide} />
			<div className={c.content}>
				<small className={c.small}>Вся музыка</small>
				{allMusic ? allMusic.map((mus, i) => <MusItem key={i} nameTrack={mus.nameTrack} srcFile={mus.srcFile} srcPhoto={mus.srcPhoto} />) : ''}

			</div>
		</div>
	)
}
export default MusicAll