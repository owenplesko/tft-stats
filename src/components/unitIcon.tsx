import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { type Unit } from "~/types/comp";

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

export default UnitIcon;
