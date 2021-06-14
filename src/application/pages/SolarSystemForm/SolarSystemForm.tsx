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
 * Form for details about the output of the PV system.
 */
export default function SolarSystemForm(): ReactElement {
    // Redux state objects
    // PV System Information
    const systemPanelBrandAndType = useReduxGetSet<string>("systemPanelBrandAndType");
    const inverterType = useReduxGetSet<string>("inverterType");
    const totalSystemSize = useReduxGetSet<number>("totalSystemSize");
    const estimatedAnnualProduction = useReduxGetSet<number>("estimatedAnnualProduction");
    // Advanced
    const panelLifetime = useReduxGetSet<number>("panelLifetime");
    const inverterLifetime = useReduxGetSet<number>("inverterLifetime");
    const degradationRate = useReduxGetSet<number>("degradationRate");

    return (
        <Box className={"form-page-container"}>
            <MaterialHeader text={"Solar PV System Information"}/>
            Fill in the system information for the Solar PV quote you received.
            <Box className={"form-single-column-container"}>
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
                            schema={Yup.number().required().max(40).min(1)}
                            value={panelLifetime}
                            endAdornment={"Years"}
                            type={"number"}/>
                        <FormField
                            label={"Inverter Lifetime"}
                            schema={Yup.number().required().max(40).min(1)}
                            value={inverterLifetime}
                            endAdornment={"Years"}
                            type={"number"}/>
                        <FormField
                            label={"System Efficiency Degradation Rate (Year-Over-Year %)"}
                            schema={Yup.number().required().max(100).min(0)}
                            value={degradationRate}
                            endAdornment={"%"}
                            type={"number"}/>
                    </AdvancedBox>
                </CollapseContainer>
            </Box>
        </Box>
    );
}
