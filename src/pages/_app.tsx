import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${roboto.className} antialiased`}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
