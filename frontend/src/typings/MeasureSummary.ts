import TagValues from "./TagValues";

export default interface MeasureSummary {
    // The alternative ID associated with this measure summary.
    altID: number;

    totalBenefits: string;

    totalCosts: string;

    totalCostsInv: string;

    totalCostsNonInv: string;

    netBenefits: string;

    netSavings: string;

    AIRR?: string;

    BCR?: string;

    DPP?: string;

    SPP?: string;

    SIR?: string;

    quantSum: TagValues;

    quantUnits: { [key: string]: string };

    MARR: string;

    deltaQuant?: TagValues;

    nsPercQuant?: TagValues;

    nsDeltaQuant?: TagValues;

    nsElasticityQuant?: TagValues;
}