import Image from "next/image";
import { useState } from "react";
import { env } from "../env.mjs";
import { internalRegionToRegion } from "~/types/region";
import type { Summoner } from "~/types/summoner";
import { useRouter } from "next/router";
import { CgSpinner } from "react-icons/cg";
import { formatTimeAgo } from "~/util/stringFormatting";

const ProfileHeader: React.FC<{ summoner: Summoner }> = ({ summoner }) => {
  return (
    <div className="col-span-5 flex flex-row gap-4 rounded-sm border border-zinc-950 bg-zinc-800 p-4">
      <Image
        className="rounded-sm border border-zinc-950"
        src={`https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${summoner.profileIconId}.png`}
        width={128}
        height={128}
        alt={`profileicon${summoner.profileIconId}.png`}
      />
      <div className="flex flex-col items-start justify-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-zinc-300">
            {summoner.name}
          </span>
          <span className="rounded-sm bg-zinc-900 px-1.5 py-0.5 text-xs font-medium text-zinc-300">
            {internalRegionToRegion(summoner.region).toUpperCase()}
          </span>
        </div>
        <UpdateButton puuid={summoner.puuid} />
        <span className="text-xs text-zinc-400" suppressHydrationWarning={true}>
          {summoner.lastUpdated === 0
            ? "Never updated"
            : `Updated ${formatTimeAgo(summoner.lastUpdated)}`}
        </span>
      </div>
    </div>
  );
};

const UpdateButton: React.FC<{ puuid: string }> = ({ puuid }) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const updateSummoner = async () => {
    if (loading) return;

    setLoading(true);
    await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/update/profile/${puuid}`);
    setLoading(false);
    router.reload();
  };

  return (
    <button
      onClick={() => {
        void updateSummoner();
      }}
      className={`relative flex items-center justify-center rounded-sm border border-zinc-950 px-2 py-1 text-base font-medium text-zinc-900 ${
        loading ? "cursor-default bg-violet-700" : "bg-violet-500"
      }`}
    >
      <span className={loading ? "opacity-0" : ""}>Update</span>
      {loading && <CgSpinner className="absolute animate-spin text-xl" />}
    </button>
  );
};

export default ProfileHeader;
