import "./about.scss"
export default function About() {
    return (
        <section id="about">
            <div className="wrapper">
                <div className="texts">
                    <h2>Bringing you the <span>best</span> audio gear</h2>

                    <p>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
                </div>
                <div className="img-div">
                    <picture>
                        <source media='(max-width:500px)' srcSet='/assets/shared/mobile/image-best-gear.jpg' />
                        <source media='(max-width:950px)' srcSet='/assets/shared/tablet/image-best-gear.jpg' />
                        <img src="/assets/shared/desktop/image-best-gear.jpg" alt="about" />
                    </picture>
                </div>
            </div>
        </section>
    )
}
