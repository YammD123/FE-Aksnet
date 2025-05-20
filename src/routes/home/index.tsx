import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Banner } from "~/components/banner";
import { AnimeList } from "~/components/list";
import { RandomAnime } from "~/components/random";
import { AnimeType } from "~/types/anime-type";
import { BannerType } from "~/types/banner-type";
import { BASE_URL } from "~/utils/base-url";

export const useBanner = routeLoader$<BannerType[]>(async () => {
  const res = await fetch("https://api.jikan.moe/v4/seasons/now?limit=3");
  const data = await res.json();
  return data.data as BannerType[];
});

export const useAnimeList = routeLoader$<AnimeType[]>(async () => {
  const res = await fetch(`${BASE_URL}/anime/data?limit=25`);
  const data = await res.json();
  return data.data as AnimeType[];
});

export const useRandomAnime = routeLoader$<AnimeType[]>(async () => {
  const res = await fetch(`${BASE_URL}/anime/random`);
  const data = await res.json();
  return data.data as AnimeType[];
});

export default component$(() => {
  const bannerSignal = useBanner();
  const animeListSignal = useAnimeList();
  const randomAnimeSignal = useRandomAnime();

  return (
    <div>
      <Banner banners={bannerSignal.value} />
      <div class="py-10 flex justify-center">
        <div class="flex md:flex-row justify-center flex-col gap-10">
          <AnimeList animes={animeListSignal.value} />
          <RandomAnime random={randomAnimeSignal.value} />
        </div>
      </div>
    </div>
  );
});