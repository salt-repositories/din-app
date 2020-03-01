import { Carousel } from "antd";
import { Actions } from "easy-peasy";
import React from "react";
import { BackgroundImage } from "../../Domain/Models";
import { IRootState, useStoreActions, useStoreState } from "../../Store";

interface IProps {
    backgrounds: BackgroundImage[];
}

const FullScreenCarousel = (props: IProps): JSX.Element => {
    const carouselIndex = useStoreState((state: IRootState) => state.main.carousel.carouselIndex);
    const setCarouselIndex = useStoreActions((actions: Actions<IRootState>) => actions.main.carousel.setCarouselIndex);

    return (
        <div className="full-screen-carousel-container">
            <Carousel
                autoplay={true}
                autoplaySpeed={10000}
                slickGoTo={carouselIndex}
                className="full-screen-carousel"
                afterChange={(newIndex: number) => setCarouselIndex(newIndex)}
            >
                {props.backgrounds.map((image: BackgroundImage, index: number) => (
                    <div key={index}>
                        <img className="full-image" src={image.full} key={index} alt="error"/>
                    </div>
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
                        opacity: .15;
                    }
                `}
            </style>
        </div>
    );
};

export default FullScreenCarousel;
