import { useState } from "react"
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

    const [otherItemsState, setOtherItemsState] = useState(false)

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

                <div className="products-total">
                    <div className="products-button-wrapper">
                        <div className="ordered-products">
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
                            {otherItemsState && (
                                orderItems.slice(1).map(e => {
                                    return (
                                        <div className="product">
                                            <img src={e.image} alt={e.name} />
                                            <div className="name-cost">
                                                <div className="name-quantity">
                                                    <h2 className="name">{e.name}</h2>
                                                    <div className="quantity">x{e.quantity}</div>
                                                </div>
                                                <span className="cost">$ {e.price * e.quantity}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>

                        { orderItems.length > 1 ? (
                            otherItemsState ? (
                                <Link to={`/orders/${_id}`} className="order-button">see order details</Link>
                            ) : (
                                <button className="order-button" onClick={() => setOtherItemsState(true)}>
                                    and {otherItemsCount} other items
                                </button>
                            )
                        ) : (
                            <Link to={`/orders/${_id}`} className="order-button">see order details</Link>
                        )}

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