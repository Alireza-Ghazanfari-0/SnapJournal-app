import { DarkModeProvider } from "@/components/darkMode/darkModeContext";
import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <DarkModeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DarkModeProvider>
    </SessionProvider>
  );
}
