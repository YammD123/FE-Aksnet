import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$, useLocation } from "@builder.io/qwik-city";
import axios from "axios";
import { Image } from "qwik-image";
import { GenreAnimeRespone } from "~/types/anime-type";
import { GenreAnimeType, genreType } from "~/types/genre-type";
import { BASE_URL } from "~/utils/base-url";

export const useGenre= routeLoader$<genreType[]>(async () => {
    try {
        const res = await axios.get(`${BASE_URL}/genre/all`)
        return res.data.data as genreType[];
    } catch (error) {
        return [];
    }
});

export const useGenreAnime = routeLoader$<GenreAnimeType>(async ({url})=>{
    try {
        const name = url.searchParams.get("name") || "Action";
        const res = await axios.get(`${BASE_URL}/genre/anime?name=${name}`);
        return res.data.data as GenreAnimeType;
    } catch (error) {
        return {
            anime: [],
        }
    }
})

export default component$(() => {
    const genres = useGenre();
    const genreAnimeSignal = useGenreAnime();
    const loc = useLocation();
    return (
        <div>
            <div class="grid xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-2 p-2">
                {Array.isArray(genres.value)&& genres.value.map((genre)=>(
                    <Link
                    key={genre.name}
                    href={`/gen?name=${genre.name}`}
                    >
                    <div class={`${loc.url.searchParams.get("name") === genre.name ? "bg-orange-500" : "bg-zinc-900"}  p-4 rounded mb-4 text-white hover:bg-orange-500  transition-colors duration-300 cursor-pointer flex items-center justify-center text-center`} 
                    >
                        <h2>{genre.name}</h2>
                    </div>
                    </Link>
                ))}
            </div>
            <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-2 p-2">
                {Array.isArray(genreAnimeSignal.value.anime) && genreAnimeSignal.value.anime.map((anime) => (
                    <Link
                    key={anime.id}
                    href={`/detail/${anime.id}`}
                    class="relative group hover:scale-105 transition-transform duration-300 rounded-sm overflow-hidden"
                    >
                    <div class="relative w-56 group-hover:opacity-80 aspec-[2/3]">
                        <Image
                        src={anime.cover_url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJ5rAqr1pIi6pHOdFGGijRXcE4HLHqWJNSw&s"}
                        alt={anime.title}
                        width={200}
                        class="rounded-sm w-full hover:opacity-20 transition-opacity ease-in-out duration-300  object-cover mb-2"
                        layout="constrained"
                        loading="lazy"
                        />
                        <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300  p-2 rounded-sm absolute top-1 left-0 right-0">
                        <h3 class="text-white text-sm max-w-48 font-semibold overflow-hidden text-ellipsis line-clamp-2">{anime.title}</h3>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
})