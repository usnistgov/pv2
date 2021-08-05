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
    const panelEfficiency = useReduxGetSet<string>("panelEfficiency");
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
                    tooltip={"Input panel information"}
                    info={"Solar Panel Rate Efficiency."}
                    label={"Solar Panel Rate Efficiency"}
                    schema={Yup.number().max(100).min(0)}
                    endAdornment={"%"}
                    value={panelEfficiency}/>
                <FormSelect
                    tooltip={"Type of inverter"}
                    info={<div>Inverter type can be:<br/>Microinverter<br/>String<br/>String with Optimizers</div>}
                    label={"Inverter Type"}
                    value={inverterType}
                    options={[
                        "String Inverter",
                        "String with Optimizers",
                        "Microinverters"
                    ]}/>
                <FormField
                    tooltip={"Total rated wattage of system"}
                    label={"Total System Size"}
                    schema={Yup.number().required()}
                    value={totalSystemSize}
                    endAdornment={"Watts"}
                    type={"number"}/>
                <FormField
                    tooltip={"Estimated annual production in kWh"}
                    info={
                        "Estimated annual production in the initial year of operation. Calculations account for " +
                        "decreasing production due to efficiency degradation of the solar PV system"
                    }
                    label={"Estimated Annual Production"}
                    schema={Yup.number().required()}
                    value={estimatedAnnualProduction}
                    endAdornment={"kWh"}
                    type={"number"}/>
                <CollapseContainer text={"Advanced"}>
                    <AdvancedBox>
                        <FormField
                            tooltip={"Expected service life of solar panels"}
                            info={
                                "Panel lifetime is the expected service life of the solar panels. Typically use 25 " +
                                "years or the length of the warranty. Must be 40 years or less."
                            }
                            label={"Panel Lifetime"}
                            schema={Yup.number().required().max(40).min(1)}
                            value={panelLifetime}
                            endAdornment={"Years"}
                            type={"number"}/>
                        <FormField
                            tooltip={"Expected service life of inverter"}
                            info={
                                "Inverter lifetime is the expected service life of the inverters. Typical lifetimes are:\n" +
                                "String: 15 years or length of warranty\n" +
                                "Microinverter: lifetime or warranty length of panels\n" +
                                "Must be 40 years or less."
                            }
                            label={"Inverter Lifetime"}
                            schema={Yup.number().required().max(40).min(1)}
                            value={inverterLifetime}
                            endAdornment={"Years"}
                            type={"number"}/>
                        <FormField
                            tooltip={"Rate at which the solar production decreasing year-over-year"}
                            info={
                                "Degradation Rate is the rate at which the solar production decreases each year. " +
                                "Default is 0.05%. Specific system degradation should be in the solar PC system " +
                                "warranty document."
                            }
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
