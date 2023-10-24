import c from '../css/home.module.css'

import home from '../../../assets/home.svg'
import message from '../../../assets/message.svg'

import music from '../../../assets/music.svg'
import groups from '../../../assets/groups.svg'

import back from '../../../assets/arrow.svg'
import settings from '../../../assets/settings.svg'

import { NavLink } from 'react-router-dom'
const Sidebar = ({ isSide, setSide, id, user }) => {
	const handlerCloseSidebar = () => {
		setSide(isSide = !isSide)
		document.body.style.overflowY = 'auto'
	}
	return (
		<><aside className={isSide ? `${c.sidebar} ${c.sidebar__open}` : c.sidebar}>

			<NavLink to={`/profile:${id}`} className={c.td} activeClassName='none' onClick={() => handlerCloseSidebar()}>
				<div className={c.sec}>
					{user ?
						<img src={user.user ? `${user.user.userPhoto != 'false' ? `${`https://glacial-forest-97928.herokuapp.com/` + user.user.userPhoto}` : "https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png"}` : `${user.userPhoto != 'false' ? `${user.userPhoto}` : "https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png"}`} alt="user" className={c.sidebar__user} />
						: ""}

					<div className={c.online}></div>


				</div>
				<p className={c.userName}>{user ? user.user.userName : ''}</p>
				<p className={c.userId}>@{user ? user.user._id : ''}</p>
			</NavLink>

			<nav className={c.sidebar__nav}>
				<ul className={c.nav}>
					<li><NavLink to="/" exact className={c.itemLink} onClick={() => handlerCloseSidebar()} >
						<img width='22px' className={c.itemIMG} src={home} alt="home" />
						<p className={c.sidebar__link}>Главная</p>
					</NavLink></li>
					<li><NavLink to="/messages" className={c.itemLink} onClick={() => handlerCloseSidebar()}>
						<img width='22px' className={c.itemIMG} src={message} alt="message" />
						<p className={c.sidebar__link}>Сообщения</p>
					</NavLink></li>
					<li><NavLink to="music" className={c.itemLink} onClick={() => handlerCloseSidebar()}>
						<img width='22px' className={c.itemIMG} src={music} alt="music" />
						<p className={c.sidebar__link}>Музыка</p>
					</NavLink></li>
					<li><NavLink to='/friends' className={c.itemLink} onClick={() => handlerCloseSidebar()}>
						<img width='22px' className={c.itemIMG} src={groups} alt="groups" />
						<p className={c.sidebar__link}>Друзья</p>
						{user ? user.user.subscribers.length !== 0 ?
							<p className={c.logic}>{user ? user.user.subscribers.length > 0 ? user.user.subscribers.length : '' : ''}</p>
							: "" : ""}

					</NavLink></li>
					<li className={c.liBack}>
						<button className={c.backButton} onClick={() => handlerCloseSidebar()}>
							<img src={back}
								width='20px'
								height='20px'
								className={c.arrowBack} alt="back" />
						</button>

					</li>
				</ul>
				<div className={c.sidebar__footer}>
					<NavLink to='/settings' className={c.settings} onClick={() => handlerCloseSidebar()}>
						<img src={settings} width='25px'
							height='25px'
							className={c.set}
							alt="settings" />
						Настройки
					</NavLink>
				</div>
			</nav>

		</aside>
			<div onClick={() => handlerCloseSidebar()} className={isSide ? `${c.handlerSidebar} ${c.active}` : c.handlerSidebar}></div>
		</>

	)
}
export default Sidebar