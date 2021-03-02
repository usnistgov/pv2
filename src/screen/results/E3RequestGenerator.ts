import {RootState} from "../application/ApplicationStore";

export function createE3Request(store: RootState) {
    return [{
        analysisObject: {
            analysisType: "LCC",
            projectType: "Buildings",
            objToReport: "MeasureSummary",
        },
        alternativeObjects: [{}],
        bcnObjects: [{}],
        scenarioObjects: [{}],
    }];
}

