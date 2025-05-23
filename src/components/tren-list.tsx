import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { LuStar } from "@qwikest/icons/lucide";
import { Image } from "qwik-image";
import { AnimeType, GenreAimeType } from "~/types/anime-type";


interface TrenAnimeListProps {
    genre: GenreAimeType
}

export const TrenAnimeList = component$(({genre}: TrenAnimeListProps) => {
    return (
        <>
            <h1 class="text-white text-2xl font-bold italic">{genre.name}</h1>
            <div class="w-full h-full grid md:grid-cols-2 grid-cols-1 py-4 gap-4">
                {genre.anime.map((anime:AnimeType)=>(
                    <div class="w-full h-full p-4 border border-gray-900 rounded-md mx-auto overflow-hidden transition-all ease-in-out duration-300 group hover:scale-105 relative" key={anime.id}>
                        <Link
                        href={`/detail/${anime.id}`}
                        class="w-full flex gap-3"
                        >
                        <Image
                            src={anime.cover_url}
                            alt={anime.title}
                            width={150}
                            height={250}
                            class="w-full h-48 rounded transition-transform duration-500 group-hover:scale-105 object-cover"
                            layout="constrained"
                            loading="lazy"
                        />
                        <div class="flex flex-col gap-2">
                            <h1 class="text-xl italic text-ellipsis line-clamp-1">{anime.title}</h1>
                            <div class="flex flex-row text-white/80 opacity-80 gap-2 items-center">
                                <span class="flex items-center text-orange-300 gap-1">
                                    <LuStar color="orange"/>
                                    {anime.rating}
                                </span>
                                <span class="text-white">
                                    {anime.episode_link.length} Episodes
                                </span>
                            </div>
                            <div>
                                <p class="text-sm text-white/80 text-ellipsis line-clamp-3 overflow-hidden">{anime.synopsis}</p>
                            </div>
                        </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
})