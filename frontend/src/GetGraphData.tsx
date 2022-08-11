import {GraphOption} from "./Strings";
import {Result} from "./typings/Result";
import {ResultUiStore} from "./application/ApplicationStore";
import {Serie} from "@nivo/line";
import OptionalSummary from "./typings/OptionalSummary";
import {altLabels} from "./components/Request/RequestGenerator/E3RequestGenerator";

/**
 * Generates graph data for the given graph options and result object.
 *
 * @param graphOption
 * @param result
 * @param store
 * @param colors
 */
export async function getGraphData(graphOption: GraphOption, result: Result, store: ResultUiStore): Promise<Serie[]> {
    const emptySerie = {id: "", data: []};

    if (!result) return [emptySerie];

    switch (graphOption) {
        case GraphOption.NET_VALUE: {
            return result.FlowSummary.map((summary, index) => {
                return {
                    id: altLabels[index],
                    data: summary.totCostDisc.map((value: number, year: number) => {
                        return {x: year, y: value};
                    })
                }
            })
        }
        case GraphOption.CUMULATIVE: {
            let initial = result.FlowSummary[0];

            return result.FlowSummary.map((summary, index) => {
                let accumulator = 0;

                return {
                    id: altLabels[index],
                    data: summary.totCostDisc.map((value: number, year: number) => {
                        let cumulativeSaving = accumulator + (initial.totCostDisc[year] - value);
                        accumulator = cumulativeSaving;

                        return {x: year, y: cumulativeSaving};
                    })
                };
            });
        }
        case GraphOption.ANNUAL_NET_ELECTRICAL_CONSUMPTION: {
            return result.OptionalSummary
                .filter(summary => summary.tag === "Electricity")
                .map((summary, index) => {
                    return {
                        id: altLabels[summary.altID],
                        data: summary.totTagQ.map((value: number, year: number) => {
                            return {x: year, y: value};
                        })
                    };
                });
        }
        case GraphOption.CUMULATIVE_ELECTRICAL_REDUCTION: {
            let initial = result.OptionalSummary.find((value: OptionalSummary) => {
                return value.tag === "Electricity" && value.altID == 0;
            });

            return result.OptionalSummary
                .filter(summary => summary.tag === "Electricity")
                .map((summary, index) => {
                    let accumulator = 0;

                    if (initial === undefined)
                        return emptySerie;

                    return {
                        id: altLabels[summary.altID],
                        data: summary.totTagQ.map((value: number, year: number) => {
                            let cumulativeReduction = accumulator + ((initial?.totTagQ[year] ?? 0) - value);
                            accumulator = cumulativeReduction;

                            return {x: year, y: cumulativeReduction};
                        })
                    }
                });
        }
    }
}