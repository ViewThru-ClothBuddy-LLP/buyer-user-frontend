'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Navigation } from 'swiper/modules';
import SwiperComponent from '@/components/swiper/SwiperComponent';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Men() {
  const images: { src: string; label?: string }[] = [
    { src: '/men_images/mens/mens_5.png' },
    { src: '/men_images/mens/mens_3.png' },
    { src: '/men_images/mens/mens_1.png' },
    { src: '/men_images/mens/mens_2.png' },
    { src: '/men_images/mens/mens_6.png' },
  ];

  const quickPickImages: { src: string; label?: string; url: string }[] = [
    { src: '/men_images/quick_picks/image_1.png', label: 'Top Wear', url: 'products' },
    { src: '/men_images/quick_picks/image_2.png', label: 'Bottom Wear', url: 'products' },
    { src: '/men_images/quick_picks/image_3.png', label: 'Graphic T-Shirts', url: 'products' },
    { src: '/men_images/quick_picks/image_4.png', label: 'Shirts', url: 'products' },
    { src: '/men_images/quick_picks/image_5.png', label: 'Hoodies & Jackets', url: 'products' },
    { src: '/men_images/quick_picks/image_6.png', label: 'Co-ords', url: 'products' },
    { src: '/men_images/quick_picks/image_7.png', label: 'Athleisure', url: 'products' },
    { src: '/men_images/quick_picks/image_8.png', label: 'Innerwear', url: 'products' },
  ];

  const trendingImages: { src: string }[] = [
    { src: '/men_images/trending/1.jpg' },
    { src: '/men_images/trending/2.jpg' },
    { src: '/men_images/trending/3.jpg' },
    { src: '/men_images/trending/4.jpg' },
    { src: '/men_images/trending/5.jpg' },
    { src: '/men_images/trending/6.jpg' },
  ];

  const upcomingSalesImages: { src: string }[] = [
    { src: '/men_images/upcoming_sales/1.jpg' },
    { src: '/men_images/upcoming_sales/2.jpg' },
    { src: '/men_images/upcoming_sales/3.jpg' },
    { src: '/men_images/upcoming_sales/4.jpg' },
    { src: '/men_images/upcoming_sales/5.jpg' },
    { src: '/men_images/upcoming_sales/6.jpg' },
  ];

  const bestSellerImages: { src: string }[] = [
    { src: '/men_images/best_seller/1.jpg' },
    { src: '/men_images/best_seller/2.jpg' },
    { src: '/men_images/best_seller/3.jpg' },
    { src: '/men_images/best_seller/4.jpg' },
    { src: '/men_images/best_seller/5.jpg' },
    { src: '/men_images/best_seller/6.jpg' },
  ];

  const router = useRouter();
  const handleRedirect = (url: string, queryParams: any = {}) => {
    console.log(queryParams);
    const urlWithQuery = new URL(url, window.location.origin);
    urlWithQuery.searchParams.append('category', queryParams);
    router.push(urlWithQuery.toString());
  };

  return (
    <div className="sm:px-auto container relative mx-auto mt-20 min-h-screen bg-white px-[1rem]">
      <div className="mb-4 flex justify-center gap-4 pt-4">
        <Link href="/men">
          <button
            type="button"
            className="relative mt-6 flex h-[40px] w-36 cursor-pointer flex-row rounded-full border bg-[#073453] bg-gradient-to-l text-[12px] sm:text-sm md:h-12 md:w-44 md:text-base"
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
            className="relative mt-6 flex h-[40px] w-36 cursor-pointer flex-row rounded-full border bg-black bg-gradient-to-l text-[12px] hover:bg-[#b27773] sm:text-sm md:h-12 md:w-44 md:text-base"
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
          <img src="/categories/mens/shirts.png" className="w-full rounded-xl" />
          <img src="/categories/mens/tshirts.png" className="w-full rounded-xl" />
          <img src="/categories/mens/cargos.png" className="w-full rounded-xl" />
          <img src="/categories/mens/denims.png" className="w-full rounded-xl" />
        </div>
      </div>

      <div className="mt-4 py-4 text-black">
        <p className="mb-2 text-xl md:text-2xl">TRENDING</p>
        <Swiper modules={[Autoplay, Keyboard]} spaceBetween={20} slidesPerView={5}>
          {trendingImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                className="h-[120px] w-full rounded-md object-cover shadow-md sm:h-[180px] md:h-[240px] lg:h-[300px]"
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
          slidesPerView={5}
        >
          {bestSellerImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                className="h-[120px] w-full rounded-md object-cover shadow-md sm:h-[180px] md:h-[240px] lg:h-[300px]"
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
        <Swiper modules={[Autoplay, Keyboard]} spaceBetween={20} slidesPerView={5}>
          {upcomingSalesImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                className="h-[120px] w-full rounded-md object-cover sm:h-[180px] md:h-[240px] lg:h-[300px]"
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
