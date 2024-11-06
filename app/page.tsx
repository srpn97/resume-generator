// app/page.tsx
import { Header } from '@/components/Header/Header';
import { ResumeBuilder } from '@/components/ResumeBuilder/ResumeBuilder';
import { getSession } from '@auth0/nextjs-auth0';
import LandingPage from '@/components/LandingPage/LandingPage';

export default async function Home() {
    const session = await getSession();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <div>
                {!session?.user ? (
                    <div>
                        <LandingPage />
                    </div>
                ) : (
                    <ResumeBuilder />
                )}
            </div>
        </div>
    );
}
