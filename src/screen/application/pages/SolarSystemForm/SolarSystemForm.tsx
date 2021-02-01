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
    systemPanelBrandAndTypeSlice,
    inverterTypeSlice,
    ppaOptionSlice,
] = [
    "systemPanelBrandAndType",
    "inverterType",
    "ppaOption"
].map(createStringSlice)

// Redux number slices
export const [
    totalSystemSizeSlice,
    estimatedAnnualProductionSlice,
    totalInstallationCostsSlice,
    federalTaxCreditSlice,
    stateOrLocalTaxCreditsOrGrantsOrRebatesSlice,
] = [
    "totalSystemSize",
    "estimatedAnnualProduction",
    "totalInstallationCosts",
    "federalTaxCredit",
    "stateOrLocalTaxCreditsOrGrantsOrRebates"
].map(createNumberSlice)

export default function SolarSystemForm(): ReactElement {
    // Redux state objects
    // PV System Information
    const systemPanelBrandAndType = useReduxGetSet<string>("systemPanelBrandAndType", systemPanelBrandAndTypeSlice);
    const inverterType = useReduxGetSet<string>("inverterType", inverterTypeSlice);
    const totalSystemSize = useReduxGetSet<number>("totalSystemSize", totalSystemSizeSlice);
    const estimatedAnnualProduction = useReduxGetSet<number>("estimatedAnnualProduction", estimatedAnnualProductionSlice);
    
    // PV System Costs
    const totalInstallationCosts = useReduxGetSet<number>("totalInstallationCosts", totalInstallationCostsSlice);
    const federalTaxCredit = useReduxGetSet<number>("federalTaxCredit", federalTaxCreditSlice);
    const stateOrLocalTaxCreditsOrGrantsOrRebates = useReduxGetSet<number>("stateOrLocalTaxCreditsOrGrantsOrRebates", stateOrLocalTaxCreditsOrGrantsOrRebatesSlice);

    // Purchasing Details
    const ppaOption = useReduxGetSet<string>("ppaOption", ppaOptionSlice);

    // Analysis Assumptions
    
    return (
        <Box>
            <MaterialHeader text={"Solar PV System Information"}/>
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
                    schema={Yup.number().positive().required()}
                    value={totalSystemSize}
                    endAdornment={"Watts"}
                    type={"number"}/>
                <FormField
                    label={"Estimated Annual Production"}
                    schema={Yup.number().positive().required()}
                    value={estimatedAnnualProduction}
                    endAdornment={"kWh"}
                    type={"number"}/>
                <AdvancedHeader/>
            </Box>
            <MaterialHeader text={"Solar PV System Costs"}/>
            <Box className={"solar-system-form-container"}>
                <FormField 
                    label={"Total Installation Costs"}
                    schema={Yup.number().positive().required()}
                    value={totalInstallationCosts}
                    startAdornment={"$"}
                    type={"number"}/>
                <FormField 
                    label={"Federal Tax Credit - 26% of Total Installed Cost"}
                    schema={Yup.number().positive().required()}
                    value={federalTaxCredit}
                    startAdornment={"$"}
                    type={"number"}/>
                <FormField 
                    label={"State/Local Tax Credits/Grants/Rebates"}
                    schema={Yup.number().positive().required()}
                    value={stateOrLocalTaxCreditsOrGrantsOrRebates}
                    startAdornment={"$"}
                    type={"number"}/>
                <AdvancedHeader/>
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
            </Box>
            <MaterialHeader text={"Analysis Assumptions"}/>
            <Box className={"solar-system-form-container"}>
                <AdvancedHeader/>
            </Box>
        </Box>
    );
}
