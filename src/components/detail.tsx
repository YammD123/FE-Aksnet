import { $, component$, useSignal } from "@builder.io/qwik";
import { LuBookmark, LuStar } from "@qwikest/icons/lucide";
import { Image } from "qwik-image";
import { AnimeType } from "~/types/anime-type";
import { Button } from "./Button/Button";
import axios from "axios";
import { BASE_URL } from "~/utils/base-url";

interface DetailAnimeProps {
  anime: AnimeType;
  isFavorite: {
    id: string;
  } | null;
}
export const DetailAnime = component$(({ anime, isFavorite }: DetailAnimeProps) => {
    const favoriteSignal = useSignal(isFavorite);



    // handle add to favorite / remove from favorite
    const handleFavorite= $(async()=>{
    try {
      if (favoriteSignal.value) {
        const res = await axios.delete(`${BASE_URL}/favorite?id=${favoriteSignal.value.id}`, {
          withCredentials: true,
        })
        if (res.status === 200) {
          favoriteSignal.value = null
        }
      }else{
        const res = await axios.post(`${BASE_URL}/favorite`, {
          anime_id: anime.id,
        }, {
          withCredentials: true,
        })
        if (res.status === 201) {
          favoriteSignal.value = {id:res.data.data.id}
        }
      }
    } catch (error) {
      console.error("Error adding to favorite:", error);
    }
  });

  return (
    <div class="flex md:flex-row flex-col border bg-zinc-950 gap-10 border-gray-900 rounded p-4">
      <div class="w-48 shrink-0 flex flex-col rounded-sm">
        <Image
          src={anime.cover_url}
          alt={anime.title}
          width={200}
          class="rounded-sm object-cover"
          layout="constrained"
          loading="lazy"
        />
        <Button 
        onClick$={handleFavorite}
        class={`mt-4 ${favoriteSignal.value ? "bg-orange-500" : "bg-zinc-900"} flex items-center gap-2 border border-white/25 w-full`}>
        <LuBookmark class="text-white/80" />
          {favoriteSignal.value ? "Remove Favorites" : "Add Favorites"}
        </Button>
      </div>
      <div>
        <h1 class="text-2xl pb-4 font-semibold italic text-amber-400">
          {anime.title}
        </h1>
        <p class="text-sm text-white/80 text-ellipsis line-clamp-3 overflow-hidden">
          {anime.synopsis}
        </p>
        <div class="flex flex-row text-white/80 opacity-80 gap-2 items-center">
          {/* rating dan episode */}
          <span class="flex items-center py-4 text-orange-300 gap-1">
            <LuStar color="orange" />
            {anime.rating}
          </span>
          <span class="text-white">{anime.episode_link.length} Episodes</span>
        </div>
          {/* genre anime */}
          <div class="grid grid-cols-4 gap-2 mt-2">
            {anime.genre.map((genre: { name: string }) => (
              <div
                class="text-sm bg-zinc-900 border-gray-900 p-2 rounded items-center flex justify-center text-white/100"
                key={genre.name}
              >
                {genre.name}
              </div>
            ))}
          </div>
      </div>
    </div>
  );
});
