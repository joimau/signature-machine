import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

type InstallStepperProps = {
    activeTab: string;
};

type StepType = {
    label: string;
    description: string;
    customButton?: {
        label: string;
        action: () => void;
    };
};
type TabStepsType = {
    [key: string]: StepType[];
};



export default function InstallStepper({ activeTab }: InstallStepperProps) {

    type InstallStepperProps = {
        activeTab?: string;
    };


    const tabSteps: TabStepsType = {
        'Gmail': [
            {
                label: 'Download "Insert HTML by Designmodo" for Chrome',
                description: 'This step has a custom button with a custom action that continues to the next step.',
                customButton: {
                    label: 'Install Plugin',
                    action: () => {
                        window.open('https://chrome.google.com/webstore/detail/insert-html-by-designmodo/bcflbfdlpegakpncdgmejelcolhmfkjh', '_blank');
                        handleNext();
                    },
                },
            },

            {
                label: 'Go to your Gmail settings',
                description: 'This step has a custom button with a custom action that continues to the next step.',
                customButton: {
                    label: 'Open Gmail Settings',
                    action: () => {
                        window.open('https://mail.google.com/mail/u/0/#settings/general', '_blank');
                        handleNext();
                    },
                },
            },
            {
                label: 'Copy HTML markup',
                description: 'This step has a custom button with a custom action that continues to the next step.',
                customButton: {
                    label: 'Copy HTML Markup',
                    action: () => {
                        handleNext();
                    },
                },
            },
            {
                label: 'Test',
                description: `Try out different ad text to see what brings in the most customers,
                          and learn how to enhance your ads using features like ad extensions.
                          If you run into any problems with your ads, find out how to tell if
                          they're running and how to resolve approval issues.`,
            },
        ],
        'Apple Mail': [
            {
                label: 'Test',
                description: `Try out different ad text to see what brings in the most customers,
                          and learn how to enhance your ads using features like ad extensions.
                          If you run into any problems with your ads, find out how to tell if
                          they're running and how to resolve approval issues.`,
            },
        ],
        'Outlook': [
            {
                label: 'Test',
                description: `Try out different ad text to see what brings in the most customers,
                          and learn how to enhance your ads using features like ad extensions.
                          If you run into any problems with your ads, find out how to tell if
                          they're running and how to resolve approval issues.`,
            },
        ],
        'Thunderbird': [
            {
                label: 'Test',
                description: `Try out different ad text to see what brings in the most customers,
                          and learn how to enhance your ads using features like ad extensions.
                          If you run into any problems with your ads, find out how to tell if
                          they're running and how to resolve approval issues.`,
            },
        ],
        'Windows Mail': [
            {
                label: 'Test',
                description: `Try out different ad text to see what brings in the most customers,
                          and learn how to enhance your ads using features like ad extensions.
                          If you run into any problems with your ads, find out how to tell if
                          they're running and how to resolve approval issues.`,
            },
        ],
    };

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = tabSteps[activeTab] || [];

    React.useEffect(() => {
        setActiveStep(0);
    }, [activeTab]);


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    return (
        <Box>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === steps.length - 1 ? (
                                    <Typography variant="caption">Last step</Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <div>
                                    {step.customButton ? (
                                        <Button
                                            variant="contained"
                                            onClick={step.customButton.action}
                                            sx={{ mt: 1, mr: 1 }}
                                            disableElevation
                                        >
                                            {step.customButton.label}
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                            disableElevation
                                        >
                                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                    )}
                                    <Button
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                        disableElevation
                                        disabled={activeStep === steps.length - 1}
                                    >
                                        Skip step
                                    </Button>

                                </div>
                                <div style={{ flexGrow: 1 }}></div> {/* Spacer div */}
                                <Button
                                    disabled={index === 0}
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                    disableElevation
                                >
                                    Back
                                </Button>
                            </Box>

                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Start over
                    </Button>
                </Paper>
            )}
        </Box>
    );
}
