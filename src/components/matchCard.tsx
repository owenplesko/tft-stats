import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import Image from "next/image";
import { env } from "~/env.mjs";
import { CompSchema } from "~/types/comp";
import { type Summoner, SummonerSchema } from "~/types/summoner";
import { formatPlacement, formatStageNumber } from "~/util/stringFormatting";
import UnitIcon from "./unitIcon";
import Link from "next/link";
import { internalRegionToRegion } from "~/types/region";

const MatchCard: React.FC<{ match_id: string }> = ({ match_id }) => {
  const { data, isSuccess } = useQuery({
    queryKey: [`matches/participants${match_id}`],
    queryFn: () =>
      fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/matches/participants/${match_id}`)
        .then((res) => res.json())
        .then((data) => z.array(SummonerSchema).parse(data)),
  });
  if (isSuccess)
    return (
      <ul>
        {data.map((summoner, i) => (
          <li key={i}>
            <CompSummary summoner={summoner} match_id={match_id} />
          </li>
        ))}
      </ul>
    );
};

const CompSummary: React.FC<{
  match_id: string;
  summoner: Summoner;
}> = ({ match_id, summoner }) => {
  const { data, isSuccess } = useQuery({
    queryKey: [`${match_id}/${summoner.puuid}`],
    queryFn: () =>
      fetch(
        `https://tft-stats-comps.sfo2.cdn.digitaloceanspaces.com/${match_id}/${summoner.puuid}.json`,
      )
        .then((res) => res.json())
        .then((data) => CompSchema.parse(data)),
  });

  if (isSuccess)
    return (
      <div className="grid grid-cols-12 items-center border-t border-zinc-950 px-5 py-2">
        <span className="text-base font-medium text-zinc-400">
          {formatPlacement(data.placement)}
        </span>
        <Link
          className="col-span-2 text-base font-medium text-zinc-400"
          href={`/${internalRegionToRegion(summoner.region)}/${summoner.name}`}
        >
          {summoner.name}
        </Link>
        <span className="text-sm font-normal text-zinc-400">
          {formatStageNumber(data.last_round)}
        </span>
        <ul className="flex flex-col justify-between self-stretch">
          {data.augments.map((augment) => (
            <li key={augment}>
              <Image
                className="rounded-sm border border-zinc-900"
                src={`/augment/${augment}.png`}
                width={24}
                height={24}
                alt={augment}
              />
            </li>
          ))}
        </ul>
        <ul className="col-span-7 flex flex-row gap-2">
          {data.units.map((u, i) => (
            <li key={i}>
              <UnitIcon unit={u} />
            </li>
          ))}
        </ul>
      </div>
    );
};

export default MatchCard;
