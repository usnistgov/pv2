import {ReactElement} from "react";
import "./SolarSystemForm.scss";

import {Box} from "@material-ui/core";
import * as Yup from "yup";

import MaterialHeader from "../../components/MaterialHeader/MaterialHeader";
import FormField from "../../components/FormField/FormField";
import {useReduxGetSet} from "../../Utils";
import FormSelect from "../../components/FormSelect/FormSelect";
import CollapseContainer from "../../components/CollapseContainer/CollapseContainer";
import AdvancedBox from "../../components/AdvancedBox/AdvancedBox";

export default function SolarSystemForm(): ReactElement {
    // Redux state objects
    // PV System Information
    const systemPanelBrandAndType = useReduxGetSet<string>("systemPanelBrandAndType", "");
    const inverterType = useReduxGetSet<string>("inverterType", "");
    const totalSystemSize = useReduxGetSet<number>("totalSystemSize", 0);
    const estimatedAnnualProduction = useReduxGetSet<number>("estimatedAnnualProduction", 0);
    // Advanced
    const panelLifetime = useReduxGetSet<number>("panelLifetime", 0);
    const inverterLifetime = useReduxGetSet<number>("inverterLifetime", 0);
    const degradationRate = useReduxGetSet<number>("degradationRate", 0);

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
