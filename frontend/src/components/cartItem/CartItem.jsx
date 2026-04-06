import { useDispatch } from "react-redux"

import QuantityButton from "../quantityButton/quantityButton"

import { changeQuantity } from "../../app/features/cartSlice"

import "./cart-item.scss"
export default function CartItem({ id, slug, image, price, quantity, checkout }) {

    const dispatch = useDispatch()

    const productName = slug.split("-").slice(0, -1).join(" ")
    const { desktop } = image
    const max = 999

    const handleCartChange = (value) => {
        dispatch(changeQuantity({ productId: id, quantity: value }))
    }

    return (
        <div className="cart-item">
            <div className="img-name-price">
                <div className="img-div">
                    <img src={desktop} alt="name" />
                </div>
                <div className="name-price">
                    <div className="name">
                        {productName}
                    </div>
                    <div className="price">
                        $ {parseInt(price) * parseInt(quantity)}
                    </div>
                </div>
            </div>

            {checkout === false ? (
                <QuantityButton
                    key={quantity}
                    name={slug}
                    max={max}
                    min={1}
                    handleCartChange={handleCartChange}
                    quantity={quantity}
                />
            ) : (
                <span>x{quantity}</span>
            )}
        </div>
    )
}