'use client';

import React, { useState, useEffect } from 'react';
import { ResumeData, StyleCustomization } from '@/types/resume';
import { ModernTemplate } from './ModernTemplate';

interface ResumeTemplateProps {
    content: ResumeData;
    style: 'classic' | 'modern';
    styleCustomization: StyleCustomization;
    onSectionClick: (section: string) => void;
}

export function ResumeTemplate({
    content,
    style,
    styleCustomization,
    onSectionClick,
}: ResumeTemplateProps) {
    const [pageBreaks, setPageBreaks] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        const calculatePageBreaks = () => {
            const container = document.getElementById('resume-content');
            if (!container) return;

            const contentHeight = container.scrollHeight;
            const numberOfPages = Math.ceil(contentHeight / pageHeightPx);
            const newIndicators = [];

            for (let i = 1; i < numberOfPages; i++) {
                const positionPx = i * pageHeightPx - marginPx;
                newIndicators.push(
                    <div
                        key={i}
                        className="absolute flex items-center gap-1 right-0 text-xs text-gray-500"
                        style={{
                            top: `${positionPx}px`,
                        }}
                    >
                        <div className="w-4 border-t border-dashed border-gray-400" />
                        <span>Page {i}</span>
                    </div>
                );
            }

            setPageBreaks(newIndicators);
        };

        calculatePageBreaks();

        window.addEventListener('resize', calculatePageBreaks);
        return () => window.removeEventListener('resize', calculatePageBreaks);
    }, [content, styleCustomization]);

    const pageDimensions = {
        a4: {
            width: '210mm',
            height: '297mm',
        },
        letter: {
            width: '215.9mm',
            height: '279.4mm',
        },
    };

    const { width, height } = pageDimensions[styleCustomization.pageSize];
    const margin = styleCustomization.margins;
    const marginValue = parseInt(margin);

    // Convert mm to px for calculations (1mm ≈ 3.7795275591px)
    const mmToPx = 3.7795275591;
    const pageHeightPx = parseFloat(height) * mmToPx;
    const marginPx = marginValue * mmToPx;
    const contentHeightPerPage = pageHeightPx - 2 * marginPx;

    return (
        <div className="flex flex-col items-center w-full bg-gray-100 p-4">
            <div className="relative">
                <div
                    id="resume-content"
                    className="bg-white shadow-lg"
                    style={{
                        width,
                        minHeight: height,
                        height: 'auto',
                        padding: margin,
                        boxSizing: 'border-box',
                    }}
                >
                    <ModernTemplate
                        content={content}
                        styleCustomization={styleCustomization}
                        onSectionClick={onSectionClick}
                    />
                </div>
                {/* {pageBreaks} */}
                {/* uncomment this line for page breaks */}
            </div>
        </div>
    );
}
