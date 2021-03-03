import { PropsWithChildren } from "react";
import Header from "./Header/Header";

interface PageWrapperProps {
}

const PageWrapper = (props: PropsWithChildren<PageWrapperProps>) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}

export default PageWrapper;