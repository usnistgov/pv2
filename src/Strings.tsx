export const ADDRESS_FORM_TOOLTIP = "Your Home Address";
export const ADDRESS_LABEL = "Address";
export const CITY_LABEL = "City";
export const STATE_LABEL = "State";
export const ZIPCODE_LABEL = "Zipcode";

export const STUDY_PERIOD_LABEL = "Study Period";
export const STUDY_PERIOD_TOOLTIP = "Study period is the analysis time frame";
export const STUDY_PERIOD_INFO = "Study period is the length of the time period covered by the economic evaluation. " +
    "Can select a study period between 1 year and 40 years";

export const REAL_DISCOUNT_RATE_LABEL = "Real Discount Rate";
export const REAL_DISCOUNT_RATE_TOOLTIP = "Time value of money excluding inflation";
export const REAL_DISCOUNT_RATE_INFO = "Real Discount Rates reflect Time Value of Money apart from changes in the " +
    "purchasing power of the dollar (i.e., general inflation)";

export const GENERAL_INFLATION_LABEL = "General Inflation Rate";
export const GENERAL_INFLATION_TOOLTIP = "General rate of price changes over time";
export const GENERAL_INFLATION_INFO = "General inflation rate is the rate of rise in the general price level, or, " +
    "put another way, a decline in the general purchasing power of the dollar.";

export const RESIDUAL_VALUE_APPROACH_LABEL = "Residual Value Approach";
export const RESIDUAL_VALUE_APPROACH_TOOLTIP = "Approach to estimate value at the end of the study period";
export const RESIDUAL_VALUE_APPROACH_INFO = "Residual Value is the estimated value, net of any Disposal Costs, of " +
    "any building or building system removed or replaced during the Study Period, or remaining at the end of the " +
    "Study Period, or recovered through resale or reuse at the end of the Study Period\n Approach Options:\n" +
    "The Linear Depreciation approach assumes that the residual value is a linear function of the installation cost " +
    "for an investment.\nNote: If the study period and the service life of the solar PC system are the same, " +
    "the residual value will be zero.";
export const RESIDUAL_VALUE_APPROACH_OPTIONS = [
    "Linear Depreciation"
];

export const ELECTRICAL_COMPANY_NAME_LABEL = "Electricity Utility Company";
export const ELECTRICAL_COMPANY_NAME_TOOLTIP = "Electricity Provider Name";
export const ELECTRICAL_COMPANY_NAME_INFO = "Electricity Provider Name. For informational purposes only.";

export const ANNUAL_CONSUMPTION_LABEL = "Annual Consumption";
export const ANNUAL_CONSUMPTION_TOOLTIP = "Annual consumption of the household";
export const ANNUAL_CONSUMPTION_INFO = "Annual consumption of the household. Can use previous year’s bills or obtain " +
    "consumption data from the users online account at the electricity provider.";

export const FLAT_RATE_CHARGE_LABEL = "Monthly Flat Rate Charge";
export const FLAT_RATE_CHARGE_TOOLTIP = "Demand charge is a fixed costs for having an account";
export const FLAT_RATE_CHARGE_INFO = "Demand charge is a fixed cost for having an account. Can find this value from " +
    "monthly bills";

export const ELECTRICAL_UNIT_PRICE_LABEL = "Electricity Unit Price";
export const ELECTRICAL_UNIT_PRICE_TOOLTIP = "Price per unit of electricity consumed ($/kWh)";
export const ELECTRICAL_UNIT_PRICE_INFO = "Cost per unit of electricity consumed ($/kWh). This is the sum of all " +
    "costs associated with a unit of electricity, such as generation, transmission, and distribution charges, taxes, " +
    "fees, environmental fund payments.";

export const NET_METERING_FEED_TARIFF_LABEL = "Net Metering or Feed In Tariff (FiT)";
export const NET_METERING_FEED_TARIFF_TOOLTIP = "Net metering for Gross metering (i.e., feed in tariff)";
export const NET_METERING_FEED_TARIFF_INFO = "Net metering means that the homeowner is charged (or paid) for the net " +
    "difference in electricity consumption and electricity production. Typically, the price paid for excess " +
    "consumption is different than the price paid to the homeowner for excess production.\nGross metering (i.e., " +
    "feed in tariff) means that the homeowner is paid for all production and is charged for all consumption, " +
    "typically at different rates.";
export const NET_METERING_FEED_TARIFF_OPTIONS = [
    "Net Metering Tariff",
    "Feed in Tariff (Gross Metering)"
];

export const EXCESS_GENERATION_UNIT_PRICE_LABEL = "Excess Generation / FiT Unit Price";
export const EXCESS_GENERATION_UNIT_PRICE_TOOLTIP = "Price per unit of electricity produced ($/kWh)";
export const EXCESS_GENERATION_UNIT_PRICE_INFO = "Price per unit of electricity produced ($/kWh), which is typically " +
    "different than the consumption price.";

