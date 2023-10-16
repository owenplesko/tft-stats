import { z } from "zod";

const TraitSchema = z.object({
  name: z.string(),
  style: z.number(),
  tier_active: z.number(),
  tier_max: z.number(),
});

export type Trait = z.infer<typeof TraitSchema>;

const UnitSchema = z.object({
  character_id: z.string(),
  rarity: z.number(),
  tier: z.number(),
  items: z.array(z.string()),
});

export type Unit = z.infer<typeof UnitSchema>;

export const CompSchema = z.object({
  placement: z.number(),
  last_round: z.number(),
  level: z.number(),
  remaining_gold: z.number(),
  player_damage_dealt: z.number(),
  time_eliminated: z.number(),
  companion: z.number(),
  augments: z.array(z.string()),
  traits: z.array(TraitSchema).nullable(), // temp fix for go returning empty arrays as null
  units: z.array(UnitSchema),
});

export type Comp = z.infer<typeof CompSchema>;
