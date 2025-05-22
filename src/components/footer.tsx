import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const Footer = component$(() => {
  return (
    <>
      <footer class="bg-zinc-950 text-white px-6 py-10 mt-10 border-t border-zinc-800">
        <div class="max-w-7xl mx-auto flex justify-between">
          {/* Logo dan deskripsi */}
          <div>
        <h1 class="text-2xl font-bold text-white tracking-wide">
          Aks<span class="text-blue-500">Net</span>
        </h1>
            <p class="mt-2 text-sm text-gray-400">
              Platform streaming anime favoritmu. Update anime terbaru setiap
              hari dengan kualitas terbaik.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h3 class="text-lg font-semibold mb-3">Navigasi</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" class="hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/home" class="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-10 border-t border-zinc-800 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Aksnet. All rights reserved.
        </div>
      </footer>
    </>
  );
});
