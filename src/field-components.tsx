import React, { useState } from 'react';
import { TextField } from '@mui/material';

// CommonProps interface
interface CommonProps {
    size: 'small';
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement | { value: any }>) => void;
}

export const StringField: React.FC<CommonProps> = (props) => <TextField {...props} />;

export const StringMultilineField: React.FC<CommonProps> = (props) => {
    return (
        <TextField
            {...props}
            id="outlined-multiline-static"
            multiline
            rows={4}
        />
    );
};

export const EmailField: React.FC<CommonProps> = (props) => {
    const [isEmailValid, setEmailValid] = useState(true);

    const validateEmail = (email: string) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const isValid = validateEmail(event.target.value);
        setEmailValid(isValid);
    };

    return (
        <TextField
            {...props}
            type="email"
            error={!isEmailValid}
            helperText={!isEmailValid ? "Invalid email format" : ""}
            onChange={props.onChange}
            onBlur={handleBlur}
            autoComplete="off"
        />
    );
};

export const URLField: React.FC<CommonProps> = (props) => {
    const [isURLValid, setURLValid] = useState(true);

    const validateURL = (url: string) => {
        const pattern = /^(https?:\/\/)?(([\da-z\.-]+)\.([a-z\.]{2,6})|(([0-9]{1,3}\.){3}[0-9]{1,3}))([\/\w \.-]*)*\/?$/;
        return pattern.test(url);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const isValid = validateURL(event.target.value);
        setURLValid(isValid);
    };

    return (
        <TextField
            {...props}
            type="url"
            error={!isURLValid}
            helperText={!isURLValid ? "Invalid URL format" : ""}
            onChange={props.onChange}
            onBlur={handleBlur}
            autoComplete="off"
        />
    );
};

