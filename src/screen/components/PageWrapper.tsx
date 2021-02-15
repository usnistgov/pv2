import React, { PropsWithChildren } from "react";
import useScript from "../hooks/useScript";

interface PageWrapperProps {
}

const PageWrapper = (props: PropsWithChildren<PageWrapperProps>) => {

  useScript("https://pages.nist.gov/nist-header-footer/js/jquery-1.9.0.min.js");
  useScript("https://pages.nist.gov/nist-header-footer/js/nist-header-footer.js");

  return (
    <div>
      <link rel="stylesheet" type="text/css" href={"https://pages.nist.gov/nist-header-footer/css/nist-combined.css"} />
      {props.children}
    </div>
  );
}

export default PageWrapper;