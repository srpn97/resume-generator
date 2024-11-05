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

interface Html2PdfOptionsExtended {
    margin: number;
    filename: string;
    image: {
        type: 'jpeg' | 'png' | 'webp';
        quality: number;
    };
    html2canvas: {
        scale: number;
        useCORS: boolean;
        letterRendering: boolean;
        logging: boolean;
        width?: number;
        windowWidth: number;
        x: number;
        y: number;
    };
    jsPDF: {
        unit: 'pt' | 'mm' | 'cm' | 'in' | 'px' | 'pc' | 'em' | 'ex';
        format: 'a4' | 'a3' | 'a5' | 'letter' | 'legal';
        orientation: 'portrait' | 'landscape';
        putOnlyUsedFonts: boolean;
        precision: 16;
        compress: boolean;
        userUnit: number;
    };
    pagebreak: {
        mode: string[];
        before: string[];
        after: string[];
        avoid: string[];
    };
}

export const generatePDF = async (elementId: string, options: PDFOptions) => {
    const element = document.getElementById(elementId);
    if (!element) {
        throw new Error('Element not found');
    }

    const opt: Html2PdfOptionsExtended = {
        margin: 0, // Set this to 0
        filename: options.filename || 'resume.pdf',
        image: {
            type: 'jpeg',
            quality: 0.98,
        },
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            logging: false,
            windowWidth: 794,
            x: 0, // Add this to remove left margin
            y: 0, // Add this to remove top margin
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
            putOnlyUsedFonts: true,
            compress: true,
            precision: 16,
            userUnit: 1.0,
        },
        pagebreak: {
            mode: ['css', 'avoid-all'],
            before: ['.page-break-before'],
            after: ['.page-break-after'],
            avoid: ['.page-break-avoid'],
        },
    };

    try {
        return await html2pdf(element, opt);
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};
