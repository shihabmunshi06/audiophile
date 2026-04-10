import { Link } from "react-router"

import Nav from "../../components/nav/Nav"
import Logo from "../../components/icon/Logo"
import FacebookIcon from "../../components/icon/FacebookIcon"
import TwitterIcon from "../../components/icon/TwitterIcon"
import InstagramIcon from "../../components/icon/InstagramIcon"

import "./footer.scss"
export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer id="main-footer">
            <div className="logo-nav">
                <Link className="logo">
                    <Logo />
                </Link>
                <Nav />
            </div>
            <p>
                Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.
            </p>
            <div className="copyright-social">
                <div className="copyright">
                    Copyright {year}. All Rights Reserved
                </div>
                <ul className="social">
                    <li>
                        <a
                            href="https://your-social-link.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit Facebook"
                        >
                            <FacebookIcon />
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://your-social-link.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit Twitter"
                        >
                            <TwitterIcon />
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://your-social-link.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit Instagram"
                        >
                            <InstagramIcon />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
