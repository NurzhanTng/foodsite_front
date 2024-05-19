// vite.config.ts
import { defineConfig } from "file:///root/foodsite_front/node_modules/vite/dist/node/index.js";
import react from "file:///root/foodsite_front/node_modules/@vitejs/plugin-react-swc/index.mjs";
import eslintPlugin from "file:///root/foodsite_front/node_modules/vite-plugin-eslint/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
      include: ["./src/**/*.js", "./src/**/*.jsx"],
      exclude: []
    })
  ],
  build: {
    chunkSizeWarningLimit: 500 * 1024
    // Adjust the limit as needed (500 KB in bytes)
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvcm9vdC9mb29kc2l0ZV9mcm9udFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Jvb3QvZm9vZHNpdGVfZnJvbnQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Jvb3QvZm9vZHNpdGVfZnJvbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBlc2xpbnRQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLWVzbGludFwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgZXNsaW50UGx1Z2luKHtcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIGluY2x1ZGU6IFtcIi4vc3JjLyoqLyouanNcIiwgXCIuL3NyYy8qKi8qLmpzeFwiXSxcbiAgICAgIGV4Y2x1ZGU6IFtdLFxuICAgIH0pLFxuICBdLFxuXG4gIGJ1aWxkOiB7XG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA1MDAgKiAxMDI0LCAvLyBBZGp1c3QgdGhlIGxpbWl0IGFzIG5lZWRlZCAoNTAwIEtCIGluIGJ5dGVzKVxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThPLFNBQVMsb0JBQW9CO0FBQzNRLE9BQU8sV0FBVztBQUNsQixPQUFPLGtCQUFrQjtBQUd6QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixhQUFhO0FBQUEsTUFDWCxPQUFPO0FBQUEsTUFDUCxTQUFTLENBQUMsaUJBQWlCLGdCQUFnQjtBQUFBLE1BQzNDLFNBQVMsQ0FBQztBQUFBLElBQ1osQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVBLE9BQU87QUFBQSxJQUNMLHVCQUF1QixNQUFNO0FBQUE7QUFBQSxFQUMvQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
