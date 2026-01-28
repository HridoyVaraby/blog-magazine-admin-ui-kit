"use client"

import { useSession, signOut as nextAuthSignOut } from "next-auth/react"

/**
 * Auth Hook
 * 
 * Provides authentication state and helpers.
 * In demo mode (when no auth is configured), returns a mock admin user.
 */
export const useAuth = () => {
    const { data: session, status } = useSession()

    // Demo user for standalone testing
    const demoUser = {
        name: "Demo Admin",
        email: "admin@example.com",
        role: "ADMIN" as const,
        id: "demo-user-id",
    }

    // Use session user if available, otherwise use demo user
    const user = session?.user ?? demoUser
    const isLoading = status === "loading"
    const isAuthenticated = status === "authenticated" || true // Always true in demo mode

    const signOut = async () => {
        if (session) {
            await nextAuthSignOut({ callbackUrl: "/" })
        } else {
            // Demo mode: just log
            console.log("Demo mode: sign out requested")
        }
    }

    return {
        user,
        isLoading,
        isAuthenticated,
        signOut,
        // Helper to check roles
        isAdmin: user?.role === "ADMIN",
        isEditor: user?.role === "EDITOR",
        canAccessDashboard: user?.role === "ADMIN" || user?.role === "EDITOR",
    }
}
