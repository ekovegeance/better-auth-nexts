import { router } from "@/trpc/init";
import { postRouter } from "@/trpc/routers/post";


/**
 * Add your routers here
 *
 * user: userRouter,
 */
export const appRouter = router( {

    post: postRouter

});

export type AppRouter = typeof appRouter;