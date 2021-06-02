import {ReactElement} from "react";
import "./CostsForm.sass";

import {Box} from "@material-ui/core";
import * as Yup from "yup";

import MaterialHeader from "../../components/MaterialHeader/MaterialHeader";
import FormField from "../../components/FormField/FormField";
import {useReduxGetSet} from "../../../../Utils";
import FormSelect from "../../components/FormSelect/FormSelect";
import CollapseContainer from "../../components/CollapseContainer/CollapseContainer";
import AdvancedBox from "../../components/AdvancedBox/AdvancedBox";

export default function CostsForm(): ReactElement {
    // Redux state objects
    // PV System Costs
    const totalInstallationCosts = useReduxGetSet<number>("totalInstallationCosts", 0);
    const federalTaxCredit = useReduxGetSet<number>("federalTaxCredit", 0);
    const stateOrLocalTaxCreditsOrGrantsOrRebates = useReduxGetSet<number>("stateOrLocalTaxCreditsOrGrantsOrRebates", 0);
    // Advanced
    const inverterReplacementCosts = useReduxGetSet<number>("inverterReplacementCosts", 0);
    const annualMaintenanceCosts = useReduxGetSet<number>("annualMaintenanceCosts", 0);

    // Purchasing Details
    const ppaOption = useReduxGetSet<string>("ppaOption", "");
    // Advanced
    const loanOrCash = useReduxGetSet<string>("loanOrCash", "");
    const downPayment = useReduxGetSet<number>("downPayment", 0);
    const nominalInterestRate = useReduxGetSet<number>("nominalInterestRate", 0);
    const monthlyPayment = useReduxGetSet<number>("monthlyPayment", 0);

    // Analysis Assumptions
    // Advanced
    const residualValueApproach = useReduxGetSet<string>("residualValueApproach", "");
    const studyPeriod = useReduxGetSet<number>("studyPeriod", 25);
    const realDiscountRate = useReduxGetSet<number>("realDiscountRate", 0);
    const generalInflation = useReduxGetSet<number>("generalInflation", 0);

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
