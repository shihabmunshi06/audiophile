import { Link } from "react-router"
import OrderConfirmationIcon from "../../components/icon/OrderConfirmationIcon"

import "./confirmation.scss"
export default function Confirmation({ confirmationState, successfulOrder }) {

    const { _id, orderItems = [], totalPrice } = successfulOrder

    const item = orderItems?.[0] || {
        image: { mobile: null },
        name: "",
        price: "",
        quantity: ""
    }

    const { image, name, price, quantity } = item

    const otherItemsCount = orderItems.length - 1 || 0

    return (
        <div className={`modal-bg ${confirmationState === true ? "active" : ""}`}>
            <div className="confirmation">
                <div className="top-part">
                    <div className="icon-div">
                        <OrderConfirmationIcon />
                    </div>
                    <h1>THANK YOU <br />FOR YOUR ORDER</h1>
                    <p>You will receive an email confirmation shortly.</p>
                </div>

                <div className="product-total">
                    <div className="product-text-wrapper">
                        <div className="product">
                            <img src={image} alt={name} />
                            <div className="name-cost">
                                <div className="name-quantity">
                                    <h2 className="name">{name}</h2>
                                    <div className="quantity">x{quantity}</div>
                                </div>
                                <span className="cost">$ {price * quantity}</span>
                            </div>
                        </div>
                        <Link to={`/orders/${_id}`} className="order-button">and {otherItemsCount} other items</Link>
                    </div>

                    <div className="total">
                        <h2>grand total</h2>
                        <h3>$ {totalPrice}</h3>
                    </div>

                </div>
                <Link to="/" className="primary">back to home</Link>
            </div>
        </div>
    )
}
