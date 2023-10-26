import {z} from "zod"

export const RankStatsSchema = z.object({
    total_games: z.number(),
    average_placement: z.number(),
    top_4_rate: z.number()
})

export type RankStats = z.infer<typeof RankStatsSchema>
