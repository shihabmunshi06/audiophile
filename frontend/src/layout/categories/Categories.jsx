import { Link } from "react-router"
import RightIcon from "../../components/icon/RightIcon"

const data = [
    {
        image: "/assets/shared/desktop/image-category-thumbnail-headphones.png",
        category: "headphones"
    },
    {
        image: "/assets/shared/desktop/image-category-thumbnail-speakers.png",
        category: "speakers"
    },
    {
        image: "/assets/shared/desktop/image-category-thumbnail-earphones.png",
        category: "earphones"
    },
]

function Category({ image, category, closeNav }) {
    return (
        <li>
            <div className="bg-design"></div>
            <img src={image} alt={`${category} category`} />
            <h2 className="tiny">{category}</h2>
            <Link onClick={() => closeNav()} className="x-tiny" to={`/${category}`}>
                <span>shop</span>
                <RightIcon />
            </Link>
        </li>
    )
}

import "./categories.scss"
export default function Categories({ navState, closeNav }) {
    return (
        <nav id='categories' className={`${navState === true ? "active" : ""}`}>
            <div className="wrapper">
                <ul>
                    {data.map(e => <Category key={e.category} {...e} closeNav={closeNav} />)}
                </ul>
            </div>
        </nav>
    )
}
