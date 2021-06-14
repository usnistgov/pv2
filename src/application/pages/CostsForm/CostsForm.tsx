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
                            schema={Yup.number().required().moreThan(0)}
                            value={inverterReplacementCosts}
                            startAdornment={"$"}
                            type={"number"}/>
                        <FormField
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
                    label={"Include a Power Purchase Agreement Option?"}
                    value={ppaOption}
                    options={[
                        "Yes",
                        "No"
                    ]}/>
                {ppaOption.get() === "Yes" && <>
                    <FormSelect
                        label={"Loan or Cash Purchase"}
                        value={loanOrCash}
                        options={[
                            "Loan",
                            "Cash"
                        ]}/>
                    {loanOrCash.get() === "Loan" &&
                    <>
                        <FormField
                            label={"Loan Down Payment"}
                            schema={Yup.number().required().max(100).min(0)}
                            value={downPayment}
                            endAdornment={"%"}
                            type={"number"}/>
                        <FormField
                            label={"Loan Nominal Interest Rate"}
                            schema={Yup.number().required().max(100).min(0)}
                            value={nominalInterestRate}
                            endAdornment={"%"}
                            type={"number"}/>
                        <FormField
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
