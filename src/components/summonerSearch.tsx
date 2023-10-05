import router from "next/router";
import { useState } from "react";
import { GoSearch, GoTriangleDown } from "react-icons/go";
import { regions, type Region } from "../types/region";

const SummonerSearch: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region>(regions[0]);
  const [summoner, setSummoner] = useState("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summoner) return;
    void router.push(`/${selectedRegion}/${summoner}`);
  };

  return (
    <form onSubmit={onSearch} className="flex w-[400px] flex-row text-zinc-300">
      <RegionSelector
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
      <input
        type="text"
        spellCheck="false"
        className="flex-grow border-y border-zinc-950 bg-zinc-700 px-3 text-base font-normal placeholder-zinc-500 outline-none"
        placeholder="Summoner name..."
        onChange={(e) => setSummoner(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r border border-l-0 border-zinc-950 bg-zinc-700 px-3 hover:text-zinc-400"
      >
        <GoSearch size={16} />
      </button>
    </form>
  );
};

interface RegionSelectorProps {
  selectedRegion: Region;
  setSelectedRegion: (value: Region | ((prevVar: Region) => Region)) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({
  selectedRegion,
  setSelectedRegion,
}) => {
  const [active, setActive] = useState(false);

  const onSelect = (selection: Region) => {
    setSelectedRegion(selection);
    setActive(false);
  };

  return (
    <div className="relative cursor-pointer select-none">
      <div
        className={`flex w-24 flex-row items-center justify-between ${
          active ? "rounded-tl" : "rounded-l"
        } border border-zinc-950 bg-zinc-700 px-3 py-1`}
        onClick={() => setActive(!active)}
      >
        <span className="text-base font-medium">
          {selectedRegion.toUpperCase()}
        </span>
        <GoTriangleDown
          className={`${active ? "rotate-180 duration-150" : "duration-150"}`}
        />
      </div>
      {active && (
        <ul className="absolute left-0 top-full z-10 w-full rounded-b border border-t-0 border-zinc-950 bg-zinc-800 py-1 text-sm font-normal drop-shadow-lg">
          {regions.map((region) => (
            <li
              key={region}
              className={`w-full px-3 py-0.5 opacity-80 hover:opacity-100 ${
                region === selectedRegion
                  ? "bg-violet-500 text-zinc-900"
                  : "bg-zinc-800 text-zinc-400 hover:bg-violet-500 hover:text-zinc-900"
              } `}
              onClick={() => onSelect(region)}
            >
              {region.toUpperCase()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SummonerSearch;
