import ProductIntro from "../../layout/productIntro/ProductIntro";
import Categories from "../../layout/categories/Categories";
import About from "../../layout/about/About";

import { useParams } from "react-router";

import { useGetProductsByCategoryQuery } from "../../app/features/productsApiSlice";

import "./products.scss"
export default function Products() {
  const { category } = useParams()

  const { data: products = [], isLoading, isError, error } = useGetProductsByCategoryQuery(category)

  const renderProducts = () => {
    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error: {error?.data?.error || "Failed to fetch products"}</p>;
    if (products.length === 0) return <p>No products found in {category} category</p>;

    const sortedProducts = products.slice().sort((a, b) => (b.new === true) - (a.new === true));

    return sortedProducts.map(e => <ProductIntro {...e} key={e._id} />)
  }

  return (
    <div className="name-products-wrapper">
      <div className="category-name">
        <h1>{category}</h1>
      </div>
      <div className="products">
        {renderProducts()}
      </div>
      <Categories />
      <About />
    </div>
  )
}
