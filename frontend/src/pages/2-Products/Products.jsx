import ProductIntro from "../../layout/productIntro/ProductIntro";
import Categories from "../../layout/categories/Categories";
import About from "../../layout/about/About";

import { useParams } from "react-router";

import { useGetProductsByCategoryQuery } from "../../app/features/apiSlice";

import "./products.scss"
export default function Products() {
  const { category } = useParams()
  const { data, isLoading, isError, error } = useGetProductsByCategoryQuery(category)

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (isError) {
    return <p>Error: {error?.data?.error || "Failed to fetch products"}</p>;
  }

  if (!data || data.length === 0) {
    return <p>No products found in {category} category</p>;
  }
  const sortedProducts = data.slice().sort((a, b) => (b.new === true) - (a.new === true));

  return (
    <div className="products">
      <div className="category-name">
        <h1 className="l">{category}</h1>
      </div>
      <div className="headphones-wrapper">
        {sortedProducts.map(e => <ProductIntro {...e} key={e.id} />)}
      </div>
      <Categories />
      <About />
    </div>
  )
}
