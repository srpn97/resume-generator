'use client';

import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Download } from 'lucide-react';
import { ResumeData, StyleCustomization } from '@/types/resume';
import { generatePDF } from '@/lib/utils';

interface ResumeTemplateProps {
    content: ResumeData;
    style: 'classic' | 'modern' | 'modern-pdf';
    styleCustomization: StyleCustomization;
    onSectionClick: (section: string) => void;
}

interface ModernTemplateProps {
    content: ResumeData;
    styleCustomization: StyleCustomization;
    onSectionClick: (section: string) => void;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({
    content,
    styleCustomization,
    onSectionClick,
}) => {
    const renderSection = (title: string, children: React.ReactNode, sectionKey: string) => (
        <section className="resume-section clearfix" onClick={() => onSectionClick(sectionKey)}>
            <h2 className="font-bold border-b border-black pb-2 mb-4">{title}</h2>
            <div className="resume-content">{children}</div>
        </section>
    );

    return (
        <div
            style={{
                fontFamily: styleCustomization.fontFamily,
                fontSize: styleCustomization.fontSize,
                lineHeight: styleCustomization.spacing,
                margin: 0,
                padding: 0,
            }}
        >
            {/* Personal Info without section title */}
            <div className="text-center mb-6 print:break-inside-avoid page-break-avoid">
                <h1 className="text-2xl font-bold mb-1 text-gray-900">
                    {content.personalInfo.name}
                </h1>
                <div className="text-gray-600 mb-4">{content.personalInfo.title}</div>
                <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-700">
                    <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span>{content.personalInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        <span>{content.personalInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{content.personalInfo.location}</span>
                    </div>
                    {content.personalInfo.github && (
                        <div className="flex items-center gap-1">
                            <Github className="w-4 h-4" />
                            <span>{content.personalInfo.github}</span>
                        </div>
                    )}
                    {content.personalInfo.linkedin && (
                        <div className="flex items-center gap-1">
                            <Linkedin className="w-4 h-4" />
                            <span>{content.personalInfo.linkedin}</span>
                        </div>
                    )}
                    {content.personalInfo.website && (
                        <div className="flex items-center gap-1">
                            <Globe className="w-4 h-4" />
                            <span>{content.personalInfo.website}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Summary */}
            {content.summary &&
                renderSection(
                    'Summary',
                    <p className="text-justify text-gray-700">{content.summary}</p>,
                    'summary'
                )}

            {/* Experience */}
            {content.experience?.length > 0 &&
                renderSection(
                    'Experience',
                    <div className="space-y-4">
                        {content.experience.map((exp, index) => (
                            <div key={index} className="resume-entry mb-4">
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <div className="font-bold text-gray-900">{exp.title}</div>
                                        <div className="text-gray-700">{exp.company}</div>
                                    </div>
                                    <div className="text-right text-gray-600">
                                        <div>{exp.dateRange}</div>
                                        <div>{exp.location}</div>
                                    </div>
                                </div>
                                <ul className="list-disc ml-4 mt-2 space-y-1">
                                    {exp.achievements.map((achievement, i) => (
                                        <li key={i} className="text-gray-700 text-sm">
                                            {achievement}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>,
                    'experience'
                )}

            {/* Education */}
            {content.education?.length > 0 &&
                renderSection(
                    'Education',
                    <div className="space-y-4">
                        {content.education.map((edu, index) => (
                            <div key={index} className="resume-entry mb-4">
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <div className="font-bold text-gray-900">
                                            {edu.university}
                                        </div>
                                        <div className="text-gray-700">{edu.degree}</div>
                                    </div>
                                    <div className="text-right text-gray-600">
                                        <div>{edu.dateRange}</div>
                                        <div>{edu.location}</div>
                                    </div>
                                </div>
                                {edu.coursework.length > 0 && (
                                    <div className="mt-1 text-sm text-gray-700">
                                        <span className="font-semibold">Coursework: </span>
                                        {edu.coursework.join(', ')}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>,
                    'education'
                )}

            {/* Skills */}
            {content.skills &&
                renderSection(
                    'Skills',
                    <div className="space-y-2">
                        {Object.entries(content.skills).map(
                            ([category, skills]) =>
                                skills.length > 0 && (
                                    <div key={category} className="page-break-avoid text-gray-700">
                                        <span className="font-bold capitalize text-gray-900">
                                            {category.replace(/([A-Z])/g, ' $1').trim()}:
                                        </span>{' '}
                                        <span className="text-sm">{skills.join(', ')}</span>
                                    </div>
                                )
                        )}
                    </div>,
                    'skills'
                )}

            {/* Projects */}
            {content.projects?.length > 0 &&
                renderSection(
                    'Projects',
                    <div className="space-y-4">
                        {content.projects.map((project, index) => (
                            <div key={index} className="page-break-avoid">
                                <div className="flex justify-between items-start mb-1">
                                    <div className="font-bold text-gray-900">{project.name}</div>
                                    <div className="text-gray-600">{project.dateRange}</div>
                                </div>
                                <ul className="list-disc ml-4 mt-2 space-y-1">
                                    {project.details.map((detail, i) => (
                                        <li key={i} className="text-gray-700 text-sm">
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>,
                    'projects'
                )}
        </div>
    );
};

export function ResumeTemplate({
    content,
    style,
    styleCustomization,
    onSectionClick,
}: ResumeTemplateProps) {
    const [isGenerating, setIsGenerating] = React.useState(false);

    const handleGeneratePDF = async () => {
        try {
            setIsGenerating(true);
            const contentElement = document.getElementById('resume-content');
            if (!contentElement) {
                console.error('Resume content element not found');
                return;
            }

            // Store original padding
            const originalPadding = contentElement.style.padding;
            // Remove padding for PDF generation
            contentElement.style.paddingTop = '0';
            contentElement.style.paddingBottom = '0';
            // Remove any print:hidden elements temporarily
            const printHiddenElements = contentElement.querySelectorAll('.print\\:hidden');
            printHiddenElements.forEach((el) => el.classList.add('hidden'));

            await generatePDF('resume-content', {
                margins: String(styleCustomization.margins || 20),
                filename: `${content.personalInfo.name
                    .toLowerCase()
                    .replace(/\s+/g, '-')}-resume.pdf`,
            });

            // Restore original padding and elements
            contentElement.style.paddingTop = originalPadding;
            contentElement.style.paddingBottom = originalPadding;
            printHiddenElements.forEach((el) => el.classList.remove('hidden'));
        } catch (error) {
            console.error('Failed to generate PDF:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex flex-col items-center w-full bg-gray-100 p-4">
            {/* Print Button */}
            <div className="w-[210mm] mb-4 flex justify-end print:hidden">
                <button
                    onClick={handleGeneratePDF}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
                >
                    <Download size={16} />
                    {isGenerating ? 'Generating...' : 'Save as PDF'}
                </button>
            </div>

            {/* Resume Content */}
            <div
                id="resume-content"
                className="w-[210mm] bg-white shadow-lg"
                style={{
                    padding: `${styleCustomization.margins || '20mm'}`,
                    boxSizing: 'border-box',
                    minHeight: '297mm',
                    height: 'auto',
                    position: 'relative',
                    visibility: 'visible',
                    display: 'block',
                }}
            >
                <ModernTemplate
                    content={content}
                    styleCustomization={styleCustomization}
                    onSectionClick={onSectionClick}
                />
            </div>
        </div>
    );
}