export const PV_GRID_CONNECTION_RATE_LABEL = "PV Grid Connection Rate (Monthly)";
export const PV_GRID_CONNECTION_RATE_TOOLTIP = "Annual charge for connecting a solar PV system to the grid";
export const PV_GRID_CONNECTION_RATE_INFO =  "Annual escalation rates for electricity prices. The default values are " +
    "based on EIA projections for each Census Region and published in the Annual Supplement to NIST Handbook 135 " +
    "(add hyperlink).";

export const VIEW_ANNUAL_ESCALATION_RATES_LABEL = "Do you want to view/edit annual escalation rates?";
export const VIEW_ANNUAL_ESCALATION_RATES_TOOLTIP = "Annual escalation rates for electricity prices";
export const VIEW_ANNUAL_ESCALATION_RATES_INFO = "Annual escalation rates for electricity prices. The default values " +
    "are based on EIA projections for each Census Region and published in the Annual Supplement to NIST Handbook " +
    "135 (add hyperlink).";
export const VIEW_ANNUAL_ESCALATION_RATES_OPTIONS = [
    "Yes",
    "No"
];

export const ESCALATION_RATES_SAME_OR_DIFF_LABEL = "Are escalation rates the same for consumption and production?";
export const ESCALATION_RATES_SAME_OR_DIFF_OPTIONS = [
    "Same",
    "Different"
];

export const PANEL_EFFICIENCY_LABEL = "Solar Panel Rate Efficiency";
export const PANEL_EFFICIENCY_TOOLTIP = "Input panel information";
export const PANEL_EFFICIENCY_INFO = "Solar Panel Rate Efficiency.";

export const INVERTER_TYPE_LABEL = "Inverter Type";
export const INVERTER_TYPE_TOOLTIP= "Type of inverter";
export const INVERTER_TYPE_INFO = <div>
    Inverter type can be:<br/>Microinverter<br/>String<br/>String with Optimizers
</div>;
export const INVERTER_TYPE_OPTIONS = [
    "String Inverter",
    "String with Optimizers",
    "Microinverters"
];

export const TOTAL_SYSTEM_SIZE_LABEL = "Total System Size";
export const TOTAL_SYSTEM_SIZE_TOOLTIP = "Total rated wattage of system";

export const ANNUAL_PRODUCTION_LABEL = "Estimated Annual Production";
export const ANNUAL_PRODUCTION_TOOLTIP = "Estimated annual production in kWh";
export const ANNUAL_PRODUCTION_INFO = "Estimated annual production in the initial year of operation. Calculations " +
    "account for decreasing production due to efficiency degradation of the solar PV system";

export const PANEL_LIFETIME_LABEL = "Panel Lifetime";
export const PANEL_LIFETIME_TOOLTIP = "Expected service life of solar panels";
export const PANEL_LIFETIME_INFO = "Panel lifetime is the expected service life of the solar panels. Typically use " +
    "25 years or the length of the warranty. Must be 40 years or less.";

export const INVERTER_LIFETIME_LABEL = "Inverter Lifetime";
export const INVERTER_LIFETIME_TOOLTIP = "Expected service life of inverter";
export const INVERTER_LIFETIME_INFO = "Inverter lifetime is the expected service life of the inverters. Typical " +
    "lifetimes are:\nString: 15 years or length of warranty\nMicroinverter: lifetime or warranty length of panels\n" +
    "Must be 40 years or less.";

export const DEGRADATION_RATE_LABEL = "System Efficiency Degradation Rate (Year-Over-Year %)";
export const DEGRADATION_RATE_TOOLTIP = "Rate at which the solar production decreasing year-over-year";
export const DEGRADATION_RATE_INFO = "Degradation Rate is the rate at which the solar production decreases each year." +
    " Default is 0.05%. Specific system degradation should be in the solar PC system warranty document.";

export const TOTAL_INSTALLATION_COSTS_LABEL = "Total Installation Costs";
export const TOTAL_INSTALLATION_COSTS_TOOLTIP = "Total (gross) costs of installing the system before financial " +
    "incentives";
export const TOTAL_INSTALLATION_COSTS_INFO = "Total (gross) costs of installing the system before financial " +
    "incentives, such as federal tax credits and state/local grants or rebates. User should exclude any costs for " +
    "re-roofing.";

export const FEDERAL_TAX_CREDIT_LABEL = "Federal Tax Credit - 26% of Total Installed Cost";
export const FEDERAL_TAX_CREDIT_TOOLTIP = "Currently 26% of total installation costs";
export const FEDERAL_TAX_CREDIT_INFO =  "Federal tax credit is currently 26% of total installation costs. This " +
    "credit applies to all costs associated with the installation.";

export const TAX_CRED_OR_REBATE_LABEL = "State/Local Tax Credits/Grants/Rebates";
export const TAX_CRED_OR_REBATE_TOOLTIP = "Financial incentives from state and local programs";
export const TAX_CRED_OR_REBATE_INFO = "State and local financial incentives include grant and rebate programs. Loan " +
    "programs will be addressed under Purchasing Details below.";

