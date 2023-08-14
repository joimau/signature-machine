import { useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { InstallDialogContext } from './index';

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InstallStepper from './install-stepper';

const tabLabels = ["Gmail", "Apple Mail", "Outlook", "Thunderbird", "Windows Mail"];

export default function InstallDialog() {
    const [value, setValue] = React.useState(0);
    const activeTabLabel = tabLabels[value];

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const dialogContext = useContext(InstallDialogContext);
    if (!dialogContext) throw new Error("InstallDialog must be used within its context provider.");

    const { isOpen, closeDialog } = dialogContext;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog
            fullScreen={fullScreen}
            open={isOpen}
            onClose={closeDialog}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {"Install Signature"}
                <IconButton edge="end" color="inherit" onClick={closeDialog} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <div style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#fff' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="email clients"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {tabLabels.map((label, index) => <Tab key={index} label={label} />)}
                </Tabs>
            </div>

            <DialogContent style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}>
                <InstallStepper activeTab={activeTabLabel} />
            </DialogContent>
        </Dialog>
    );
}
