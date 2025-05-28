import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$, useLocation } from "@builder.io/qwik-city";
import axios from "axios";
import { Button } from "~/components/Button/Button";
import { DetailAnime } from "~/components/detail";
import { AnimeType } from "~/types/anime-type";
import { EpsType } from "~/types/eps-type";
import { BASE_URL } from "~/utils/base-url";

const useAnimeId = routeLoader$<AnimeType>(async ({ params }) => {
  try {
    const res = await fetch(`${BASE_URL}/anime/detail?anime=${params.id}`);
    const data = await res.json();
    return data.data as AnimeType;
  } catch (error) {
    return {
      id: 0,
      title: "",
      cover_url: "",
      synopsis: "",
      rating: "",
      episode_link: [],
      genre: [],
    };
  }
});

const useEpsLink = routeLoader$<EpsType[]>(async ({ params }) => {
  try {
    const res = await fetch(`${BASE_URL}/eps-link?name=${params.id}`);
    const data = await res.json();
    return data.data as EpsType[];
  } catch (error) {
    return [];
  }
});

const useEps = routeLoader$<EpsType>(async ({ params, url }) => {
  const eps = url.searchParams.get("eps") || 1;
  try {
    const res = await fetch(
      `${BASE_URL}/eps-link/video?name=${params.id}&eps=${eps}`
    );
    const data = await res.json();
    return data.data as EpsType;
  } catch (error) {
    return {
      id: "",
      episode_number: 0,
      video_source: [],
    };
  }
});

const useFavorite = routeLoader$(async ({ request, params }) => {
  const cookie = request.headers.get("cookie");
  try {
    const res = await axios.get(`${BASE_URL}/favorite?anime=${params.id}`, {
      headers: {
        cookie,
      },
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    return {};
  }
});

export default component$(() => {
  const animeIdSignal = useAnimeId();
  const epsLinkSignal = useEpsLink();
  const epsSignal = useEps();
  const favoriteSignal = useFavorite();
  console.log(favoriteSignal.value);
  const loc = useLocation();
  const indexRosolusi = Number(loc.url.searchParams.get("res") || 0);
  const id = loc.params.id;

  return (
    <>
      <div class="flex md:flex-row flex-col gap-6 items-start px-2 py-8">
        <div class="w-full">
          <iframe
            class="w-full aspect-video rounded-2xl border border-gray-900"
            src={
              Array.isArray(epsSignal.value?.video_source)
                ? (epsSignal.value?.video_source[indexRosolusi]?.video_url ??
                  "")
                : ""
            }
            autoFocus
            allow="autoplay; encrypted-media; fullscreen;"
            allowFullscreen
          ></iframe>
          <div class="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-2  mt-4">
            {Array.isArray(epsSignal.value?.video_source) &&
              epsSignal.value.video_source.map((video, index) => (
                <div>
                  <Link
                    href={`/detail/${id}?res=${index}&eps=${loc.url.searchParams.get("eps") || 1}`}
                  >
                    <Button
                      class={` border-gray-950 flex flex-row w-full items-center justify-center py-2 px-4 rounded ${index === indexRosolusi ? "text-orange-300 bg-orange-400/45" : "text-white/80 italic bg-zinc-950 border hover:text-white transition-colors"}`}
                    >
                      {video.resolution}
                    </Button>
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <div class="text-white grid lg:grid-cols-8 md:grid-cols-6 grid-cols-4 xl:grid-cols-9 border rounded-2xl border-gray-900 p-7 gap-y-2 gap-x-3 ">
          {epsLinkSignal.value.map((eps) => (
            <Link 
            key={eps.id} href={`/detail/${id}?eps=${eps.episode_number}`}>
              <Button
                class={` border border-gray-950 text-center w-full  font-bold items-center justify-center flex p-3 px-5 rounded 
                    ${
                      loc.url.searchParams.get("eps") ===
                      String(eps.episode_number)
                        ? "text-orange-300 bg-orange-400/45"
                        : "text-white/70 italic bg-zinc-950 border hover:text-white transition-colors"
                    }`}
              >
                {eps.episode_number}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      <DetailAnime
        isFavorite={
          favoriteSignal.value ? { id: favoriteSignal.value.id } : null
        }
        anime={animeIdSignal.value}
      />
    </>
  );
});
