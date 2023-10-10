// file generate by downloader script
import { type Trait } from "../types/comp";
import Set9_Bastion from "../../public/trait/Set9_Bastion.svg";
import Set9_Sorcerer from "../../public/trait/Set9_Sorcerer.svg";
import Set9_BandleCity from "../../public/trait/Set9_BandleCity.svg";
import Set9_Deadeye from "../../public/trait/Set9_Deadeye.svg";
import Set9_Void from "../../public/trait/Set9_Void.svg";
import Set9_Demacia from "../../public/trait/Set9_Demacia.svg";
import Set9_Rogue from "../../public/trait/Set9_Rogue.svg";
import Set9_Slayer from "../../public/trait/Set9_Slayer.svg";
import Set9_Preserver from "../../public/trait/Set9_Preserver.svg";
import Set9_ReaverKing from "../../public/trait/Set9_ReaverKing.svg";
import Set9_Bruiser from "../../public/trait/Set9_Bruiser.svg";
import Set9_Noxus from "../../public/trait/Set9_Noxus.svg";
import Set9_Shurima from "../../public/trait/Set9_Shurima.svg";
import Set9_Strategist from "../../public/trait/Set9_Strategist.svg";
import Set9_Redeemer from "../../public/trait/Set9_Redeemer.svg";
import Set9_Piltover from "../../public/trait/Set9_Piltover.svg";
import Set9_Multicaster from "../../public/trait/Set9_Multicaster.svg";
import Set9_Marksman from "../../public/trait/Set9_Marksman.svg";
import Set9_Empress from "../../public/trait/Set9_Empress.svg";
import Set9_ShadowIsles from "../../public/trait/Set9_ShadowIsles.svg";
import Set9_Ixtal from "../../public/trait/Set9_Ixtal.svg";
import Set9_Freljord from "../../public/trait/Set9_Freljord.svg";
import Set9b_Bilgewater from "../../public/trait/Set9b_Bilgewater.svg";
import Set9_Targon from "../../public/trait/Set9_Targon.svg";
import Set9_Wanderer from "../../public/trait/Set9_Wanderer.svg";
import Set9_Zaun from "../../public/trait/Set9_Zaun.svg";
import Set9b_Vanquisher from "../../public/trait/Set9b_Vanquisher.svg";
import Set9_Armorclad from "../../public/trait/Set9_Armorclad.svg";
import Set9_Technogenius from "../../public/trait/Set9_Technogenius.svg";
import Set9_Challenger from "../../public/trait/Set9_Challenger.svg";
import Set9b_Darkin from "../../public/trait/Set9b_Darkin.svg";
import Set9_Ionia from "../../public/trait/Set9_Ionia.svg";

const iconMap = new Map<string, (className: string) => JSX.Element>([
  [
    "Set9_Bastion",
    (className: string): JSX.Element => <Set9_Bastion className={className} />,
  ],
  [
    "Set9_Sorcerer",
    (className: string): JSX.Element => <Set9_Sorcerer className={className} />,
  ],
  [
    "Set9_BandleCity",
    (className: string): JSX.Element => (
      <Set9_BandleCity className={className} />
    ),
  ],
  [
    "Set9_Deadeye",
    (className: string): JSX.Element => <Set9_Deadeye className={className} />,
  ],
  [
    "Set9_Void",
    (className: string): JSX.Element => <Set9_Void className={className} />,
  ],
  [
    "Set9_Demacia",
    (className: string): JSX.Element => <Set9_Demacia className={className} />,
  ],
  [
    "Set9_Rogue",
    (className: string): JSX.Element => <Set9_Rogue className={className} />,
  ],
  [
    "Set9_Slayer",
    (className: string): JSX.Element => <Set9_Slayer className={className} />,
  ],
  [
    "Set9_Preserver",
    (className: string): JSX.Element => (
      <Set9_Preserver className={className} />
    ),
  ],
  [
    "Set9_ReaverKing",
    (className: string): JSX.Element => (
      <Set9_ReaverKing className={className} />
    ),
  ],
  [
    "Set9_Bruiser",
    (className: string): JSX.Element => <Set9_Bruiser className={className} />,
  ],
  [
    "Set9_Noxus",
    (className: string): JSX.Element => <Set9_Noxus className={className} />,
  ],
  [
    "Set9_Shurima",
    (className: string): JSX.Element => <Set9_Shurima className={className} />,
  ],
  [
    "Set9_Strategist",
    (className: string): JSX.Element => (
      <Set9_Strategist className={className} />
    ),
  ],
  [
    "Set9_Redeemer",
    (className: string): JSX.Element => <Set9_Redeemer className={className} />,
  ],
  [
    "Set9_Piltover",
    (className: string): JSX.Element => <Set9_Piltover className={className} />,
  ],
  [
    "Set9_Multicaster",
    (className: string): JSX.Element => (
      <Set9_Multicaster className={className} />
    ),
  ],
  [
    "Set9_Marksman",
    (className: string): JSX.Element => <Set9_Marksman className={className} />,
  ],
  [
    "Set9_Empress",
    (className: string): JSX.Element => <Set9_Empress className={className} />,
  ],
  [
    "Set9_ShadowIsles",
    (className: string): JSX.Element => (
      <Set9_ShadowIsles className={className} />
    ),
  ],
  [
    "Set9_Ixtal",
    (className: string): JSX.Element => <Set9_Ixtal className={className} />,
  ],
  [
    "Set9_Freljord",
    (className: string): JSX.Element => <Set9_Freljord className={className} />,
  ],
  [
    "Set9b_Bilgewater",
    (className: string): JSX.Element => (
      <Set9b_Bilgewater className={className} />
    ),
  ],
  [
    "Set9_Targon",
    (className: string): JSX.Element => <Set9_Targon className={className} />,
  ],
  [
    "Set9_Wanderer",
    (className: string): JSX.Element => <Set9_Wanderer className={className} />,
  ],
  [
    "Set9_Zaun",
    (className: string): JSX.Element => <Set9_Zaun className={className} />,
  ],
  [
    "Set9b_Vanquisher",
    (className: string): JSX.Element => (
      <Set9b_Vanquisher className={className} />
    ),
  ],
  [
    "Set9_Armorclad",
    (className: string): JSX.Element => (
      <Set9_Armorclad className={className} />
    ),
  ],
  [
    "Set9_Technogenius",
    (className: string): JSX.Element => (
      <Set9_Technogenius className={className} />
    ),
  ],
  [
    "Set9_Challenger",
    (className: string): JSX.Element => (
      <Set9_Challenger className={className} />
    ),
  ],
  [
    "Set9b_Darkin",
    (className: string): JSX.Element => <Set9b_Darkin className={className} />,
  ],
  [
    "Set9_Ionia",
    (className: string): JSX.Element => <Set9_Ionia className={className} />,
  ],
]);

interface TraitProps {
  trait: Trait;
  className: string;
}

const TraitIcon: React.FC<TraitProps> = ({ trait, className }) => {
  const icon = iconMap.get(trait.name);
  if (!icon) {
    return null;
  }
  return icon(className);
};

export default TraitIcon;
