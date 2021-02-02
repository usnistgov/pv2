import {ReactElement} from "react";
import "./SolarSystemForm.scss";

import {Box} from "@material-ui/core";
import * as Yup from "yup";

import MaterialHeader from "../../components/MaterialHeader/MaterialHeader";
import FormField from "../../components/FormField/FormField";
import { createNumberSlice, createStringSlice, useReduxGetSet } from "../../Utils";
import FormSelect from "../../components/FormSelect/FormSelect";
import AdvancedHeader from "../../components/AdvancedHeader/AdvancedHeader";

// Redux string slices
export const [
    // PV System Details
    systemPanelBrandAndTypeSlice,
    inverterTypeSlice,

    // PV System Costs

    // Purchasing Details
    ppaOptionSlice,
    loanOrCashSlice,

    // Analysis Assumptions
    residualValueApproachSlice
] = [
    // PV System Details
    "systemPanelBrandAndType",
    "inverterType",
    
    // PV System Costs

    // Purchasing Details
    "ppaOption",
    "loanOrCash",
    
    // Analysis Assumptions
    "residualValueApproach"
    
].map(createStringSlice)

// Redux number slices
export const [
    // PV System Information
    totalSystemSizeSlice,
    estimatedAnnualProductionSlice,
    panelLifetimeSlice,
    inverterLifetimeSlice,
    degradationRateSlice,

    // PV System Costs
    totalInstallationCostsSlice,
    federalTaxCreditSlice,
    stateOrLocalTaxCreditsOrGrantsOrRebatesSlice,
    inverterReplacementCostsSlice,
    annualMaintenanceCostsSlice,

    // Purchasing Details
    downPaymentSlice,
    nominalInterestRateSlice,
    monthlyPaymentSlice,

    // Analysis Assumptions
    studyPeriodSlice,
    realDiscountRateSlice,
    generalInflationSlice
] = [
     // PV System Information
    "totalSystemSize",
    "estimatedAnnualProduction",
    "panelLifetime",
    "inverterLifetime",
    "degradationRate",

    // PV System Costs
    "totalInstallationCosts",
    "federalTaxCredit",
    "stateOrLocalTaxCreditsOrGrantsOrRebates",
    "inverterReplacementCosts",
    "annualMaintenanceCosts",

    // Purchasing Details
    "downPayment",
    "nominalInterestRate",
    "monthlyPayment",

    // Analysis Assumptions
    "studyPeriod",
    "realDiscountRate",
    "generalInflation"
].map(createNumberSlice)

