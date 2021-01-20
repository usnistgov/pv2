import {ReactElement} from "react";


export interface StepperPageProps {
    // The label for this StepperPage to be displayed in the StepperNav component.
    label: string;

    // The component to display as the main page content.
    children: ReactElement;
}

/*
 * The StepperPage component wraps around another component to provide a label for
 * the StepperNav component. This component should only be used as a child of StepperNav.
 */
export default function StepperPage({children}: StepperPageProps): ReactElement {
    return children;
}
