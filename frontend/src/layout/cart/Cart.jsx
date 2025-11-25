import { useDispatch, useSelector } from 'react-redux';
import { changeCart, clearCart } from '../../app/features/cartSlice';

function Product({ id, slug, image, price, productAmount, handleCartChange }) {

    const productName = slug.split("-").slice(0, -1).join(" ")
    const { mobile, tablet, desktop } = image

    const handleChange = (value) => {
        handleCartChange(id, value)
    }
    return (
        <div className="cart-item">
            <div className="img-name-price">
                <div className="img-div">
                    <img src={desktop} alt="name" />
                </div>
                <div className="name-price">
                    <div className="name">{productName}</div>
                    <div className="price"> $ {parseInt(price) * parseInt(productAmount)}</div>
                </div>
            </div>

            <div className="quantity">
                <button
                    type="button"
                    aria-label="Decrease quantity of"
                    onClick={() => handleChange(productAmount - 1)}
                >
                    -
                </button>
                <input
                    type="number"
                    value={productAmount}
                    aria-label={`Quantity of`}
                    onChange={(e) => handleChange(e.target.value)}
                />
                <button
                    onClick={() => handleChange(productAmount + 1)} aria-label="Increase quantity of"
                    type="button"
                >
                    +
                </button>
            </div>
            <h2></h2>
        </div>
    )
}
import "./cart.scss"

export default function Cart() {
    const dispatch = useDispatch()

    const cartState = useSelector(state => state.cart.cartState)
    const cartItems = useSelector(state => state.cart.cartItems)

    const handleChange = (id, value) => {
        dispatch(changeCart(cartItems.map(e => {
            if (e.id === id) {
                return ({ ...e, productAmount: parseInt(value) })
            }
            return e
        })))
    }

    const totalAmount = cartItems.reduce((sum, item) => sum += item.price * item.productAmount, 0)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submitted")
    }
    return (
        <div
            id='cart-dialog'
            role='dialog'
            aria-label='Shopping cart'
            aria-modal='true'
            className={`cart-background ${cartState && "active"}`}>
            <div className="cart">
                <header>
                    <h2>cart (2)</h2>
                    <button onClick={() => dispatch(clearCart())}>remove all</button>
                </header>
                <form onSubmit={handleSubmit}>
                    <ul className="cart-items">
                        {cartItems.map((e, i) => <li key={i}>
                            <Product {...e} handleCartChange={(id, value) => handleChange(id, value)} />
                        </li>)}
                    </ul>
                    <footer>
                        <div className="total-amount">
                            <p className="total">Total</p>
                            <p className="amount">$ {totalAmount}</p>
                        </div>
                        <button type='submit' className="checkout">Checkout</button>
                    </footer>
                </form>

            </div>
        </div>
    )
}
