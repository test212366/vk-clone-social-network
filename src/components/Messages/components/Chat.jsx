import c from '../css/messages.module.css'
import { useState } from 'react'

const Chat = (props) => {
	let [online, setOnline] = useState(false)
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
	if (props.props.date) {
		const handlerMonths = async () => {
			lastOnline = props.props.date
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
			setOnline(online = date)
		}
		handlerMonths()


	}
	return (
		<div className={c.chat}>
			<div className={c.chat__photo}>
				<img src={`${props.props.userPhoto != 'false' ? `${`https://glacial-forest-97928.herokuapp.com/` + props.props.userPhoto}` : "https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png"}`}
					height='50px'
					width='50px'
					className={c.photo}
					alt="chat__photo" />
				{props.props && props.props.online === 'online' ? <div className={c.chat__status}></div> : ''}

			</div>
			<div className={c.wrap}>
				<div className={c.chat__name}>
					{props.props ? props.props.name : ''}
				</div>
				<div className={c.chat__date}>
					{online}
				</div>
				<div className={c.chat__lastM}>
					{props.props ? props.props.lastMessage : ''}
				</div>
			</div>

		</div>
	)
}
export default Chat