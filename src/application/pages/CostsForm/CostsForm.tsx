import React, {useContext} from "react";

// Library Imports
import {Box, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import * as Yup from "yup";
import {observer} from "mobx-react-lite";

// User Imports
import MaterialHeader from "../../../components/MaterialHeader/MaterialHeader";
import CollapseContainer from "../../../components/CollapseContainer/CollapseContainer";
import AdvancedBox from "../../../components/AdvancedBox/AdvancedBox";
import {Store} from "../../ApplicationStore";
import {
    ANNUAL_MAINTENANCE_COSTS_INFO,
    ANNUAL_MAINTENANCE_COSTS_LABEL,
    ANNUAL_MAINTENANCE_COSTS_TOOLTIP,
    FEDERAL_TAX_CREDIT_INFO,
    FEDERAL_TAX_CREDIT_LABEL,
    FEDERAL_TAX_CREDIT_TOOLTIP,
    INVERTER_REPLACEMENT_COSTS_INFO,
    INVERTER_REPLACEMENT_COSTS_LABEL,
    INVERTER_REPLACEMENT_COSTS_TOOLTIP,
    LOAN_DOWN_PAYMENT_INFO,
    LOAN_DOWN_PAYMENT_LABEL,
    LOAN_DOWN_PAYMENT_TOOLTIP,
    LOAN_OR_CASH_INFO,
    LOAN_OR_CASH_LABEL,
    LOAN_OR_CASH_OPTIONS,
    LOAN_OR_CASH_TOOLTIP,
    MONTHLY_PAYMENT_INFO,
    MONTHLY_PAYMENT_LABEL,
    MONTHLY_PAYMENT_TOOLTIP,
    NOMINAL_INTEREST_RATE_INFO,
    NOMINAL_INTEREST_RATE_LABEL,
    NOMINAL_INTEREST_RATE_TOOLTIP,
    PPA_CONTRACT_LENGTH_INFO,
    PPA_CONTRACT_LENGTH_LABEL,
    PPA_CONTRACT_LENGTH_TOOLTIP,
    PPA_ELECTRICITY_RATE_INFO,
    PPA_ELECTRICITY_RATE_LABEL,
    PPA_ELECTRICITY_RATE_TOOLTIP,
    PPA_ESCALATION_RATE_INFO,
    PPA_ESCALATION_RATE_LABEL,
    PPA_ESCALATION_RATE_TOOLTIP,
    PPA_OPTION_INFO,
    PPA_OPTION_LABEL,
    PPA_OPTION_TOOLTIP,
    PPA_OPTIONS,
    PPA_PURCHASE_PRICE_INFO,
    PPA_PURCHASE_PRICE_LABEL,
    PPA_PURCHASE_PRICE_TOOLTIP,
    TAX_CRED_OR_REBATE_INFO,
    TAX_CRED_OR_REBATE_LABEL,
    TAX_CRED_OR_REBATE_TOOLTIP,
    TOTAL_INSTALLATION_COSTS_INFO,
    TOTAL_INSTALLATION_COSTS_LABEL,
    TOTAL_INSTALLATION_COSTS_TOOLTIP
} from "../../../Strings";
import Info from "../../../components/Info";
import ValidatedTextField from "../../../components/ValidatedTextField";
import Adornment from "../../../components/Adornments";

// Stylesheets
import "../Form.sass";

/**
 * Creates a form to input the costs of the PV system.
 */
const CostsForm = observer(() => {
    const store = useContext(Store).costsFormStore;

    return (
        <Box className={"form-page-container"}>
            <MaterialHeader text={"Solar PV System Costs"}/>
            Fill in the system information for the Solar PV quote you received.
            <Box className={"form-single-column-container"}>
                <Info tooltip={TOTAL_INSTALLATION_COSTS_TOOLTIP} info={TOTAL_INSTALLATION_COSTS_INFO}>
                    <ValidatedTextField fullWidth
                                        required
                                        variant={"filled"}
                                        label={TOTAL_INSTALLATION_COSTS_LABEL}
                                        defaultValue={store.totalInstallationCosts}
                                        schema={Yup.number().required()}
                                        onValidate={(value) => {
                                            store.totalInstallationCosts = value
                                        }}
                                        onError={() => store.totalInstallationCosts = undefined}
                                        InputProps={Adornment.DOLLAR}
                                        type={"number"}/>
                </Info>
                <Info tooltip={FEDERAL_TAX_CREDIT_TOOLTIP} info={FEDERAL_TAX_CREDIT_INFO}>
                    <TextField fullWidth
                               variant={"filled"}
                               label={FEDERAL_TAX_CREDIT_LABEL}
                               value={store.federalTaxCredit}
                               InputProps={{
                                   ...Adornment.DOLLAR,
                                   readOnly: true
                               }}
                               type={"number"}/>
                </Info>
                <Info tooltip={TAX_CRED_OR_REBATE_TOOLTIP} info={TAX_CRED_OR_REBATE_INFO}>
                    <ValidatedTextField fullWidth
                                        required
                                        variant={"filled"}
                                        label={TAX_CRED_OR_REBATE_LABEL}
                                        defaultValue={store.stateOrLocalTaxCreditsOrGrantsOrRebates}
                                        schema={Yup.number().required()}
                                        onValidate={(value) => {
                                            store.stateOrLocalTaxCreditsOrGrantsOrRebates = value
                                        }}
                                        onError={() => store.stateOrLocalTaxCreditsOrGrantsOrRebates = undefined}
                                        InputProps={Adornment.DOLLAR}
                                        type={"number"}/>
                </Info>
                <CollapseContainer text="Advanced">
                    <AdvancedBox>
                        <Info tooltip={INVERTER_REPLACEMENT_COSTS_TOOLTIP} info={INVERTER_REPLACEMENT_COSTS_INFO}>
                            <ValidatedTextField fullWidth
                                                variant={"filled"}
                                                label={INVERTER_REPLACEMENT_COSTS_LABEL}
                                                defaultValue={store.inverterReplacementCosts}
                                                schema={Yup.number().required().min(0)}
                                                onValidate={(value) => {
                                                    store.inverterReplacementCosts = value
                                                }}
                                                InputProps={Adornment.DOLLAR}
                                                type={"number"}/>
                        </Info>
                        <Info tooltip={ANNUAL_MAINTENANCE_COSTS_TOOLTIP} info={ANNUAL_MAINTENANCE_COSTS_INFO}>
                            <ValidatedTextField fullWidth
                                                variant={"filled"}
                                                label={ANNUAL_MAINTENANCE_COSTS_LABEL}
                                                defaultValue={store.annualMaintenanceCosts}
                                                schema={Yup.number().required().min(0)}
                                                onValidate={(value) => {
                                                    store.annualMaintenanceCosts = value
                                                }}
                                                InputProps={Adornment.DOLLAR}
                                                type={"number"}/>
                        </Info>
                    </AdvancedBox>
                </CollapseContainer>
            </Box>
            <MaterialHeader text={"PPA Purchasing Option"}/>
            <Box className={"form-single-column-container"}>
                <Info tooltip={PPA_OPTION_TOOLTIP} info={PPA_OPTION_INFO}>
                    <FormControl fullWidth variant={"filled"}>
                        <InputLabel id={PPA_OPTION_LABEL}>{PPA_OPTION_LABEL}</InputLabel>
                        <Select className={"form-select-left-align"}
                                fullWidth
                                labelId={PPA_OPTION_LABEL}
                                value={store.ppaOption}
                                onChange={(event) => {
                                    store.ppaOption = event.target.value as string
                                }}>
                            {
                                PPA_OPTIONS.map((option, index) =>
                                    <MenuItem value={option} key={index}>{option}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </Info>
                {store.ppaOption === PPA_OPTIONS[0] && <>
                    <Info tooltip={PPA_CONTRACT_LENGTH_TOOLTIP} info={PPA_CONTRACT_LENGTH_INFO}>
                        <ValidatedTextField fullWidth
                                            required
                                            variant={"filled"}
                                            label={PPA_CONTRACT_LENGTH_LABEL}
                                            defaultValue={store.ppaContractLength}
                                            schema={Yup.number().required().max(40).min(1)}
                                            onValidate={(value) => {
                                                store.ppaContractLength = value
                                            }}
                                            onError={() => store.ppaContractLength = undefined}
                                            InputProps={Adornment.YEAR}
                                            type={"number"}/>
                    </Info>
                    <Info tooltip={PPA_ELECTRICITY_RATE_TOOLTIP} info={PPA_ELECTRICITY_RATE_INFO}>
                        <ValidatedTextField fullWidth
                                            required
                                            variant={"filled"}
                                            label={PPA_ELECTRICITY_RATE_LABEL}
                                            defaultValue={store.ppaElectricityRate}
                                            schema={Yup.number().required()}
                                            onValidate={(value) => {
                                                store.ppaElectricityRate = value
                                            }}
                                            onError={() => store.ppaElectricityRate = undefined}
                                            InputProps={Adornment.DOLLAR}
                                            type={"number"}/>
                    </Info>
                    <Info tooltip={PPA_ESCALATION_RATE_TOOLTIP} info={PPA_ESCALATION_RATE_INFO}>
                        <ValidatedTextField fullWidth
                                            required
                                            variant={"filled"}
                                            label={PPA_ESCALATION_RATE_LABEL}
                                            defaultValue={store.ppaEscalationRate}
                                            schema={Yup.number().required()}
                                            onValidate={(value) => {
                                                store.ppaEscalationRate = value
                                            }}
                                            onError={() => store.ppaEscalationRate = undefined}
                                            InputProps={Adornment.PERCENT}
                                            type={"number"}/>
                    </Info>
                    <Info tooltip={PPA_PURCHASE_PRICE_TOOLTIP} info={PPA_PURCHASE_PRICE_INFO}>
                        <ValidatedTextField fullWidth
                                            required
                                            variant={"filled"}
                                            label={PPA_PURCHASE_PRICE_LABEL}
                                            defaultValue={store.ppaPurchasePrice}
                                            schema={Yup.number().required()}
                                            onValidate={(value) => {
                                                store.ppaPurchasePrice = value
                                            }}
                                            onError={() => store.ppaPurchasePrice = undefined}
                                            InputProps={Adornment.DOLLAR}
                                            type={"number"}/>
                    </Info>
                </>
                }
            </Box>
            <MaterialHeader text={"Cash or Loan Option"}/>
            <Box className={"form-single-column-container"}>
                <Info tooltip={LOAN_OR_CASH_TOOLTIP} info={LOAN_OR_CASH_INFO}>
                    <FormControl fullWidth variant={"filled"}>
                        <InputLabel id={LOAN_OR_CASH_LABEL}>{LOAN_OR_CASH_LABEL}</InputLabel>
                        <Select className={"form-select-left-align"}
                                fullWidth
                                labelId={LOAN_OR_CASH_LABEL}
                                value={store.loanOrCash}
                                onChange={(event) => {
                                    store.loanOrCash = event.target.value as string
                                }}>
                            {
                                LOAN_OR_CASH_OPTIONS.map((option, index) =>
                                    <MenuItem value={option} key={index}>{option}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </Info>
                {store.loanOrCash === LOAN_OR_CASH_OPTIONS[0] &&
                <>
                    <Info tooltip={LOAN_DOWN_PAYMENT_TOOLTIP} info={LOAN_DOWN_PAYMENT_INFO}>
                        <ValidatedTextField fullWidth
                                            required
                                            variant={"filled"}
                                            label={LOAN_DOWN_PAYMENT_LABEL}
                                            defaultValue={store.downPayment}
                                            schema={Yup.number().required().max(100).min(0)}
                                            onValidate={(value) => {
                                                store.downPayment = value
                                            }}
                                            onError={() => store.downPayment = undefined}
                                            InputProps={Adornment.PERCENT}
                                            type={"number"}/>
                    </Info>
                    <Info tooltip={NOMINAL_INTEREST_RATE_TOOLTIP} info={NOMINAL_INTEREST_RATE_INFO}>
                        <ValidatedTextField fullWidth
                                            required
                                            variant={"filled"}
                                            label={NOMINAL_INTEREST_RATE_LABEL}
                                            defaultValue={store.nominalInterestRate}
                                            schema={Yup.number().required().max(100).min(0)}
                                            onValidate={(value) => {
                                                store.nominalInterestRate = value
                                            }}
                                            onError={() => store.nominalInterestRate = undefined}
                                            InputProps={Adornment.PERCENT}
                                            type={"number"}/>
                    </Info>
                    <Info tooltip={MONTHLY_PAYMENT_TOOLTIP} info={MONTHLY_PAYMENT_INFO}>
                        <ValidatedTextField fullWidth
                                            required
                                            variant={"filled"}
                                            label={MONTHLY_PAYMENT_LABEL}
                                            defaultValue={store.monthlyPayment}
                                            schema={Yup.number().required().moreThan(0)}
                                            onValidate={(value) => {
                                                store.monthlyPayment = value
                                            }}
                                            onError={() => store.monthlyPayment = undefined}
                                            InputProps={Adornment.PERCENT}
                                            type={"number"}/>
                    </Info>
                </>
                }
            </Box>
        </Box>
    );
});

export default CostsForm;
