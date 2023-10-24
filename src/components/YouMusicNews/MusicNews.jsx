import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'
import Burger from '../Home/components/Burger'
import Navbar from '../Home/components/Navbar'
import Sidebar from '../Home/components/Sidebar'
import MusItem from '../Music/components/MusItem'
import c from './css/musicNews.module.css'
import info from '../../assets/info.svg'
const MusicNews = ({ id }) => {
	let [isSide, setSide] = useState(false)
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
	return (
		<div className={c.container}>
			<Navbar />
			<Sidebar isSide={isSide} setSide={setSide} id={id} user={user} />
			<Burger openSide={openSide} />
			<div className={c.content}>
				{user ? user.user.music.map((mus, i) => <MusItem key={i} nameTrack={mus.nameTrack} srcFile={mus.srcFile} srcPhoto={mus.srcPhoto} />) : ''}
				{user ? user.user.music.length === 0 ? <p className={c.noneFriends}><img src={info} alt='info' className={c.infoItem} height='20px' width='20px' />Добавьте музыку</p> : "" : ''}

			</div>
		</div>
	)
}
export default MusicNews