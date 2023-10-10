import Image from "next/image";
import router from "next/router";
import { internalRegionToRegion } from "~/types/region";
import type { Summoner } from "~/types/summoner";
import { formatRank } from "~/util/stringFormatting";

const ProfileSummaryCard: React.FC<{ summoner: Summoner }> = ({ summoner }) => {
  const onClick = () => {
    void router.push(
      `/${internalRegionToRegion(summoner.region)}/${summoner.name}`,
    );
  };

  return (
    <div
      onClick={onClick}
      className="flex flex-col gap-2 rounded-sm border border-zinc-950 bg-zinc-800 p-4 hover:cursor-pointer hover:border-violet-500"
    >
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-zinc-300">{summoner.name}</span>
        <span className="rounded-sm bg-zinc-900 px-1.5 py-0.5 text-xs font-medium text-zinc-300">
          {internalRegionToRegion(summoner.region).toUpperCase()}
        </span>
      </div>
      <div className="flex flex-row gap-4">
        <Image
          className="rounded-sm border border-zinc-950"
          src={`https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${summoner.profileIconId}.png`}
          width={96}
          height={96}
          alt={`profileicon${summoner.profileIconId}.png`}
        />
        {summoner.rank ? (
          <>
            <Image
              className=""
              src={`/rank/${summoner.rank.tier.toLowerCase()}.png`}
              width={96}
              height={96}
              alt={summoner.rank.tier}
            />
            <div className="flex flex-col gap-2 py-2">
              <span className="text-lg font-medium text-zinc-300">
                {formatRank(summoner.rank.tier, summoner.rank.division)}
              </span>
              <span className="text-sm font-normal text-zinc-400">{`${summoner.rank.lp} LP`}</span>
              <span className="text-sm font-normal text-zinc-400">
                Top 0.69%
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
