import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";


export const createContext = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    });

    return {
        db,
        session,
        user: session?.user,
    };
};

const t = initTRPC
    .context<Awaited<ReturnType<typeof createContext>>>()
    .create({
        transformer: superjson
    })

// Base router and procedure helpers
export const router = t.router;
export const createCallerFactory = t.createCallerFactory;

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
    if (!ctx.session || !ctx.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not Login' });
    }

    return next({
        ctx: {
            ...ctx,
            session: ctx.session,
            user: ctx.user,
        },
    });
});