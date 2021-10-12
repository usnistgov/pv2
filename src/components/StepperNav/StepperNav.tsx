import {Children, ReactElement, useContext} from 'react';

// Library Imports
import {Button, Grid, Step, StepButton, StepLabel, Stepper} from "@material-ui/core";
import {Icon as MdiIcon} from "@mdi/react"
import {mdiArrowLeft, mdiArrowRight, mdiCheck, mdiClose} from "@mdi/js";
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";

// User Imports
import {Store} from "../../application/ApplicationStore";

// Stylesheets
import "./StepperNav.sass"
import {action} from "mobx";

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
const StepperNav = observer(({children, onFinish}: StepperNavProps) => {
    const store = useContext(Store).formUiStore;

    // React-router history object
    const history = useHistory();

    // Boolean values for view generation
    const isFirstStep: boolean = store.current <= 0;
    const isLastStep: boolean = store.current >= children.length - 1;

    /*
     * Creates a label from the StepperPage component that is passed in.
     * This function should only be called with a StepperPage component as the argument.
     */
    function createStepLabel(page: any, index: number, isDone?: () => boolean): ReactElement {
        return (
            <Step key={page.props.label} completed={store.seen.has(index) && isDone?.()}>
                <StepButton onClick={action(() => store.current = index)}>
                    <StepLabel error={store.seen.has(index) && store.current !== index && !isDone?.()}>
                        {page.props.label}
                    </StepLabel>
                </StepButton>
            </Step>
        );
    }

    return (
        <>
            <Grid className={"grid-container"} container justifyContent={'center'} alignItems={'center'} spacing={0}>
                <Grid item xs={1}>
                    <Button
                        onClick={isFirstStep ? history.goBack : () => store.previous()}
                        startIcon={
                            <MdiIcon path={isFirstStep ? mdiClose : mdiArrowLeft}
                                     size={1}/>
                        }
                        data-testid={"back-button"}
                    >
                        {isFirstStep ? "Cancel" : "Back"}
                    </Button>
                </Grid>
                <Grid item xs={10}>
                    <Stepper nonLinear activeStep={store.current} alternativeLabel>
                        {Children.map(children, (page, index) => {
                            return createStepLabel(page, index, children[index].props.isDone)
                        })}
                    </Stepper>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained"
                            color="primary"
                            onClick={isLastStep ? onFinish : () => store.next()}
                            endIcon={
                                <MdiIcon path={isLastStep ? mdiCheck : mdiArrowRight}
                                         size={1}/>
                            }
                            data-testid={"forward-button"}
                            disabled={isLastStep && !store.isDone()}
                    >
                        {isLastStep ? "Finish" : "Next"}
                    </Button>
                </Grid>
            </Grid>
            {children[store.current]}
        </>
    );
});

export default StepperNav;
