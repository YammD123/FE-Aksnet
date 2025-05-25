import { component$, Slot } from "@builder.io/qwik";
import {  routeLoader$, useLocation, type RequestHandler } from "@builder.io/qwik-city";
import axios from "axios";
import { Footer } from "~/components/footer";
import Navbar from "~/components/navbar";
import { BASE_URL } from "~/utils/base-url";
export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export const useAuthLoader = routeLoader$(async ({request}) => {
  const cookie = request.headers.get("cookie");
  try {
    const response = await axios.get(`${BASE_URL}/auth/status`, {
      headers: {
        cookie,
      },
    });
    return response.data
  } catch (error) {
    console.error("Error fetching auth data:", error);
    return null;
  }
});




export default component$(() => {
  const loc = useLocation();
  return(
    <main>
      <Navbar>
      <Slot />
      {loc.url.pathname !== "/"&&(
      <Footer/>
      )}
      </Navbar>
    </main>
  )
});
