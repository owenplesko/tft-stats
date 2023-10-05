import Head from "next/head";
import type { GetServerSideProps, NextPage } from "next/types";
import { z } from "zod";
import SummonerSearch from "~/components/summonerSearch";
import { env } from "~/env.mjs";
import { RegionSchema, regionToInternalRegion } from "~/types/region";
import { type Summoner, SummonerSchema } from "~/types/summoner";
import ProfileHeader from "~/components/profileHeader";
import RankCard from "~/components/rankCard";
import { Comp, CompSchema } from "~/types/comp";
import CompCard from "~/components/compCard";

const QuerySchema = z.object({
  region: RegionSchema,
  name: z.string(),
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = QuerySchema.safeParse(context.query);
  if (!query.success) {
    return {
      notFound: true,
    };
  }

  const { region, name } = query.data;
  const internalRegion = regionToInternalRegion(region);

  const summoner_url = `${env.NEXT_PUBLIC_BACKEND_URL}/summoner/${internalRegion}/${name}`;
  const summoner_res = await fetch(summoner_url);
  if (!summoner_res.ok) {
    return {
      notFound: true,
    };
  }

  const summoner = SummonerSchema.safeParse(await summoner_res.json());
  if (!summoner.success) {
    return {
      notFound: true,
    };
  }

  const comps_url = `${env.NEXT_PUBLIC_BACKEND_URL}/comps/${summoner.data.puuid}`;
  const comps_res = await fetch(comps_url);
  if (!comps_res.ok) {
    return { props: { summoner: summoner.data, comps: [] } };
  }

  const comps = z.array(CompSchema).safeParse(await comps_res.json());
  if (!comps.success) {
    return { props: { summoner: summoner.data, comps: [] } };
  }

  return { props: { summoner: summoner.data, comps: comps.data } };
};

const ProfilePage: NextPage<{ summoner: Summoner; comps: Comp[] }> = ({
  summoner,
  comps,
}) => {
  return (
    <>
      <Head>
        <title>TFT</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center gap-8 bg-zinc-900">
        <div className="flex w-full justify-center border-b border-zinc-950 p-2">
          <SummonerSearch />
        </div>
        <div className="grid w-[1000px] grid-cols-5 gap-2">
          <ProfileHeader summoner={summoner} />
          <RankCard rank={summoner.rank} />
          <div className="col-span-3 rounded-sm border border-zinc-950 bg-zinc-800 p-4" />
        </div>
        <ul className="flex flex-col gap-2">
          {comps.map((c) => (
            <CompCard comp={c} />
          ))}
        </ul>
      </main>
    </>
  );
};

export default ProfilePage;