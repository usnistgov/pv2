import {Children, ReactElement, useContext, useState} from 'react';

// Library Imports
import {Button, Grid, Step, StepButton, StepLabel, Stepper} from "@material-ui/core";
import {Icon as MdiIcon} from "@mdi/react"
import {mdiArrowLeft, mdiArrowRight, mdiCheck, mdiClose} from "@mdi/js";
import {observer} from "mobx-react-lite";

// User Imports
import {Store} from "../../application/ApplicationStore";

// Stylesheets
import "./StepperNav.sass"
import {action} from "mobx";
import {scrollTo} from "../../Utils";
import Sticky from "../Sticky/Sticky";
import {useNavigate} from "react-router-dom";

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
    const [isSticky, setIsSticky] = useState(false);

    // React-router history object
    const navigate = useNavigate();

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

    /**
     * Function to scroll to the navigation bar if the user has scrolled past it.
     */
    function scrollToStickyNav() {
        if (window.scrollY > 82)
            scrollTo(82)();
    }

    return (
        <>
            <Sticky stickyChange={setIsSticky}>
                <Grid className={"grid-container"}
                      container
                      justifyContent={'center'}
                      alignItems={'center'}
                      spacing={0}>
                    <Grid item xs={1}>
                        <Button
                            onClick={isFirstStep ? () => navigate(-1) : () => {
                                store.previous();
                                scrollToStickyNav();
                            }}
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
                                onClick={isLastStep ? onFinish : () => {
                                    store.next();
                                    scrollToStickyNav();
                                }}
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
                <div className={`sticky-base ${isSticky ? "show" : ""}`}>
                    <hr className={"border"}/>
                    <div className={"gradient"}/>
                </div>
            </Sticky>
            {children[store.current]}
        </>
    );
});

export default StepperNav;
