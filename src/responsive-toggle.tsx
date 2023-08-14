import React, { useContext } from 'react';
import LaptopIcon from '@mui/icons-material/Laptop';
import Zoom from '@mui/material/Zoom';
import TvIcon from '@mui/icons-material/Tv';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Tooltip } from '@mui/material';
import { ResponsiveLayoutContext } from './index';  // Assuming you have exported this from index.tsx

export default function ToggleResponsive() {
    const responsiveContext = useContext(ResponsiveLayoutContext);

    if (!responsiveContext) {
        throw new Error("ToggleResponsive must be used within a ResponsiveLayoutContext provider");
    }

    const { responsiveLayout, setResponsiveLayout } = responsiveContext;

    const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
        if (newAlignment === 'desktop' || newAlignment === 'laptop' || newAlignment === 'mobile') {
            setResponsiveLayout(newAlignment);
        }
    };

    const children = [
        <ToggleButton value="desktop" key="desktop">
            <TvIcon />
        </ToggleButton>,
        <ToggleButton value="laptop" key="laptop">
            <LaptopIcon />
        </ToggleButton>,
        <ToggleButton value="mobile" key="mobile">
            <PhoneAndroidIcon />
        </ToggleButton>
    ];

    const control = {
        value: responsiveLayout,
        onChange: handleChange,
        exclusive: true,
    };

    return (
        <Tooltip TransitionComponent={Zoom} title="Responsive Layout">
            <ToggleButtonGroup size="medium" {...control} aria-label="Responsive Layouts">
                {children}
            </ToggleButtonGroup>
        </Tooltip>
    );
}
