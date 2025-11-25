
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import CartIcon from '../../components/icon/CartIcon'

import { toggleCart } from '../../app/features/cartSlice'

import Nav from '../../components/nav/Nav'
import Cart from '../cart/Cart'
import Categories from '../categories/Categories'
import Hamburger from '../../components/icon/Hamburger'
import Logo from '../../components/icon/Logo'
import "./top.scss"
import { useState } from 'react'
export default function Top() {

    const dispatch = useDispatch()

    const cartState = useSelector(state => state.cart.cartState)
    const [navOpen, setNavOpen] = useState(false)

    const handleNav = () => {
        setNavOpen(!navOpen)
    }
    const closeNav = () => {
        setNavOpen(false)
    }

    return (
        <>
            <header className='main-header'>
                <button className='hamburger' onClick={() => handleNav()}>
                    <Hamburger />
                </button>
                <Link className='logo' to="/" aria-label="Audiophile home">
                    <Logo />
                </Link>
                <Nav />
                <Categories navState={navOpen} closeNav={closeNav} />
                <button
                    className="cart-button"
                    onClick={() => dispatch(toggleCart())}
                    aria-haspopup="dialog"
                    aria-expanded={cartState ? "true" : "false"}
                    aria-controls="cart-dialog"
                >
                    <CartIcon />
                </button>
            </header>
            <Cart />
        </>

    )
}
