'use client';

import React from 'react';
import { LogIn, UserPlus, FileText, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
    const router = useRouter();

    const handleAuth = (type: 'login' | 'signup') => {
        const url = type === 'signup' ? '/api/auth/login?screen_hint=signup' : '/api/auth/login';
        router.push(url);
    };

    const features = [
        {
            icon: <FileText className="w-6 h-6 mb-4 text-primary" />,
            title: 'AI-Powered Resume Builder',
            description: 'Create tailored resumes instantly with advanced AI technology',
        },
        {
            icon: <Shield className="w-6 h-6 mb-4 text-primary" />,
            title: 'ATS-Friendly Templates',
            description: 'Ensure your resume passes through Applicant Tracking Systems',
        },
        {
            icon: <Zap className="w-6 h-6 mb-4 text-primary" />,
            title: 'Real-time Customization',
            description: 'Adjust your resume on the fly with AI assistance',
        },
    ];

    return (
        <>
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                            Create the Perfect Resume with AI
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Transform your job search with AI-powered resume tailoring. Match any
                            job description instantly.
                        </p>
                        <div className="space-x-4">
                            <Button
                                size="lg"
                                onClick={() => handleAuth('login')}
                                className="bg-primary hover:bg-primary/90"
                            >
                                <LogIn className="mr-2 h-4 w-4" />
                                Login
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => handleAuth('signup')}
                                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                            >
                                <UserPlus className="mr-2 h-4 w-4" />
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-muted/50 py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-lg bg-background shadow-lg hover:shadow-xl transition-shadow"
                            >
                                {feature.icon}
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
