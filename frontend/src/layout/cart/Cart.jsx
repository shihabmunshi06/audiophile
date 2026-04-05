import { useDispatch, useSelector } from 'react-redux';
import { changeCart, clearCart, toggleCart } from '../../app/features/cartSlice';

function Product({ id, slug, image, price, productAmount, handleCartChange }) {

    const productName = slug.split("-").slice(0, -1).join(" ")
    const { desktop } = image
    const match = useMatch("/checkout")
    console.log(match)


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
                    onClick={() => handleCartChange(id, productAmount - 1)}
                >
                    -
                </button>
                <input
                    type="number"
                    value={productAmount}
                    aria-label={`Quantity of`}
                    onChange={(e) => handleCartChange(id, e.target.value)}
                />
                <button
                    onClick={() => handleCartChange(id, productAmount + 1)} aria-label="Increase quantity of"
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
import { useMatch, useNavigate } from 'react-router';
export default function Cart() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cartState = useSelector(state => state.cart.cartState)
    const cartItems = useSelector(state => state.cart.cartItems)

    const totalAmount = cartItems.reduce((sum, item) => sum += item.price * item.productAmount, 0)

    const handleChange = (id, value) => {
        dispatch(changeCart(cartItems.map(e => {
            if (e.id === id) {
                return ({ ...e, productAmount: parseInt(value) })
            }
            return e
        })))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(toggleCart())
        navigate("/checkout")
    }
    return (
        <div
            id='cart-background'
            role='dialog'
            aria-label='Shopping cart'
            aria-modal='true'
            className={`cart-background ${cartState && "active"}`}>
            <div className="cart">
                <header>
                    <h2 className='tiny'>cart (2)</h2>
                    <button onClick={() => dispatch(clearCart())}>remove all</button>
                </header>
                <form onSubmit={handleSubmit}>
                    <ul className="cart-items">
                        {cartItems.map(e => <li key={e.id}>
                            <Product {...e} handleCartChange={handleChange} />
                        </li>)}
                    </ul>
                    <footer>
                        <div className="total-amount">
                            <p className="total">Total</p>
                            <p className="amount tiny">$ {totalAmount}</p>
                        </div>
                        <button type='submit' className="checkout default">Checkout</button>
                    </footer>
                </form>

            </div>
        </div>
    )
}
