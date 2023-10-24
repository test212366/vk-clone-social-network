
import c from './css/regist.module.css'

import arrow from '../../assets/arrow.svg'
import email from '../../assets/email.svg'
import password from '../../assets/password.svg'
import user from '../../assets/user.svg'
import complete from '../../assets/complete (2).svg'

import { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useHttp } from "../../hooks/http.hook";
import useWindowSize from 'react-use/lib/useWindowSize'

import Confetti from 'react-confetti'

const Regisration = ({ userI, setUser }) => {
	const history = useHistory()
	const { loading, request } = useHttp()
	let [errorsInputs, setInputs] = useState({
		email: '', password: '', name: ''
	})
	let [regIsComplete, setComplete] = useState(false)
	let [isMan, setMan] = useState('man')
	let [isWoman, setWoman] = useState(false)
	let [form, setForm] = useState({
		userName: '', userLastName: '', password: ''
	})
	let [emailVal, setEmail] = useState('')

	const { width, height } = useWindowSize()

	const formHandler = e => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}
	const registerHandler = async (e) => {
		e.preventDefault()
		const user = { ...form, email: emailVal, female: isMan ? isMan : isWoman }
		try {
			setInputs(errorsInputs = {
				email: '', password: '', name: ''
			})
			const data = await request('https://glacial-forest-97928.herokuapp.com/api/user/registration', "POST", user)
			if (data.errors) {
				data.errors.forEach(error => {
					switch (error.param) {
						case ('email'):
							setInputs(errorsInputs = { ...errorsInputs, email: 'неверный email..' })
							break
						case ('userName'):
							setInputs(errorsInputs = { ...errorsInputs, name: 'некорректное имя пользователя..' })
							break
						case ('password'):
							setInputs(errorsInputs = { ...errorsInputs, password: 'пароль должен быть больше чем 6 и меньше чем 25 символов, сейчас: ' + form.password.length })
							break
						default:
					}
				})
			} else {
				setInputs(errorsInputs = {
					email: '', password: '', name: ''
				})
			}
			if (data.message === 'throw email used') setInputs(errorsInputs = { ...errorsInputs, email: 'такой email уже используется..' })
			if (data.message === 'throw name used') setInputs(errorsInputs = { ...errorsInputs, name: 'такое имя пользователя уже используется..' })
			if (data.token) {
				setComplete(regIsComplete = true)
				localStorage.setItem("user", data.token)
				setTimeout(() => {
					setComplete(regIsComplete = false)
					setUser(userI = true)
					history.push('/')
				}, 4500)
			}
		} catch (e) { }
	}
	const femaleHandler = e => {
		if (e.target.name === 'man') {
			setWoman(isWoman = false)
			setMan(isMan = 'man')
		} else if (e.target.name === 'woman') {
			setWoman(isWoman = 'woman')
			setMan(isMan = false)
		}
	}

	return (
		<div className={c.container}>
			{regIsComplete ? <div className={c.preloader}><div className={c.wrapperPrel}>
				<span className={c.let1}>в</span>
				<span className={c.let2}>х</span>
				<span className={c.let3}>о</span>
				<span className={c.let4}>д</span>
				<span className={c.let5}>в</span>
				<span className={c.let6}>с</span>
				<span className={c.let7}>и</span>
				<span className={c.let8}>с</span>
				<span className={c.let9}>т</span>
				<span className={c.let10}>е</span>
				<span className={c.let11}>м</span>
				<span className={c.let12}>у</span>
				<span className={c.let13}>.</span>
				<span className={c.let14}>.</span>
			</div></div> : ''}
			{regIsComplete ? <Confetti width={width} height={height} /> : <div></div>}
			<NavLink to="/" activeClassName='none'>
				<img
					width='23px'
					src={arrow} alt="back" className={c.back} />
			</NavLink>
			{regIsComplete ? <p className={`${c.complete} ${c.acC}`}><img className={`${c.completeImg}`} src={complete} alt="complete" /> Пользователь успешно создан!</p> : <p className={c.complete}></p>}

			<form className={c.form} onSubmit={e => registerHandler(e)}>
				<h3 className={c.title}>Регистрация</h3>
				<div className={c.wrapper__input}>
					{errorsInputs.email ? <p className={`${c.error} ${c.op}`}>{errorsInputs.email}</p> : <p className={c.error}></p>}
					<img
						width='20px'
						className={c.emailItem}
						src={email} alt="email" />
					<input type="email"
						placeholder="Добавьте эл. почту"
						className={c.email}
						value={emailVal}
						onChange={e => setEmail(emailVal = e.target.value)}
						autoFocus={true}
					/>
				</div>
				<div className={errorsInputs.name ? `${c.wrapper__input} ${c.mtOne}` : c.wrapper__input}>
					{errorsInputs.name ? <p className={`${c.error} ${c.op}`}>{errorsInputs.name}</p> : <p className={c.error}></p>}
					<img
						width='20px'
						className={c.emailItem}
						src={user} alt="userName" />
					<input type="text"
						name='userName'
						placeholder="Введите имя пользователя"
						onChange={e => formHandler(e)}
						className={c.email}
					/>
				</div>
				<div className={errorsInputs.password ? `${c.wrapper__input} ${c.mt}` : c.wrapper__input}>
					{errorsInputs.password ? <p className={c.errorPass}>{errorsInputs.password}</p> : ''}
					<img
						width='20px'
						className={c.emailItem}
						src={password} alt="password" />
					<input type="password"
						name='password'
						onChange={e => formHandler(e)}
						placeholder="Введите пароль"
						className={c.email}
					/>
				</div>
				<div className={c.female}>
					<small className={c.female__p}>Укажите ваш пол</small>
					<div className={c.wrapper}>
						<div className={c.itemI}>
							<input type="radio"
								checked={isMan}
								onChange={e => femaleHandler(e)}
								name='man'
								className={c.remember__item}
								id='man' />
							<label className={c.label} htmlFor="man">Муж.</label>
						</div>
						<div className={c.itemI}>
							<input type="radio"
								name='woman'
								checked={isWoman}
								onChange={e => femaleHandler(e)}
								className={c.remember__item} id='woman' />
							<label className={c.label} htmlFor="man">Жен.</label>
						</div>
					</div>
				</div>

				<button type='submit' disabled={loading} className={!!emailVal ? `${c.reg} ${c.active}` : `${c.reg}`}>Зарегистрироваться</button>
				{loading ? <div className={c.loader}><span> ~ </span><span> ~ </span> </div> : ''}
			</form>
		</div>
	)
}
export default Regisration