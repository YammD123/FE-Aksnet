import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Image } from "qwik-image";
import { AnimeType } from "~/types/anime-type";

interface Props {
  animes: AnimeType[];
}

export const AnimeList = component$(({ animes }: Props) => {
  return (
    <div class="flex justify-center">
      <div class="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:grid-cols-2 sm:gap-4 gap-1 w-full ">
        {animes.map((anime) => (
          <div class="w-32 h-60 mx-auto" key={anime.id}>
            <Link href={`/detail/${anime.id}`}>
              <Image
                src={anime.cover_url}
                alt={anime.title}
                width={150}
                height={250}
                class="w-full h-48 object-cover"
                layout="constrained"
                loading="lazy"
              />
              <h1 class="text-white text-sm text-ellipsis line-clamp-2 overflow-hidden">{anime.title}</h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
});