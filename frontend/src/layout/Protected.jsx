import { Outlet } from "react-router"

import Top from "./top/Top"

export default function Protected() {
    return (
        <>
            <Top />
            <main>
                <Outlet />
            </main>
        </>
    )
}