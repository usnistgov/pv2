import React, {useContext} from "react";

// Library Imports
import {Box} from "@material-ui/core";
import {observer} from "mobx-react-lite";

// User Imports
import MaterialHeader from "../../../components/MaterialHeader/MaterialHeader";
import {Store} from "../../ApplicationStore";
import {
    ADDRESS_LABEL,
    ADDRESS_TOOLTIP,
    CITY_LABEL,
    CITY_TOOLTIP,
    STATE_LABEL,
    STATE_TOOLTIP,
    ZIPCODE_LABEL,
    ZIPCODE_TOOLTIP
} from "../../../Strings";
import ValidatedTextField from "../../../components/ValidatedTextField";
import Info from "../../../components/Info/Info";
import ResetButton from "../../../components/ResetButton/ResetButton";

interface AddressFormProps {
    step: number;
}

/*
 * The AddressForm component is the first page of the application form that lets user fill
 * in their address and displays an embedded iframe of Google Maps with the inputted location.
 */
const AddressForm = observer(({step}: AddressFormProps) => {
    const store = useContext(Store).addressFormStore;
    const uiStore = useContext(Store).formUiStore;

    return (
        <Box className={"form-page-container"}>
            <MaterialHeader text={"Address"} right={<ResetButton onClick={() => store.reset()}/>}/>
            <div className={"form-page-text"}>
                Insert address for home on which a solar PV system may be installed.
                Only the ZIP Code is necessary for [PV]<sup>2</sup> to calculate results.
            </div>
            <Box className={"form-single-column-container"}>
                <Info tooltip={ADDRESS_TOOLTIP}>
                    <ValidatedTextField fullWidth
                                        label={ADDRESS_LABEL}
                                        value={store.address}
                                        variant={"filled"}
                                        schema={store.addressSchema}
                                        action={(value) => store.address = value}
                                        shouldUpdate={() => uiStore.newStep !== step}/>
                </Info>
                <Info tooltip={CITY_TOOLTIP}>
                    <ValidatedTextField fullWidth
                                        label={CITY_LABEL}
                                        value={store.city}
                                        variant={"filled"}
                                        schema={store.citySchema}
                                        action={(value) => store.city = value}
                                        shouldUpdate={() => uiStore.newStep !== step}/>
                </Info>
                <Info tooltip={STATE_TOOLTIP}>
                    <ValidatedTextField fullWidth
                                        label={STATE_LABEL}
                                        value={store.state}
                                        variant={"filled"}
                                        schema={store.stateSchema}
                                        action={(value) => store.state = value}
                                        shouldUpdate={() => uiStore.seen.has(step)}/>
                </Info>
                <Info tooltip={ZIPCODE_TOOLTIP}>
                    <ValidatedTextField fullWidth
                                        required
                                        label={ZIPCODE_LABEL}
                                        value={store.zipcode}
                                        variant={"filled"}
                                        schema={store.zipcodeSchema}
                                        action={(value) => store.zipcode = value}
                                        shouldUpdate={() => uiStore.newStep !== step}/>
                </Info>
            </Box>
        </Box>
    );
})

export default AddressForm;
