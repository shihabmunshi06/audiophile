import React from 'react'

import "./checkout.scss"
export default function Checkout() {
    return (
        <div>
            <div className="label-input-wrapper">
                <label htmlFor="text">name</label>
                <input type="text" id='name' />

            </div>
            <div className="label-input-wrapper">
                <label htmlFor="email">email address</label>
                <input type="email" id='email' />

            </div>
            <div className="label-input-wrapper">
                <label htmlFor="phonenumber">phone number</label>
                <input type="number" id='phonenumber' />

            </div>
        </div>
    )
}
