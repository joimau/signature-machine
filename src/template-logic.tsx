import React, { useState } from 'react';
import { StringField, EmailField, URLField, StringMultilineField } from './field-components';

interface Field {
    type: string;
    label: string;
}

export const parseTemplate = (template: string): Field[] => {
    if (!template) {
        return [];
    }

    const regex = /\{(\w+):([^\}]+)\}/g;
    const matches = Array.from(template.matchAll(regex));

    if (!matches.length) {
        console.warn('No placeholders found in the template.');
        return [];
    }

    const fields = matches.map(match => ({ type: match[1], label: match[2] }));

    // Extract unique fields based on label
    const uniqueLabels = new Set(fields.map(field => field.label));
    return Array.from(uniqueLabels).map(label => fields.find(field => field.label === label)!);
};

export const useTemplateFields = (template: string) => {
    const fields = parseTemplate(template);
    const [values, setValues] = useState<Record<string, string>>({});

    const renderedFields = fields.map(field => {
        const commonProps = {
            key: field.label,
            size: 'small' as 'small',
            label: field.label,
            value: values[field.label] || '',
            onChange: (e: React.ChangeEvent<HTMLInputElement | { value: any }>) =>
                setValues(prev => ({ ...prev, [field.label]: (e.target as any).value }))
        };

        switch (field.type) {
            case 'string':
                return <StringField {...commonProps} />;
            case 'email':
                return <EmailField {...commonProps} />;
            case 'url':
                return <URLField {...commonProps} />;
            case 'stringMultiline':
                return <StringMultilineField {...commonProps} />;
            default:
                console.warn(`Unsupported type: ${field.type}. Using default StringField.`);
                return <StringField {...commonProps} />;
        }
    });

    const filledTemplate = fields.reduce(
        (acc, field) => {
            const fieldValue = values[field.label];
            const regex = new RegExp(`\\{${field.type}:${field.label}\\}`, 'g');
            return acc.replace(regex, fieldValue || field.label);
        },
        template
    );

    return {
        renderedFields,
        filledTemplate
    };
};
