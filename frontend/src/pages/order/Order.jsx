import { useParams } from "react-router"
import { useGetOrderQuery } from "../../app/features/ordersApiSlice"

import useTimestamp from "../../hooks/useTimestamp"

const Product = ({ image, name, quantity, price }) => {
  return (
    <div className="ordered-product">
      <img src={image} alt={name} />
      <p className="name">{name}</p>
      <p className="quantity">x{quantity} pieces</p>
      <p className="price">${price}</p>
      <p className="total">${quantity * price}</p>
    </div>
  )
}

const Calculation = ({ itemsPrice, vat, shippingCost, totalPrice }) => {
  return (
    <section className="calculation">
      <h2>Calculation</h2>
      <div className="title-total items">
        <div className="title">Items Total</div>
        <div className="total">${itemsPrice}</div>
      </div>
      <div className="title-total vat">
        <div className="title">Vat</div>
        <div className="total">${vat}</div>
      </div>
      <div className="title-total shipping-cost">
        <div className="title">Shipping</div>
        <div className="total">${shippingCost}</div>
      </div>
      <div className="title-total grand-total">
        <div className="title">Total Billl</div>
        <div className="total">${totalPrice}</div>
      </div>
    </section>
  )
}

const Billing = ({ paymentMethod }) => {
  return (
    <section className="billing">
      <h2>Billing Details</h2>

      <div className="content">
        <dl className="name">
          <dt>Name:</dt>
          <dd>Shihab</dd>
        </dl>
        <dl className="address">
          <dt>Address:</dt>
          <dd>1530 al aqsa jame masjid road</dd>
        </dl>
        <dl className="phone">
          <dt>Phone:</dt>
          <dd>017936141345</dd>
        </dl>
        <dl className="trxid">
          <dt>Trx ID:</dt>
          <dd>T250917</dd>
        </dl>
        <dl className="method">
          <dt>Method:</dt>
          <dd>{paymentMethod?.split("-").join(" ")}</dd>
        </dl>
        <dl className="date">
          <dt>Billing Date:</dt>
          <dd>12th April, 2026</dd>
        </dl>
      </div>
    </section>
  )
}

const Shipping = () => {
  return (
    <section className="shipping">
      <h2>Shipping details</h2>
      <div className="content">
        <dl className="name">
          <dt>Name:</dt>
          <dd>Shihab Munshi</dd>
        </dl>
        <dl className="address">
          <dt>Address:</dt>
          <dd>1120, bagan bari road, Jurain</dd>
        </dl>
        <dl className="phone">
          <dt>Phone:</dt>
          <dd>01832508886</dd>
        </dl>
        <dl className="shipmentid">
          <dt>Shipment ID:</dt>
          <dd>93387dfhk</dd>
        </dl>
        <dl className="method">
          <dt>Method:</dt>
          <dd>Ali Express</dd>
        </dl>
        <dl className="date">
          <dt>Shipment Date:</dt>
          <dd>14th April, 2026</dd>
        </dl>
      </div>
    </section>
  )
}

import "./order.scss"
export default function Order() {
  const { orderId } = useParams()

  const { data: order = {}, isLoading, isError } = useGetOrderQuery(orderId)
  const {
    _id, createdAt, orderStatus, isPaid,
    orderItems,
    itemsPrice, vat, shippingCost, totalPrice,
    paymentMethod
  } = order

  const renderProducts = () => {
    if (isLoading) return <p>loading</p>
    if (isError) return <p>error</p>
    if (orderItems.legth === 0) return <p>no order found</p>
    return orderItems.map(e => <Product key={e._id} {...e} />)
  }

  const { date, time } = useTimestamp(createdAt)

  const handleInvoice = () => {
    console.log("invoice")
  }
  const handleTrack = () => {
    console.log("track")
  }

  return (
    <div className="order-page">
      <div className="wrapper">
        <header>
          <h1>Order {_id}</h1>

          <p>
            This order  was placed on <span>{date}</span> <span>{time}</span>
          </p>

          <p>
            The order is currently <span>{orderStatus === "pending" ? "Shippping" : "Delivered"}</span>
          </p>

          <p>
            The payment is <span>{isPaid ? "Paid" : "Pending"}</span>
          </p>

          <div className="buttons">
            <button
              className="primary"
              onClick={handleInvoice}>
              <span>Invoice</span>
            </button>

            <button
              className="outline"
              onClick={handleTrack}>
              <span>Track Order</span>
            </button>
          </div>
        </header>

        <div className="sections-wrapper">
          <section className="ordered-products-table">
            <h2>Products</h2>

            <div className="table-top">
              <p className="image-title">Image</p>
              <p className="name-title">Name</p>
              <p className="quantity-title">Quantity</p>
              <p className="price-title">Price</p>
              <p className="total-title">Total</p>
            </div>
            <div className="table">
              {renderProducts()}
            </div>
          </section>

          <Calculation
            itemsPrice={itemsPrice}
            vat={vat}
            shippingCost={shippingCost}
            totalPrice={totalPrice}
          />

          <Billing
            paymentMethod={paymentMethod}
          />

          <Shipping />
        </div>
      </div>
    </div>
  )
}

