import { Comp } from "~/types/comp";
import {
  formatDuration,
  formatPlacement,
  formatStageNumber,
  formatTimeAgo,
} from "~/util/stringFormatting";
import Image from "next/image";

const CompCard: React.FC<{ comp: Comp }> = ({ comp }) => {
  return (
    <li
      key={comp.match.id}
      className="relative flex w-[1000px] flex-row items-center gap-4 rounded-sm border border-zinc-950 bg-zinc-800 px-5 py-4"
    >
      <div
        className={`absolute left-0 top-0 h-full w-1 self-stretch shadow-sm ${
          comp.placement <= 4 ? "bg-violet-500" : "bg-zinc-500"
        }`}
      />
      <div className="flex w-24 flex-col">
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
      <div className="relative flex items-center justify-center">
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
      <ul className="flex flex-col justify-evenly">
        {comp.augments.map((augment) => (
          <li>
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
    </li>
  );
};

export default CompCard;
