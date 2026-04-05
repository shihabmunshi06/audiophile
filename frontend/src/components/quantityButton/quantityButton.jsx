import { useState } from "react"

import "./quantity-button.scss"

export default function QuantityButton({ name, max, min = 1, handleCartChange, quantity }) {

    const [inputValue, setInputValue] = useState(quantity)

    const [error, setError] = useState("")

    const decrease = () => {
        if (inputValue < min) return setError(`Minimum of ${min}`)
        setError("")
        const newValue = inputValue - 1
        setInputValue(newValue)
        handleCartChange(newValue)
    }

    const increase = () => {
        if (inputValue > max) return setError(`Maximum of ${max}`)
        setError("")
        const newValue = inputValue + 1
        setInputValue(newValue)
        handleCartChange(newValue)
    }

    const handleInputChange = (e) => {
        const value = Number(e.target.value)
        setError("")
        if (e.target.value === "") {
            setInputValue("")
            handleCartChange(0)
            return
        }

        if (value < min) {
            setError(`Minimum of ${min}`)
            setInputValue(0)
            handleCartChange(0)
            return
        }

        if (value > max) {
            setError(`Maximum of ${max}`)
            setInputValue(999)
            handleCartChange(max)
            return
        }
        setInputValue(value)
        handleCartChange(value)
    }

    return (
        <div className="quantity-button">
            <label htmlFor="quantity">Quantity</label>

            <button
                type="button"
                aria-label={`Decrease quantity of ${name}`}
                onClick={decrease}
                disabled={inputValue <= min}
            >
                -
            </button>
            <input
                id="quantity"
                type="number"
                value={inputValue}
                min={min}
                max={max}
                aria-label={`Quantity of  ${name}`}
                onChange={handleInputChange}
            />
            <button
                type="button"
                aria-label={`Increase quantity of  ${name}`}
                onClick={increase}
                disabled={inputValue >= max}
            >
                +
            </button>
            {error && (
                <div className="error-div">
                    <span className="error">{error}</span>
                </div>
            )}
        </div>
    )
}