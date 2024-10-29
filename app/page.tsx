import { Header } from '@/components/Header/Header';
import { ResumeBuilder } from '@/components/ResumeBuilder/ResumeBuilder';

export default function Home() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <ResumeBuilder />
        </div>
    );
}
