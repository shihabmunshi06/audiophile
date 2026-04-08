import { Outlet } from "react-router"

import Header from "./top/Header"

export default function Protected() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    )
}