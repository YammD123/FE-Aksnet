import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div>
      <h1>Home</h1>
      <p class="text-white h-96">assa</p>
      <div class="h-96">
        <Link prefetch href="/">Go Base with Link</Link>
        <a href="/">Go Base with anchor</a>
      </div>
    </div>
  );
});
