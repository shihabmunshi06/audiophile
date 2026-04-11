import { Link } from "react-router"

import "./profile.scss"
export default function Profile({ profileState, closeProfile }) {
    return (
        <div className={`profile ${profileState === true ? "active" : ""}`}>
            <button>Sign in</button>
            <Link to={`orders`}>Orders</Link>
            <Link to={`profile`}>Profile</Link>
            <button>Sign out</button>
        </div>
    )
}