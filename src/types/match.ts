import { z } from "zod";

const QueueIdSchema = z.union([z.literal(1100), z.literal(1090)]);

export const MatchSchema = z.object({
    id: z.string(),
    date: z.number(),
    game_length: z.number(),
    game_version: z.string(),
    queue_id: QueueIdSchema,
    game_type: z.string(),
    set_name: z.string(),
    set_number: z.number(),
});

export type Match = z.infer<typeof MatchSchema>
