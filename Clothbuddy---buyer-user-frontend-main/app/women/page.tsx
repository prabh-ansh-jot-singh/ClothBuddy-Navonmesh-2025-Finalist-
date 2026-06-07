'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Navigation } from 'swiper/modules';
import SwiperComponent from '@/components/swiper/SwiperComponent';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Women() {
  const images: { src: string; label?: string }[] = [
    { src: '/women_images/womens/11.png' },
    { src: '/women_images/womens/15.png' },
    { src: '/women_images/womens/16.png' },
  ];

  const quickPickImages: { src: string; label?: string; url: string }[] = [
    { src: '/women_images/quick_picks/1.png', label: 'Top Wear', url: 'products' },
    { src: '/women_images/quick_picks/2.png', label: 'Bottom Wear', url: 'products' },
    { src: '/women_images/quick_picks/3.png', label: 'Dresses', url: 'products' },
    { src: '/women_images/quick_picks/4.png', label: 'Athleisure', url: 'products' },
    { src: '/women_images/quick_picks/5.png', label: 'Ethnic & Fusion Wear', url: 'products' },
    { src: '/women_images/quick_picks/6.png', label: 'Sleepwear', url: 'products' },
    { src: '/women_images/quick_picks/7.png', label: 'Innerwear', url: 'products' },
    { src: '/women_images/quick_picks/8.png', label: 'Co-ords', url: 'products' },
  ];

  const trendingImages: { src: string }[] = [
    { src: '/women_images/trending/1.jpg' },
    { src: '/women_images/trending/2.jpg' },
    { src: '/women_images/trending/3.jpg' },
    { src: '/women_images/trending/4.jpg' },
    { src: '/women_images/trending/5.jpg' },
    { src: '/women_images/trending/6.jpg' },
  ];

  const upcomingSalesImages: { src: string }[] = [
    { src: '/women_images/upcoming_sales/1.jpg' },
    { src: '/women_images/upcoming_sales/2.jpg' },
    { src: '/women_images/upcoming_sales/3.jpg' },
    { src: '/women_images/upcoming_sales/4.jpg' },
    { src: '/women_images/upcoming_sales/5.jpg' },
    { src: '/women_images/upcoming_sales/6.jpg' },
  ];

  const bestSellerImages: { src: string }[] = [
    { src: '/women_images/best_seller/6.jpg' },
    { src: '/women_images/best_seller/1.jpg' },
    { src: '/women_images/best_seller/4.jpg' },
    { src: '/women_images/best_seller/2.jpg' },
    { src: '/women_images/best_seller/5.jpg' },
    { src: '/women_images/best_seller/3.jpg' },
  ];

  const router = useRouter();
  const handleRedirect = (url: string, queryParams: any = {}) => {
    console.log(queryParams);
    const urlWithQuery = new URL(url, window.location.origin);
    urlWithQuery.searchParams.append('category', queryParams);
    router.push(urlWithQuery.toString());
  };

  return (
    <div className="sm:px-auto container relative mx-auto mt-28 min-h-screen bg-white px-[1rem] md:mt-20">
      <div className="mb-4 flex justify-center gap-4 pt-4">
        <Link href="/men">
          <button
            type="button"
            className="relative mt-6 flex h-[40px] w-36 cursor-pointer flex-row rounded-full border bg-black bg-gradient-to-l text-[12px] hover:bg-[#073453] sm:text-sm md:h-12 md:w-44 md:text-base"
          >
            <img src="/mens.png" alt="Men icon" className="absolute bottom-0 left-2 h-14 md:h-20" />
            <div className="flex h-full w-full items-center justify-center">
              <p className="pl-6 font-semibold text-white md:pl-8">Men</p>
            </div>
          </button>
        </Link>

        <Link href="/women">
          <button
            type="button"
            className="relative mt-6 flex h-[40px] w-36 cursor-pointer flex-row rounded-full border bg-[#b27773] bg-gradient-to-l text-[12px] sm:text-sm md:h-12 md:w-44 md:text-base"
          >
            <img
              src="/womens.png"
              alt="Women icon"
              className="absolute bottom-0 left-3 h-14 md:h-20"
            />
            <div className="flex h-full w-full items-center justify-center">
              <p className="pl-12 font-semibold text-white md:pl-14">Women</p>
            </div>
          </button>
        </Link>
      </div>

      <div className="mt-4 pb-4 text-black">
        <h3 className="mb-1 text-xl md:text-2xl">QUICK PICKS</h3>
        <div className="grid grid-cols-4 gap-4 lg:grid-cols-8 lg:gap-x-8">
          {quickPickImages.map((item, index) => (
            <div
              onClick={() => handleRedirect(item.url, item.label)}
              key={index}
              className="flex cursor-pointer flex-col items-center justify-center gap-1"
            >
              <img src={item.src} />
              <p className="w-full truncate text-center text-[10px] sm:text-[12px] lg:text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full pb-4">
        <SwiperComponent
          showPagination={true}
          images={images}
          spaceBetween={50}
          slidesPerView={1}
          keyboard={true}
          autoplay={3500}
        />
      </div>

      <div className="mt-4 w-full py-4 text-black">
        <p className="text-xl md:text-2xl">TOP CATEGORIES</p>
        <div className="mt-2 grid gap-3 md:grid-cols-2">
          <img src="/categories/womens/1.png" className="w-full rounded-xl" />
          <img src="/categories/womens/2.png" className="w-full rounded-xl" />
          <img src="/categories/womens/3.png" className="w-full rounded-xl" />
          <img src="/categories/womens/4.png" className="w-full rounded-xl" />
        </div>
      </div>

      <div className="mt-4 py-4 text-black">
        <p className="mb-2 text-xl md:text-2xl">TRENDING</p>
        <Swiper 
          modules={[Autoplay, Keyboard]} 
          spaceBetween={20} 
          breakpoints={{
            1280: { slidesPerView: 5 },
            1024: { slidesPerView: 4 },
            768: { slidesPerView: 3 }, 
            480: { slidesPerView: 2 }, 
          }}
        >
          {trendingImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                className="h-[200px] w-full rounded-md object-cover shadow-md sm:h-[180px] md:h-[240px] lg:h-[300px]"
                key={index}
                src={image.src}
                alt={`Slide ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-4 py-4 text-black">
        <p className="mb-2 text-xl md:text-2xl">BEST SELLER</p>
        <Swiper
          modules={[Autoplay, Keyboard]}
          spaceBetween={20}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            1280: { slidesPerView: 5 },
            1024: { slidesPerView: 4 },
            768: { slidesPerView: 3 }, 
            480: { slidesPerView: 2 }, 
          }}
        >
          {bestSellerImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                className="h-[200px] w-full rounded-md object-cover shadow-md sm:h-[180px] md:h-[240px] lg:h-[300px]"
                key={index}
                src={image.src}
                alt={`Slide ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-4 py-4 text-black">
        <p className="mb-2 text-xl md:text-2xl">UPCOMING SALES</p>
        <Swiper 
          modules={[Autoplay, Keyboard]} 
          spaceBetween={20} 
          breakpoints={{
            1280: { slidesPerView: 5 },
            1024: { slidesPerView: 4 },
            768: { slidesPerView: 3 }, 
            480: { slidesPerView: 2 }, 
          }}
        >
          {upcomingSalesImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                className="h-[200px] w-full rounded-md object-cover sm:h-[180px] md:h-[240px] lg:h-[300px]"
                key={index}
                src={image.src}
                alt={`Slide ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
