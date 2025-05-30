import { $, component$, Slot, useSignal } from "@builder.io/qwik";
import { Link, useLocation, useNavigate } from "@builder.io/qwik-city";
import { LuBookCopy, LuFlame, LuHome, LuMenu, LuSearch, LuUserCircle } from "@qwikest/icons/lucide";
import { Button } from "./Button/Button";

export default component$(() => {
  const loc = useLocation();
  const sidebarOpen = useSignal(false);
  const serachSignal = useSignal("");
  const nav = useNavigate();


  return (
    <div class="flex flex-col h-screen overflow-hidden">
      {/* Navbar */}
      <header class="bg-zinc-950/90 border-b border-gray-900 px-4 py-4 h-16 flex items-center justify-between sticky top-0 z-30">
        <h1 class="text-2xl font-bold text-white tracking-wide">
          Aks<span class="text-blue-500">Net</span>
        </h1>
        {loc.url.pathname !== "/" && (
          <>
            <div class="relative my-8  w-1/3">
              <input
                placeholder="Search"
                type="text"
                bind:value={serachSignal}
                class="bg-zinc-900/75 border border-white/65 focus:outline-none rounded-md px-10 py-1 w-full"
              />
              <button
              onClick$={()=>{
                if(serachSignal.value === ""){
                  return
                }
                nav(`/search/${serachSignal.value}`)
                serachSignal.value = ""
              }}
               type="submit" class="absolute left-3 top-1/2 transform -translate-y-1/2">
              <LuSearch
                class="absolute left-3 top-1/2 transform -translate-y-1/2"
                color="white"
              />
              </button>
            </div>
            <div>
              <button
                onClick$={() => (sidebarOpen.value = !sidebarOpen.value)}
                class="md:hidden rounded-md px-4 py-1"
              >
                <LuMenu color="white" />
              </button>
            </div>
          </>
        )}
      </header>

      {/* Body (Sidebar + Content) */}
      <div class="flex  flex-1 overflow-hidden">
        {/* Sidebar */}
        {loc.url.pathname !== "/" && (
          <aside
            class={`w-20   ${sidebarOpen.value ? "block" : "hidden"} bg-zinc-950/90 border-r md:block border-gray-900 h-full`}
          >
            <ul class="flex flex-col gap-4 items-center py-4">
              <Link
                href="/home/"
                class="w-full"
              >
                <Button class={`flex w-full transition-colors duration-500 ease-in-out items-center flex-col ${loc.url.pathname === "/home/" ? "bg-orange-400/25 border-r-2 border-r-orange-300" : ""}`}>
                  <LuHome font-size={20} color={loc.url.pathname === "/home/" ? "orange" : "white"} />
                  <span class={`text-sm ${loc.url.pathname === "/home/" ? "text-orange-300" : ""}`}>Home</span>
                </Button>
              </Link>
              <Link
                href="/trending/"
                class="w-full"
              >
                <Button class={`flex w-full transition-colors duration-500 ease-in-out items-center flex-col ${loc.url.pathname === "/trending/" ? "bg-orange-400/20  border-r-2 border-r-orange-300" : ""}`}>
                  <LuFlame font-size={20} color={loc.url.pathname === "/trending/" ? "orange" : "white"} />
                  <span class={`text-sm ${loc.url.pathname === "/trending/" ? "text-orange-300" : ""}`}>Trending</span>
                </Button>
              </Link>
              <Link
                href="/gen/"
                class="w-full"
              >
                <Button class={`flex w-full transition-colors duration-500 ease-in-out items-center flex-col ${loc.url.pathname === "/gen/" ? "bg-orange-400/20  border-r-2 border-r-orange-300" : ""}`}>
                  <LuBookCopy font-size={20} color={loc.url.pathname === "/gen/" ? "orange" : "white"} />
                  <span class={`text-sm ${loc.url.pathname === "/gen/" ? "text-orange-300" : ""}`}>Genre</span>
                </Button>
              </Link>
              <Link
                href="/profile/"
                class="w-full"
              >
                <Button class={`flex w-full transition-colors duration-500 ease-in-out items-center flex-col ${loc.url.pathname === "/profile/" ? "bg-orange-400/20  border-r-2 border-r-orange-300" : ""}`}>
                  <LuUserCircle font-size={20} color={loc.url.pathname === "/profile/" ? "orange" : "white"} />
                  <span class={`text-sm ${loc.url.pathname === "/profile/" ? "text-orange-300" : ""}`}>Profile</span>
                </Button>
              </Link>
            </ul>
          </aside>
        )}

        {/* Main Content */}
        <main class="flex-1 custom-scrollbar overflow-y-auto px-4 py-2">
          <Slot />
        </main>
      </div>
    </div>
  );
});
