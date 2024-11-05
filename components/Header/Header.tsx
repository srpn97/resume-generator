'use client';

import { LoginButton } from '@/components/LoginButton/LoginButton';
import { LogoutButton } from '@/components/LogoutButton/LogoutButton';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

interface HeaderProps {
    className?: string;
}

export function Header({ className }: HeaderProps) {
    const { user } = useUser();

    return (
        <header
            className={`sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm ${className}`}
        >
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    className="text-xl font-bold text-primary hover:text-primary/90 transition-colors"
                >
                    Resume Match
                </Link>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {user && (
                        <span className="text-sm text-muted-foreground hidden sm:inline-block">
                            {user.email}
                        </span>
                    )}
                    {user ? <LogoutButton /> : <LoginButton />}
                </div>
            </div>
        </header>
    );
}
