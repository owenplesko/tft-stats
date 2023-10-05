import Image from "next/image";
import type { Rank } from "~/types/rank";
import { formatRank } from "~/util/stringFormatting";

const RankCard: React.FC<{ rank: Rank | null }> = ({ rank }) => {
  return (
    <div className="col-span-2 flex flex-row rounded-sm border border-zinc-950 bg-zinc-800 p-4">
      {rank ? (
        <>
          <Image
            className="mr-auto"
            src={`/rank/${rank.tier.toLowerCase()}.png`}
            width={96}
            height={96}
            alt={rank.tier}
          />
          <div className="mr-auto flex flex-col gap-2 py-2">
            <span className="text-lg font-medium text-zinc-300">
              {formatRank(rank.tier, rank.division)}
            </span>
            <span className="text-sm font-normal text-zinc-400">{`${rank.lp} LP`}</span>
            <span className="text-sm font-normal text-zinc-400">Top 0.69%</span>
          </div>
          <div className="mr-auto flex flex-col gap-2 py-2">
            <span className="text-lg font-medium text-zinc-300">
              189 Played
            </span>
            <span className="text-sm font-normal text-zinc-400">
              Win Rate 52.1%
            </span>
            <span className="text-sm font-normal text-zinc-400">4.34 Avg</span>
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
          <span className="py-2 text-lg font-medium text-zinc-300">
            Unranked
          </span>
        </>
      )}
    </div>
  );
};

export default RankCard;
