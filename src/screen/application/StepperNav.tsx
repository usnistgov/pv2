import {ReactNode, Component, ReactElement, Children} from 'react';

import {Button, Grid, Step, StepLabel, Stepper} from "@material-ui/core";
import {Icon as MdiIcon} from "@mdi/react"
import {mdiArrowLeft, mdiArrowRight} from "@mdi/js";
import StepperPage from "./StepperPage";

interface StepperNavProps {
    children: ReactElement[];
}

interface StepperNavState {
    activeStep: number;
}

class StepperNav extends Component<StepperNavProps, StepperNavState> {
    constructor(props: StepperNavProps) {
        super(props);

        this.state = {activeStep: 0};
    }

    render(): ReactNode {
        return (
            <div>
                <Stepper activeStep={this.state.activeStep} alternativeLabel>
                    {Children.map(this.props.children, this.createStepLabel)}
                </Stepper>
                <Grid container justify={'center'} alignItems={'center'} spacing={0}>
                    <Button
                        disabled={this.state.activeStep === 0}
                        onClick={() => this.setState({activeStep: this.state.activeStep - 1})}
                        startIcon={
                            <MdiIcon path={mdiArrowLeft}
                                     size={1}/>
                        }
                    >
                        Back
                    </Button>
                    <Button variant="contained"
                            color="primary"
                            disabled={this.state.activeStep === this.props.children.length - 1}
                            onClick={() => this.setState({activeStep: this.state.activeStep + 1})}
                            endIcon={
                                <MdiIcon path={mdiArrowRight}
                                         size={1}/>
                            }
                    >
                        Next
                    </Button>
                </Grid>
                {this.props.children[this.state.activeStep]}
            </div>
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

export default StepperNav;