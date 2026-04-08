import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import CartItem from '../../components/cartItem/CartItem';

import { clearCart } from '../../app/features/cartSlice';

import useCartCalculations from '../../hooks/useCartCalculations';

import "./cart.scss"
export default function Cart({ cartState, closeCart, checkout = false, handleCheckout }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { totalAmount, shippingCost, vat, vatAmount, grandTotal, cartQuantity } = useCartCalculations()

    const cartItems = useSelector(state => state.cart.cartItems)

    const handleCartSubmit = (e) => {
        e.preventDefault()
        if (checkout === false) {
            e.preventDefault()
            closeCart()
            navigate("/checkout")
        } else {
            handleCheckout()
        }
    }

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
                        {!checkout ? (
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
                            {cartItems.map(e => <li key={e._id}>
                                <CartItem {...e} checkout={checkout} />
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
                        {checkout && (
                            <>
                                <div className="summary-row">
                                    <p className="title">SHIPPING</p>
                                    <p className="amount">$ {shippingCost}</p>
                                </div>
                                <div className="summary-row">
                                    <p className="title">VAT ({vat}%)</p>
                                    <p className="amount">$ {vatAmount}</p>
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
                            form={checkout ? "checkout" : undefined}
                        >
                            {checkout ? "Checkout" : "Continue"}
                        </button>
                    </footer>
                </form>

            </div>
        </div>
    )
}
