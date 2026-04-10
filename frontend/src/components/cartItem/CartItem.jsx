import { useDispatch } from "react-redux"

import CrossIcon from "../icon/CrossIcon"

import QuantityButton from "../quantityButton/quantityButton"

import { changeQuantity, deleteCartItem } from "../../app/features/cartSlice"

import "./cart-item.scss"
export default function CartItem({ _id, slug, image, price, quantity, checkout }) {

    const dispatch = useDispatch()

    const productName = slug.split("-").slice(0, -1).join(" ")
    const { desktop } = image
    const max = 999

    const handleCartChange = (value) => {
        dispatch(changeQuantity({ productId: _id, quantity: value }))
    }

    const handleDelete = () => {
        dispatch(deleteCartItem(_id))
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
                <div className="button-wrapper">
                    <QuantityButton
                        key={quantity}
                        name={slug}
                        max={max}
                        min={1}
                        handleCartChange={handleCartChange}
                        quantity={quantity}
                    />
                    <button clas onClick={handleDelete} type="button" className="remove-button">
                        <CrossIcon />
                    </button>
                </div>
            ) : (
                <span>x{quantity}</span>
            )}
        </div>
    )
}