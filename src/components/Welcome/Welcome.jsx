import { NavLink } from 'react-router-dom'

import c from './css/welcome.module.css'

import email from '../../assets/email.svg'

const Welcome = ({userI, setUser}) => {
	const candidate = localStorage.getItem('user')
	if(candidate) {
		setUser(userI = true)
	}
	return (
		<div className={c.container}>
			<header className={c.header}>
				<h3 className={c.title}>Давайте начнем</h3>
				<p className={c.p}>Для начала создайте аккаунт Ease</p>
			</header>
			<nav className={c.navi}>
				<NavLink as={NavLink} to='/login' className={c.cont__email_log}>
					<img
						width='20px'
						className={c.email}
						src={email} alt="email" />
					Войти через эл. почту
				</NavLink>
				<div className={c.wrapper__nav}>
					<hr className={c.hr} />
					<p className={c.or}>или</p>
					<hr className={c.hr} />
				</div>
				<NavLink as={NavLink} to='/reg' className={c.cont__email_reg}>

					Зарегистрироваться
				</NavLink>
			</nav>
		</div>
	)
}
export default Welcome