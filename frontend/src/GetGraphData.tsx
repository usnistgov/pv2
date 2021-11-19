import {GraphOption} from "./Strings";
import {Result} from "./typings/Result";
import {ResultUiStore} from "./application/ApplicationStore";
import {Serie} from "@nivo/line";
import OptionalSummary from "./typings/OptionalSummary";

/**
 * Generates graph data for the given graph options and result object.
 *
 * @param graphOption
 * @param index
 * @param result
 * @param store
 */
export async function getGraphData(graphOption: GraphOption, index: number, result: Result, store: ResultUiStore): Promise<Serie> {
    const emptySerie = {id: "", data: []};

    if (!result) return emptySerie;

    switch (graphOption) {
        case GraphOption.NET_VALUE: {
            return {
                id: "",
                data: result.FlowSummary[index].totCostDisc.map((value: number, year: number) => {
                    store.graphMax = value;

                    return {x: year, y: value};
                })
            };
        }
        case GraphOption.SAVINGS: {
            let initial = result.FlowSummary[0];

            return {
                id: "",
                data: result.FlowSummary[index].totCostDisc.map((value: number, year: number) => {
                    let saving = initial.totCostDisc[year] - value;

                    store.graphMax = saving;

                    return {x: year, y: saving};
                })
            };
        }
        case GraphOption.CUMULATIVE: {
            let initial = result.FlowSummary[0];
            let accumulator = 0;

            return {
                id: "",
                data: result.FlowSummary[index].totCostDisc.map((value: number, year: number) => {
                    let cumulativeSaving = accumulator + (initial.totCostDisc[year] - value);
                    accumulator = cumulativeSaving;

                    store.graphMax = cumulativeSaving;

                    return {x: year, y: cumulativeSaving};
                })
            };
        }
        case GraphOption.NET_ELECTRICAL_CONSUMPTION: {
            let current = result.OptionalSummary.find((value: OptionalSummary) => {
                return value.tag === "Electricity" && value.altID == index;
            });

            if (current === undefined)
                return emptySerie;

            return {
                id: "",
                data: current.totTagQ.map((value: number, year: number) => {
                    store.graphMax = value;

                    return {x: year, y: value};
                })
            };
        }
        case GraphOption.ELECTRICAL_REDUCTION: {
            let initial = result.OptionalSummary.find((value: OptionalSummary) => {
                return value.tag === "Electricity" && value.altID == 0;
            });
            let current = result.OptionalSummary.find((value: OptionalSummary) => {
                return value.tag === "Electricity" && value.altID == index;
            });
            let accumulator = 0;

            if (initial === undefined || current === undefined)
                return emptySerie;

            return {
                id: "",
                data: current.totTagQ.map((value: number, year: number) => {
                    let cumulativeReduction = accumulator + ((initial?.totTagQ[year] ?? 0) - value);
                    accumulator = cumulativeReduction;

                    store.graphMax = cumulativeReduction;

                    return {x: year, y: cumulativeReduction};
                })
            };
        }
    }
}