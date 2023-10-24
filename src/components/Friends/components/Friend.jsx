import c from '../css/friends.module.css'

import message from '../../../assets/message.svg'
import { NavLink } from 'react-router-dom'

const Friend = ({ name, id, userPhoto }) => {
	return (
		<div className={c.friendFR}>
			<NavLink to={`/profile:${id}`} className={c.linkFriend}>
				<div className="friend__ph">
					<img src={`${userPhoto != 'false' ? `${`https://glacial-forest-97928.herokuapp.com/` + userPhoto}` : "https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png"}`}
						width='45px'
						height='45px'
						className={c.friendPH}
						alt="friend" />
				</div>
				<div className={c.friendDesc}>
					<div className={c.friend__name}>
						{name}
					</div>
				</div>
			</NavLink>
			<img
				height='20px'
				width='20px'
				className={c.message}
				src={message} alt="message" />
		</div>
	)
}
export default Friend