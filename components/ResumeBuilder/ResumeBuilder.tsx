// components/ResumeBuilder/ResumeBuilder.tsx
'use client';

import { Upload } from 'lucide-react';
import { useState, useRef } from 'react';
import { ResumeTemplate } from './ResumeTemplate';

export function ResumeBuilder() {
    const [jobDescription, setJobDescription] = useState('');
    const [resumeType, setResumeType] = useState<'classic' | 'modern'>('classic');
    const [generatedResume, setGeneratedResume] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resumeTemplate, setResumeTemplate] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleGenerateResume = async () => {
        if (!jobDescription) return;

        setIsLoading(true);
        try {
            const response = await fetch('/api/generate-resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jobDescription,
                    resumeTemplate,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate resume');
            }

            const reader = response.body!.getReader();
            const decoder = new TextDecoder();
            let resume = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const text = decoder.decode(value);
                resume += text;
                setGeneratedResume(resume);
            }
        } catch (error) {
            console.error('Error generating resume:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (file: File) => {
        if (!file) return;

        // Check file type
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
        ];
        if (!allowedTypes.includes(file.type)) {
            alert('Please upload a PDF, DOC, DOCX, or TXT file');
            return;
        }

        // Check file size (5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            alert('File size must be less than 5MB');
            return;
        }

        setFileName(file.name);

        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                setResumeTemplate(content);
            };
            reader.readAsText(file);
        } catch (error) {
            console.error('Error reading file:', error);
            alert('Error reading file. Please try again.');
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            await handleFileUpload(files[0]);
        }
    };

    const openFileSelector = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="grid h-[calc(100vh-4rem)] grid-cols-2">
            {/* Left Panel */}
            <div className="border-r border-border p-6">
                <div className="space-y-6">
                    {/* Job Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Job Description
                        </label>
                        <textarea
                            className="flex min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            placeholder="Paste job description here..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                    </div>

                    {/* Resume Type Selection */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Resume Style
                        </label>
                        <div className="flex gap-4">
                            {['classic', 'modern'].map((type) => (
                                <button
                                    key={type}
                                    className={`rounded-md px-4 py-2 text-sm ${
                                        resumeType === type
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                    }`}
                                    onClick={() => setResumeType(type as 'classic' | 'modern')}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Upload Resume Template
                        </label>
                        <div
                            className={`flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed ${
                                isDragging
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border bg-muted/50 hover:bg-muted'
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={openFileSelector}
                        >
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                <Upload size={24} />
                                {fileName ? (
                                    <span className="text-sm">{fileName}</span>
                                ) : (
                                    <>
                                        <span className="text-sm">
                                            Drop your resume template here
                                        </span>
                                        <span className="text-xs">or click to select</span>
                                    </>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                accept=".pdf,.docx,.doc,.txt"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleFileUpload(file);
                                }}
                            />
                        </div>
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={handleGenerateResume}
                        disabled={isLoading || !jobDescription}
                        className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                    >
                        {isLoading ? 'Generating...' : 'Generate Resume'}
                    </button>
                </div>
            </div>

            {/* Right Panel - Preview */}
            <div className="bg-muted/30 overflow-auto">
                {generatedResume ? (
                    <ResumeTemplate content={generatedResume} style={resumeType} />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        Preview will appear here
                    </div>
                )}
            </div>
        </div>
    );
}
