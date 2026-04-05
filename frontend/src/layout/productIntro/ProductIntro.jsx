import { Link } from "react-router";
import { useMatch } from "react-router";

import "./product-intro.scss"
import { useState } from "react";
export default function ProductIntro({ name, image, description, id, new: isNew, price }) {
    const { mobile, tablet, desktop } = image;

    const nameParts = name.split(" ");
    const afterPart = nameParts.pop();
    const beforePart = nameParts.join(" ");

    const match = useMatch("/product/:id");

    const [quantity, setQuantity] = useState(2)

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
                {match && <p className="price tiny">$ {price.toLocaleString()}</p>}
                {!match && <Link className="default" to={`/product/${id}`}>see product</Link>}
                {
                    match
                    &&
                    <div className="button-wrapper">
                        <label htmlFor="quantity" className="hidden">Quantity</label>
                        <div className="quantity">
                            <button type="button" className="decrease" aria-label="Decrease quantity" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                inputMode="numeric"
                            />
                            <button type="button" className="increase" aria-label="Increase quantity" onClick={() => setQuantity(q => Math.max(1, q + 1))}>+</button>
                        </div>
                        <button onClick={() => console.log("")} className="default">add to cart</button>
                    </div>
                }

            </div>
        </article>
    )
}