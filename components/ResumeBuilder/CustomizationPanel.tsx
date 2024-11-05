// components/ResumeBuilder/CustomizationPanel.tsx
'use client';

import { ArrowLeft } from 'lucide-react';
import { ResumeData, StyleCustomization } from '@/types/resume';
import { Button } from '@/components/ui/button';

interface CustomizationPanelProps {
    resumeData: ResumeData | null;
    selectedSection: string | null;
    onUpdate: (updatedContent: Partial<ResumeData>) => void;
    onBack: () => void;
    styleCustomization: StyleCustomization;
    onStyleChange: (style: Partial<StyleCustomization>) => void;
}

function formatSectionName(name: string): string {
    return name
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
}

export function CustomizationPanel({
    resumeData,
    selectedSection,
    onUpdate,
    onBack,
    styleCustomization,
    onStyleChange,
}: CustomizationPanelProps) {
    const handleInputChange = (field: string, value: any) => {
        const updatedContent = { ...resumeData } as any;
        const fields = field.split('.');
        let current = updatedContent;

        for (let i = 0; i < fields.length - 1; i++) {
            if (!current[fields[i]]) {
                current[fields[i]] = {};
            }
            current = current[fields[i]];
        }
        current[fields[fields.length - 1]] = value;

        onUpdate(updatedContent);
    };

    const renderStyleCustomization = () => (
        <div className="space-y-4">
            <h3 className="text-sm font-medium">Visual Style</h3>
            <div className="grid gap-4">
                <div>
                    <label className="text-sm text-muted-foreground">Margins</label>
                    <select
                        value={styleCustomization.margins}
                        onChange={(e) => onStyleChange({ margins: e.target.value })}
                        className="w-full rounded-md border p-2 mt-1"
                    >
                        <option value="15mm">Narrow (15mm)</option>
                        <option value="20mm">Normal (20mm)</option>
                        <option value="25mm">Wide (25mm)</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm text-muted-foreground">Line Spacing</label>
                    <select
                        value={styleCustomization.spacing}
                        onChange={(e) => onStyleChange({ spacing: e.target.value })}
                        className="w-full rounded-md border p-2 mt-1"
                    >
                        <option value="1.25">Compact (1.25)</option>
                        <option value="1.5">Normal (1.5)</option>
                        <option value="1.75">Spacious (1.75)</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm text-muted-foreground">Font Size</label>
                    <select
                        value={styleCustomization.fontSize}
                        onChange={(e) => onStyleChange({ fontSize: e.target.value })}
                        className="w-full rounded-md border p-2 mt-1"
                    >
                        <option value="12px">Small (12px)</option>
                        <option value="14px">Medium (14px)</option>
                        <option value="16px">Large (16px)</option>
                    </select>
                </div>

                {/* Title Break Controls */}
                <div>
                    <label className="text-sm text-muted-foreground">Title Layout</label>
                    <div className="space-y-2 mt-1">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={styleCustomization.titleBreak.education}
                                onChange={(e) =>
                                    onStyleChange({
                                        titleBreak: {
                                            ...styleCustomization.titleBreak,
                                            education: e.target.checked,
                                        },
                                    })
                                }
                                className="rounded border-gray-300"
                            />
                            <span className="text-sm">Break education titles to new line</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={styleCustomization.titleBreak.experience}
                                onChange={(e) =>
                                    onStyleChange({
                                        titleBreak: {
                                            ...styleCustomization.titleBreak,
                                            experience: e.target.checked,
                                        },
                                    })
                                }
                                className="rounded border-gray-300"
                            />
                            <span className="text-sm">Break experience titles to new line</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderFields = (data: any, section: string) => {
        if (!data) return null;

        const sectionData = section.includes('.')
            ? section.split('.').reduce((obj, key) => obj[key], data)
            : data[section];

        if (typeof sectionData === 'string') {
            return (
                <textarea
                    value={sectionData}
                    onChange={(e) => handleInputChange(section, e.target.value)}
                    className="w-full rounded-md border p-2 min-h-[100px]"
                />
            );
        }

        if (Array.isArray(sectionData)) {
            return (
                <div className="space-y-4">
                    {sectionData.map((item, index) => (
                        <div key={index} className="p-4 border rounded-md space-y-2">
                            {Object.entries(item).map(([key, value]) => (
                                <div key={key}>
                                    <label className="text-sm text-muted-foreground">
                                        {formatSectionName(key)}
                                    </label>
                                    {Array.isArray(value) ? (
                                        <div className="space-y-2">
                                            {(value as string[]).map((v, i) => (
                                                <input
                                                    key={i}
                                                    type="text"
                                                    value={v}
                                                    onChange={(e) => {
                                                        const newArr = [...value];
                                                        newArr[i] = e.target.value;
                                                        handleInputChange(
                                                            `${section}.${index}.${key}`,
                                                            newArr
                                                        );
                                                    }}
                                                    className="w-full rounded-md border p-2 mt-1"
                                                />
                                            ))}
                                            <button
                                                onClick={() => {
                                                    const newArr = [...value, ''];
                                                    handleInputChange(
                                                        `${section}.${index}.${key}`,
                                                        newArr
                                                    );
                                                }}
                                                className="text-sm text-primary hover:text-primary/90"
                                            >
                                                + Add {formatSectionName(key)}
                                            </button>
                                        </div>
                                    ) : (
                                        <input
                                            type="text"
                                            value={value as string}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    `${section}.${index}.${key}`,
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-md border p-2 mt-1"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                    <button
                        onClick={() => {
                            const newItem = Object.fromEntries(
                                Object.keys(sectionData[0]).map((key) => [
                                    key,
                                    Array.isArray(sectionData[0][key]) ? [] : '',
                                ])
                            );
                            handleInputChange(section, [...sectionData, newItem]);
                        }}
                        className="w-full py-2 text-sm text-primary hover:text-primary/90 border-2 border-dashed rounded-md"
                    >
                        + Add {formatSectionName(section)} Entry
                    </button>
                </div>
            );
        }

        return (
            <div className="space-y-2">
                {Object.entries(sectionData).map(([key, value]) => (
                    <div key={key}>
                        <label className="text-sm text-muted-foreground">
                            {formatSectionName(key)}
                        </label>
                        {Array.isArray(value) ? (
                            <div className="space-y-2">
                                {(value as string[]).map((v, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        value={v}
                                        onChange={(e) => {
                                            const newArr = [...value];
                                            newArr[i] = e.target.value;
                                            handleInputChange(`${section}.${key}`, newArr);
                                        }}
                                        className="w-full rounded-md border p-2 mt-1"
                                    />
                                ))}
                                <button
                                    onClick={() => {
                                        const newArr = [...value, ''];
                                        handleInputChange(`${section}.${key}`, newArr);
                                    }}
                                    className="text-sm text-primary hover:text-primary/90"
                                >
                                    + Add {formatSectionName(key)}
                                </button>
                            </div>
                        ) : (
                            <input
                                type="text"
                                value={value as string}
                                onChange={(e) =>
                                    handleInputChange(`${section}.${key}`, e.target.value)
                                }
                                className="w-full rounded-md border p-2 mt-1"
                            />
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {selectedSection ? (
                <>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" onClick={onBack} className="p-2">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <h2 className="text-lg font-semibold">
                            Edit {formatSectionName(selectedSection)}
                        </h2>
                    </div>
                    {renderFields(resumeData, selectedSection)}
                </>
            ) : (
                <>
                    <h2 className="text-lg font-semibold">Visual Customization</h2>
                    {renderStyleCustomization()}
                </>
            )}
        </div>
    );
}
