import { Routes, Route } from 'react-router'

import NotFound from './pages/notFound/NotFound'
import Layout from './layout/Layout'
import Protected from './layout/Protected'

import Home from './pages/home/Home'
import Products from './pages/Products/Products'
import ProductDetails from './pages/productDetails/ProductDetails'
import Checkout from './pages/checkout/Checkout'
import Confirmation from './layout/confirmation/Confirmation'
import Orders from './pages/orders/Orders'
import Order from './pages/order/Order'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/:category' element={<Products />} />
        <Route path='/products/:productId' element={< ProductDetails />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/confirm' element={<Confirmation />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/orders/:orderId' element={<Order />} />
      </Route>
      <Route element={<Protected />}>
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}
