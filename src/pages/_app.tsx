import { type AppType } from "next/dist/shared/lib/utils";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "~/styles/globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={`${roboto.className} antialiased`}>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
};

export default MyApp;
