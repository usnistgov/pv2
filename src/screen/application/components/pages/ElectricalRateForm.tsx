import {Component} from "react";
import {Box, InputAdornment, TextField} from "@material-ui/core";
import MaterialHeader from "../MaterialHeader";
import "./ElectricalRateForm.css"

class ElectricalRateForm extends Component {
    render() {
        return (
            <Box>
                <MaterialHeader text={"Electrical Rate Information"}/>
                <Box className={"form-container"}>
                    <TextField fullWidth
                               label={"Electricity Utility Company"}
                               variant={"filled"}/>
                </Box>
                <Box className={"form-container"}>
                    <TextField fullWidth
                               label={"Annual Consumption"}
                               variant={"filled"}
                               InputProps={{
                                   endAdornment: <InputAdornment position={"end"}>kWH</InputAdornment>
                               }}
                               type={"number"}/>
                </Box>
                <Box className={"form-container"}>
                    <TextField fullWidth
                               label={"Monthly Flat Rate Charge"}
                               variant={"filled"}
                               InputProps={{
                                   startAdornment: <InputAdornment position={"start"}>$</InputAdornment>
                               }}/>
                </Box>
                <Box className={"form-container"}>
                    <TextField fullWidth
                               label={"Electricity Unit Price"}
                               variant={"filled"}
                               InputProps={{
                                   endAdornment: <InputAdornment position={"end"}>$/kWH</InputAdornment>
                               }}/>
                </Box>
                <Box className={"form-container"}>
                    <TextField fullWidth
                               label={"Net Metering or Feed In Tariff (FiT)"}
                               variant={"filled"}/>
                </Box>
                <Box className={"form-container"}>
                    <TextField fullWidth
                               label={"Excess Generation / FiT Unit Price"}
                               variant={"filled"}
                               InputProps={{
                                   endAdornment: <InputAdornment position={"end"}>$/kWH</InputAdornment>
                               }}/>
                </Box>
                <Box className={"form-container"}>
                    <TextField fullWidth
                               label={"PV Grid Connection Rate (Monthly)"}
                               variant={"filled"}
                               InputProps={{
                                   endAdornment: <InputAdornment position={"end"}>$/kW</InputAdornment>
                               }}/>
                </Box>
            </Box>
        );
    }
}

export default ElectricalRateForm;