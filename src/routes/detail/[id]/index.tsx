import { component$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
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

const useEpsLink = routeLoader$<EpsType>(async ({ params }) => {
  try {
    const res = await fetch(`${BASE_URL}/eps-link?name=${params.id}`);
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

export default component$(() => {
  const animeIdSignal = useAnimeId();
    const epsLinkSignal = useEpsLink();
    console.log(epsLinkSignal.value);
  const loc = useLocation();
  const id = loc.params.id;
  return (
    <div>
      <h1>Panteq {id}</h1>
    </div>
  );
});
