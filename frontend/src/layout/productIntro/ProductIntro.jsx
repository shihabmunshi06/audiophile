import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { useMatch } from "react-router";

import QuantityButton from "../../components/quantityButton/quantityButton";
import { changeQuantity } from "../../app/features/cartSlice";

import "./product-intro.scss"
import { useState } from "react";
export default function ProductIntro({ name, image, description, id, new: isNew, price }) {
    const dispatch = useDispatch()
    const { mobile, tablet, desktop } = image;

    const nameParts = name.split(" ");
    const afterPart = nameParts.pop();
    const beforePart = nameParts.join(" ");

    const match = useMatch("/product/:id");

    const cartItems = useSelector(state => state.cart.cartItems)
    const item = cartItems.find(e => e.id === id)

    const [localQuantity, setLocalQuantity] = useState(item?.quantity || 1)

    const handleCartChange = (value) => {
        setLocalQuantity(value)
    }

    const handleCartAdd = () => {
        dispatch(changeQuantity({ productId: id, quantity: localQuantity }))
    }

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
                        <QuantityButton
                            key={item?.quantity}
                            name={beforePart}
                            max={999}
                            min={1}
                            handleCartChange={handleCartChange}
                            quantity={item?.quantity || 1}
                        />
                    )}
                    {match ? (
                        <button
                            className="primary"
                            onClick={handleCartAdd}
                        >
                            add to cart
                        </button>
                    ) : (
                        <Link className="primary" to={`/product/${id}`}>see product</Link>
                    )}

                </div>
            </div>
        </article>
    )
}