import React from "react";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BackgroundImage } from "../../Models";
import { MainActions } from "../../Store/Main/actions";
import { carouselIndexSelector } from "../../Store/Main/selectors";

interface IProps {
    backgrounds: BackgroundImage[];
}

const FullScreenCarousel = (props: IProps): JSX.Element => {
    const dispatch = useDispatch();
    const carouselIndex = useSelector(carouselIndexSelector);

    return (
        <div className="full-screen-carousel-container">
            <Carousel
                activeIndex={carouselIndex}
                className="full-screen-carousel"
                controls={false}
                indicators={false}
                keyboard={false}
                pauseOnHover={false}
                interval={10000}
                onSelect={(newIndex: number) => dispatch(MainActions.setCarouselIndex(newIndex))}
            >
                {props.backgrounds.map((image: any, index: number) => (
                    <Carousel.Item key={index}>
                        <img className="full-image" src={image.regular} key={index} alt="error"/>
                    </Carousel.Item>
                ))}
            </Carousel>
            <div className="overlay"/>
            <style jsx>
                {`
                    .full-screen-carousel-container {
                        width: 100vw;
                        height: 100vh;
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
                    
                    :global(.carousel-item) {
                        transform: translateY(-15%);
                    }

                    .overlay {
                        position: absolute;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        background: orange;
                        opacity: .15;
                    }
                `}
            </style>
        </div>
    );
};

export default FullScreenCarousel;
