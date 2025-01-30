// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';


// const AboutAnimation: React.FC = () => {
//   return (
//     <div className="text-white text-center py-20">
//       <h1 className="text-5xl font-bold">À propos de notre animation</h1>
//       <p className="text-xl text-gray-400 mt-4">
//         Découvrez tout ce qu'il faut savoir sur nos animations exceptionnelles.
//       </p>

//       {/* Section du carrousel */}
//       <section className="py-24">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-center flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between gap-8">
//             <div className="w-full flex justify-between flex-col lg:w-2/5">
//               <div className="block lg:text-left text-center">
//                 <h2 className="text-4xl font-bold text-gray-900 leading-[3.25rem] mb-5">
//                   Our latest <span className=" text-indigo-600">blogs</span>
//                 </h2>
//                 <p className="text-gray-500 mb-10 max-lg:max-w-xl max-lg:mx-auto">
//                   Welcome to our blog section, where knowledge meets inspiration. Explore insightful articles, expert tips, and the latest trends in our field.
//                 </p>
//                 <a href="javascript:;" className="cursor-pointer border border-gray-300 shadow-sm rounded-full py-3.5 px-7 w-52 lg:mx-0 mx-auto flex justify-center text-gray-900 font-semibold transition-all duration-300 hover:bg-gray-100">
//                   View All
//                 </a>
//               </div>
//             </div>

//             {/* Carrousel Slider */}
//             <div className="w-full lg:w-3/5">
//               <Swiper
//                 spaceBetween={28}
//                 slidesPerView={2}
//                 centeredSlides={false}
//                 loop={true}
//                 breakpoints={{
//                   0: {
//                     slidesPerView: 1,
//                     spaceBetween: 20,
//                   },
//                   568: {
//                     slidesPerView: 2,
//                     spaceBetween: 28,
//                   },
//                   768: {
//                     slidesPerView: 2,
//                     spaceBetween: 28,
//                   },
//                   1024: {
//                     slidesPerView: 2,
//                     spaceBetween: 32,
//                   },
//                 }}
//                 navigation={{
//                   nextEl: '.swiper-button-next',
//                   prevEl: '.swiper-button-prev',
//                 }}
//               >
//                 <SwiperSlide>
//                   <div className="group">
//                     <div className="flex items-center mb-9">
//                       <img src="https://pagedone.io/asset/uploads/1696244059.png" alt="blogs tailwind section" className="rounded-2xl w-full object-cover" />
//                     </div>
//                     <h3 className="text-xl text-gray-900 font-medium leading-8 mb-4 group-hover:text-indigo-600">Clever ways to invest in product to organize your portfolio</h3>
//                     <p className="text-gray-500 leading-6 transition-all duration-500 mb-8">
//                       Discover smart investment strategies to streamline and organize your portfolio. Explore innovative approaches to optimize your...
//                     </p>
//                     <a href="javascript:;" className="cursor-pointer flex items-center gap-2 text-lg text-indigo-700 font-semibold">
//                       Read more
//                       <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M1.25 6L13.25 6M9.5 10.5L13.4697 6.53033C13.7197 6.28033 13.8447 6.15533 13.8447 6C13.8447 5.84467 13.7197 5.71967 13.4697 5.46967L9.5 1.5" stroke="#4338CA" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
//                       </svg>
//                     </a>
//                   </div>
//                 </SwiperSlide>
//                 <SwiperSlide>
//                   <div className="group">
//                     <div className="flex items-center mb-9">
//                       <img src="https://pagedone.io/asset/uploads/1696244074.png" alt="blogs tailwind section" className="rounded-2xl w-full object-cover" />
//                     </div>
//                     <h3 className="text-xl text-gray-900 font-medium leading-8 mb-4 group-hover:text-indigo-600">How to grow your profit through systematic investment with us</h3>
//                     <p className="text-gray-500 leading-6 transition-all duration-500 mb-8">
//                       Unlock the power of systematic investment with us and watch your profits soar. Our expert team will guide you on the path to financial..
//                     </p>
//                     <a href="javascript:;" className="cursor-pointer flex items-center gap-2 text-lg text-indigo-700 font-semibold">
//                       Read more
//                       <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M1.25 6L13.25 6M9.5 10.5L13.4697 6.53033C13.7197 6.28033 13.8447 6.15533 13.8447 6C13.8447 5.84467 13.7197 5.71967 13.4697 5.46967L9.5 1.5" stroke="#4338CA" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
//                       </svg>
//                     </a>
//                   </div>
//                 </SwiperSlide>
//                 {/* Ajoute d'autres slides ici si nécessaire */}
//               </Swiper>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AboutAnimation;
