import { useDispatch, useSelector } from "react-redux"
import { useForm, Controller } from "react-hook-form"

import CashOnDeliveryIcon from "../../components/icon/CashOnDeliveryIcon"

import Cart from "../../layout/cart/Cart"
import Confirmation from "../../layout/confirmation/Confirmation"

import useCartCalculations from "../../hooks/useCartCalculations"

import { clearCart } from "../../app/features/cartSlice"
import { useAddOrderMutation } from "../../app/features/ordersApiSlice"

import "./checkout.scss"
export default function Checkout() {

    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)
    const { totalAmount, shippingCost, vatAmount, grandTotal, } = useCartCalculations()

    const {
        register,
        formState: { errors },
        setError,
        handleSubmit,
        control,
        watch,
        reset
    } = useForm()

    const paymentMethod = watch("paymentMethod")
    const [addOrder, { data: successfulOrder = {}, isSuccess }] = useAddOrderMutation()

    const handleData = async (formData) => {
        try {
            const orderItems = cartItems.map(item => ({
                product: item._id,
                name: item.name,
                image: item.image.desktop,
                price: item.price,
                quantity: item.quantity
            }))

            const orderData = {
                user: "69d59aa78150b5b54607d22f",
                orderItems,
                shippingAddress: {
                    fullName: formData.name,
                    street: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zip,
                    country: formData.country,
                    email: formData.email,
                    phone: formData.phone,
                    zip: formData.zip
                },
                paymentMethod: formData.paymentMethod,
                shippingCost,
                itemsPrice: totalAmount,
                vat: vatAmount,
                totalPrice: grandTotal,
            }
            console.log(orderData)
            await addOrder(orderData).unwrap()
            dispatch(clearCart())
        } catch (error) {
            setError("root.serverError", {
                message: error.data.message || "Something went wrong"
            })
        }
    }

    const testData = {
        name: "Shihab Munshi",
        email: "sihaabbb@gmail.com",
        phone: "01793614134",
        address: "1530, al aqsa jame asjid road",
        zip: "1204",
        city: "Dhaka",
        state: "Dhaka",
        country: "Bangladesh",
        paymentMethod: "cash-on-delivery"
    }

    return (
        <div id="form">
            <div className="wrapper">
                <div className="form-wrapper">
                    <h1>Checkout  <span onClick={() => reset(testData)}>autofill</span></h1>

                    {errors.root?.serverError && (
                        <div className="form-error-div">
                            <span id="form-error" role="alert" className="error">
                                {errors.root.serverError.message}
                            </span>
                        </div>
                    )}

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

                        <fieldset
                            className={`payment-details ${paymentMethod === "e-money" && "e-money"}`}
                        >
                            <legend>payment details</legend>
                            <div className="inputs-wrapper">
                                <Controller
                                    name="paymentMethod"
                                    control={control}
                                    rules={{ required: "Payment Method is required" }}
                                    render={({ field: { onChange, value } }) => (

                                        <div className="label-input payment">
                                            <label htmlFor="paymentMethod">Payment Method</label>
                                            <div className="radio-group" id="paymentMethod">
                                                <div className="radio-label">
                                                    <input
                                                        id="e-money"
                                                        type="radio"
                                                        value="e-money"
                                                        checked={value === "e-money"}
                                                        onChange={onChange}
                                                        aria-required="true"
                                                        aria-invalid={!!errors.paymentMethod}
                                                        aria-describedby={errors.paymentMethod ? "payment-method-error" : undefined}
                                                    />
                                                    <label htmlFor="e-money">
                                                        e-Money
                                                    </label>
                                                </div>
                                                <div className="radio-label">
                                                    <input
                                                        id="cash-on-delivery"
                                                        type="radio"
                                                        value="cash-on-delivery"
                                                        checked={value === "cash-on-delivery"}
                                                        onChange={onChange}
                                                        aria-required="true"
                                                        aria-invalid={!!errors.paymentMethod}
                                                        aria-describedby={errors.paymentMethod ? "payment-method-error" : undefined}
                                                    />
                                                    <label htmlFor="cash-on-delivery">
                                                        Cash on Delivery
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                />
                                <div className="label-input e-money-info">
                                    <label htmlFor="eMoneyNumber">e-Money Number</label>
                                    <input
                                        id="eMoneyNumber"
                                        type="text"
                                        placeholder="238521993"
                                        inputMode="numeric"
                                        aria-required="true"
                                        aria-invalid={!!errors.eMoneyNumber}
                                        aria-describedby={errors.eMoneyNumber ? "eMoneyNumber-error" : undefined}
                                        {...register("eMoneyNumber",
                                            { required: paymentMethod === "e-money" ? "e-Money number is required" : false }
                                        )}
                                    />
                                    {errors.eMoneyNumber && (
                                        <div className="error-div">
                                            <span id="eMoneyNumber-error" role="alert" className="error">
                                                {errors.eMoneyNumber.message}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="label-input e-money-info">
                                    <label htmlFor="eMoneyPin">e-Money PIN</label>
                                    <input
                                        id="eMoneyPin"
                                        type="text"
                                        placeholder="6891"
                                        inputMode="numeric"
                                        aria-required="true"
                                        aria-invalid={!!errors.eMoneyPin}
                                        aria-describedby={errors.eMoneyPin ? "eMoneyPin-error" : undefined}
                                        {...register("eMoneyPin",
                                            { required: paymentMethod === "e-money" ? "e-Money PIN is required" : false }
                                        )}
                                    />
                                    {errors.eMoneyPin && (
                                        <div className="error-div">
                                            <span id="eMoneyPin-error" role="alert" className="error">
                                                {errors.eMoneyPin.message}
                                            </span>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </fieldset>
                    </form>

                    <div className={`notification ${paymentMethod === "cash-on-delivery" && "show"}`}>
                        <CashOnDeliveryIcon />
                        <p>The 'Cash on Delivery' option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.</p>
                    </div>
                </div>

                <Cart
                    checkout={true}
                    handleCheckout={handleData}
                />
            </div>

            <Confirmation
                successfulOrder={successfulOrder}
                confirmationState={isSuccess}
            />
        </div>
    )
}