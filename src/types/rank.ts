import { z } from "zod";

export const RankSchema = z.object({
    type: z.string(),
    tier: z.string(),
    division: z.string(),
    lp: z.number(),
});

export type Rank = z.infer<typeof RankSchema>
  