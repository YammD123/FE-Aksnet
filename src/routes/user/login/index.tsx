import { $, component$, useSignal } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { LuLockKeyhole, LuMail } from "@qwikest/icons/lucide";
import { BASE_URL } from "~/utils/base-url";

export default component$(() => {
    const email = useSignal("");
    const password = useSignal("");
    const loc = useLocation();

    const handleSubmit = $(async() => {
        if (!email.value || !password.value) {
            alert("Email and password are required");
            return;
        }
        const res =await fetch(`${BASE_URL}/auth/signIn`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        }).then((res)=>{
            if (res.status === 201) {
                loc.url.pathname = "/home/";
            } else {
                alert("Login failed. Please check your credentials.");
            }
        })
    });
  return (
    <div class="flex items-center justify-center w-full py-8 text-white">
      <div class="flex flex-col w-full max-w-md p-6 bg-zinc-950 rounded-lg shadow-lg">
        <h1 class="text-2xl font-bold text-white">
          Aks<span class="text-blue-500">Net</span>
        </h1>
        <div class="flex flex-col w-full gap-4 mt-4">
          <div class="relative">
            <LuMail class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" font-size={20} />
            <input
              type="email"
              placeholder="Masukkan email"
              class="w-full p-2 border border-gray-300 rounded-md"
                onChange$={(e) => email.value = (e.target as HTMLInputElement).value}
            />
          </div>
          <div class="relative">
            <LuLockKeyhole class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" font-size={20} />
            <input
              type="password"
              placeholder="Masukkan password"
              class="w-full p-2 border border-gray-300 rounded-md"
              onChange$={(e)=> password.value = (e.target as HTMLInputElement).value}
            />
          </div>
          <button type="submit" onClick$={handleSubmit} class="p-2 mt-10 text-white bg-zinc-900 rounded-md">
            Login
          </button>
        </div>
      </div>
    </div>
  );
});