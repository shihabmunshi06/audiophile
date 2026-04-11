import { useState } from 'react'
import { Link } from 'react-router'

import CartIcon from '../../components/icon/CartIcon'
import ProfileIcon from '../../components/icon/ProfileIcon'
import Hamburger from '../../components/icon/Hamburger'
import Logo from '../../components/icon/Logo'

import Nav from '../../components/nav/Nav'
import Cart from '../cart/Cart'
import Profile from '../profile/Profile'
import Categories from '../categories/Categories'

import "./header.scss"
export default function Header() {

    const [cartState, toggleCartState] = useState(false)
    const [profileState, toggleProfileState] = useState(false)
    const [navState, toggleNavState] = useState(false)

    const handleHamClick = () => {
        toggleNavState(prev => !prev)
    }

    const handleCartClick = () => {
        toggleCartState(prev => !prev)
    }
    const handleProfileClick = () => {
        toggleProfileState(prev => !prev)
    }

    const closeCart = () => {
        toggleCartState(false)
    }
    const closeProfile = () => {
        toggleProfileState(false)
    }

    const closeNav = () => {
        toggleNavState(false)
    }

    return (
        <>
            <header id='main-header'>
                <button className='hamburger' onClick={handleHamClick}>
                    <Hamburger />
                </button>
                <Link className='logo' to="/" aria-label="Audiophile home">
                    <Logo />
                </Link>
                <Nav />
                <Categories navState={navState} closeNav={closeNav} />

                <div className="buttons">
                    <button
                        className="cart-button"
                        onClick={handleCartClick}
                        aria-haspopup="dialog"
                        aria-expanded={cartState ? "true" : "false"}
                        aria-controls="cart-dialog"
                    >
                        <CartIcon />
                    </button>
                    <button
                        onClick={handleProfileClick}>
                        <ProfileIcon />
                    </button>
                </div>
            </header>
            <Cart cartState={cartState} closeCart={closeCart} />
            <Profile profileState={profileState} closeProfile={closeProfile} />
        </>
    )
}
