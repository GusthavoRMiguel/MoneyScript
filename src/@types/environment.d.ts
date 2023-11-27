declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_FIREBASE_API_KEY: string;
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
    }
  }
}

export {};
