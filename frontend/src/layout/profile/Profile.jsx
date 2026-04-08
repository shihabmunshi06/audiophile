import { Link } from "react-router"

import "./profile.scss"
export default function Profile({ profileState, closeProfile }) {
    return (
        <div className={`profile ${profileState}`}>
            <button>Sign in</button>
            <button>Sign Up</button>
            <Link to={`orders`}>Orders</Link>
            <button>Profile</button>
            <button>Sign out</button>
        </div>
    )
}