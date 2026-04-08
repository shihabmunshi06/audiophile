import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartItems: [
        {
            _id: "69d4406b32d31bbbe9150011",
            name: "ZX7 Speaker",
            slug: "zx7-speaker",
            image: {
                desktop: "/assets/product-zx7-speaker/desktop/image-product.jpg",
            },
            price: 3500,
            quantity: 6,
        }
    ]
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { product, quantity } = action.payload
            const found = state.cartItems.find(e => e._id === product._id)
            if (found) {
                found.quantity = quantity
                return
            }
            state.cartItems.push({ ...product, quantity })
        },
        changeQuantity: (state, action) => {
            const { productId, quantity } = action.payload
            state.cartItems = state.cartItems.map(e => {
                if (e._id === productId) return { ...e, quantity }
                return e
            })
        },
        clearCart: (state) => {
            state.cartItems = []
        },
        deleteCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter(e => e._id !== action.payload)
        }
    }
})

export default cartSlice.reducer
export const {
    addToCart,
    changeQuantity,
    clearCart,
    deleteCartItem
} = cartSlice.actions