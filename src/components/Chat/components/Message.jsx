import c from '../css/chat.module.css'
import { useState } from "react";
import Post from '../../Home/components/Post'

const Message = ({ user, message, timeMess, isRepost, userPhoto, photoPost, src }) => {
	let [onlineMess, setOnline] = useState(false)
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
	if (timeMess) {
		const handlerMonths = async () => {
			lastOnline = timeMess
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
	return (
		<>
			{isRepost ?
				<div className={user ? c.messageItem : `${c.messageItem} ${c.messageItemAc}`}>
					<div className={user ? `${c.wrapperM} ${c.h}` : c.wrapperM}>

						<div className={c.itemW}>

							<div className={user ? c.message : `${c.message} ${c.messageAC}`}>
								<small>пользователь отправил публикацию</small>
								{user ?
									<div className={c.handlerMesUS}></div>
									:
									<div className={c.handlerMesAP}></div>
								}
								<Post photoPost={photoPost} user={isRepost.user} id={isRepost.userId} src={userPhoto} description={isRepost.description} name={isRepost.userName} reposts={isRepost.reposts} data={isRepost.data} likes={isRepost.likes} repostMess={true} commentsItems={isRepost.comments} />
							</div>
						</div>
					</div>

				</div>

				:
				<div className={user ? c.messageItem : `${c.messageItem} ${c.messageItemAc}`}>
					<div className={user ? `${c.wrapperM} ${c.h}` : c.wrapperM}>

						<div className={c.itemW}>

							<div className={user ? c.message : `${c.message} ${c.messageAC}`}>
								{message}
								{src ?
									<img src={`https://glacial-forest-97928.herokuapp.com/` + src} width='200px' height='200px' className={c.sendign} alt="sendUserPhoto" />
									: ''}
								{user ?
									<div className={c.handlerMesUS}></div>
									:
									<div className={c.handlerMesAP}></div>
								}
							</div>
						</div>
						<p className={user ? `${c.datapost} ${c.fds}` : c.datapost}>{onlineMess}</p>
					</div>

				</div>
			}
		</>

	)
}
export default Message