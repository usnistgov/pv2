import {Component} from "react";
import {Box} from "@material-ui/core";
import MaterialHeader from "../components/MaterialHeader";
import "./ElectricalRateForm.css"
import FormField from "../components/FormField";
import * as Yup from "yup";
import {RootState} from "../ApplicationStore";
import {connect} from "react-redux";
import {
    annualConsumptionSlice,
    electricalCompanyNameSlice,
    electricUnitPriceSlice,
    excessGenerationUnitPriceSlice,
    monthlyFlatRateChargeSlice,
    netMeteringFeedTariffSlice,
    pvGridConnectionRateSlice
} from "./ElectricalRateFormReducer";
import {ReduxGetSet} from "../Utils";
import FormSelect from "../components/FormSelect";

interface StateProps {
    electricalCompanyName: ReduxGetSet<string>,
    annualConsumption: ReduxGetSet<number>,
    monthlyFlatRateCharge: ReduxGetSet<number>,
    electricUnitPrice: ReduxGetSet<number>,
    excessGenerationUnitPrice: ReduxGetSet<number>,
    pvGridConnectionRate: ReduxGetSet<number>,
    netMeteringFeedTariff: ReduxGetSet<string>,
}

class ElectricalRateForm extends Component<StateProps, never> {
    render() {
        return (
            <Box>
                <MaterialHeader text={"Electrical Rate Information"}/>
                <Box className={"electrical-form-container"}>
                    <FormField label={"Electricity Utility Company"}
                               schema={Yup.string()}
                               value={this.props.electricalCompanyName}/>
                    <FormField label={"Annual Consumption"}
                               schema={Yup.number().required()}
                               value={this.props.annualConsumption}
                               endAdornment={"kWH"}
                               type={"number"}/>
                    <FormField label={"Monthly Flat Rate Charge"}
                               schema={Yup.number().required()}
                               value={this.props.monthlyFlatRateCharge}
                               endAdornment={"$"}
                               type={"number"}/>
                    <FormField label={"Electricity Unit Price"}
                               schema={Yup.number().required()}
                               value={this.props.electricUnitPrice}
                               endAdornment={"$/kWH"}
                               type={"number"}/>
                    <FormSelect label={"Net Metering or Feed In Tariff (FiT)"}
                                value={this.props.netMeteringFeedTariff}
                                options={[
                                    "Net Metering Tariff",
                                    "Feed in Tariff (Gross Metering)"
                                ]}/>
                    <FormField label={"Excess Generation / FiT Unit Price"}
                               schema={Yup.number().required()}
                               value={this.props.excessGenerationUnitPrice}
                               endAdornment={"$/kWH"}
                               type={"number"}/>
                    <FormField label={"PV Grid Connection Rate (Monthly)"}
                               schema={Yup.number().required()}
                               value={this.props.pvGridConnectionRate}
                               endAdornment={"$/kWH"}
                               type={"number"}/>
                </Box>
            </Box>
        );
    }
}

/*
 * Redux mappings and export
 */
function mapStateToProps(state: RootState) {
    return {
        electricalCompanyName: () => state.electricalCompanyName,
        annualConsumption: () => state.annualConsumption,
        monthlyFlatRateCharge: () => state.monthlyFlatRateCharge,
        electricUnitPrice: () => state.electricUnitPrice,
        excessGenerationUnitPrice: () => state.excessGenerationUnitPrice,
        pvGridConnectionRate: () => state.pvGridConnectionRate,
        netMeteringFeedTariff: () => state.netMeteringFeedTariff,
    }
}

const mapDispatchToProps = {
    electricalCompanyName: (s: string) => electricalCompanyNameSlice.actions.set(s),
    annualConsumption: (n: number) => annualConsumptionSlice.actions.set(n),
    monthlyFlatRateCharge: (n: number) => monthlyFlatRateChargeSlice.actions.set(n),
    electricUnitPrice: (n: number) => electricUnitPriceSlice.actions.set(n),
    excessGenerationUnitPrice: (n: number) => excessGenerationUnitPriceSlice.actions.set(n),
    pvGridConnectionRate: (n: number) => pvGridConnectionRateSlice.actions.set(n),
    netMeteringFeedTariff: (s: string) => netMeteringFeedTariffSlice.actions.set(s),
}

const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any) => {
    return {
        electricalCompanyName: {
            get: stateProps.electricalCompanyName,
            set: dispatchProps.electricalCompanyName,
        },
        annualConsumption: {
            get: stateProps.annualConsumption,
            set: dispatchProps.annualConsumption,
        },
        monthlyFlatRateCharge: {
            get: stateProps.monthlyFlatRateCharge,
            set: dispatchProps.monthlyFlatRateCharge,
        },
        electricUnitPrice: {
            get: stateProps.electricUnitPrice,
            set: dispatchProps.electricUnitPrice,
        },
        excessGenerationUnitPrice: {
            get: stateProps.excessGenerationUnitPrice,
            set: dispatchProps.excessGenerationUnitPrice,
        },
        pvGridConnectionRate: {
            get: stateProps.pvGridConnectionRate,
            set: dispatchProps.pvGridConnectionRate,
        },
        netMeteringFeedTariff: {
            get: stateProps.netMeteringFeedTariff,
            set: dispatchProps.netMeteringFeedTariff,
        },
        ...ownProps,
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ElectricalRateForm);