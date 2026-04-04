import { createAuthClient } from "better-auth/react"
export const auth = createAuthClient()

export const {
    signUp,
    signIn,
    signOut,
    useSession,
} = auth;