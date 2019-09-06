import { Carousel } from "react-bootstrap";

const FullScreenCarousel = (props: any): JSX.Element => {
    return (
        <div className="full-screen-carousel-container">
            <Carousel
                className="full-screen-carousel"
                controls={false}
                indicators={false}
                keyboard={false}
                pauseOnHover={false}
                interval={10000}
            >
                {props.images.map((image: any, index: number) => (
                    <Carousel.Item key={index}>
                        <img className="full-image" src={image.regular} key={index}/>
                    </Carousel.Item>
                ))}
            </Carousel>
            <div className="overlay"></div>
            <style jsx>
                {`
                    .full-screen-carousel-container {
                        position: fixed;
                        top: 0;
                        overflow: hidden;
                        z-index: -1;
                    }

                    .full-screen-carousel {
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                    }

                    .full-image {
                        width: 100vw;
                    }

                    .overlay {
                        top: 0;
                        width: 100%;
                        height: 100%;
                        background: orange;
                        opacity: .2;
                    }
                `}
            </style>
        </div>
    );
};

export default FullScreenCarousel;
