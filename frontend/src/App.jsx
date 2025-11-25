import { Routes, Route } from 'react-router'

import Layout from './layout/Layout'

import Home from './pages/1-home/Home'
import Products from './pages/2-Products/Products'
import ProductDetails from './pages/5-product-details/ProductDetails'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/:category' element={<Products />} />
        <Route path='/product/:id' element={< ProductDetails />} />
      </Route>
    </Routes>
  )
}
