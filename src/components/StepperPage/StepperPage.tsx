import {ReactElement} from "react";


export interface StepperPageProps {
    // The label for this StepperPage to be displayed in the StepperNav component.
    label: string;

    // Function to designate when the page is complete and the user can move on to the next.
    isDone?: () => boolean;

    // The component to display as the main page content.
    children: ReactElement;
}

StepperPage.defaultProps = {
    isDone: () => true
}

/*
 * The StepperPage component wraps around another component to provide a label for
 * the StepperNav component. This component should only be used as a child of StepperNav.
 */
export default function StepperPage({children}: StepperPageProps): ReactElement {
    return children;
}
