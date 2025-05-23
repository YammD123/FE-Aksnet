import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$, useLocation } from "@builder.io/qwik-city";
import { TrenAnimeList } from "~/components/tren-list";
import { GenreAimeType, GenreAnimeRespone } from "~/types/anime-type";
import { BASE_URL } from "~/utils/base-url";

export const useGenreAnime = routeLoader$<GenreAnimeRespone>(async({url})=>{
    try {
        const name = url.searchParams.get("name")|| "Action";
        const res = await fetch(`${BASE_URL}/genre?name=${name}`);
        const data = await res.json();
        return {
            genre: data.data as GenreAimeType,
            name
        }
    } catch (error) {
        return {
            genre: {
                name: "Action",
                anime: []
            },
            name: "Action"
        }
    }
})


export default component$(() => {
    const genreAnimeSignal = useGenreAnime();
    console.log(genreAnimeSignal.value.genre);
    const loc = useLocation()
    
    return (
        <div class="flex justify-center items-center px-4 flex-col">
            <div class="sm:text-5xl text-3xl font-bold flex flex-row gap-2 text-white py-10">
                <Link href="/trending?name=Action" class={`text-white/80 hover:text-white transition-colors ${loc.url.searchParams.get("name") === "Action" ? "underline text-white/100" : ""}`}>Action</Link>
                <span>/</span>
                <Link href={`/trending?name=Harem`} class={`text-white/80 hover:text-white transition-colors ${loc.url.searchParams.get("name") === "Harem" ? "underline text-white/100" : ""}`}>Harem</Link>
                <span>/</span>
                <Link href="/trending?name=Ecchi" class={`text-white/80 hover:text-white transition-colors ${loc.url.searchParams.get("name") === "Ecchi" ? "underline text-white/100" : ""}`}>Ecchi</Link>
            </div>
                <TrenAnimeList 
                genre={genreAnimeSignal.value.genre}
                />
        </div>
    );
})