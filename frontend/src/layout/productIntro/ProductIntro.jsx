import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import { useMatch } from "react-router";

import QuantityButton from "../../components/quantityButton/quantityButton";
import { addToCart } from "../../app/features/cartSlice";

import "./product-intro.scss"
export default function ProductIntro(product) {

    const { name, image, description, _id, newProduct, price } = product
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    const dispatch = useDispatch()
    const { mobile, tablet, desktop } = image;

    const nameParts = name.split(" ");
    const afterPart = nameParts.pop();
    const beforePart = nameParts.join(" ");

    const match = useMatch("/products/:id");

    const cartItems = useSelector(state => state.cart.cartItems)
    const item = cartItems.find(e => e._id === _id)

    const [localQuantity, setLocalQuantity] = useState(item?.quantity || 1)

    const handleCartChange = (value) => {
        setLocalQuantity(value)
    }

    const handleCartAdd = () => {
        dispatch(addToCart({ product, quantity: localQuantity }))
    }

    return (
        <article className="product-intro">
            <figure>
                <img src={desktop} alt="Promo" />
            </figure>
            <div className="texts">
                {newProduct && <p className="new">new product</p>}

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
                        <Link className="primary" to={`/products/${_id}`}>see product</Link>
                    )}

                </div>
            </div>
        </article>
    )
}