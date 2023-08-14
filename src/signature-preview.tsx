import React, { useContext, useRef } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { SelectedTemplateContentContext, DisplaySettingsContext, ResponsiveLayoutContext } from './index';
import { templates } from './data';
import './overlays.css';
import Avatar from '@mui/material/Avatar';

const SignaturePreview: React.FC = () => {
    const { selectedTemplateContent } = useContext(SelectedTemplateContentContext) || {};
    const { displayGrid, displayOutline, displayMessage } = useContext(DisplaySettingsContext) || {};
    const { responsiveLayout } = useContext(ResponsiveLayoutContext) || {};

    let containerWidth;
    switch (responsiveLayout) {
        case 'desktop':
            containerWidth = '1048px';
            break;
        case 'laptop':
            containerWidth = '644px';
            break;
        case 'mobile':
            containerWidth = '344px';
            break;
        default:
            containerWidth = 'auto';
            break;
    }

    const containerRef = useRef<HTMLDivElement>(null);

    if (!selectedTemplateContent) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography variant="h6" color="textSecondary">
                    Select a template or upload a file to preview the signature
                </Typography>
            </div>
        );
    }

    const handleLinkClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = event.target as HTMLAnchorElement;
        if (target.tagName === 'A') {
            target.target = '_blank';
        }
    };

    const signatureClassName = [
        displayOutline ? 'outline' : ''
    ].join(' ').trim();

    const emailLayout = (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <Avatar>QE</Avatar>
                <div style={{ marginLeft: '16px' }}>
                    <div style={{ fontWeight: 600 }}>Queen Elizabeth II</div>
                    <div style={{ fontSize: 12 }}>queen@royal.gov.uk</div>
                </div>
            </div>
            <div>A Message from Her Majesty the Queen</div>
            <div>
                <p>This message to all ARPANET users announces the availability on ARPANET of the Coral 66 compiler provided by the GEC 4080 computer at the Royal Signals and Radar Establishment, Malvern, England. Coral 66 is the standard real-time high level language adopted by the Ministry of Defence.</p>
            </div>
        </div>
    );

    return (
        <Paper
            style={{ position: 'relative', overflowX: 'auto', width: containerWidth, padding: 24 }}
            ref={containerRef}
            onClick={handleLinkClick}
        >
            {displayMessage && emailLayout}

            <div className="signature-container">
                {displayGrid && <div className="grid"></div>}
                <div className={signatureClassName} dangerouslySetInnerHTML={{ __html: selectedTemplateContent }} />
            </div>
        </Paper>
    );
};

export default SignaturePreview;
