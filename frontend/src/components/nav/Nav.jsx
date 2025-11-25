import { NavLink } from 'react-router'

import "./nav.scss"
export default function Nav() {
    return (
        <nav aria-label='Main navigation' className='main-nav'>
            <ul >
                <li>
                    <NavLink to="/">home</NavLink>
                </li>
                <li>
                    <NavLink to="/headphones">headphones</NavLink>
                </li>
                <li>
                    <NavLink to="/speakers">speakers</NavLink>
                </li>
                <li>
                    <NavLink to="/earphones">earphones</NavLink>
                </li>
            </ul>
        </nav>
    )
}
