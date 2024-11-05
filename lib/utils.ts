// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
