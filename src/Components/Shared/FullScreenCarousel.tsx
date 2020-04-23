import { Carousel } from "antd";
import { Actions } from "easy-peasy";
import React, { useEffect } from "react";
import { BackgroundImage } from "../../Domain/Models";
import { IRootState, useStoreActions, useStoreState } from "../../Store";
import { MINIMAL_WIDTH } from "./consts";

interface IProps {
    backgrounds: BackgroundImage[];
}

const FullScreenCarousel = (props: IProps): JSX.Element => {
    const ref = React.createRef<Carousel>();
    const carouselIndex = useStoreState((state: IRootState) => state.main.carousel.carouselIndex);
    const setCarouselIndex = useStoreActions((actions: Actions<IRootState>) => actions.main.carousel.setCarouselIndex);
    const windowWidth = useStoreState((state: IRootState) => state.main.windowWidth);

    useEffect(() => {
        ref.current.goTo(carouselIndex, true);
    }, [ref, ref.current]);

    return (
        <div className="full-screen-carousel-container">
            <Carousel
                ref={ref}
                autoplay={true}
                autoplaySpeed={10000}
                className="full-screen-carousel"
                afterChange={(newIndex: number) => setCarouselIndex(newIndex)}
            >
                {props.backgrounds.map((image: BackgroundImage, index: number) => (
                    <div key={index}>
                        <img className="full-image" src={image.regular} key={index} alt="error"/>
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
                        height: ${windowWidth < MINIMAL_WIDTH ? "110vh" : ""};
                        object-fit: ${windowWidth < MINIMAL_WIDTH ? "cover" : "unset"};
                        object-position: ${windowWidth < MINIMAL_WIDTH ? "100% 0" : "unset"};
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
