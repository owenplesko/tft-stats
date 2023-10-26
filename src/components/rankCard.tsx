import Image from "next/image";
import { RankSchema } from "~/types/rank";
import { useQuery } from "@tanstack/react-query";
import { formatRank } from "~/util/stringFormatting";
import { env } from "~/env.mjs";
import { RankStatsSchema } from "~/types/stats";

const RankCard: React.FC<{ summoner_puuid: string }> = ({ summoner_puuid }) => {
  const rankQuery = useQuery({
    queryKey: [`rank/${summoner_puuid}`],
    queryFn: () =>
      fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/rank/${summoner_puuid}`)
        .then((res) => res.json())
        .then((data) => RankSchema.parse(data)),
  });

  const rankStatsQuery = useQuery({
    queryKey: [`rank/stats/${summoner_puuid}`],
    queryFn: () =>
      fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/rank/stats/${summoner_puuid}`)
        .then((res) => res.json())
        .then((data) => RankStatsSchema.parse(data)),
  });

  return (
    <div className="col-span-2 flex flex-row rounded-sm border border-zinc-950 bg-zinc-800 p-4">
      {rankQuery.isSuccess ? (
        <>
          <Image
            className="mr-auto"
            src={`/rank/${rankQuery.data.tier.toLowerCase()}.png`}
            width={96}
            height={96}
            alt={rankQuery.data.tier}
          />
          <div className="mr-auto flex flex-col gap-2 py-2">
            <span className="text-lg font-medium text-zinc-300">
              {formatRank(rankQuery.data.tier, rankQuery.data.division)}
            </span>
            <span className="text-sm font-normal text-zinc-400">{`${rankQuery.data.lp} LP`}</span>
            <span className="text-sm font-normal text-zinc-400">Top 0.2%</span>
          </div>
        </>
      ) : (
        <>
          <Image
            className="mr-auto"
            src={`/rank/unranked.png`}
            width={96}
            height={96}
            alt="unranked"
          />
          <span className="mr-auto py-2 text-lg font-medium text-zinc-300">
            Unranked
          </span>
        </>
      )}

      {rankStatsQuery.isSuccess ? (
        <div className="mr-auto flex flex-col gap-2 py-2">
          <span className="text-lg font-medium text-zinc-300">{`${rankStatsQuery.data.total_games} Played`}</span>
          <span className="text-sm font-normal text-zinc-400">
            {`Win Rate ${rankStatsQuery.data.top_4_rate.toFixed(2)}%`}
          </span>
          <span className="text-sm font-normal text-zinc-400">{`${rankStatsQuery.data.average_placement.toFixed(
            2,
          )} Avg`}</span>
        </div>
      ) : null}
    </div>
  );
};

export default RankCard;
