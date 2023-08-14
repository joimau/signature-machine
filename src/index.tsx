import React, { useState, FC, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';

import { Stack, Divider, TextField, Autocomplete, CssBaseline } from '@mui/material';

import Layout from './layout';
import TemplateSelection from './template-selection';
import AppHeader from './app-header';
import SignaturePreview from './signature-preview';
import { templates, jobTitles } from './data';
import './variables.css';
import InstallDialog from './install-dialog';
import { useTemplateFields } from './template-logic';


interface InstallDialogContextProps {
    isOpen: boolean;
    openDialog: () => void;
    closeDialog: () => void;
}

export const InstallDialogContext = createContext<InstallDialogContextProps | undefined>(undefined);

interface SelectedTemplateContentContextProps {
    selectedTemplateContent: string | null;
    setSelectedTemplateContent: React.Dispatch<React.SetStateAction<string | null>>;
}

const defaultTemplateContent = templates[0]?.template || null;

export const SelectedTemplateContentContext = createContext<SelectedTemplateContentContextProps | undefined>({
    selectedTemplateContent: defaultTemplateContent,
    setSelectedTemplateContent: () => { }
});

interface DisplaySettingsContextProps {
    displayGrid: boolean;
    setDisplayGrid: React.Dispatch<React.SetStateAction<boolean>>;
    displayOutline: boolean;
    setDisplayOutline: React.Dispatch<React.SetStateAction<boolean>>;
    displayMessage: boolean;
    setDisplayMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DisplaySettingsContext = createContext<DisplaySettingsContextProps | undefined>(undefined);

interface ResponsiveLayoutContextProps {
    responsiveLayout: "desktop" | "laptop" | "mobile";
    setResponsiveLayout: React.Dispatch<React.SetStateAction<"desktop" | "laptop" | "mobile">>;
}

export const ResponsiveLayoutContext = createContext<ResponsiveLayoutContextProps | undefined>(undefined);



const MainApp: FC = () => {
    const { selectedTemplateContent } = useContext(SelectedTemplateContentContext);
    const { renderedFields, filledTemplate } = useTemplateFields(selectedTemplateContent);

    return (
        <div className="app">
            <CssBaseline />
            <AppHeader />
            <InstallDialog />
            <Layout
                sidebarArea={
                    <Stack spacing={3}>
                        <TemplateSelection />
                        <Divider />
                        {renderedFields}
                    </Stack>
                }
                preview={<SignaturePreview template={filledTemplate} />}
            />
        </div>
    );
};

const App: FC = () => {

    const [selectedTemplateContent, setSelectedTemplateContent] = useState<string | null>(defaultTemplateContent);
    const [displayGrid, setDisplayGrid] = useState<boolean>(false);
    const [displayOutline, setDisplayOutline] = useState<boolean>(false);
    const [displayMessage, setDisplayMessage] = useState<boolean>(false);
    const [responsiveLayout, setResponsiveLayout] = useState<"desktop" | "laptop" | "mobile">("desktop");
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const openDialog = () => setDialogOpen(true);
    const closeDialog = () => setDialogOpen(false);

    return (
        <InstallDialogContext.Provider value={{ isOpen: dialogOpen, openDialog, closeDialog }}>
            <SelectedTemplateContentContext.Provider value={{ selectedTemplateContent, setSelectedTemplateContent }}>
                <DisplaySettingsContext.Provider value={{ displayGrid, setDisplayGrid, displayOutline, setDisplayOutline, displayMessage, setDisplayMessage }}>
                    <ResponsiveLayoutContext.Provider value={{ responsiveLayout, setResponsiveLayout }}>
                        <MainApp />
                    </ResponsiveLayoutContext.Provider>
                </DisplaySettingsContext.Provider>
            </SelectedTemplateContentContext.Provider>
        </InstallDialogContext.Provider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
