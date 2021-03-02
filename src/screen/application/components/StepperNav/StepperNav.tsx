import {Children, ReactElement, useState} from 'react';

import {Box, Button, Grid, Step, StepLabel, Stepper} from "@material-ui/core";
import {Icon as MdiIcon} from "@mdi/react"
import {mdiArrowLeft, mdiArrowRight, mdiCheck, mdiClose} from "@mdi/js";
import {useHistory} from "react-router-dom";

import "./StepperNav.css"

export interface StepperNavProps {
    // List of StepperPage components that should be a part of the Stepper Nav.
    children: ReactElement[];

    // Event handler for when finish button is clicked.
    onFinish?: () => void;
}

/*
 * Creates a navigation component that steps between the provided list of child pages with
 * a next and back button.
 */
export default function StepperNav({children, onFinish}: StepperNavProps): ReactElement {
    // React-router history object
    const history = useHistory();

    // Redux objects
    const [activeStep, setActiveSet] = useState(0);

    // Boolean values for view generation
    const isFirstStep: boolean = activeStep <= 0;
    const isLastStep: boolean = activeStep >= children.length - 1;

    /*
     * Creates a label from the StepperPage component that is passed in.
     * This function should only be called with a StepperPage component as the argument.
     */
    function createStepLabel(page: any): ReactElement {
        return (
            <Step key={page.props.label}>
                <StepLabel>{page.props.label}</StepLabel>
            </Step>
        );
    }

    return (
        <Box>
            <Grid className={"grid-container"} container justify={'center'} alignItems={'center'} spacing={0}>
                <Grid item xs={1}>
                    <Button
                        onClick={isFirstStep ? history.goBack : () => setActiveSet(activeStep - 1)}
                        startIcon={
                            <MdiIcon path={isFirstStep ? mdiClose : mdiArrowLeft}
                                     size={1}/>
                        }
                    >
                        {isFirstStep ? "Cancel" : "Back"}
                    </Button>
                </Grid>
                <Grid item xs={10}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {Children.map(children, createStepLabel)}
                    </Stepper>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained"
                            color="primary"
                            onClick={isLastStep ? onFinish : () => setActiveSet(activeStep + 1)}
                            endIcon={
                                <MdiIcon path={isLastStep ? mdiCheck : mdiArrowRight}
                                         size={1}/>
                            }
                    >
                        {isLastStep ? "Finish" : "Next"}
                    </Button>
                </Grid>
            </Grid>
            {children[activeStep]}
        </Box>
    );
}
