// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcssVite from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const repoName = env.VITE_GITHUB_REPO_NAME || "my-portfolio-blog";
  const base = mode === "production" ? `/${repoName}/` : "/";

  return {
    plugins: [react(), tailwindcssVite(), svgr()],
    base: base,
    // **** ADD THIS SERVER CONFIGURATION ****
    server: {
      host: true, // This will expose the server on all network interfaces (0.0.0.0)
      // making it accessible from your host machine via the forwarded port.
      // You could also explicitly set it: host: '0.0.0.0',
      port: 5173, // Optional: explicitly set the port, though Vite defaults to 5173
      // HMR (Hot Module Replacement) configuration if needed for complex Docker network setups
      // For most devcontainer setups, the default HMR works fine once host is set.
      // hmr: {
      //   clientPort: 5173, // Ensures HMR client connects to the correct forwarded port.
      // },
    },
    // **** END OF ADDED SERVER CONFIGURATION ****
  };
});
