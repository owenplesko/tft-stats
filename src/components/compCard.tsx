import type { Comp, Trait, Unit } from "~/types/comp";
import {
  formatDuration,
  formatPlacement,
  formatStageNumber,
  formatTimeAgo,
} from "~/util/stringFormatting";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { PiCaretDown } from "react-icons/pi";
import TraitIcon from "./TraitIcon";

const CompCard: React.FC<{ comp: Comp }> = ({ comp }) => {
  return (
    <div className="relative flex w-[1000px] flex-row items-center gap-6 rounded-sm border border-zinc-950 bg-zinc-800 px-5 py-4">
      <div
        className={`absolute left-0 h-full w-1 opacity-90 ${
          comp.placement === 1
            ? "bg-violet-500"
            : comp.placement === 2
            ? "bg-yellow-400"
            : comp.placement === 3
            ? "bg-slate-300"
            : comp.placement === 4
            ? "bg-yellow-800"
            : "bg-zinc-700"
        }`}
      />
      <div className="flex w-28 flex-col">
        <span className="text-xl font-medium text-zinc-300">
          {formatPlacement(comp.placement)}
        </span>
        <span className="text-lg font-normal text-zinc-300">
          {comp.match.queue_id === 1100 ? "Ranked" : "Normal"}
        </span>
        <span
          className="text-sm font-normal text-zinc-400"
          suppressHydrationWarning={true}
        >
          {formatTimeAgo(comp.match.date / 1000)}
        </span>
        <span className="text-sm font-normal text-zinc-400">
          {formatStageNumber(comp.last_round)}
        </span>
        <span className="text-sm font-normal text-zinc-400">
          {formatDuration(comp.time_eliminated)}
        </span>
      </div>
      <div className="relative">
        <Image
          className="rounded-full border border-zinc-950"
          src={`/companion/${comp.companion}.png`}
          width={48}
          height={48}
          alt={`companion/${comp.companion}.png`}
        />
        <span className="absolute bottom-0 right-0 rounded-full bg-zinc-900 px-2 py-1 text-xs text-zinc-300">
          {comp.level}
        </span>
      </div>
      <ul className="flex flex-col justify-between self-stretch">
        {comp.augments.map((augment) => (
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
        <ul className="flex gap-1">
          {comp.traits
            .sort((a, b) => b.style - a.style)
            .map((trait) => (
              <li key={trait.name}>
                <TraitTag trait={trait} />
              </li>
            ))}
        </ul>
        <ul className="flex flex-row gap-2">
          {comp.units.map((u, i) => (
            <li key={i}>
              <UnitIcon unit={u} />
            </li>
          ))}
        </ul>
      </div>
      <div
        className={
          "absolute right-0 flex h-full flex-col items-center justify-end bg-zinc-700 p-1"
        }
      >
        <PiCaretDown className="text-base text-zinc-950" />
      </div>
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

const UnitIcon: React.FC<{ unit: Unit }> = ({ unit }) => {
  return (
    <div className="flex flex-col items-center">
      {/* unit star level */}
      <div className="flex flex-row text-sm">
        {unit.tier === 1 ? (
          <AiFillStar className="text-slate-300" />
        ) : unit.tier === 2 ? (
          <>
            <AiFillStar className="text-slate-300" />
            <AiFillStar className="text-slate-300" />
          </>
        ) : (
          <>
            <AiFillStar className="text-yellow-500" />
            <AiFillStar className="text-yellow-500" />
            <AiFillStar className="text-yellow-500" />
          </>
        )}
      </div>

      {/* unit image */}
      <Image
        className={`rounded-sm border outline ${
          unit.rarity === 0
            ? "border-zinc-400"
            : unit.rarity === 1
            ? "border-emerald-500"
            : unit.rarity === 2
            ? "border-blue-500"
            : unit.rarity === 4
            ? "border-violet-500"
            : "border-yellow-500"
        }`}
        src={`/unit/${unit.character_id}.png`}
        width={48}
        height={48}
        alt={unit.character_id}
      />

      {/* unit items */}
      <ul className="flex flex-row justify-center gap-[1px]">
        {unit.items.map((item, i) => (
          <li key={i}>
            <Image
              className="rounded-sm border border-zinc-950"
              src={`/item/${item}.png`}
              width={16}
              height={16}
              alt={item}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompCard;
