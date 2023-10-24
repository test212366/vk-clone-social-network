import c from '../css/profile.module.css'

const Friend = ({ name, online, userPhoto }) => {
	return (
		<div className={c.friend}>
			<div className={c.friend__img}>
				<img
					width='50px'
					height='50px'
					className={c.fr__img}
					src={`${userPhoto != 'false' ? `${`https://glacial-forest-97928.herokuapp.com/` + userPhoto}` : "https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png"}`} />
				{online === 'online' ? <div className={c.friend__status}></div> : ''}
			</div>
			<div className={c.friend__name}>
				{name}
			</div>
		</div>
	)
}
export default Friend