import {ReactElement} from "react";

import "./ResultCard.scss";

export interface ResultCardProps {
  results: any;
  isLabels: boolean;
}

const getField = (results: any, field: string) => {
  return results[field] !== null ? results[field] : "N/A";
}

// TODO: add as needed
const fieldsToDisplay = [
  "totalCosts",
  "netSavings",
  "AIRR",
  "SPP",
  "deltaQuant",
]

export default function ResultCard(props: ResultCardProps): ReactElement {
    const results = props.results;

    const style: any = props.isLabels ? {
      textAlign: "left",
      backgroundColor: "none",
    } : {
      textAlign: "right",
      backgroundColor: "#98ee99",
    }

    return (
      <div className="result-card" style={style}>
        <div className="result-title">
          {props.isLabels ? "Summary Results" : results.altID === 0 ? "Baseline" : "Alternative " + results.altID.toString()}
        </div>
        {fieldsToDisplay.map(field => {
          return (
          <div className="result-format">
            {getField(results, field)}
          </div>)
        })}
        {/* TODO: build relevant graphs, and include year by year cash flows */}
      </div>
    )
}

