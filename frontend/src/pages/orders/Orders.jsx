const OrderItem = ({ order }) => {
    const { _id, createdAt, orderStatus, totalPrice, } = order
    return (
        <div className="order-item">
            <span className="order-id">{_id}</span>
            <span className="date">{createdAt}</span>
            <span className="status">{orderStatus}</span>
            <span className="total">{totalPrice}</span>
            <Link to={`/orders/${_id}`} className="view-button">
                view
            </Link>
        </div>
    )
}

import { Link } from "react-router"
import { useGetOrdersQuery } from "../../app/features/ordersApiSlice"
import "./orders.scss"
export default function Orders() {

    const { data: orders = [], isLoading, isError } = useGetOrdersQuery()

    console.log(orders)

    const renderOrder = () => {
        if (isLoading) return <p>loading</p>
        if (isError) return <p>error</p>
        if (orders.legth === 0) return <p>no order found</p>
        return orders.map(e => <OrderItem key={e._id} order={e} />)
    }

    return (
        <div className="orders-page">
            <div className="wrapper">
                <h1>Orders</h1>
                <div className="orders">
                    {renderOrder()}
                </div>
            </div>
        </div>
    )
}