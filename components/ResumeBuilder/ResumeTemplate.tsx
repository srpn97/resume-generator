// components/ResumeBuilder/ResumeTemplate.tsx
'use client';

import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react';
import { ResumeData } from '@/types/resume';

interface ResumeTemplateProps {
    content: string;
    style: 'classic' | 'modern';
}

const A4_STYLES = {
    width: '210mm',
    height: '297mm',
    padding: '15mm 20mm',
    margin: '10mm auto',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
};

const ModernTemplate: React.FC<{ content: ResumeData }> = ({ content }) => {
    return (
        <div className="font-sans text-[#1A1A1A]">
            {/* Header Section */}
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold mb-1">{content.personalInfo.name}</h1>
                <div className="text-sm text-gray-600 italic mb-3">
                    {content.personalInfo.title}
                </div>

                {/* Contact Info */}
                <div className="flex justify-center items-center gap-4 text-sm flex-wrap">
                    <a
                        href={`mailto:${content.personalInfo.email}`}
                        className="flex items-center gap-1"
                    >
                        <Mail size={16} />
                        {content.personalInfo.email}
                    </a>
                    <a
                        href={`tel:${content.personalInfo.phone}`}
                        className="flex items-center gap-1"
                    >
                        <Phone size={16} />
                        {content.personalInfo.phone}
                    </a>
                    <span className="flex items-center gap-1">
                        <MapPin size={16} />
                        {content.personalInfo.location}
                    </span>
                    <a
                        href={content.personalInfo.website}
                        className="flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Globe size={16} />
                        {content.personalInfo.website}
                    </a>
                    <a
                        href={content.personalInfo.github}
                        className="flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Github size={16} />
                        {content.personalInfo.github.split('/').pop()}
                    </a>
                    <a
                        href={content.personalInfo.linkedin}
                        className="flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Linkedin size={16} />
                        {content.personalInfo.linkedin.split('/').pop()}
                    </a>
                </div>
            </div>

            {/* Summary Section */}
            <div className="mb-6">
                <h2 className="font-bold border-b border-black mb-2">Summary</h2>
                <p className="text-sm">{content.summary}</p>
            </div>

            {/* Skills Section */}
            <div className="mb-6">
                <h2 className="font-bold border-b border-black mb-2">SKILLS</h2>
                <div className="text-sm">
                    <div className="mb-1">
                        <span className="font-bold">Languages:</span>{' '}
                        {content.skills.languages.join(', ')}
                    </div>
                    <div className="mb-1">
                        <span className="font-bold">Frameworks:</span>{' '}
                        {content.skills.frameworks.join(', ')}
                    </div>
                    <div className="mb-1">
                        <span className="font-bold">Databases:</span>{' '}
                        {content.skills.databases.join(', ')}
                    </div>
                    <div className="mb-1">
                        <span className="font-bold">Cloud/DevOps:</span>{' '}
                        {content.skills.cloudDevOps.join(', ')}
                    </div>
                    <div className="mb-1">
                        <span className="font-bold">Tools:</span> {content.skills.tools.join(', ')}
                    </div>
                    <div className="mb-1">
                        <span className="font-bold">Methodologies:</span>{' '}
                        {content.skills.methodologies.join(', ')}
                    </div>
                </div>
            </div>

            {/* Education Section */}
            <div className="mb-6">
                <h2 className="font-bold border-b border-black mb-2">EDUCATION</h2>
                {content.education.map((edu, index) => (
                    <div key={index} className="text-sm mb-3">
                        <div className="flex justify-between mb-1">
                            <div>
                                <span className="font-bold">{edu.university}</span>, {edu.degree}
                            </div>
                            <div>
                                {edu.location} | {edu.dateRange}
                            </div>
                        </div>
                        <div className="ml-4">
                            <span className="font-bold">Relevant Coursework:</span>{' '}
                            {edu.coursework.join(', ')}
                        </div>
                    </div>
                ))}
            </div>

            {/* Professional Experience Section */}
            <div className="mb-6">
                <h2 className="font-bold border-b border-black mb-2">PROFESSIONAL EXPERIENCE</h2>
                {content.experience.map((exp, index) => (
                    <div key={index} className="text-sm mb-4">
                        <div className="flex justify-between mb-1">
                            <div>
                                <span className="font-bold">{exp.title}</span>, {exp.company}
                            </div>
                            <div>
                                {exp.location} | {exp.dateRange}
                            </div>
                        </div>
                        <ul className="list-disc ml-4 space-y-1">
                            {exp.achievements.map((achievement, i) => (
                                <li key={i}>{achievement}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Projects Section */}
            <div className="mb-6">
                <h2 className="font-bold border-b border-black mb-2">PROJECTS</h2>
                {content.projects.map((project, index) => (
                    <div key={index} className="text-sm mb-4">
                        <div className="flex justify-between mb-1">
                            <span className="font-bold">{project.name}</span>
                            <span>{project.dateRange}</span>
                        </div>
                        <ul className="list-disc ml-4 space-y-1">
                            {project.details.map((detail, i) => (
                                <li key={i}>{detail}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Page Number */}
            <div className="text-xs text-gray-400 text-right mt-4">Page 1</div>
        </div>
    );
};

export function ResumeTemplate({ content, style }: ResumeTemplateProps) {
    // Parse the JSON string to ResumeData
    let parsedContent: ResumeData;
    try {
        parsedContent = JSON.parse(content);
    } catch (error) {
        console.error('Error parsing resume content:', error);
        // Return a simple error message if parsing fails
        return (
            <div className="flex flex-col items-center overflow-auto w-full bg-gray-100 p-4">
                <div style={A4_STYLES} className="flex items-center justify-center">
                    <p className="text-red-500">Error parsing resume content</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center overflow-auto w-full bg-gray-100 p-4">
            <div style={A4_STYLES}>
                {style === 'modern' ? (
                    <ModernTemplate content={parsedContent} />
                ) : (
                    // Classic template (you can implement this separately if needed)
                    <div className="prose max-w-none">{content}</div>
                )}
            </div>
        </div>
    );
}
