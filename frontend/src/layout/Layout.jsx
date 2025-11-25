import Top from './top/Top'
import Footer from './footer/Footer'

import { Outlet } from 'react-router'

import "./layout.scss"
export default function Layout() {
    return (
        <>
            <Top />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}