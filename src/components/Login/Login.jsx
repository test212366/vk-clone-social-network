
import c from './css/login.module.css'

import arrow from '../../assets/arrow.svg'
import email from '../../assets/email.svg'
import password from '../../assets/password.svg'

import { NavLink, useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useHttp } from "../../hooks/http.hook";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
const Login = ({ setUser, userI }) => {
	const history = useHistory()
	const { loading, request } = useHttp()
	let { height, width } = useWindowSize()
	let [loginIsComp, setLogin] = useState(false)
	let [errors, setErrors] = useState({
		password: '', email: ''
	})
	let [emailValue, setEmail] = useState('')
	let [passV, setPass] = useState('')
	const loginFromHandler = async e => {
		e.preventDefault()
		const user = { email: emailValue, password: passV }
		try {
			setErrors(errors = { password: '', email: '' })
			const data = await request('https://glacial-forest-97928.herokuapp.com/api/user/login', "POST", user)
			if (data.errors) {
				data.errors.forEach(error => {
					switch (error.param) {
						case ('email'):
							setErrors(errors = { ...errors, email: 'неверный email..' })
							break
						case ('password'):
							setErrors(errors = { ...errors, password: 'пароль должен быть больше чем 6 и меньше чем 25 символов, сейчас: ' + user.password.length })
							break
						default:
					}

				})
			}
			if (data.email) setErrors(errors = { ...errors, email: data.email })
			if (data.password) setErrors(errors = { ...errors, password: data.password })
			if (data.token) {
				setLogin(loginIsComp = true)
				localStorage.setItem("user", data.token)
				setTimeout(() => {
					setLogin(loginIsComp = false)
					setUser(userI = true)
					history.push('/')
				}, 4500)
			}
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div className={c.container}>
			{loginIsComp ? <div className={c.preloader}><div className={c.wrapperPrel}>
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
			{loginIsComp ? <Confetti height={height} width={width} /> : ''}


			<NavLink to="/" activeClassName='none'>
				<img
					width='23px'
					src={arrow} alt="back" className={c.back} />
			</NavLink>


			<form className={c.form} onSubmit={(e) => loginFromHandler(e)}>
				<h3 className={c.title}>Войти через эл. почту</h3>
				<div className={c.wrapper__input}>
					{errors.email ? <p className={`${c.errors} ${c.acE}`}>{errors.email}</p> : <p className={c.errors}></p>}
					<img
						width='20px'
						className={c.emailItem}
						src={email} alt="email" />
					<input type="email"
						placeholder="Добавьте эл. почту"
						className={c.email}
						autoFocus={true}
						onChange={e => setEmail(emailValue = e.target.value)}
						value={emailValue}
					/>
				</div>
				<div className={errors.password ? `${c.wrapper__input} ${c.wrA}` : c.wrapper__input}>
					{errors.password ? <p className={`${c.errorsP} ${c.acE}`}>{errors.password}</p> : <p className={c.errorsP}></p>}
					<img
						width='20px'
						className={c.emailItem}
						src={password} alt="password" />
					<input type="password"
						placeholder="Введите пароль"
						value={passV}
						onChange={e => setPass(passV = e.target.value)}
						className={c.email}
					/>
				</div>
				<div className={c.remember__item}>
					<input type="checkbox"
						className={c.remember__itemIn}
						id="remember" />
					<label className={c.label} htmlFor="remember">Запомнить</label>
				</div>

				<button
					disabled={loading}
					className={!!emailValue ? `${c.login} ${c.active}` : c.login}
					type="submit">Продолжить
				</button>
				{loading ? <div className={c.loader}><span> ~ </span><span> ~ </span> </div> : ''}
			</form>
		</div>
	)
}
export default Login