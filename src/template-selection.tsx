import React, { useState, useContext, useRef } from 'react';
import { templates } from './data';
import { SelectedTemplateContentContext } from './index';
import { Autocomplete, Button, IconButton, Stack, TextField } from '@mui/material';
import { Template } from './models';
import CloseIcon from '@mui/icons-material/Close';
import FileOpenIcon from '@mui/icons-material/FileOpen';

const TemplateSelection: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const context = useContext(SelectedTemplateContentContext);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    if (!context) {
        throw new Error("TemplateSelection must be used within a SelectedTemplateContentContext.Provider");
    }

    const { setSelectedTemplateContent, selectedTemplateContent } = context;

    const handleTemplateChange = (event: React.SyntheticEvent<Element, Event>, value: Template | null) => {
        if (value) {
            setSelectedTemplateContent(value.template);
            setSelectedFile(null);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setSelectedTemplateContent(null);

            // Read the file content
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                setSelectedTemplateContent(content);
            };
            reader.readAsText(file);

            // Clear the file input
            if (event.target) {
                event.target.value = '';
            }
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setSelectedTemplateContent(templates[0].template); // Reset to the first template's content
    };

    const handleImportClick = (inputRef: React.RefObject<HTMLInputElement>) => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const getOptionLabel = (option: Template): string => option.label;

    return (
        <div style={{ display: 'flex' }}>
            <Stack spacing={1} style={{ width: '100%' }}>
                {!selectedFile && (
                    <Stack direction="row" spacing={1}>
                        <div style={{ flex: 1 }}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={templates}
                                size="small"
                                fullWidth
                                value={templates.find(t => t.template === selectedTemplateContent) || null}
                                onChange={handleTemplateChange}
                                getOptionLabel={getOptionLabel}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        label="Signature Template"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </div>
                        <Button variant='outlined' disableElevation onClick={() => handleImportClick(fileInputRef)}>Upload</Button>
                    </Stack>
                )}

                {selectedFile && (
                    <Stack direction="row" spacing={1} style={{ maxWidth: '100%', overflow: 'hidden', alignItems: 'center' }}>
                        <FileOpenIcon />
                        <div style={{
                            overflowX: 'hidden',
                            flex: 1,
                            marginLeft: 8,
                            marginTop: 8,
                            marginBottom: 8,
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: 'calc(100% - 48px)'
                        }}>
                            {selectedFile.name}
                        </div>
                        <IconButton size="small" style={{ marginLeft: 'auto' }} onClick={handleRemoveFile}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                )}

                <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".html,.htm"
                />
            </Stack>
        </div>
    );
};

export default React.memo(TemplateSelection);
