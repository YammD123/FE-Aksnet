// vite.config.ts
import { defineConfig } from "file:///C:/Belajar%20ngoding%20dan%20project/MANDIRI/Aksnet/fe/node_modules/vite/dist/node/index.js";
import { qwikVite } from "file:///C:/Belajar%20ngoding%20dan%20project/MANDIRI/Aksnet/fe/node_modules/@builder.io/qwik/dist/optimizer.mjs";
import { qwikCity } from "file:///C:/Belajar%20ngoding%20dan%20project/MANDIRI/Aksnet/fe/node_modules/@builder.io/qwik-city/lib/vite/index.mjs";
import tsconfigPaths from "file:///C:/Belajar%20ngoding%20dan%20project/MANDIRI/Aksnet/fe/node_modules/vite-tsconfig-paths/dist/index.mjs";
import tailwindcss from "file:///C:/Belajar%20ngoding%20dan%20project/MANDIRI/Aksnet/fe/node_modules/@tailwindcss/vite/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    qwikCity(),
    qwikVite(),
    tsconfigPaths(),
    tailwindcss()
  ],
  optimizeDeps: {
    // include: [
    //   "@builder.io/qwik",
    //   "@builder.io/qwik-city"
    // ]
  },
  server: {
    headers: {
      "Cache-Control": "public, max-age=0"
    }
  },
  preview: {
    headers: {
      "Cache-Control": "public, max-age=600"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxCZWxhamFyIG5nb2RpbmcgZGFuIHByb2plY3RcXFxcTUFORElSSVxcXFxBa3NuZXRcXFxcZmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXEJlbGFqYXIgbmdvZGluZyBkYW4gcHJvamVjdFxcXFxNQU5ESVJJXFxcXEFrc25ldFxcXFxmZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovQmVsYWphciUyMG5nb2RpbmclMjBkYW4lMjBwcm9qZWN0L01BTkRJUkkvQWtzbmV0L2ZlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IHF3aWtWaXRlIH0gZnJvbSBcIkBidWlsZGVyLmlvL3F3aWsvb3B0aW1pemVyXCI7XG5pbXBvcnQgeyBxd2lrQ2l0eSB9IGZyb20gXCJAYnVpbGRlci5pby9xd2lrLWNpdHkvdml0ZVwiO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tIFwiQHRhaWx3aW5kY3NzL3ZpdGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHF3aWtDaXR5KCksXG4gICAgcXdpa1ZpdGUoKSxcbiAgICB0c2NvbmZpZ1BhdGhzKCksXG4gICAgdGFpbHdpbmRjc3MoKVxuICBdLFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICAvLyBpbmNsdWRlOiBbXG4gICAgLy8gICBcIkBidWlsZGVyLmlvL3F3aWtcIixcbiAgICAvLyAgIFwiQGJ1aWxkZXIuaW8vcXdpay1jaXR5XCJcbiAgICAvLyBdXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIGhlYWRlcnM6IHtcbiAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOiBcInB1YmxpYywgbWF4LWFnZT0wXCJcbiAgICB9XG4gIH0sXG4gIHByZXZpZXc6IHtcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcIkNhY2hlLUNvbnRyb2xcIjogXCJwdWJsaWMsIG1heC1hZ2U9NjAwXCJcbiAgICB9XG4gIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrVixTQUFTLG9CQUFvQjtBQUMvVyxTQUFTLGdCQUFnQjtBQUN6QixTQUFTLGdCQUFnQjtBQUN6QixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLGlCQUFpQjtBQUV4QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxTQUFTO0FBQUEsSUFDVCxTQUFTO0FBQUEsSUFDVCxjQUFjO0FBQUEsSUFDZCxZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsY0FBYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLZDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsaUJBQWlCO0FBQUEsSUFDbkI7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxTQUFTO0FBQUEsTUFDUCxpQkFBaUI7QUFBQSxJQUNuQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
