import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"

import CashOnDeliveryIcon from "../../components/icon/CashOnDeliveryIcon"
import Cart from "../../layout/cart/Cart"

import "./checkout.scss"
export default function Checkout() {

    const cartItems = useSelector(state => state.cart.cartItems)

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm()

    const handleData = (formData) => {
        console.log(formData)
        console.log(cartItems)
    }

    return (
        <div id="form">
            <div className="wrapper">
                <div className="form-wrapper">
                    <h1>Checkout</h1>

                    <form id="checkout" onSubmit={handleSubmit(handleData)}>
                        <fieldset>
                            <legend>Billing Details</legend>
                            <div className="inputs-wrapper">
                                <div className="label-input">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Alexei Ward"
                                        autoComplete="name"
                                        aria-required="true"
                                        aria-invalid={!!errors.name}
                                        aria-describedby={errors.name ? "name-error" : undefined}
                                        {...register("name", { required: "Name is required" })}
                                    />
                                    {errors.name && (
                                        <div className="error-div">
                                            <span id="name-error" role="alert" className="error">
                                                {errors.name.message}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="label-input">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="alexei@gmail.com"
                                        autoComplete="email"
                                        aria-required="true"
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? "email-error" : undefined}
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Wrong format"
                                            }
                                        })}
                                    />
                                    {errors.email && (
                                        <div className="error-div">
                                            <span id="email-error" role="alert" className="error">
                                                {errors.email.message}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="label-input">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        placeholder="+1 202-555-0136"
                                        autoComplete="tel"
                                        aria-required="true"
                                        aria-invalid={!!errors.phone}
                                        aria-describedby={errors.phone ? "phone-error" : undefined}
                                        {...register("phone", { required: "Phone number is required" })}
                                    />
                                    {errors.phone && (
                                        <div className="error-div">
                                            <span id="phone-error" role="alert" className="error">
                                                {errors.phone.message}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend>Shipping Info</legend>
                            <div className="inputs-wrapper">
                                <div className="label-input address">
                                    <label htmlFor="address">Address</label>
                                    <input
                                        id="address"
                                        type="text"
                                        placeholder="1137 Williams Avenue"
                                        autoComplete="street-address"
                                        aria-required="true"
                                        aria-invalid={!!errors.address}
                                        aria-describedby={errors.address ? "address-error" : undefined}
                                        {...register("address", { required: "Address is required" })}
                                    />
                                    {errors.address && (
                                        <div className="error-div">
                                            <span id="address-error" role="alert" className="error">
                                                {errors.address.message}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="label-input">
                                    <label htmlFor="zip">ZIP Code</label>
                                    <input
                                        id="zip"
                                        type="text"
                                        placeholder="10001"
                                        autoComplete="postal-code"
                                        inputMode="numeric"
                                        aria-required="true"
                                        aria-invalid={!!errors.zip}
                                        aria-describedby={errors.zip ? "zip-error" : undefined}
                                        {...register("zip", { required: "ZIP code is required" })}
                                    />
                                    {errors.zip && (
                                        <div className="error-div">
                                            <span id="zip-error" role="alert" className="error">
                                                {errors.zip.message}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="label-input">
                                    <label htmlFor="city">City</label>
                                    <input
                                        id="city"
                                        type="text"
                                        placeholder="New York"
                                        autoComplete="address-level2"
                                        aria-required="true"
                                        aria-invalid={!!errors.city}
                                        aria-describedby={errors.city ? "city-error" : undefined}
                                        {...register("city", { required: "City is required" })}
                                    />
                                    {errors.city && (
                                        <div className="error-div">
                                            <span id="city-error" role="alert" className="error">
                                                {errors.city.message}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="label-input">
                                    <label htmlFor="country">Country</label>
                                    <input
                                        id="country"
                                        type="text"
                                        placeholder="United States"
                                        autoComplete="country-name"
                                        aria-required="true"
                                        aria-invalid={!!errors.country}
                                        aria-describedby={errors.country ? "country-error" : undefined}
                                        {...register("country", { required: "Country is required" })}
                                    />
                                    {errors.country && (
                                        <div className="error-div">
                                            <span id="country-error" role="alert" className="error">
                                                {errors.country.message}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </fieldset>
                    </form>

                    <div className="notification">
                        <CashOnDeliveryIcon />
                        <p>The 'Cash on Delivery' option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.</p>
                    </div>
                </div>

                <Cart
                    checkout={true}
                    handleCheckout={handleData}
                />
            </div>

        </div>
    )
}