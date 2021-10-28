import {PropsWithChildren, useEffect, useRef} from "react";
import "./Sticky.sass";

export interface StickyProps {
    stickyChange: (sticky: boolean) => void;
}

export default function Sticky({children, stickyChange}: PropsWithChildren<StickyProps>) {
    const ref = useRef(null);

    useEffect(() => {
        if(ref.current === null)
            return;

        const observer = new IntersectionObserver(
            ([e]) => stickyChange(e.intersectionRatio < 1),
            {threshold: [1]}
        );

        observer.observe(ref.current);

        return () => {
            if(ref.current !== null)
                observer.unobserve(ref.current);
        }
    }, []);

    return (
        <div className={"sticky"} ref={ref}>
            {children}
        </div>
    );
}