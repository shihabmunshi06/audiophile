import { useState } from 'react'
import { Link } from 'react-router'

import CartIcon from '../../components/icon/CartIcon'

import Nav from '../../components/nav/Nav'
import Cart from '../cart/Cart'
import Categories from '../categories/Categories'
import Hamburger from '../../components/icon/Hamburger'
import Logo from '../../components/icon/Logo'

import "./top.scss"
export default function Top() {

    const [cartState, toggleCartState] = useState(false)
    const [navState, toggleNavState] = useState(false)

    const handleHamClick = () => {
        toggleNavState(prev => !prev)
    }

    const handleCartClick = () => {
        toggleCartState(prev => !prev)
    }

    const closeCart = () => {
        toggleCartState(false)
    }

    const closeNav = () => {
        toggleNavState(false)
    }

    return (
        <>
            <header className='main-header'>
                <button className='hamburger' onClick={handleHamClick}>
                    <Hamburger />
                </button>
                <Link className='logo' to="/" aria-label="Audiophile home">
                    <Logo />
                </Link>
                <Nav />
                <Categories navState={navState} closeNav={closeNav} />
                <button
                    className="cart-button"
                    onClick={handleCartClick}
                    aria-haspopup="dialog"
                    aria-expanded={cartState ? "true" : "false"}
                    aria-controls="cart-dialog"
                >
                    <CartIcon />
                </button>
            </header>
            <Cart cartState={cartState} closeCart={closeCart} />
        </>

    )
}
