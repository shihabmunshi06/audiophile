import { Link } from "react-router"

import EyeIcon from "../../components/icon/EyeIcon"

import { useGetOrdersQuery } from "../../app/features/ordersApiSlice"

const OrderItem = ({ order }) => {
    const { _id, createdAt, orderStatus, totalPrice, } = order
    const { date, time } = useTimestamp(createdAt)
    return (
        <div className="order-item">
            <p className="order-id">
                <span className="inner-title order-id-title">Order ID</span>
                {_id}
            </p>
            <p className="date">
                <span className="inner-title date-title">Date</span>
                {date}
            </p>
            <p className="time">
                <span className="inner-title time-title">Time</span>
                {time}
            </p>
            <p className="status">
                <span className="inner-title status-title">Status</span>
                {orderStatus}
            </p>
            <p className="bill">
                <span className="inner-title bill-title">Bill</span>
                ${Math.round(totalPrice)}
            </p>
            <Link to={`/orders/${_id}`} className="view-button">
                {/* <span className="inner-title view-title">View</span> */}
                <EyeIcon />
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
                        <p className="order-title">Order ID</p>
                        <p className="date-title">Date</p>
                        <p className="time-title">Time</p>
                        <p className="status-title">Status</p>
                        <p className="bill-title">Bill</p>
                        <p className="view-title">View</p>
                    </div>
                    <div className="orders">
                        {renderOrder()}
                    </div>
                </div>
            </div>
        </div>
    )
}