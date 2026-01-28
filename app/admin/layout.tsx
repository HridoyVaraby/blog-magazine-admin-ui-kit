'use client';

import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

/**
 * Admin Layout
 * 
 * This is a demo layout for the Admin UI Kit.
 * Authentication checks have been simplified for standalone use.
 * 
 * To enable authentication:
 * 1. Configure providers in /auth.ts
 * 2. Uncomment the useSession logic below
 * 3. Set up your AUTH_SECRET in .env
 */
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Demo mode: Authentication bypassed
    // Uncomment below to enable auth:
    // const { data: session, status } = useSession();
    // const router = useRouter();
    // 
    // useEffect(() => {
    //     if (status === 'loading') return;
    //     if (!session || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
    //         router.push('/auth');
    //     }
    // }, [session, status, router]);
    // 
    // if (status === 'loading') {
    //     return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    // }
    // 
    // if (!session) return null;

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AdminSidebar />
                <SidebarInset className="flex-1">
                    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
                        <SidebarTrigger className="-ml-1" />
                        <div className="flex items-center gap-2 flex-1">
                            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
                            <span className="ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                Demo Mode
                            </span>
                        </div>
                    </header>
                    <main className="flex-1 p-6 bg-gray-50">
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
