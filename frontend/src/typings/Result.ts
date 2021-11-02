import MeasureSummary from "./MeasureSummary";
import OptionalSummary from "./OptionalSummary";
import FlowSummary from "./FlowSummary";

export interface Result {
    FlowSummary: FlowSummary[];

    MeasureSummary: MeasureSummary[];

    OptionalSummary: OptionalSummary[];
}