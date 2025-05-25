/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
interface ImportMetaEnv {
  readonly VITE_GITHUB_REPO_NAME?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
