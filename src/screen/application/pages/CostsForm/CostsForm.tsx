import {ReactElement} from "react";
import "./CostsForm.scss";

import {Box} from "@material-ui/core";
import * as Yup from "yup";

import MaterialHeader from "../../components/MaterialHeader/MaterialHeader";
import FormField from "../../components/FormField/FormField";
import { createNumberSlice, createStringSlice, useReduxGetSet } from "../../Utils";
import FormSelect from "../../components/FormSelect/FormSelect";
import CollapseContainer from "../../components/CollapseContainer/CollapseContainer";
import AdvancedBox from "../../components/AdvancedBox/AdvancedBox";

// Redux string slices
export const [
    // PV System Costs

    // Purchasing Details
    ppaOptionSlice,
    loanOrCashSlice,

    // Analysis Assumptions
    residualValueApproachSlice
] = [
    // PV System Costs

    // Purchasing Details
    "ppaOption",
    "loanOrCash",
    
    // Analysis Assumptions
    "residualValueApproach"
    
].map(createStringSlice)

// Redux number slices
export const [
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

export default function CostsForm(): ReactElement {
    // Redux state objects
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
        <Box className={"costs-page-container"}>
            <MaterialHeader text={"Solar PV System Costs"}/>
            Fill in the system information for the Solar PV quote you received.
            <Box className={"costs-form-container"}>
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
                <CollapseContainer text="Advanced">
                    <AdvancedBox>
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
                    </AdvancedBox>
                </CollapseContainer>
            </Box>
            <MaterialHeader text={"Purchasing Details"}/>
            <Box className={"costs-form-container"}>
                <FormSelect
                    label={"Include a Power Purchase Agreement Option?"}
                    value={ppaOption}
                    options={[
                        "Yes",
                        "No"
                    ]}/>
                <CollapseContainer text="Advanced">
                    <AdvancedBox>
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
                    </AdvancedBox>
                </CollapseContainer>
            </Box>
            <MaterialHeader text={"Analysis Assumptions"}/>
            <Box className={"costs-form-container"}>
                <CollapseContainer text="Advanced">
                    <AdvancedBox>
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
                    </AdvancedBox>
                </CollapseContainer>
            </Box>
        </Box>
    );
}
