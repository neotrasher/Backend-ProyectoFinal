import React from 'react'
import './Homepage.css'
import Carousel from 'react-multi-carousel';
import Portada1Image from '../assets/img/portada.png';
import Portada2Image from '../assets/img/portada2.png';
import Portada3Image from '../assets/img/portada3.png';
import 'react-multi-carousel/lib/styles.css';
import AcercaDeMi from '../components/AcercaDeMi/AcercaDeMi';
import { motion } from 'framer-motion';
import TopSellingProducts from '../components/TopSellingProducts/TopSellingProducts';



const HomePage = (props) => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <div>
            <Carousel responsive={responsive}
                swipeable={false}
                draggable={false}
                ssr={true}
                showDots={true}
                autoPlay={props.deviceType !== "mobile" ? true : false}
                deviceType={props.deviceType}
                infinite={true}
                autoPlaySpeed={2000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                <div >
                    <img className="image-container" src={Portada1Image} alt="Portada 1" />
                </div>
                <div>
                    <img className="image-container" src={Portada2Image} alt="Portada 2" />
                </div>
                <div>
                    <img className="image-container" src={Portada3Image} alt="Portada 3" />
                </div>
            </Carousel>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <AcercaDeMi />
            </motion.div>
            <TopSellingProducts />
        </div>
    );
};

export default HomePage