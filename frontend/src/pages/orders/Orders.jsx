import { Link } from "react-router"

import { useGetOrdersQuery } from "../../app/features/ordersApiSlice"

const OrderItem = ({ order }) => {
    const { _id, createdAt, orderStatus, totalPrice, } = order
    const { date, time } = useTimestamp(createdAt)
    return (
        <div className="order-item">
            <span className="order-id">{_id}</span>
            <span className="date">{date}</span>
            <span className="time">{time}</span>
            <span className="status">{orderStatus}</span>
            <span className="total">${Math.round(totalPrice)}</span>
            <Link to={`/orders/${_id}`} className="view-button">
                view
            </Link>
        </div>
    )
}

import "./orders.scss"
import useTimestamp from "../../hooks/useTimestamp"
export default function Orders() {

    const { data: orders = [], isLoading, isError } = useGetOrdersQuery()

    const renderOrder = () => {
        if (isLoading) return <p>loading</p>
        if (isError) return <p>error</p>
        if (orders.legth === 0) return <p>no order found</p>
        return orders.map(e => <OrderItem key={e._id} order={e} />)
    }

    return (
        <div className="orders-page">
            <div className="wrapper">
                <div className="title-wrapper">
                    <h1>Orders</h1>
                </div>
                <div className="orders-table">
                    <div className="table-head">
                        <span>Order Id</span>
                        <span>Date</span>
                        <span>Time</span>
                        <span>Status</span>
                        <span>Bill</span>
                    </div>
                    <div className="orders">
                        {renderOrder()}
                    </div>
                </div>
            </div>
        </div>
    )
}