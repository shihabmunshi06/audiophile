import "./quantity-button.scss"

export default function QuantityButton(
    { name, increase, decrease, handleInputChange, inputValue, max, min = 1, error }
) {
    return (
        <div className="quantity-button">
            <button
                type="button"
                aria-label={`Decrease quantity of ${name}`}
                onClick={decrease}
                disabled={inputValue <= min}
            >
                -
            </button>
            <input
                type="number"
                value={inputValue}
                min="1"
                max={max}
                aria-label={`Quantity of  ${name}`}
                onChange={handleInputChange}
            />
            <button
                type="button"
                aria-label={`Increase quantity of  ${name}`}
                onClick={increase}
                disabled={inputValue === max}
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