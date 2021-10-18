import Button, {ButtonProps} from "@material-ui/core/Button/Button";
import {Redirect} from "react-router-dom";
import {useState} from "react";

interface RedirectButtonProps {
    // The route to redirect to.
    to: string;
}

/**
 * Creates a button which will redirect when clicked.
 */
export default function RedirectButton({to, ...buttonProps}: ButtonProps & RedirectButtonProps) {
    const [shouldRedirect, setShouldRedirect] = useState(false);

    if(shouldRedirect)
        return <Redirect to={to}/>;

    return <Button {...buttonProps} onClick={() => setShouldRedirect(true)}/>
}
