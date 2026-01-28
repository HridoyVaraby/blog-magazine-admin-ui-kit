import NextAuth from "next-auth"

/**
 * Auth.js (NextAuth v5) Configuration
 * 
 * This is a minimal configuration for the Admin UI Kit.
 * Replace with your actual authentication providers.
 * 
 * To configure:
 * 1. Set AUTH_SECRET in your .env file (run: npx auth secret)
 * 2. Add your providers (Google, GitHub, Credentials, etc.)
 */

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [],
    pages: {
        signIn: "/auth",
    },
    callbacks: {
        authorized({ auth, request }) {
            // Allow all requests for demo purposes
            // In production, implement proper authorization
            return true
        },
        session({ session, token }) {
            // Add user role to session for demo
            if (session.user) {
                session.user.role = "ADMIN"
                session.user.id = token.sub || "demo-user"
            }
            return session
        },
        jwt({ token, user }) {
            if (user) {
                token.role = "ADMIN"
            }
            return token
        },
    },
    // Enable demo mode - remove in production
    trustHost: true,
})
