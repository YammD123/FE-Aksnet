import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Image } from "qwik-image";
import { AnimeType } from "~/types/anime-type";
import { Button } from "./Button/Button";

interface Props {
  animes: AnimeType[];
  page: number
  totalPage: number
}

export const AnimeList = component$(({ animes, page, totalPage }: Props) => {
  return (
    <>
    <div class="flex flex-col justify-center">

      {/* pagination */}
    <div class="flex justify-center items-center gap-4 py-4">
      {page === 1 ? "": 
      <Button class="bg-zinc-950 border border-gray-900 hover:bg-orange-400/25 text-white/85 ease-in-out duration-200">
        <Link href={`/home?page=${page - 1}`}>Prev</Link>
      </Button>
      }
      <span class="text-white/75 ">Page {page} of {totalPage}</span>
      {page === totalPage ? "" :
      <Button class="bg-zinc-950 border border-gray-900 hover:bg-orange-400/25 text-white/85 ease-in-out duration-200">
        <Link href={`/home?page=${page + 1}`}>Next</Link>
      </Button>
      }
    </div>

    {/* cardcontent */}
      <div class="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:grid-cols-2 sm:gap-4 gap-1 w-full ">
        {animes.map((anime) => (
          <div class="w-32 h-60 mx-auto overflow-hidden group relative" key={anime.id}>
            <Link href={`/detail/${anime.id}`}>
              <Image
                src={anime.cover_url}
                alt={anime.title}
                width={150}
                height={250}
                class="w-full h-48 transition-transform duration-500 group-hover:scale-105 object-cover"
                layout="constrained"
                loading="lazy"
              />
              <h1 class="text-white text-sm text-ellipsis py-1 line-clamp-1 overflow-hidden"> {anime.title}</h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
    </>
  );
});