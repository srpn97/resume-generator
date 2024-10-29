// types/resume.ts
export interface ResumeData {
    personalInfo: {
        name: string;
        title: string;
        email: string;
        phone: string;
        location: string;
        website: string;
        github: string;
        linkedin: string;
    };
    summary: string;
    skills: {
        languages: string[];
        frameworks: string[];
        databases: string[];
        cloudDevOps: string[];
        tools: string[];
        methodologies: string[];
    };
    education: Array<{
        university: string;
        degree: string;
        location: string;
        dateRange: string;
        coursework: string[];
    }>;
    experience: Array<{
        title: string;
        company: string;
        location: string;
        dateRange: string;
        achievements: string[];
    }>;
    projects: Array<{
        name: string;
        dateRange: string;
        details: string[];
    }>;
}
