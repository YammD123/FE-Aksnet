import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { GenreAimeType, GenreAnimeRespone } from "~/types/anime-type";
import { BASE_URL } from "~/utils/base-url";

export const useGenreAnime = routeLoader$<GenreAnimeRespone>(async({url})=>{
    const name = url.searchParams.get("name")|| "Action";
    const res = await fetch(`${BASE_URL}/genre?name=${name}`);
    const data = await res.json();
    return {
        genre: data.data as GenreAimeType[],
        name
    }
})


export default component$(() => {
    const genreAnimeSignal = useGenreAnime();
    
    return (
        <div class="flex justify-center items-center px-4 flex-col">
            <div>
                <Link href="/trending?name=Action" class="text-white/80 hover:text-white transition-colors">Trending</Link>
                <Link href="/trending?name=Summer" class="text-white/80 hover:text-white transition-colors">Trending</Link>
                <Link href="/trending?name=Drama" class="text-white/80 hover:text-white transition-colors">Trending</Link>
            </div>
        </div>
    );
})