import React from 'react';
import c from '../css/home.module.css'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav className={c.navig}>
                <ul className={c.ul}>
                    <li className={c.li}> <NavLink to='/' exact className={c.linkN} activeClassName={c.tempAc}>Новости</NavLink> </li>
                    <li className={c.li}> <NavLink to='/newsFriends' className={c.linkN} activeClassName={c.tempAc}>Друзья</NavLink> </li>
                    <li className={c.li}> <NavLink to='/newsMusic' className={c.linkN} activeClassName={c.tempAc}>Музыка</NavLink> </li>
                    <li className={c.li}> <NavLink to='/newsMusicMy' className={c.linkN} activeClassName={c.tempAc}>Ваша музыка</NavLink> </li>

                </ul>
            </nav>
        </div>
    );
};

export default Navbar;