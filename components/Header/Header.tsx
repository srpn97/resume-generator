'use client';

import { LoginButton } from '@/components/LoginButton/LoginButton';
import { LogoutButton } from '@/components/LogoutButton/LogoutButton';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { useUser } from '@auth0/nextjs-auth0/client';

export function Header() {
    const { user } = useUser();

    return (
        <header className="border-b border-border">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="text-xl font-bold text-primary">Resume Match</div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">{user.email}</span>
                            <LogoutButton />
                        </div>
                    ) : (
                        <LoginButton />
                    )}
                </div>
            </div>
        </header>
    );
}
