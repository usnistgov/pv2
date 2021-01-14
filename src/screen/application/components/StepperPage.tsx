import {Component, ReactNode} from "react";

interface StepperPageProps {
    label: string;
    children: ReactNode;
}

class StepperPage extends Component<StepperPageProps> {
    render() {
        return this.props.children;
    }
}

export default StepperPage;
