import {z} from "zod"

export const MatchStatsSchema = z.object({
    total_games: z.number(),
    average_placement: z.number(),
    top_4_rate: z.number()
})

export type MatchStats = z.infer<typeof MatchStatsSchema>
