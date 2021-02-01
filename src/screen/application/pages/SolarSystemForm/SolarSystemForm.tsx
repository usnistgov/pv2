import {ReactElement} from "react";
import "./SolarSystemForm.scss";

import {Box} from "@material-ui/core";
import * as Yup from "yup";

import MaterialHeader from "../../components/MaterialHeader/MaterialHeader";
import FormField from "../../components/FormField/FormField";
import { createNumberSlice, createStringSlice, useReduxGetSet } from "../../Utils";
import FormSelect from "../../components/FormSelect/FormSelect";

// Redux string slices
export const [
    systemPanelBrandAndTypeSlice,
    inverterTypeSlice,
] = [
    "systemPanelBrandAndType",
    "inverterType",
].map(createStringSlice)

// Redux number slices
export const [
    totalSystemSizeSlice,
    estimatedAnnualProductionSlice,
    federalTaxCreditSlice,
    stateOrLocalTaxCreditsOrGrantsOrRebatesSlice,
] = [
    "totalSystemSize",
    "estimatedAnnualProduction",
    "federalTaxCredit",
    "stateOrLocalTaxCreditsOrGrantsOrRebates"
].map(createNumberSlice)

export default function SolarSystemForm(): ReactElement {
    // Redux state objects
    const systemPanelBrandAndType = useReduxGetSet<string>("systemPanelBrandAndType", systemPanelBrandAndTypeSlice);
    const inverterType = useReduxGetSet<string>("inverterType", inverterTypeSlice);
    const totalSystemSize = useReduxGetSet<number>("totalSystemSize", totalSystemSizeSlice);
    const estimatedAnnualProduction = useReduxGetSet<number>("estimatedAnnualProduction", estimatedAnnualProductionSlice);
    const federalTaxCredit = useReduxGetSet<number>("federalTaxCredit", federalTaxCreditSlice);
    const stateOrLocalTaxCreditsOrGrantsOrRebates = useReduxGetSet<number>("stateOrLocalTaxCreditsOrGrantsOrRebates", stateOrLocalTaxCreditsOrGrantsOrRebatesSlice);

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
            </Box>
            <MaterialHeader text={"Solar PV System Costs"}/>
            <Box className={"solar-system-form-container"}>
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
            </Box>
        </Box>
    );
}
