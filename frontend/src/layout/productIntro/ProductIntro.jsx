import { Link } from "react-router";

import "./product-intro.scss"
export default function ProductIntro({ name, image, description, id, new: isNew }) {
    const { mobile, tablet, desktop } = image;

    const nameParts = name.split(" ");
    const afterPart = nameParts.pop();
    const beforePart = nameParts.join(" ");

    return (
        <article className="product-intro">
            <figure>
                <picture>
                    <source srcSet={mobile} media="(max-width: 450px)" />
                    <source srcSet={tablet} media="(max-width: 800px)" />
                    <img src={desktop} alt="Promo" />
                </picture>
            </figure>
            <div className="texts">
                {isNew && <p className="overline">new product</p>}
                <h2 className="l">{beforePart} <br /> {afterPart}</h2>
                <p className="description">{description}</p>
                <Link className="default" to={`/product/${id}`}>see product</Link>
            </div>
        </article>
    )
}