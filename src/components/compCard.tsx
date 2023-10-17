import { CompSchema, type Trait } from "~/types/comp";
import {
  formatDuration,
  formatPlacement,
  formatQueueId,
  formatStageNumber,
  formatTimeAgo,
} from "~/util/stringFormatting";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { PiCaretDown } from "react-icons/pi";
import TraitIcon from "./TraitIcon";
import { type Match } from "~/types/match";
import { useState } from "react";
import MatchCard from "./matchCard";
import UnitIcon from "./unitIcon";

const CompCard: React.FC<{ match: Match; summonerPuuid: string }> = ({
  match,
  summonerPuuid,
}) => {
  const [isExpanded, setExpanded] = useState(false);

  const { data, isSuccess } = useQuery({
    queryKey: [`${match.id}/${summonerPuuid}`],
    queryFn: () =>
      fetch(
        `https://tft-stats-comps.sfo2.cdn.digitaloceanspaces.com/${match.id}/${summonerPuuid}.json`,
      )
        .then((res) => res.json())
        .then((data) => CompSchema.parse(data)),
  });

  if (isSuccess)
    return (
      <div className="w-[1000px] rounded-sm border border-zinc-950 bg-zinc-800">
        <div className="relative flex flex-row items-center gap-6 px-5 py-4">
          <div
            className={`absolute left-0 h-full w-1 opacity-90 ${
              data.placement === 1
                ? "bg-violet-500"
                : data.placement === 2
                ? "bg-yellow-400"
                : data.placement === 3
                ? "bg-slate-300"
                : data.placement === 4
                ? "bg-yellow-800"
                : "bg-zinc-700"
            }`}
          />
          <div className="flex w-28 flex-col">
            <span className="text-xl font-medium text-zinc-300">
              {formatPlacement(data.placement)}
            </span>
            <span className="text-lg font-normal text-zinc-300">
              {formatQueueId(match.queue_id)}
            </span>
            <span
              className="text-sm font-normal text-zinc-400"
              suppressHydrationWarning={true}
            >
              {formatTimeAgo(match.date / 1000)}
            </span>
            <span className="text-sm font-normal text-zinc-400">
              {`Stage ${formatStageNumber(data.last_round)}`}
            </span>
            <span className="text-sm font-normal text-zinc-400">
              {formatDuration(data.time_eliminated)}
            </span>
          </div>
          <div className="relative">
            <Image
              className="rounded-full border border-zinc-950"
              src={`/companion/${data.companion}.png`}
              width={48}
              height={48}
              alt={`companion/${data.companion}.png`}
            />
            <span className="absolute bottom-0 right-0 rounded-full bg-zinc-900 px-2 py-1 text-xs text-zinc-300">
              {data.level}
            </span>
          </div>
          <ul className="flex flex-col justify-between self-stretch">
            {data.augments.map((augment) => (
              <li key={augment}>
                <Image
                  className="rounded-sm border border-zinc-900"
                  src={`/augment/${augment}.png`}
                  width={32}
                  height={32}
                  alt={augment}
                />
              </li>
            ))}
          </ul>
          <div className="flex flex-col justify-between self-stretch">
            <ul className="flex flex-wrap gap-1">
              {data.traits // temp fix for go returning empty arrays as null
                ? data.traits
                    .sort((a, b) => b.style - a.style)
                    .map((trait) => (
                      <li key={trait.name}>
                        <TraitTag trait={trait} />
                      </li>
                    ))
                : null}
            </ul>
            <ul className="flex flex-row gap-2">
              {data.units.map((u, i) => (
                <li key={i}>
                  <UnitIcon unit={u} />
                </li>
              ))}
            </ul>
          </div>
          <div
            className={
              "absolute right-0 flex h-full flex-col justify-end bg-zinc-700"
            }
          >
            <PiCaretDown
              className={`${
                isExpanded ? "rotate-180 duration-150" : "duration-150"
              } cursor-pointer p-1 text-2xl text-zinc-950 hover:text-zinc-400`}
              onClick={() => setExpanded(!isExpanded)}
            />
          </div>
        </div>
        {isExpanded ? <MatchCard match_id={match.id} /> : null}
      </div>
    );
};

const TraitTag: React.FC<{ trait: Trait }> = ({ trait }) => {
  return (
    <div
      className={`flex flex-row flex-wrap items-center gap-1 rounded-full border border-zinc-950 bg-zinc-900 px-1 py-0.5 text-xs ${
        trait.style == 1
          ? "text-yellow-800"
          : trait.style == 2
          ? "text-slate-300"
          : trait.style == 3
          ? "text-yellow-500"
          : "text-violet-400"
      }`}
    >
      <TraitIcon trait={trait} className={"w-4"} />
      <span>{trait.name.split("_")[1]}</span>
    </div>
  );
};

export default CompCard;
