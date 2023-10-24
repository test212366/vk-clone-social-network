import c from '../css/home.module.css'


import React from 'react';

const Burger = ({openSide}) => {
    return (
        <button className={c.burger} onClick={() => openSide()}>
            <p className={c.burger_item}></p>
            <p className={c.burger_item}></p>
            <p className={c.burger_item}></p>

        </button>
    );
};

export default Burger;