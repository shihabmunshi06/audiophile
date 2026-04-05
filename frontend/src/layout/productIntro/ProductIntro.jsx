import { useState } from "react";
import { Link } from "react-router";
import { useMatch } from "react-router";

import "./product-intro.scss"
export default function ProductIntro({ name, image, description, id, new: isNew, price }) {
    const { mobile, tablet, desktop } = image;

    const nameParts = name.split(" ");
    const afterPart = nameParts.pop();
    const beforePart = nameParts.join(" ");

    const match = useMatch("/product/:id");

    // const [quantity, setQuantity] = useState(2)

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
                {isNew && <p className="new">new product</p>}

                <h2>{beforePart} <br /> {afterPart}</h2>

                <p className="desc">{description}</p>

                {match && (
                    <p className="price">$ {price.toLocaleString()}</p>
                )}

                <div className="button-wrapper">
                    {match && (
                        ""
                    )}
                    <Link className="primary" to={`/product/${id}`}>see product</Link>
                </div>
            </div>
        </article>
    )
}