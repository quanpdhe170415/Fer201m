import {Swiper} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import {SwiperSlide} from "swiper/vue";
import "./DefaultLayout.css"
const Banner = () => {
    return (
        <div>
            <>
                <Swiper spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="banner-swiper"
                >
                    <SwiperSlide>
                        <img className="d-block w-100" src='../../assets/Banner/Banner-web.png'/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className="d-block w-100" src='../../assets/Banner/1.png'/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className="d-block w-100" src='../../assets/Banner/2.png'/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className="d-block w-100" src='../../assets/Banner/3.png'/>
                    </SwiperSlide>
                </Swiper>
            </>
        </div>
    );
}
export default Banner;