export const INVERTER_REPLACEMENT_COSTS_LABEL = "Inverter Replacement Costs";
export const INVERTER_REPLACEMENT_COSTS_TOOLTIP = "Costs of replacing only the inverter(s)";
export const INVERTER_REPLACEMENT_COSTS_INFO = "Costs of replacing only the inverters. Should only be provided if " +
    "the inverter expected service life is not the same as the solar panels.";

export const ANNUAL_MAINTENANCE_COSTS_LABEL = "Annual Maintenance Costs";
export const ANNUAL_MAINTENANCE_COSTS_TOOLTIP = "Annual costs of maintaining the solar PV system";
export const ANNUAL_MAINTENANCE_COSTS_INFO = "Annual costs of maintaining the solar PV system, such as annual " +
    "contract with installer to clean panels and check panel performance";

export const PPA_OPTION_LABEL = "Include a Power Purchase Agreement Option?";
export const PPA_OPTION_TOOLTIP = "Include a PPA/leasing option in the analysis";
export const PPA_OPTION_INFO = "Include a PPA/leasing option in the analysis. Under a PPA/lease, the installer owns " +
    "the system and homeowners sign a contract to pay the installer for the electricity produced by the system. " +
    "Typically, homeowners have a purchase option at the end of the";
export const PPA_OPTIONS = [
    "Yes",
    "No"
];

export const PPA_CONTRACT_LENGTH_LABEL = "PPA Contract Length";
export const PPA_CONTRACT_LENGTH_TOOLTIP = "Length of PPA/Lease Contract";
export const PPA_CONTRACT_LENGTH_INFO = "Length of PPA/Lease Contract. 40 years or less.";

export const PPA_ELECTRICITY_RATE_LABEL = "PPA Electricity Rate";
export const PPA_ELECTRICITY_RATE_TOOLTIP = "Price of electricity produced by solar PV system";
export const PPA_ELECTRICITY_RATE_INFO = "Price of electricity produced by solar PV system. Typically this price is " +
    "less than price paid to electricity provider.";

export const PPA_ESCALATION_RATE_LABEL = "PPA Escalation Rate (constant)";
export const PPA_ESCALATION_RATE_TOOLTIP = "Rate at which the price of electricity from solar PV system increases " +
    "year-over-year";
export const PPA_ESCALATION_RATE_INFO = "Rate at which the price of electricity from solar PV system increases " +
    "year-over-year.";

export const PPA_PURCHASE_PRICE_LABEL = "PPA Purchase Price";
export const PPA_PURCHASE_PRICE_TOOLTIP = "Cost to purchase system at the end of the contract";
export const PPA_PURCHASE_PRICE_INFO = "Cost to purchase system at the end of the contract. If purchased, all " +
    "production from the PV system after the end of the contract is owned by the homeowner";

export const LOAN_OR_CASH_LABEL = "Loan or Cash Purchase";
export const LOAN_OR_CASH_TOOLTIP = "Purchasing upfront (“cash”) or through financing (loan).";
export const LOAN_OR_CASH_INFO = "Choose between purchasing upfront (“cash”) or through financing (loan).";
export const LOAN_OR_CASH_OPTIONS = [
    "Loan",
    "Cash"
];

export const LOAN_DOWN_PAYMENT_LABEL = "Loan Down Payment";
export const LOAN_DOWN_PAYMENT_TOOLTIP = "Percent of Total Installed Cost Paid at Time of Signature/Installation";
export const LOAN_DOWN_PAYMENT_INFO = "Percent of Total Installed Cost Paid at Time of Signature/Installation. " +
    "Typically ranging from 0% to 20%.";

export const NOMINAL_INTEREST_RATE_LABEL = "Loan Nominal Interest Rate";
export const NOMINAL_INTEREST_RATE_TOOLTIP = "Nominal interest rate on the loan";
export const NOMINAL_INTEREST_RATE_INFO = "Nominal interest rate on the loan.";

export const MONTHLY_PAYMENT_LABEL = "Monthly Loan Payment";
export const MONTHLY_PAYMENT_TOOLTIP = "Monthly payment on the loan";
export const MONTHLY_PAYMENT_INFO = "Monthly payment on the loan.";

export const SREC_PAYMENTS_LABEL = "SREC Payments";
export const SREC_PAYMENTS_TOOLTIP = "Solar Renewable Energy Credit";
export const SREC_PAYMENTS_INFO = "A Solar Renewable Energy Credit (SREC) is …";
export const SREC_PAYMENTS_OPTIONS = [
    "Up-front Payment",
    "Production-based Payments",
];

export const SREC_PAYMENTS_UP_FRONT_LABEL = "SREC Payments - Up-front Payment";
export const SREC_PAYMENTS_UP_FRONT_TOOLTIP = "Sell the rights to the SRECs upfront or get paid over time based on " +
    "production";
export const SREC_PAYMENTS_UP_FRONT_INFO = "Choose how the homeowner wants to get paid for their SRECs: upfront lump " +
    "sum based on capacity or over time based on production";