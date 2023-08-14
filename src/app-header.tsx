import React from 'react';
import { AppBar, Typography, Toolbar, Stack, Divider, ToggleButton, Tooltip } from '@mui/material';
import ToggleResponsive from './responsive-toggle';
import ExportMenu from './export-menu';
import Button from '@mui/material/Button';
import BorderOuterSharpIcon from '@mui/icons-material/BorderOuterSharp';
import { GridOn } from '@mui/icons-material';
import Zoom from '@mui/material/Zoom';
import MailOutlineSharpIcon from '@mui/icons-material/MailOutlineSharp';
import { DisplaySettingsContext, InstallDialogContext } from './index';

const AppHeader: React.FC = () => {
    const displaySettings = React.useContext(DisplaySettingsContext);
    const installDialog = React.useContext(InstallDialogContext);

    if (!displaySettings) {
        throw new Error('DisplaySettingsContext must be used within a DisplaySettingsContext.Provider');
    }

    if (!installDialog) {
        throw new Error('InstallDialogContext must be used within an InstallDialogContext.Provider');
    }

    const { displayGrid, setDisplayGrid, displayOutline, setDisplayOutline, displayMessage, setDisplayMessage } = displaySettings;
    const { openDialog } = installDialog;

    const handleGridToggle = () => {
        setDisplayGrid(!displayGrid);
    };

    const handleStraightenToggle = () => {
        setDisplayOutline(!displayOutline);
    };

    const handleMessageToggle = () => {
        setDisplayMessage(!displayMessage);
    };

    return (
        <AppBar position="static" color='transparent' elevation={0}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Signature Machine
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Tooltip TransitionComponent={Zoom} title="Message Preview">
                        <ToggleButton
                            value="check"
                            selected={displayMessage}
                            onChange={handleMessageToggle}
                        >
                            <MailOutlineSharpIcon />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip TransitionComponent={Zoom} title="Baseline Grid">
                        <ToggleButton
                            value="check"
                            selected={displayGrid}
                            onChange={handleGridToggle}
                        >
                            <GridOn />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip TransitionComponent={Zoom} title="Elements Outline">
                        <ToggleButton
                            value="check"
                            selected={displayOutline}
                            onChange={handleStraightenToggle}
                        >
                            <BorderOuterSharpIcon />
                        </ToggleButton>
                    </Tooltip>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <ToggleResponsive />
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" disableElevation onClick={openDialog}>
                            Install Signature
                        </Button>
                        <ExportMenu />
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default AppHeader;