{/* <main id="order-detail" data-order-id="TL2509170019">

  <!-- ====== ORDER HEADER ====== -->
  <header aria-label="Order header">
    <h1>Order # <span data-field="order-number">TL2509170019</span></h1>
    <p>
      Placed on <time datetime="2025-09-17">17 Sep, 2025</time>
      and its currently <strong data-field="order-status">Shipped</strong>
      and payment is <em data-field="payment-status">Paid</em>.
    </p>
  </header>

  <!-- ====== ORDER ITEMS ====== -->
  <section aria-labelledby="order-items-heading">
    <h2 id="order-items-heading" hidden>Order Items</h2>

    <!-- Column Labels -->
    <div role="presentation" aria-hidden="true">
      <span data-col="product">Product</span>
      <span data-col="quantity">Quantity</span>
      <span data-col="price">Price</span>
      <span data-col="discount">Discount</span>
      <span data-col="amount">Amount</span>
    </div>

    <!-- Item List -->
    <div role="list" aria-label="Cart items">

      <!-- Item 1 -->
      <article role="listitem" data-product-id="F9E800ZB2M">
        <figure>
          <img
            src="/images/products/belkin-power-strip.jpg"
            alt="Belkin Power Strip 8 Port 2 Meter Gray Economy Series"
            loading="lazy"
            width="80"
            height="80"
          />
        </figure>
        <h3 data-label="Product">Belkin Power Strip 8 Port 2 Meter Gray Economy Series (F9E800ZB2M)</h3>
        <span data-label="Quantity">1</span>
        <span data-label="Price">3,100.00</span>
        <span data-label="Discount">301.00</span>
        <span data-label="Amount">2,799.00</span>
      </article>

      <!-- Item 2 -->
      <article role="listitem" data-product-id="NB-F80">
        <figure>
          <img
            src="/images/products/north-bayou-f80.jpg"
            alt="NORTH BAYOU F80 Monitor Desk Mount Stand"
            loading="lazy"
            width="80"
            height="80"
          />
        </figure>
        <h3 data-label="Product">NORTH BAYOU F80 17"- 30" WITH 9KG MAX PAYLOAD HEAVY DUTY VESA MONITOR DESK MOUNT STAND</h3>
        <span data-label="Quantity">2</span>
        <span data-label="Price">3,200.00</span>
        <span data-label="Discount">0.00</span>
        <span data-label="Amount">6,400.00</span>
      </article>

      <!-- Item 3 -->
      <article role="listitem" data-product-id="MSI-MP225">
        <figure>
          <img
            src="/images/products/msi-pro-mp225.jpg"
            alt="MSI PRO MP225 21.5 Inch 100Hz IPS FHD Monitor"
            loading="lazy"
            width="80"
            height="80"
          />
        </figure>
        <h3 data-label="Product">MSI PRO MP225 21.5 Inch 100Hz IPS FHD Monitor</h3>
        <span data-label="Quantity">1</span>
        <span data-label="Price">13,400.00</span>
        <span data-label="Discount">600.00</span>
        <span data-label="Amount">12,800.00</span>
      </article>

    </div>
  </section>

  <!-- ====== ORDER SUMMARY ====== -->
  <section aria-labelledby="order-summary-heading">
    <h2 id="order-summary-heading" hidden>Order Summary</h2>

    <dl>
      <!-- Totals Row -->
      <div data-summary="subtotal">
        <dt>Total</dt>
        <dd data-label="Quantity">4</dd>
        <dd data-label="Price">19,700.00</dd>
        <dd data-label="Discount">901.00</dd>
        <dd data-label="Amount">21,999.00</dd>
      </div>

      <div data-summary="payment-charge">
        <dt>Payment Charge</dt>
        <dd data-label="Amount">329.99</dd>
      </div>

      <div data-summary="adjustment-discount">
        <dt>Adj. Discount</dt>
        <dd data-label="Amount">- 0.99</dd>
      </div>

      <div data-summary="grand-total">
        <dt>Grand Total</dt>
        <dd data-label="Amount" data-currency="BDT">
          <span aria-label="Bangladeshi Taka">৳</span>22,328.00
        </dd>
      </div>

      <div data-summary="paid-amount">
        <dt>Paid Amount</dt>
        <dd data-label="Amount" data-currency="BDT">
          <span aria-label="Bangladeshi Taka">৳</span>22,328.00
        </dd>
      </div>

      <div data-summary="due-amount">
        <dt><strong>Due Amount</strong></dt>
        <dd data-label="Amount" data-currency="BDT">
          <strong><span aria-label="Bangladeshi Taka">৳</span>0.00</strong>
        </dd>
      </div>
    </dl>
  </section>

  <!-- ====== SHIPPING & BILLING ====== -->
  <section aria-labelledby="address-section-heading">
    <h2 id="address-section-heading" hidden>Shipping & Billing Information</h2>

    <div> <!-- flex/grid wrapper for the two cards -->

      <!-- Shipping Card -->
      <fieldset aria-labelledby="shipping-legend">
        <legend id="shipping-legend">Shipping</legend>

        <address>
          <p data-field="full-name"><strong>Shihab Munshi</strong></p>
          <p data-field="address">Bagan Bari Road, Jurain, Kadamtali, Dhaka.</p>
        </address>

        <dl>
          <dt>Phone Number</dt>
          <dd data-field="phone">
            <a href="tel:+8801832508886" aria-label="Call shipping phone number">01832508886</a>
          </dd>
        </dl>

        <!-- Shipments Sub-section -->
        <section aria-labelledby="shipments-heading">
          <h3 id="shipments-heading">Shipments</h3>

          <div role="list" aria-label="Shipment records">
            <div role="listitem" data-shipment-id="1">
              <span data-field="method">
                <strong>Method :</strong> Techland Express
              </span>
              <span data-field="status">
                <strong>Status :</strong> Shipped
              </span>
            </div>
          </div>
        </section>
      </fieldset>

      <!-- Billing Card -->
      <fieldset aria-labelledby="billing-legend">
        <legend id="billing-legend">Billing</legend>

        <address>
          <p data-field="full-name"><strong>Shihab Munshi</strong></p>
          <p data-field="address">Bagan Bari Road, Jurain, Kadamtali, Dhaka., Kadamtali, Dhaka.</p>
        </address>

        <dl>
          <dt>Phone Number</dt>
          <dd data-field="phone">
            <a href="tel:+8801832508886" aria-label="Call billing phone number">01832508886</a>
          </dd>
        </dl>

        <!-- Transactions Sub-section -->
        <section aria-labelledby="transactions-heading">
          <h3 id="transactions-heading">Transactions</h3>

          <div role="list" aria-label="Transaction records">
            <div role="listitem" data-transaction-id="T2509170017">
              <span data-field="date">
                <strong>Date :</strong> <time datetime="2025-09-17">17-09-2025</time>
              </span>
              <span data-field="method">
                <strong>Method :</strong> Bkash Mobile Banking
              </span>
              <span data-field="trx-id">
                <strong>Trx ID :</strong> T2509170017
              </span>
              <span data-field="credit-amount" data-currency="BDT">
                <strong>Credit Amount :</strong> ৳ 22328.00 BDT
              </span>
            </div>
          </div>
        </section>
      </fieldset>

    </div>
  </section>

</main> */}