import { z } from "zod";
import { InternalRegionSchema } from "./region";

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

const ParticipantSchema = z.object({
  region: InternalRegionSchema,
  name: z.string(),
});

const QueueIdSchema = z.union([z.literal(1100), z.literal(1090)]);

const MatchSchema = z.object({
  id: z.string(),
  date: z.number(),
  game_length: z.number(),
  game_version: z.string(),
  queue_id: QueueIdSchema,
  game_type: z.string(),
  set_name: z.string(),
  set_number: z.number(),
  participants: z.array(ParticipantSchema),
});

export const CompSchema = z.object({
  match: MatchSchema,
  placement: z.number(),
  last_round: z.number(),
  level: z.number(),
  remaining_gold: z.number(),
  player_damage_dealt: z.number(),
  time_eliminated: z.number(),
  companion: z.number(),
  augments: z.array(z.string()),
  traits: z.array(TraitSchema),
  units: z.array(UnitSchema),
});

export type Comp = z.infer<typeof CompSchema>;
