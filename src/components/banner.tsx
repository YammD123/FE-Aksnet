import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Image } from "qwik-image";
import { BannerType } from "~/types/banner-type";

interface Props {
  banners?: BannerType[];
}

export const Banner = component$(({ banners = [] }: Props) => {
  const currentIndex = useSignal(0);

  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % banners.length;
    }, 5000);
    cleanup(() => clearInterval(interval));
  });

  return (
    <div class="relative w-full h-80 overflow-hidden py-5">
      {banners && banners.length > 0 && banners.map((banner, index) => (
        <div
          key={index}
          class={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            index === currentIndex.value ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={banner.images.webp?.large_image_url || banner.images.webp.large_image_url}
            class="absolute top-0 rounded left-0 w-full h-full object-cover opacity-25"
            alt={banner.title}
            layout="fullWidth"
            loading="lazy"
          />
          <div class="absolute px-3 flex flex-col z-20">
            <h1 class="text-2xl font-bold text-white">{banner.title}</h1>
            <p class="text-sm py-6 text-white">{banner.synopsis}</p>
          </div>
        </div>
      ))}
    </div>
  );
});