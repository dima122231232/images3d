import "./Statement.css";

export default function Statement() {
    return (
        <section className="statement">
            <div className="container statement__container">

                <div className="statement__content">
                    <p className="statement__eyebrow">
                        We are an operating system for
                    </p>

                    <h6 className="statement__title">
                        collaborating on society’s epic challenges.
                    </h6>
                </div>

                <div className="statement__feature">
                    <div className="statement__images">
                        <img className="statement__image" src="/statement/img1.png" alt="" />
                        <img className="statement__image" src="/statement/img2.png" alt="" />
                        <img className="statement__image" src="/statement/img3.png" alt="" />
                        <img className="statement__image" src="/statement/img4.png" alt="" />
                    </div>

                    <div className="statement__info">
                        <h6 className="statement__name">
                            Extraordinary People
                        </h6>

                        <p className="statement__link">
                            Learn More
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}