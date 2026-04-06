import ProductIntro from "../../layout/productIntro/ProductIntro"

import { useGetProductQuery } from "../../app/features/apiSlice"
import Categories from "../../layout/categories/Categories"
import About from "../../layout/about/About"

import "./product-deatils.scss"
import { Link, useParams } from "react-router"
export default function ProductDetails() {
    const { id } = useParams()
    const { data, isLoading, isError, error } = useGetProductQuery(id)
    if (isLoading) {
        return <p>Loading</p>
    }
    if (isError) {
        return <p>{error}</p>
    }
    if (!data) {
        return <p>No data found...</p>
    }

    const { features, includes, gallery, others } = data
    const { first, second, third } = gallery
    console.log(others)
    return (
        <div className="product-details">
            <ProductIntro {...data} />
            <div className="feature-box">
                <section className="feature">
                    <h2>features</h2>
                    <p>{features}</p>
                </section>
                <aside className="box">
                    <h2>in the box</h2>
                    <ul>
                        {includes.map((e, i) => {
                            return (
                                <li key={i}>
                                    <span className="quantity"><strong>{e.quantity}x</strong></span>
                                    <span className="item">{e.item}</span>
                                </li>
                            )
                        })}
                    </ul>
                </aside>
            </div>
            <section className="gallery">
                <figure>
                    <picture>
                        <source srcSet={first.mobile} media="(max-width: 450px)" />
                        <source srcSet={first.tablet} media="(max-width: 800px)" />
                        <img src={first.desktop} alt="product shot" />
                    </picture>
                </figure>
                <figure>
                    <picture>
                        <source srcSet={second.mobile} media="(max-width: 450px)" />
                        <source srcSet={second.tablet} media="(max-width: 800px)" />
                        <img src={second.desktop} alt="product shot" />
                    </picture>
                </figure>
                <figure>
                    <picture>
                        <source srcSet={third.mobile} media="(max-width: 450px)" />
                        <source srcSet={third.tablet} media="(max-width: 800px)" />
                        <img src={third.desktop} alt="product shot" />
                    </picture>
                </figure>
            </section>
            <section className="suggestion">
                <h2 >you may also like</h2>
                <ul>
                    {others.map((e) => {
                        return (
                            <li key={e.name}>
                                <article>
                                    <picture>
                                        <source srcSet={e.image.mobile} media="(max-width: 450px)" />
                                        <source srcSet={e.image.tablet} media="(max-width: 800px)" />
                                        <img src={e.image.desktop} alt="" />
                                    </picture>
                                    <h3>{e.name}</h3>
                                    <Link className="primary" to="/">see product</Link>
                                </article>
                            </li>

                        )
                    })}
                </ul>
            </section>
            <Categories />
            <About />
        </div>
    )
}
