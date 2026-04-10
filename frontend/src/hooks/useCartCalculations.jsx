import { useSelector } from "react-redux"

export default function useCartCalculations() {
    const cartItems = useSelector(state => state.cart.cartItems)

    const totalAmount = cartItems.reduce((sum, item) => sum += item.price * item.quantity, 0)
    const shippingCost = 50
    const vat = 20
    const vatAmount = (totalAmount * vat) / 100
    const grandTotal = totalAmount + shippingCost + vatAmount
    const cartQuantity = cartItems.length
    
    return {
        totalAmount,
        shippingCost,
        vat,
        vatAmount,
        grandTotal,
        cartQuantity
    }
}