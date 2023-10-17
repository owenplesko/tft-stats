import { z } from "zod";
import { InternalRegionSchema } from "./region";

export const SummonerSchema = z.object({
    puuid: z.string(),
    region: InternalRegionSchema,
    name: z.string(),
    profileIconId: z.number(),
    summonerLevel: z.number(),
    lastUpdated: z.number(),
});

export type Summoner = z.infer<typeof SummonerSchema>
