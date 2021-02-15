import {ReactElement} from "react";
import "./SolarSystemForm.scss";

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
    // PV System Details
    systemPanelBrandAndTypeSlice,
    inverterTypeSlice,
] = [
    // PV System Details
    "systemPanelBrandAndType",
    "inverterType",
].map(createStringSlice)

// Redux number slices
export const [
    // PV System Information
    totalSystemSizeSlice,
    estimatedAnnualProductionSlice,
    panelLifetimeSlice,
    inverterLifetimeSlice,
    degradationRateSlice,
] = [
     // PV System Information
    "totalSystemSize",
    "estimatedAnnualProduction",
    "panelLifetime",
    "inverterLifetime",
    "degradationRate",
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

    return (
        <Box className={"solar-system-page-container"}>
            <MaterialHeader text={"Solar PV System Information"}/>
            Fill in the system information for the Solar PV quote you received.
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
                <CollapseContainer text={"Advanced"}>
                    <AdvancedBox>
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
                    </AdvancedBox>
                </CollapseContainer>
            </Box>
        </Box>
    );
}
