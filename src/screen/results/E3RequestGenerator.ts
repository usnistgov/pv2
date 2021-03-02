export function createE3Request(store: any) {
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

