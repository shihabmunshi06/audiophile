import Header from './top/Header'
import Footer from './footer/Footer'

import { Outlet } from 'react-router'

export default function Layout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}