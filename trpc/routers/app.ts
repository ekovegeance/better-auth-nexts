import { createTRPCRouter, publicProcedure } from '../init';
import {postRouter} from "@/trpc/routers/post";

export const appRouter = createTRPCRouter({

    healthCheck: publicProcedure.query(() => {
        return { status: 'ok', time: new Date() };
    }),
    post: postRouter
});

export type AppRouter = typeof appRouter;