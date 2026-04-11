import { Link } from 'react-router'

import Categories from '../../layout/categories/Categories'
import About from '../../layout/about/About'

import "./home.scss"
export default function Home() {
  return (
    <div className="home">
      <section id="hero">
        <div className="texts-button">
          <div className="texts">
            <p className="new">new product</p>
            <h1>
              XX99 Mark II
              <br />
              Headphones
            </h1>
            <p className="desc">Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
            </p>
          </div>
          <Link className="primary" to="/products/69d59adbb7b337aa3dd299c4">see product</Link>
        </div>
      </section>
      <Categories />
      <article className="zx9-speaker">
        <div className="wrapper">
          <div className="img-div">
            <picture>
              <source srcSet="/assets/home/mobile/image-speaker-zx9.png" media="(max-width: 450px)" />
              <source srcSet="/assets/home/tablet/image-speaker-zx9.png" media="(max-width: 800px)" />
              <img src="/assets/home/desktop/image-speaker-zx9.png" alt="zx9-speaker" />
            </picture>
          </div>
          <div className="texts">
            <h2>ZX9 <br /> SPEAKER</h2>
            <p>Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
            <Link className='black' to="/products/69d59adbb7b337aa3dd299d0"> see product</Link>
          </div>
        </div>

      </article>
      <article className="zx7-speaker">
        <div className="wrapper">
          <div className="texts">
            <h2>ZX7 SPEAKER</h2>
            <Link className="outline" to="/products/69d59adbb7b337aa3dd299ca">see product</Link>
          </div>
        </div>
      </article>
      <article className="yx1-earphones">
        <div className="wrapper">
          <div className="img-div">
            <picture>
              <source srcSet="/assets/home/mobile/image-earphones-yx1.jpg" media="(max-width: 450px)" />
              <source srcSet="/assets/home/tablet/image-earphones-yx1.jpg" media="(max-width: 800px)" />
              <img src="/assets/home/desktop/image-earphones-yx1.jpg" />
            </picture>
          </div>
          <div className="texts">
            <h2>YX1 EARPHONES</h2>
            <Link className='outline' to="/products/69d59adbb7b337aa3dd299b4">see product</Link>
          </div>
        </div>
      </article>
      <About />
    </div>

  )
}
