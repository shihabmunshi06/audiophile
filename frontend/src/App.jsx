import { Routes, Route } from 'react-router'

import Layout from './layout/Layout'

import Home from './pages/home/Home'
import Products from './pages/Products/Products'
import ProductDetails from './pages/productDetails/ProductDetails'
import Checkout from './pages/checkout/Checkout'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/:category' element={<Products />} />
        <Route path='/product/:id' element={< ProductDetails />} />
        <Route path='/checkout' element={<Checkout />} />
      </Route>
    </Routes>
  )
}
