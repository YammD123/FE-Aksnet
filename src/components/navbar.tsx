import { component$, Slot } from "@builder.io/qwik"
import { useLocation } from "@builder.io/qwik-city";



export default component$(() => {
    const loc = useLocation();
    return (
        <nav class="flex flex-col">
            {/* navbar  */}
            <header class=" gap-4 bg-zinc-950/70 border-b border-gray-600/70 px-4 py-4 flex items-center">
                  <div class="flex items-center gap-3">
                    <h1 class="text-2xl font-bold text-white tracking-wide">
                        Aks<span class="text-blue-500">Net</span>
                    </h1>
                  </div>
            </header>

            {/* sidebar dan content */}
            <div class="flex flex-1">
                {loc.url.pathname !== "/"?(
                <div class="bg-zinc-950/70 border-r border-gray-600/70 w-20 flex flex-col justify-between items-center">
                    <ul>
                        <li>saka</li>
                    </ul>
                </div>
                ):''}
                <main class="flex-1">
                    <Slot />
                </main>
            </div>
        </nav>
    )
})