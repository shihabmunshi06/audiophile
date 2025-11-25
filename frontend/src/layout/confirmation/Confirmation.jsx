import React from 'react'

import { toggleCart } from '../../app/features/cartSlice'
import { useSelector } from "react-redux"

import "./confirmation.scss"
export default function Confirmation() {

    const confirmationState = useSelector(state => state.confirmation.confirmationState)

    const handleConfirmation = () => {
        toggleCart()
    }
    return (
        <div className={`confirmation-background ${confirmationState && "active"}`}>
            <div className="confirmation">
                <div className="icon"></div>
                <h1>THANK YOU <br />FOR YOUR ORDER</h1>
                <p>You will receive an email confirmation shortly.</p>
                <div className="products-total">
                    <div className="products"></div>
                    <div className="total">
                        <h2>grand total</h2>
                        <h3>$5446</h3>
                    </div>
                </div>
                <button onClick={handleConfirmation}>back to home</button>
            </div>
        </div>
    )
}
