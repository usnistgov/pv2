import { PropsWithChildren } from "react";
import Script from "react-load-script";

interface PageWrapperProps {
}

const PageWrapper = (props: PropsWithChildren<PageWrapperProps>) => {
  return (
    <div>
      <Script
        url="https://pages.nist.gov/nist-header-footer/js/jquery-1.9.0.min.js"
        onCreate={() => undefined}
        onError={() => undefined}
        onLoad={() => undefined}
      />
      <Script
        url="https://pages.nist.gov/nist-header-footer/js/nist-header-footer.js"
        onCreate={() => undefined}
        onError={() => undefined}
        onLoad={() => undefined}
      />
      <link rel="stylesheet" type="text/css" href={"https://pages.nist.gov/nist-header-footer/css/nist-combined.css"} />
      {props.children}
    </div>
  );
}

export default PageWrapper;