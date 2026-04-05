import { useState } from 'react';
import { useNavigate } from 'react-router';

import QuantityButton from '../../components/quantityButton/quantityButton';

import { useDispatch, useSelector } from 'react-redux';
import { changeCart, clearCart } from '../../app/features/cartSlice';

function Product({ id, slug, image, price, quantity, handleCartChange, quantityButton }) {

    const productName = slug.split("-").slice(0, -1).join(" ")
    const { desktop } = image
    const max = 999

    const [inputValue, setInputValue] = useState(quantity)
    const [error, setError] = useState("")

    const decrease = () => {
        if (inputValue <= 1) return
        setError("")
        const newValue = inputValue - 1
        setInputValue(newValue)
        handleCartChange(id, newValue)
    }

    const increase = () => {
        if (inputValue > max) return
        setError("")
        const newValue = inputValue + 1
        setInputValue(newValue)
        handleCartChange(id, newValue)
    }

    const handleInputChange = (e) => {
        const value = Number(e.target.value)
        setError("")
        if (e.target.value === "") {
            setInputValue("")
            handleCartChange(id, 0)
            return
        }

        if (value < 1) {
            setError(`Minimum of 1`)
            setInputValue(0)
            handleCartChange(id, 0)
            return
        }

        if (value >= max) {
            setError(`Maximum of ${max}`)
            setInputValue(999)
            handleCartChange(id, max)
            return
        }
        setInputValue(value)
        handleCartChange(id, value)
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

            {quantityButton ? (
                <QuantityButton
                    name={slug}
                    increase={increase}
                    decrease={decrease}
                    handleInputChange={handleInputChange}
                    max={max}
                    min={1}
                    inputValue={inputValue}
                    error={error}
                />
            ) : (
                <span>x{quantity}</span>
            )}
        </div>
    )
}

import "./cart.scss"
export default function Cart({ cartState, closeCart, quantityButton = true, handleCheckout }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cartItems = useSelector(state => state.cart.cartItems)

    const totalAmount = cartItems.reduce((sum, item) => sum += item.price * item.quantity, 0)
    const cartQuantity = cartItems.length

    const handleChange = (id, value) => {
        dispatch(changeCart(cartItems.map(e => {
            if (e.id === id) {
                return ({ ...e, quantity: parseInt(value) })
            }
            return e
        })))
    }

    const handleCartSubmit = (e) => {
        e.preventDefault()
        if (quantityButton === true) {
            e.preventDefault()
            closeCart()
            navigate("/checkout")
        } else {
            handleCheckout()
        }
    }

    const shippingCost = 50;
    const vat = 1079;
    const grandTotal = totalAmount + shippingCost + vat
    return (
        <div
            id='cart-background'
            role='dialog'
            aria-label='Shopping cart'
            aria-modal='true'
            className={`cart-background ${cartState && "active"}`}>
            <div className="cart">
                <form onSubmit={handleCartSubmit}>
                    <header>
                        {quantityButton ? (
                            <>
                                <h2>
                                    cart ({cartQuantity})
                                </h2>

                                <button
                                    type="button"
                                    onClick={() => dispatch(clearCart())}
                                >
                                    Remove all
                                </button>
                            </>
                        ) : (
                            <h2>
                                summary
                            </h2>
                        )}
                    </header>
                    {cartItems.length > 0 ? (
                        <ul className="cart-items">
                            {cartItems.map(e => <li key={e.id}>
                                <Product
                                    {...e}
                                    handleCartChange={handleChange}
                                    quantityButton={quantityButton}
                                />
                            </li>)}
                        </ul>
                    ) : (
                        <p>Nothing in cart</p>
                    )}

                    <footer>
                        <div className="summary-row">
                            <p className="title">TOTAL</p>
                            <p className="amount">$ {totalAmount}</p>
                        </div>
                        {!quantityButton && (
                            <>
                                <div className="summary-row">
                                    <p className="title">SHIPPING</p>
                                    <p className="amount">$ {shippingCost}</p>
                                </div>
                                <div className="summary-row">
                                    <p className="title">VAT (INCLUDED)</p>
                                    <p className="amount">$ {vat}</p>
                                </div>
                                <div className="summary-row grand-total">
                                    <p className="title">GRAND TOTAL</p>
                                    <p className="amount">$ {grandTotal}</p>
                                </div>
                            </>
                        )}


                        <button
                            type='submit'
                            className="primary"
                            form={quantityButton ? undefined : "checkout"}
                        >
                            {quantityButton ? "Checkout" : "Continue"}
                        </button>
                    </footer>
                </form>

            </div>
        </div>
    )
}
