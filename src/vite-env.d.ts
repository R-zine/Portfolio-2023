/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAIL_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
