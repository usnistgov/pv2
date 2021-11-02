export default interface OptionalSummary {
    // The alternative ID associated with this optional summary.
    altID: number;

    // The tag this optional summary was calculated for.
    tag: string;

    // The units of the values in this optional summary.
    quantUnits: string;

    // The discounted values for this optional summary.
    totTagFlowDisc: number[];

    // The quantity values for this optional summary.
    totTagQ: number[];
}