import { component$, useSignal } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { LuPenSquare } from "@qwikest/icons/lucide";
import { Image } from "qwik-image";
import { Button } from "~/components/Button/Button";
import { useAuthLoader } from "../layout";
import { profileType } from "~/types/profile-type";
import axios from "axios";
import { BASE_URL } from "~/utils/base-url";

export const useProfile = routeLoader$<profileType>(async({request})=>{
  const cookie = request.headers.get("cookie");
  try {
    const res = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        cookie,
      },
      withCredentials: true,
    })
    return res.data as profileType;
  } catch (error) {
    return {
      id: "",
      name: "",
      bio: "",
      avatar_image: "",
    }
  }
})

export default component$(() => {
  const auth = useAuthLoader();
  const profile = useProfile();

  const bioSignal = useSignal<string>(profile.value?.bio || "Belum ada bio");
  return (
    <div class="flex flex-col">
      <div class="relative w-full h-96 overflow-hidden py-5">
        <Image
          src="/fire-force.jpg"
          alt="Profile Image"
          layout="constrained"
          class="w-full h-96 z-0 absolute opacity-60 object-cover rounded-lg"
        />
        <div class="absolute w-full h-screen top-0 bottom-0 bg-gradient-to-t from-black via-black to-transparent z-10"></div>
      </div>

      <div class="relative z-20 flex flex-col md:flex-row items-center gap-4 px-4 py-6">
        <Image
          src={profile.value?.avatar_image || "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"}
          alt="Profile Avatar"
          width={150}
          height={150}
          class="w-36 h-36 rounded-full border-4 border-white object-cover shadow-lg"
          layout="constrained"
        />
        <h1 class="text-white/75 text-xl sm:text-2xl md:text-3xl font-semibold text-center md:text-left">
          {profile.value?.name || "Guest User"}
        </h1>
      </div>
      <div>
        {!auth.value&&(
        <Link
        href="/user/login"
        >
        <Button
        class="flex items-center"
        >
        <LuPenSquare class="text-white/80 mr-2" />
        Login
        </Button>
        </Link>
        )}
      </div>
      <div class="flex flex-col md:flex-row  gap-4 px-4 py-6">
        <textarea
        class="bg-zinc-950 text-sm border-2 focus:outline-none w-2/5 h-60 p-2 rounded border-gray-900"
        value={bioSignal.value}
        disabled={!auth.value}
        />
        asas
      </div>
    </div>
  );
});