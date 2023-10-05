import type { NextPage } from "next";
import Head from "next/head";
import SummonerSearch from "../components/summonerSearch";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>TFT</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-zinc-900">
        <div className="flex w-full justify-center border-b border-zinc-950 p-2">
          <SummonerSearch />
        </div>
      </main>
    </>
  );
};

export default Home;
