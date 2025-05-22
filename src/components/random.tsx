import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Image } from "qwik-image";
import { AnimeType } from "~/types/anime-type";

export interface Props {
  random: AnimeType[];
}

export const RandomAnime = component$(({ random }: Props) => {
  return (
    <>
    <div class="w-96 rounded bg-zinc-950 flex-none border-gray-900 h-[700px] border m-1">
      <h1 class="text-white text-2x border-b text-2xl font-bold p-4">Random Anime</h1>
      <div class="grid grid-cols-1 m-4 gap-4 max-h-[600px] overflow-y-auto">
        {random.map((anime) => (
          <div key={anime.id}>
            <Link href={`/detail/${anime.id}`} class="flex flex-row bg-zinc-950/90 border border-gray-900">
              <Image
                src={anime.cover_url}
                alt={anime.title}
                width={100}
                height={150}
                layout="constrained"
                loading="lazy"
                class="hover:scale-105 transition-transform duration-500 object-cover"
              />
              <div class="flex flex-col px-2">
                <h1 class=" text-lg">{anime.title}</h1>
                <p class="text-sm text-white/80 text-ellipsis line-clamp-3 overflow-hidden">{anime.synopsis}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
    </>
  );
});