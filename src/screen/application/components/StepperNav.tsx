import {Children, Component, ReactElement, ReactNode} from 'react';

import {Box, Button, Grid, Step, StepLabel, Stepper} from "@material-ui/core";
import {Icon as MdiIcon} from "@mdi/react"
import {mdiArrowLeft, mdiArrowRight} from "@mdi/js";
import StepperPage from "./StepperPage";
import {RootState} from "../ApplicationStore";
import {connect} from "react-redux";
import {increment, decrement} from "./StepperNavReducer";
import "./StepperNav.css"

/*
 * Property interfaces
 */
interface ComponentProps {
    children: ReactElement[];
}

interface DispatchProps {
    increment: () => void;
    decrement: () => void;
}

interface StateProps {
    activeStep: number;
}

/*
 * The StepperNav Component creates a Stepper navigation bar with back and next buttons and contains a list
 * of pages that are displayed according to the current active step.
 */
class StepperNav extends Component<ComponentProps & DispatchProps & StateProps> {
    render(): ReactNode {
        return (
            <Box>
                <Grid className={"grid-container"} container justify={'center'} alignItems={'center'} spacing={0}>
                    <Grid item xs={1}>
                        <Button
                            disabled={this.props.activeStep === 0}
                            onClick={this.props.decrement}
                            startIcon={
                                <MdiIcon path={mdiArrowLeft}
                                         size={1}/>
                            }
                        >
                            Back
                        </Button>
                    </Grid>
                    <Grid item xs={10}>
                        <Stepper activeStep={this.props.activeStep} alternativeLabel>
                            {Children.map(this.props.children, this.createStepLabel)}
                        </Stepper>
                    </Grid>
                    <Grid item xs={1}>
                        <Button variant="contained"
                                color="primary"
                                disabled={this.props.activeStep === this.props.children.length - 1}
                                onClick={this.props.increment}
                                endIcon={
                                    <MdiIcon path={mdiArrowRight}
                                             size={1}/>
                                }
                        >
                            Next
                        </Button>
                    </Grid>
                </Grid>
                {this.props.children[this.props.activeStep]}
            </Box>
        );
    };

    createStepLabel(child: any): ReactNode {
        let page = child as StepperPage;

        return (
            <Step key={page.props.label}>
                <StepLabel>{page.props.label}</StepLabel>
            </Step>
        );
    }
}

/*
 * Redux mappings and export
 */
function mapStateToProps(state: RootState): StateProps {
    return {
        activeStep: state.activeStep
    }
}

export default connect(mapStateToProps, {increment, decrement})(StepperNav);