import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { Image } from "qwik-image";
import { AnimeType } from "~/types/anime-type";
import { BASE_URL } from "~/utils/base-url";
import { LuSearch } from "@qwikest/icons/lucide";

export default component$(() => {
  return (
    <>
      <div class="relative w-full h-96 overflow-hidden">
        {/* Gambar background */}
        <img
          src="/one-piece.jpeg"
          class="absolute top-0 left-0 w-full  object-cover opacity-25 z-0"
          alt="One Piece Background"
        />
        <div class="absolute w-full h-screen top-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
        <div class="absolute w-full h-screen top-0 bottom-0 bg-gradient-to-b from-black via-black/20 to-transparent z-10"></div>
        <div class="flex flex-col justify-center items-center relative z-20">
          <h1 class="text-white text-6xl font-bold">A NEW WAY TO WATCH</h1>
          <h1 class="text-blue-500 text-7xl font-bold">ANIME</h1>
          <div class="relative my-8 md:w-1/3 w-full">
            <input
              placeholder="Search"
              type="text"
              class="bg-zinc-900/75 border border-white/65 focus:outline-none rounded-md px-10 py-1 w-full"
            />
            <LuSearch
              class="absolute left-3 top-1/2 transform -translate-y-1/2"
              color="white"
            />
          </div>
        </div>
      </div>
      <div class="py-20 px-4">
        <div class="flex md:flex-row flex-col  gap-4">
          <div class="max-w-2/5">
            <p class="text-white/35">
              Aksnet adalah platform streaming anime asal Indonesia yang
              menghadirkan pengalaman menonton seru dengan koleksi anime
              terlengkap dan update tercepat!
              <span class="text-white">
                "Satu-satunya platform nonton anime dengan pencarian super cepat
                dan tampilan yang user-friendly!"
              </span>{" "}
              — Aksnet.
            </p>
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
