import {Redirect, RedirectProps} from "react-router-dom";

interface RedirectWhenProps {
    predicate: boolean;
}

export default function RedirectWhen({predicate, ...props}: RedirectWhenProps & RedirectProps) {
    return predicate ? <Redirect {...props}/> : <></>;
}
