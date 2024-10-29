import { getSession } from '@auth0/nextjs-auth0';
import { LoginButton } from '@/components/LoginButton/LoginButton';
import { LogoutButton } from '@/components/LogoutButton/LogoutButton';

export default async function Home() {
    const session = await getSession();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <h1 className="text-4xl font-bold">Resume Builder</h1>
                <div className="auth-buttons">
                    {!session ? (
                        <LoginButton />
                    ) : (
                        <div className="flex items-center gap-4">
                            <p>Welcome {session.user.name || session.user.email}</p>
                            <LogoutButton />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
