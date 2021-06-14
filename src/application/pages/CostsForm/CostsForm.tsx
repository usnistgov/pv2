import {ReactElement} from "react";

// Library Imports
import {Box} from "@material-ui/core";
import * as Yup from "yup";

// User Imports
import MaterialHeader from "../../../components/MaterialHeader/MaterialHeader";
import FormField from "../../../components/FormField/FormField";
import {useReduxGetSet} from "../../../Utils";
import FormSelect from "../../../components/FormSelect/FormSelect";
import CollapseContainer from "../../../components/CollapseContainer/CollapseContainer";
import AdvancedBox from "../../../components/AdvancedBox/AdvancedBox";

// Stylesheets
import "../Form.sass";

/**
 * Creates a form to input the costs of the PV system.
 */
export default function CostsForm(): ReactElement {
    // Redux state objects
    // PV System Costs
    const totalInstallationCosts = useReduxGetSet<number>("totalInstallationCosts");
    const federalTaxCredit = useReduxGetSet<number>("federalTaxCredit");
    const stateOrLocalTaxCreditsOrGrantsOrRebates = useReduxGetSet<number>("stateOrLocalTaxCreditsOrGrantsOrRebates");
    // Advanced
    const inverterReplacementCosts = useReduxGetSet<number>("inverterReplacementCosts");
    const annualMaintenanceCosts = useReduxGetSet<number>("annualMaintenanceCosts");

    // Purchasing Details
    const ppaOption = useReduxGetSet<string>("ppaOption");
    // Advanced
    const loanOrCash = useReduxGetSet<string>("loanOrCash");
    const downPayment = useReduxGetSet<number>("downPayment");
    const nominalInterestRate = useReduxGetSet<number>("nominalInterestRate");
    const monthlyPayment = useReduxGetSet<number>("monthlyPayment");

    return (
        <Box className={"form-page-container"}>
            <MaterialHeader text={"Solar PV System Costs"}/>
            Fill in the system information for the Solar PV quote you received.
            <Box className={"form-single-column-container"}>
                <FormField
                    tooltip={"Total (gross) costs of installing the system before financial incentives"}
                    info={
                        "Total (gross) costs of installing the system before financial incentives, such as federal " +
                        "tax credits and state/local grants or rebates. User should exclude any costs for re-roofing."
                    }
                    label={"Total Installation Costs"}
                    schema={Yup.number().required()}
                    value={totalInstallationCosts}
                    startAdornment={"$"}
                    type={"number"}/>
                <FormField
                    tooltip={"Currently 26% of total installation costs"}
                    info={
                        "Federal tax credit is currently 26% of total installation costs. This credit applies to all " +
                        "costs associated with the installation."
                    }
                    label={"Federal Tax Credit - 26% of Total Installed Cost"}
                    schema={Yup.number().required()}
                    value={federalTaxCredit}
                    startAdornment={"$"}
                    type={"number"}/>
                <FormField
                    tooltip={"Financial incentives from state and local programs"}
                    info={
                        "State and local financial incentives include grant and rebate programs. Loan programs will " +
                        "be addressed under Purchasing Details below."
                    }
                    label={"State/Local Tax Credits/Grants/Rebates"}
                    schema={Yup.number().required()}
                    value={stateOrLocalTaxCreditsOrGrantsOrRebates}
                    startAdornment={"$"}
                    type={"number"}/>
                <CollapseContainer text="Advanced">
                    <AdvancedBox>
                        <FormField
                            tooltip={"Costs of replacing only the inverter(s)"}
                            info={
                                "Costs of replacing only the inverters. Should only be provided if the inverter " +
                                "expected service life is not the same as the solar panels."
                            }
                            label={"Inverter Replacement Costs"}
                            schema={Yup.number().required().moreThan(0)}
                            value={inverterReplacementCosts}
                            startAdornment={"$"}
                            type={"number"}/>
                        <FormField
                            tooltip={"Annual costs of maintaining the solar PV system"}
                            info={
                                "Annual costs of maintaining the solar PV system, such as annual contract with " +
                                "installer to clean panels and check panel performance"
                            }
                            label={"Annual Maintenance Costs"}
                            schema={Yup.number().required().moreThan(0)}
                            value={annualMaintenanceCosts}
                            startAdornment={"$"}
                            type={"number"}/>
                    </AdvancedBox>
                </CollapseContainer>
            </Box>
            <MaterialHeader text={"Purchasing Details"}/>
            <Box className={"form-single-column-container"}>
                <FormSelect
                    tooltip={"Include a PPA/leasing option in the analysis"}
                    info={
                        "Include a PPA/leasing option in the analysis. Under a PPA/lease, the installer owns the " +
                        "system and homeowners sign a contract to pay the installer for the electricity produced by " +
                        "the system. Typically, homeowners have a purchase option at the end of the"
                    }
                    label={"Include a Power Purchase Agreement Option?"}
                    value={ppaOption}
                    options={[
                        "Yes",
                        "No"
                    ]}/>
                {ppaOption.get() === "Yes" && <>
                    <FormSelect
                        tooltip={"Purchasing upfront (“cash”) or through financing (loan)."}
                        info={"Choose between purchasing upfront (“cash”) or through financing (loan)."}
                        label={"Loan or Cash Purchase"}
                        value={loanOrCash}
                        options={[
                            "Loan",
                            "Cash"
                        ]}/>
                    {loanOrCash.get() === "Loan" &&
                    <>
                        <FormField
                            tooltip={"Percent of Total Installed Cost Paid at Time of Signature/Installation"}
                            info={
                                "Percent of Total Installed Cost Paid at Time of Signature/Installation. Typically " +
                                "ranging from 0% to 20%."
                            }
                            label={"Loan Down Payment"}
                            schema={Yup.number().required().max(100).min(0)}
                            value={downPayment}
                            endAdornment={"%"}
                            type={"number"}/>
                        <FormField
                            tooltip={"Nominal interest rate on the loan"}
                            info={"Nominal interest rate on the loan."}
                            label={"Loan Nominal Interest Rate"}
                            schema={Yup.number().required().max(100).min(0)}
                            value={nominalInterestRate}
                            endAdornment={"%"}
                            type={"number"}/>
                        <FormField
                            tooltip={"Monthly payment on the loan"}
                            info={"Monthly payment on the loan."}
                            label={"Monthly Loan Payment"}
                            schema={Yup.number().required().moreThan(0)}
                            value={monthlyPayment}
                            startAdornment={"$"}
                            type={"number"}/>
                    </>
                    }
                </>
                }
            </Box>
        </Box>
    );
}
