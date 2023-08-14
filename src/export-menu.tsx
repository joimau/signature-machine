import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Divider, IconButton, ListItemIcon, ListItemText, Paper, Tooltip, Typography, Snackbar } from '@mui/material';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import FileDownloadIcon from '@mui/icons-material/FileDownloadSharp';
import HelpOutlineSharpIcon from '@mui/icons-material/HelpOutlineSharp';
import CopyAllSharpIcon from '@mui/icons-material/CopyAllSharp';
import CodeSharpIcon from '@mui/icons-material/CodeSharp';
import Zoom from '@mui/material/Zoom';
import FeedbackSharpIcon from '@mui/icons-material/FeedbackSharp';

export default function MenuPopupState() {
    // State for the snackbar
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const handleMenuItemClick = (popupStateClose: Function, snackbarMessage: string) => () => {
        popupStateClose();  // Close the popup menu
        setMessage(snackbarMessage); // Set the Snackbar message
        setOpenSnackbar(true); // Open the snackbar
    };

    return (
        <PopupState variant="popper" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <Tooltip TransitionComponent={Zoom} title="More options">
                        <IconButton
                            size="large"
                            aria-label="more"
                            aria-controls={popupState.isOpen ? 'long-menu' : undefined}
                            aria-expanded={popupState.isOpen ? 'true' : undefined}
                            aria-haspopup="true"
                            {...bindTrigger(popupState)}
                        >
                            <MoreVertSharpIcon />
                        </IconButton>
                    </Tooltip>
                    <Menu {...bindMenu(popupState)}>
                        <Paper sx={{ width: 320, maxWidth: '100%' }} elevation={0}>
                            <MenuItem onClick={handleMenuItemClick(popupState.close, 'Markup copied to clipboard')}>
                                <ListItemIcon>
                                    <CodeSharpIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Copy Markup</ListItemText>
                                <Typography variant="body2" color="text.secondary">
                                    HTML Markup
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleMenuItemClick(popupState.close, 'Downloading viktor_kirichenko_signature.html')}>
                                <ListItemIcon>
                                    <FileDownloadIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Export</ListItemText>
                                <Typography variant="body2" color="text.secondary">
                                    HTML File
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleMenuItemClick(popupState.close, 'Rendered Signature copied to clipboard')}>
                                <ListItemIcon>
                                    <CopyAllSharpIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Copy</ListItemText>
                                <Typography variant="body2" color="text.secondary">
                                    Rendered Signature
                                </Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={popupState.close}>
                                <ListItemIcon>
                                    <FeedbackSharpIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Feedback</ListItemText>
                            </MenuItem>
                        </Paper>
                    </Menu>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={openSnackbar}
                        onClose={() => setOpenSnackbar(false)}
                        message={message}
                        autoHideDuration={3000}
                    />

                </React.Fragment>
            )}
        </PopupState>
    );
}
