declare global {
  interface ViteTypeOptions {
    // By adding this line, you can make the type of ImportMetaEnv strict
    // to disallow unknown keys.
    // strictImportMetaEnv: unknown
  }

  interface ImportMetaEnv {
    readonly VITE_API_URL: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

declare module 'react-router' {
  // Your AppLoadContext used in v2
  interface AppLoadContext {
    whatever: string;
  }

  // TODO: remove this once we've migrated to `Route.LoaderArgs` instead for our loaders
  interface LoaderFunctionArgs {
    context: AppLoadContext;
  }

  // TODO: remove this once we've migrated to `Route.ActionArgs` instead for our actions
  interface ActionFunctionArgs {
    context: AppLoadContext;
  }
}

export {};