export default function SolarSystemForm(): ReactElement {
    // Redux state objects
    // PV System Information
    const systemPanelBrandAndType = useReduxGetSet<string>("systemPanelBrandAndType", systemPanelBrandAndTypeSlice);
    const inverterType = useReduxGetSet<string>("inverterType", inverterTypeSlice);
    const totalSystemSize = useReduxGetSet<number>("totalSystemSize", totalSystemSizeSlice);
    const estimatedAnnualProduction = useReduxGetSet<number>("estimatedAnnualProduction", estimatedAnnualProductionSlice);
    // Advanced
    const panelLifetime = useReduxGetSet<number>("panelLifetime", panelLifetimeSlice);
    const inverterLifetime = useReduxGetSet<number>("inverterLifetime", inverterLifetimeSlice);
    const degradationRate = useReduxGetSet<number>("degradationRate", degradationRateSlice);

    // PV System Costs
    const totalInstallationCosts = useReduxGetSet<number>("totalInstallationCosts", totalInstallationCostsSlice);
    const federalTaxCredit = useReduxGetSet<number>("federalTaxCredit", federalTaxCreditSlice);
    const stateOrLocalTaxCreditsOrGrantsOrRebates = useReduxGetSet<number>("stateOrLocalTaxCreditsOrGrantsOrRebates", stateOrLocalTaxCreditsOrGrantsOrRebatesSlice);
    // Advanced
    const inverterReplacementCosts = useReduxGetSet<number>("inverterReplacementCosts", inverterReplacementCostsSlice);
    const annualMaintenanceCosts = useReduxGetSet<number>("annualMaintenanceCosts", annualMaintenanceCostsSlice);

    // Purchasing Details
    const ppaOption = useReduxGetSet<string>("ppaOption", ppaOptionSlice);
    // Advanced
    const loanOrCash = useReduxGetSet<string>("loanOrCash", loanOrCashSlice);
    const downPayment = useReduxGetSet<number>("downPayment", downPaymentSlice);
    const nominalInterestRate = useReduxGetSet<number>("nominalInterestRate", nominalInterestRateSlice);
    const monthlyPayment = useReduxGetSet<number>("monthlyPayment", monthlyPaymentSlice);

    // Analysis Assumptions
    // Advanced
    const residualValueApproach = useReduxGetSet<string>("residualValueApproach", residualValueApproachSlice);
    const studyPeriod = useReduxGetSet<number>("studyPeriod", studyPeriodSlice);
    const realDiscountRate = useReduxGetSet<number>("realDiscountRate", realDiscountRateSlice);
    const generalInflation = useReduxGetSet<number>("generalInflation", generalInflationSlice);

    return (
        <Box className={"solar-system-page-container"}>
            <MaterialHeader text={"Solar PV System Information"}/>
            Fill in the system and cost information for the Solar PV quote you received.
            <Box className={"solar-system-form-container"}>
                <FormField
                    label={"System Panel Brand and Type"}
                    schema={Yup.string()}
                    value={systemPanelBrandAndType}/>
                <FormSelect
                    label={"Inverter Type"}
                    value={inverterType}
                    options={[
                        "String Inverter",
                        "String with Optimizers",
                        "Microinverters"
                    ]}/>
                <FormField
                    label={"Total System Size"}
                    schema={Yup.number().required()}
                    value={totalSystemSize}
                    endAdornment={"Watts"}
                    type={"number"}/>
                <FormField
                    label={"Estimated Annual Production"}
                    schema={Yup.number().required()}
                    value={estimatedAnnualProduction}
                    endAdornment={"kWh"}
                    type={"number"}/>
                <AdvancedHeader/>
                <div className={"advanced-box"}>
                    <FormField
                        label={"Panel Lifetime"}
                        schema={Yup.number().required()}
                        value={panelLifetime}
                        endAdornment={"Years"}
                        type={"number"}/>
                    <FormField
                        label={"Inverter Lifetime"}
                        schema={Yup.number().required()}
                        value={inverterLifetime}
                        endAdornment={"Years"}
                        type={"number"}/>
                    <FormField
                        label={"System Efficiency Degradation Rate (Year-Over-Year %)"}
                        schema={Yup.number().required()}
                        value={degradationRate}
                        endAdornment={"%"}
                        type={"number"}/>
                </div>
            </Box>
            <MaterialHeader text={"Solar PV System Costs"}/>
            <Box className={"solar-system-form-container"}>
                <FormField 
                    label={"Total Installation Costs"}
                    schema={Yup.number().required()}
                    value={totalInstallationCosts}
                    startAdornment={"$"}
                    type={"number"}/>
                <FormField 
                    label={"Federal Tax Credit - 26% of Total Installed Cost"}
                    schema={Yup.number().required()}
                    value={federalTaxCredit}
                    startAdornment={"$"}
                    type={"number"}/>
                <FormField 
                    label={"State/Local Tax Credits/Grants/Rebates"}
                    schema={Yup.number().required()}
                    value={stateOrLocalTaxCreditsOrGrantsOrRebates}
                    startAdornment={"$"}
                    type={"number"}/>
                <AdvancedHeader/>
                <div className={"advanced-box"}>
                    <FormField 
                        label={"Inverter Replacement Costs"}
                        schema={Yup.number().required()}
                        value={inverterReplacementCosts}
                        startAdornment={"$"}
                        type={"number"}/>
                    <FormField 
                        label={"Annual Maintenance Costs"}
                        schema={Yup.number().required()}
                        value={annualMaintenanceCosts}
                        startAdornment={"$"}
                        type={"number"}/>
                </div>
            </Box>
            <MaterialHeader text={"Purchasing Details"}/>
            <Box className={"solar-system-form-container"}>
                <FormSelect
                    label={"Include a Power Purchase Agreement Option?"}
                    value={ppaOption}
                    options={[
                        "Yes",
                        "No"
                    ]}/>
                <AdvancedHeader/>
                <div className={"advanced-box"}>
                    <FormSelect
                        label={"Loan or Cash Purchase"}
                        value={loanOrCash}
                        options={[
                            "Loan",
                            "Cash"
                        ]}/>
                    <FormField 
                        label={"Loan Down Payment"}
                        schema={Yup.number().required()}
                        value={downPayment}
                        endAdornment={"%"}
                        type={"number"}/>
                    <FormField 
                        label={"Loan Nominal Interest Rate"}
                        schema={Yup.number().required()}
                        value={nominalInterestRate}
                        endAdornment={"%"}
                        type={"number"}/>
                    <FormField 
                        label={"Monthly Loan Payment"}
                        schema={Yup.number().required()}
                        value={monthlyPayment}
                        startAdornment={"$"}
                        type={"number"}/>
                </div>
            </Box>
            <MaterialHeader text={"Analysis Assumptions"}/>
            <Box className={"solar-system-form-container"}>
                <AdvancedHeader/>
                <div className={"advanced-box"}>
                    <FormField 
                        label={"Study Period"}
                        schema={Yup.number().required()}
                        value={studyPeriod}
                        endAdornment={"Years"}
                        type={"number"}/>
                    <FormField 
                        label={"Real Discount Rate"}
                        schema={Yup.number().required()}
                        value={realDiscountRate}
                        endAdornment={"%"}
                        type={"number"}/>
                    <FormField 
                        label={"General Inflation Rate"}
                        schema={Yup.number().required()}
                        value={generalInflation}
                        endAdornment={"%"}
                        type={"number"}/>
                    <FormSelect
                        label={"Residual Value Approach"}
                        value={residualValueApproach}
                        options={[
                            "Remaining Production Value",
                            "Linear Depreciation"
                        ]}/>
                </div>
            </Box>
        </Box>
    );
}
