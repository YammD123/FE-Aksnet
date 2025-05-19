import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { Banner } from "~/components/banner";
import { BannerType } from "~/types/banner-type";

// Define the BannerType to match the API response


// Type the route loader to return BannerType[]
export const useBanner = routeLoader$<BannerType[]>(async () => {
  const res = await fetch("https://api.jikan.moe/v4/seasons/now?limit=3");
  const data = await res.json();
  return data.data as BannerType[];
});

export default component$(() => {
  const bannerSignal = useBanner();
  return (
    <div>
      <Banner banners={bannerSignal.value} />
      <div>
        aa
      </div>
    </div>
  );
});