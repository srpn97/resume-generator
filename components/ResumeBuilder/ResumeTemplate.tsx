'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ResumeData, StyleCustomization } from '@/types/resume';
import { ModernTemplate } from './ModernTemplate';
import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    const [isPrinting, setIsPrinting] = useState(false);

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

    useEffect(() => {
        const beforePrint = () => setIsPrinting(true);
        const afterPrint = () => setIsPrinting(false);

        window.addEventListener('beforeprint', beforePrint);
        window.addEventListener('afterprint', afterPrint);

        return () => {
            window.removeEventListener('beforeprint', beforePrint);
            window.removeEventListener('afterprint', afterPrint);
        };
    }, []);

    const handlePrint = useCallback(() => {
        window.print();
    }, []);

    return (
        <>
            <style jsx global>{`
                @page {
                    size: ${styleCustomization.pageSize};
                    margin: ${margin};
                }

                @media screen {
                    #resume-content {
                        width: ${width};
                        min-height: ${height};
                        padding: ${margin};
                        background: white;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
                }

                @media print {
                    html,
                    body {
                        margin: 0 !important;
                        padding: 0 !important;
                        height: auto !important;
                        overflow: visible !important;
                    }

                    body * {
                        visibility: hidden;
                    }

                    .print-container {
                        visibility: visible;
                        position: absolute !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 100% !important;
                        height: auto !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }

                    #resume-content {
                        visibility: visible;
                        display: block !important;
                        position: relative !important;
                        width: 100% !important;
                        height: auto !important;
                        overflow: visible !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }

                    #resume-content * {
                        visibility: visible;
                        overflow: visible !important;
                    }

                    .print-hide,
                    .print-hidden {
                        display: none !important;
                    }

                    /* Control section breaks */
                    .section {
                        page-break-inside: avoid;
                        break-inside: avoid;
                    }

                    /* Prevent orphaned headers */
                    h1,
                    h2,
                    h3,
                    h4,
                    h5,
                    h6 {
                        page-break-after: avoid;
                        break-after: avoid;
                    }

                    /* Keep list items together when possible */
                    li {
                        page-break-inside: avoid;
                        break-inside: avoid;
                    }
                }
            `}</style>

            <div className="print-container flex flex-col items-center w-full bg-gray-100 p-4 print:p-0 print:bg-white">
                <div className="w-full max-w-[${width}] mb-4 flex justify-end print:hidden">
                    <Button
                        onClick={handlePrint}
                        className="flex items-center gap-2 print:hidden"
                        variant="outline"
                    >
                        <Printer className="h-4 w-4" />
                        Print Resume
                    </Button>
                </div>
                <div className="relative flex justify-center w-full print:block print:w-full">
                    <div id="resume-content">
                        <ModernTemplate
                            content={content}
                            styleCustomization={styleCustomization}
                            onSectionClick={onSectionClick}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
