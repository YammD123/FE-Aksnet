import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import axios from "axios";
import { Image } from "qwik-image";
import { AnimeType } from "~/types/anime-type";
import { BASE_URL } from "~/utils/base-url";

export const useSearchAnime = routeLoader$<AnimeType[]>(async ({ params }) => {
  const res = await axios.get(`${BASE_URL}/anime/search/${params.id}`);
  return res.data.data;
});

export default component$(() => {
  const animeSignal = useSearchAnime();
  console.log(animeSignal.value);
  return (
    <div>
      <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-2 p-2">
        {Array.isArray(animeSignal.value) &&
          animeSignal.value.map((anime: AnimeType) => (
            <Link
              key={anime.id}
              href={`/detail/${anime.id}`}
              class="relative group hover:scale-105 transition-transform duration-300 rounded-sm overflow-hidden"
            >
              <div class="relative w-56 group-hover:opacity-80 aspec-[2/3]">
                <Image
                  src={
                    anime.cover_url ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJ5rAqr1pIi6pHOdFGGijRXcE4HLHqWJNSw&s"
                  }
                  alt={anime.title}
                  width={200}
                  class="rounded-sm w-full hover:opacity-20 transition-opacity ease-in-out duration-300  object-cover mb-2"
                  layout="constrained"
                  loading="lazy"
                />
                <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300  p-2 rounded-sm absolute top-1 left-0 right-0">
                  <h3 class="text-white text-sm max-w-48 font-semibold overflow-hidden text-ellipsis line-clamp-2">
                    {anime.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
});
