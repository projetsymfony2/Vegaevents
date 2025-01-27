import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

// Importation des styles Swiper et de Tailwind
import 'swiper/css/bundle';

const Gallery: React.FC = () => {
  return (
    <div className="w-full relative">
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={30}
        centeredSlides={true}
        slidesPerView={1.3}
        loop={true}
        pagination={{ clickable: true }}
        navigation
        className="centered-slide-carousel relative"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center shadow-md">
            <span className="text-3xl font-semibold text-indigo-600">Slide 1</span>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center shadow-md">
            <span className="text-3xl font-semibold text-indigo-600">Slide 2</span>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center shadow-md">
            <span className="text-3xl font-semibold text-indigo-600">Slide 3</span>
          </div>
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide>
          <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center shadow-md">
            <span className="text-3xl font-semibold text-indigo-600">Slide 4</span>
          </div>
        </SwiperSlide>

        {/* Slide 5 */}
        <SwiperSlide>
          <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center shadow-md">
            <span className="text-3xl font-semibold text-indigo-600">Slide 5</span>
          </div>
        </SwiperSlide>

        {/* Slide 6 */}
        <SwiperSlide>
          <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center shadow-md">
            <span className="text-3xl font-semibold text-indigo-600">Slide 6</span>
          </div>
        </SwiperSlide>
      </Swiper>

      
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default Gallery;