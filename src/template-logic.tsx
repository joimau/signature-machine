import React, { useState } from 'react';
import { TextField } from '@mui/material';

interface Field {
    type: string;
    label: string;
}

export const parseTemplate = (template: string): Field[] => {
    const regex = /\{(\w+):(\w+ ?\w*)\}/g;
    const matches = Array.from(template.matchAll(regex));
    const fields = matches.map(match => ({ type: match[1], label: match[2] }));

    // Extract unique fields based on label
    const uniqueLabels = new Set(fields.map(field => field.label));
    return Array.from(uniqueLabels).map(label => fields.find(field => field.label === label)!);
};



export const useTemplateFields = (template: string) => {
    const fields = parseTemplate(template);
    const [values, setValues] = useState<Record<string, string>>({});

    const renderedFields = fields.map(field => (
        <TextField
            key={field.label}
            size='small'
            label={field.label}
            value={values[field.label] || ''}
            onChange={(e) => setValues(prev => ({ ...prev, [field.label]: e.target.value }))}
        />
    ));

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
