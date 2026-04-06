import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartItems: [
        {
            id: 1,
            slug: "yx1-earphones",
            image: {
                mobile: "/assets/product-yx1-earphones/mobile/image-product.jpg",
                tablet: "/assets/product-yx1-earphones/tablet/image-product.jpg",
                desktop: "/assets/product-yx1-earphones/desktop/image-product.jpg"
            },
            price: 599,
            quantity: 4
        },
        {
            id: 2,
            slug: "yx1-earphones",
            image: {
                mobile: "/assets/product-yx1-earphones/mobile/image-product.jpg",
                tablet: "/assets/product-yx1-earphones/tablet/image-product.jpg",
                desktop: "/assets/product-yx1-earphones/desktop/image-product.jpg"
            },
            price: 599,
            quantity: 1
        },

    ]
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        changeQuantity: (state, action) => {
            const { productId, quantity } = action.payload
            state.cartItems = state.cartItems.map(e => {
                if (e.id === productId) return { ...e, quantity }
                return e
            })
        },
        clearCart: (state) => {
            state.cartItems = []
        }
    }
})

export default cartSlice.reducer
export const { changeQuantity, clearCart } = cartSlice.actions