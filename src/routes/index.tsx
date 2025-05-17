import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button";
import { Image } from 'qwik-image';

export default component$(() => {
  return (
    <>
      <div class="relative w-full overflow-hidden">
        {/* Gambar background */}
        <img
          src="/one-piece.jpeg"
          class="absolute top-0 left-0 w-full  object-cover opacity-25 blur-md z-0"
          alt="One Piece Background"
        />
        <div class="absolute w-full h-screen top-0 bottom-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10"></div>
        <div class="absolute w-full h-screen top-0 bottom-0 bg-gradient-to-b from-black via-black/20 to-transparent z-10"></div>
        <div class="flex flex-col justify-center items-center h-7/12 relative z-20">
          <h1 class="text-white text-6xl font-bold">A NEW WAY TO WATCH</h1>
          <h1 class="text-blue-500 text-7xl font-bold">ANIME</h1>
          <input
            placeholder="Search"
            class="bg-zinc-900/75 border my-8 border-white/65 focus:outline-none rounded-md px-2 md:w-1/3 py-1"
            type="text"
          />
          <div class="px-4">
                <Image src="/Logo.png" alt="aksnet" width={200} height={200} layout="constrained"/>
            <div class="flex md:flex-row flex-col  gap-4">
              <div>
                <p class="text-white/35">
                Aksnet adalah platform streaming anime asal Indonesia yang
                menghadirkan pengalaman menonton seru dengan koleksi anime
                terlengkap dan update tercepat!
                <span class="text-white">
                "Satu-satunya platform nonton
                anime dengan pencarian super cepat dan tampilan yang
                user-friendly!" 
                </span> — Aksnet.
                </p>
              </div>
              <div class="w-40 bg-amber-200 h-44">
              
              </div>
            </div>
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
