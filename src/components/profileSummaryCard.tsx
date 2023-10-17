import Image from "next/image";
import router from "next/router";
import { internalRegionToRegion } from "~/types/region";
import { useQuery } from "@tanstack/react-query";
import { formatRank } from "~/util/stringFormatting";
import { env } from "~/env.mjs";
import { SummonerSchema } from "~/types/summoner";
import { RankSchema } from "~/types/rank";

const ProfileSummaryCard: React.FC<{ summoner_puuid: string }> = ({
  summoner_puuid,
}) => {
  const summonerQuery = useQuery({
    queryKey: [`summoner/${summoner_puuid}`],
    queryFn: () =>
      fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/summoner/${summoner_puuid}`)
        .then((res) => res.json())
        .then((data) => SummonerSchema.parse(data)),
  });

  const rankQuery = useQuery({
    queryKey: [`rank/${summoner_puuid}`],
    queryFn: () =>
      fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/rank/${summoner_puuid}`)
        .then((res) => res.json())
        .then((data) => RankSchema.parse(data)),
  });

  const onClick = () => {
    if (!summonerQuery.isSuccess) return;

    void router.push(
      `/${internalRegionToRegion(summonerQuery.data.region)}/${
        summonerQuery.data.name
      }`,
    );
  };

  if (summonerQuery.isSuccess)
    return (
      <div
        onClick={onClick}
        className="flex flex-col gap-2 rounded-sm border border-zinc-950 bg-zinc-800 p-4 hover:cursor-pointer hover:border-violet-500"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-zinc-300">
            {summonerQuery.data.name}
          </span>
          <span className="rounded-sm bg-zinc-900 px-1.5 py-0.5 text-xs font-medium text-zinc-300">
            {internalRegionToRegion(summonerQuery.data.region).toUpperCase()}
          </span>
        </div>
        <div className="flex flex-row gap-4">
          <Image
            className="rounded-sm border border-zinc-950"
            src={`https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${summonerQuery.data.profileIconId}.png`}
            width={96}
            height={96}
            alt={`profileicon${summonerQuery.data.profileIconId}.png`}
          />
          {rankQuery.isSuccess ? (
            <>
              <Image
                className=""
                src={`/rank/${rankQuery.data.tier.toLowerCase()}.png`}
                width={96}
                height={96}
                alt={rankQuery.data.tier}
              />
              <div className="flex flex-col gap-2 py-2">
                <span className="text-lg font-medium text-zinc-300">
                  {formatRank(rankQuery.data.tier, rankQuery.data.division)}
                </span>
                <span className="text-sm font-normal text-zinc-400">{`${rankQuery.data.lp} LP`}</span>
                <span className="text-sm font-normal text-zinc-400">
                  Top 0.2%
                </span>
              </div>
            </>
          ) : (
            <>
              <Image
                src={`/rank/unranked.png`}
                width={96}
                height={96}
                alt="unranked"
              />
              <span className="py-2 text-lg font-medium text-zinc-400">
                Unranked
              </span>
            </>
          )}
        </div>
      </div>
    );
};

export default ProfileSummaryCard;
