import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { useMatch } from "react-router";

import QuantityButton from "../../components/quantityButton/quantityButton";
import { changeQuantity } from "../../app/features/cartSlice";

import "./product-intro.scss"
export default function ProductIntro({ name, image, description, id, new: isNew, price }) {
    const dispatch = useDispatch()
    const { mobile, tablet, desktop } = image;

    const nameParts = name.split(" ");
    const afterPart = nameParts.pop();
    const beforePart = nameParts.join(" ");

    const match = useMatch("/product/:id");

    const handleCartChange = (value) => {
        dispatch(changeQuantity({ productId: id, quantity: value }))
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
                            name={beforePart}
                            max={999}
                            min={1}
                            handleCartChange={handleCartChange}
                            quantity={1}
                        />
                    )}
                    <Link className="primary" to={`/product/${id}`}>see product</Link>
                </div>
            </div>
        </article>
    )
}