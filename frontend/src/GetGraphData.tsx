import {GraphOption} from "./Strings";
import {ResultUiStore} from "./application/ApplicationStore";
import {Serie} from "@nivo/line";
import {altLabels} from "./components/Request/RequestGenerator/E3RequestGenerator";
import {Output} from "e3-sdk";

/**
 * Generates graph data for the given graph options and result object.
 *
 * @param graphOption
 * @param result
 * @param store
 * @param colors
 */
export async function getGraphData(graphOption: GraphOption, result: Output, store: ResultUiStore): Promise<Serie[]> {
    const emptySerie = {id: "", data: []};

    if (!result) return [emptySerie];

    switch (graphOption) {
        case GraphOption.NET_VALUE: {
            return result.required?.map((summary, index) => {
                return {
                    id: altLabels[index],
                    data: summary.totalCostsDiscounted.map((value: number, year: number) => {
                        return {x: year, y: value};
                    })
                }
            }) ?? []
        }
        case GraphOption.CUMULATIVE: {
            let initial = result.required?.[0];

            if(initial === null || initial === undefined)
                return [];

            return result.required?.map((summary, index) => {
                let accumulator = 0;

                return {
                    id: altLabels[index],
                    data: summary.totalCostsDiscounted.map((value: number, year: number) => {
                        let cumulativeSaving = accumulator + ((initial?.totalCostsDiscounted[year] ?? 0) - value);
                        accumulator = cumulativeSaving;

                        return {x: year, y: cumulativeSaving};
                    })
                };
            }) ?? [];
        }
        case GraphOption.ANNUAL_NET_ELECTRICAL_CONSUMPTION: {
            return result?.optional
                ?.filter(summary => summary.tag === "Electricity")
                .map(summary => {
                    return {
                        id: altLabels[summary.altId],
                        data: summary.totalTagQuantity.map((value: number, year: number) => {
                            return {x: year, y: value};
                        })
                    };
                }) ?? [];
        }
        case GraphOption.CUMULATIVE_ELECTRICAL_REDUCTION: {
            let initial = result?.optional?.find(value => {
                return value.tag === "Electricity" && value.altId == 0;
            });

            return result?.optional
                ?.filter(summary => summary.tag === "Electricity")
                .map(summary => {
                    let accumulator = 0;

                    if (initial === undefined)
                        return emptySerie;

                    return {
                        id: altLabels[summary.altId],
                        data: summary.totalTagQuantity.map((value: number, year: number) => {
                            let cumulativeReduction = accumulator + ((initial?.totalTagQuantity[year] ?? 0) - value);
                            accumulator = cumulativeReduction;

                            return {x: year, y: cumulativeReduction};
                        })
                    }
                }) ?? [];
        }
    }
}