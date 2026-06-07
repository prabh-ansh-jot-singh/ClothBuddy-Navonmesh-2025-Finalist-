'use client';
import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Keyboard } from 'swiper/modules';
import { useRouter } from 'next/navigation';

export default function SwiperComponent({
  images,
  spaceBetween,
  slidesPerView = 1,
  keyboard = false,
  autoplay = 0,
  showPagination = false,
  breakpoints = {},
  hoverScale = false,
}: {
  images: { src: string; label?: string; url?: string; queryParams?: any }[];
  spaceBetween: number;
  slidesPerView?: number;
  keyboard?: boolean;
  autoplay?: number;
  showPagination?: boolean;
  breakpoints?: any;
  hoverScale?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const router = useRouter();

  const handleRedirect = (url: string, queryParams: any = {}) => {
    const urlWithQuery = new URL(url, window.location.origin);
    // Append query parameters
    Object.keys(queryParams).forEach((key) => {
      urlWithQuery.searchParams.append(key, queryParams[key]);
    });

    router.push(urlWithQuery.toString());
  };

  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
      setActiveIndex(index);
    }
  };

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Keyboard]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        autoplay={autoplay > 0 ? { delay: autoplay } : false}
        keyboard={{ enabled: keyboard }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="mens_carousel"
        breakpoints={breakpoints}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              key={index}
              onClick={
                image.url
                  ? () => handleRedirect(image.url || '', { category: image.label?.toLowerCase() })
                  : undefined
              }
              className={`${hoverScale && 'swiper-image'} rounded-sm cursor-pointer`}
              src={image.src}
              alt={`Slide ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {showPagination && (
        <div className="mt-2 flex w-full items-center justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-[4px] w-[4px] rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-[15px!important] bg-[#073453]' : 'bg-[#bebebe]'
              } focus:outline-none`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}
