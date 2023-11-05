// pages/_app.tsx or src/pages/_app.tsx
import { SessionProvider } from "next-auth/react";
import '../styles/globals.css'; // Import global styles here

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    // Wrap your components with the SessionProvider and pass the session prop
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
