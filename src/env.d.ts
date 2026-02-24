/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_URI: string
  readonly VITE_SERVER_URI: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
