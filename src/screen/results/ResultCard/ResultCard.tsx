import {ReactElement} from "react";

import "./ResultCard.scss";

export interface ResultCardProps {
  results: any;
}

export default function ResultCard(props: ResultCardProps): ReactElement {
    const results = props.results;

    return (
      <div className="result-card">
        BLAH
      </div>
    )
}

