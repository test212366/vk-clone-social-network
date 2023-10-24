import c from '../../Home/css/home.module.css'
import jwtDecode from 'jwt-decode';
import HandlerCommenst from './HandlerCommenst'
import { useState } from "react";
const Comments = ({ setIsComments, isComments, commentsItem, setCommentsItem }) => {

	let [handler, setHandler] = useState(false)
	let [inputV, setInputV] = useState('')
	let [render, reRender] = useState(false)

	const handlerf = () => {
		setCommentsItem(commentsItem = false)
		if (isComments === true) {
			setIsComments(isComments = false)
			document.body.style.overflowY = 'auto'
		} else {
			setIsComments(isComments = true)
			document.body.style.overflowY = 'hidden'
		}
	}
	const handlerCreateComments = async () => {
		const api = async () => {
			const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/getComments', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ item: commentsItem })

			})
			const data = await responce.json()
			setHandler(handler = data)
			handlerf()
		}
		await api()
		if (handler) {
			const temp = jwtDecode(localStorage.getItem('user'))
			const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/getUser', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ id: temp.id })
			})
			const user = await responce.json()
			const res = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/createComment', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ name: user.user.userName, input: inputV, data: `${new Date}`, postName: handler.post.userName, postDesc: handler.post.description, postData: handler.post.data })
			})
			const data = await res.json()
			reRender(render = data)
			setInputV(inputV = '')
		}

	}
	return (
		<>
			<div className={isComments ? ` ${c.itemClose} ${c.wrapperItemComments}` : c.itemClose} onClick={() => handlerf()}>
			</div>
			<div className={isComments ? `${c.commentsCurrent} ${c.itemCloserComments}` : c.itemCloserComments}>
				<div className={c.commentsTemp}>
					<p className={c.descCoomm}>Комментарии под постом:</p>
					{commentsItem ? <HandlerCommenst render={render} commentsItem={commentsItem} /> : ''}

					<input type="text" value={inputV} onChange={e => setInputV(inputV = e.target.value)} className={c.inputComment} placeholder='Комментарий' />
					{inputV.length > 0 ? <button onClick={() => handlerCreateComments()} className={c.buttonCreate}>Создать</button> : ''}
				</div>
			</div>

		</>
	)
}
export default Comments