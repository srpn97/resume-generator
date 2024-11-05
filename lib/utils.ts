// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import html2pdf from 'html2pdf.js';
import type { StyleCustomization } from '@/types/resume';

interface PDFOptions {
    margins: string;
    filename?: string;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatSectionName(name: string): string {
    return (
        name
            // Split at camelCase
            .replace(/([A-Z])/g, ' $1')
            // Capitalize first letter
            .replace(/^./, (str) => str.toUpperCase())
            .trim()
    );
}

export const generatePDF = async (elementId: string, options: PDFOptions) => {
    const element = document.getElementById(elementId);
    if (!element) {
        throw new Error('Element not found');
    }

    // Create a deep clone of the element
    const clone = element.cloneNode(true) as HTMLElement;

    // Create a temporary container with specific styling
    const container = document.createElement('div');
    container.appendChild(clone);
    container.style.width = '210mm';
    container.style.margin = '0 auto';
    container.style.padding = '0';
    container.style.position = 'absolute';
    container.style.left = '0';
    container.style.top = '0';
    document.body.appendChild(container);
    console.log(options);
    try {
        const marginValue = Number(options.margins.replace('mm', ''));

        // Log dimensions before PDF generation
        console.log('Element dimensions:', {
            offsetWidth: element.offsetWidth,
            clientWidth: element.clientWidth,
            scrollWidth: element.scrollWidth,
            getBoundingClientRect: element.getBoundingClientRect(),
        });

        // Remove the problematic styles that were causing text overlap
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            @page {
                margin: 0;
                size: A4;
            }
            body {
                margin: 0;
                padding: 0;
            }
        `;
        clone.appendChild(styleElement);

        const opt = {
            margin: [marginValue, 0, marginValue, 0] as [number, number, number, number],
            filename: options.filename || 'resume.pdf',
            html2canvas: {
                scale: 2,
                useCORS: true,
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait' as const,
            },
            pagebreak: {
                mode: ['avoid-all'],
            },
        };

        await html2pdf().from(clone).set(opt).save();
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    } finally {
        document.body.removeChild(container);
    }
};
