import { z } from "zod";
import { InternalRegionSchema } from "./region";
import { RankSchema } from "./rank";

export const SummonerSchema = z.object({
    puuid: z.string(),
    region: InternalRegionSchema,
    name: z.string(),
    profileIconId: z.number(),
    summonerLevel: z.number(),
    lastUpdated: z.number(),
    rank: RankSchema.nullable(),
});

export type Summoner = z.infer<typeof SummonerSchema>
