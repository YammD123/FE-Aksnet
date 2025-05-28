import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Banner } from "~/components/banner";
import { AnimeList } from "~/components/list";
import { RandomAnime } from "~/components/random";
import { AnimeType, PaginationType } from "~/types/anime-type";
import { BannerType } from "~/types/banner-type";
import { BASE_URL } from "~/utils/base-url";

export const useBanner = routeLoader$<BannerType[]>(async () => {
  try {
    const res = await fetch("https://api.jikan.moe/v4/seasons/now?limit=3");
    const data = await res.json();
    return data.data as BannerType[];
  } catch (error) {
    return [];
  }
});

export const useAnimeList = routeLoader$<PaginationType>(async ({ url }) => {
  try {
    const page = Number(url.searchParams.get("page") || 1);
    const res = await fetch(`${BASE_URL}/anime/data?page=${page}&limit=25`);
    const data = await res.json();
    return {
      animes: data.data as AnimeType[],
      page,
      totalPage: data.totalPage,
    };
  } catch (error) {
    return {
      animes: [],
      page: 1,
      totalPage: 1,
    };
  }
});

export const useRandomAnime = routeLoader$<AnimeType[]>(async () => {
  try {
    const res = await fetch(`${BASE_URL}/anime/random`);
    const data = await res.json();
    return data.data as AnimeType[];
  } catch (error) {
    return [];
  }
});

export default component$(() => {
  const bannerSignal = useBanner();
  const animeListSignal = useAnimeList();
  const randomAnimeSignal = useRandomAnime();

  return (
    <div>
      {bannerSignal.value.length === 0?(
        <div class="text-white">No banners available</div>
      ):(
      <Banner banners={bannerSignal.value} />
      )}
      <div class="py-10 flex justify-center">
        <div class="flex md:flex-row justify-center flex-col gap-10">
          {animeListSignal.value.animes.length === 0 ? (
            <div class="text-white">No anime available</div>
          ) : (
          <AnimeList
            animes={animeListSignal.value.animes}
            page={animeListSignal.value.page}
            totalPage={animeListSignal.value.totalPage}
          />
          )}
          {randomAnimeSignal.value.length === 0?(
            <div class="text-white">No random anime available</div>
          ) : (
          <RandomAnime random={randomAnimeSignal.value} />
          )}
        </div>
      </div>
    </div>
  );
});
