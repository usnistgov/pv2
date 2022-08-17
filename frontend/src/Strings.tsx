import React from "react";
import Constants from "./Constants";

export const CATEGORIES = [
    "Address",
    "Analysis Assumptions",
    "Electrical Rate",
    "Escalation Rates",
    "Solar PV System",
    "Costs",
    "SREC"
];

export const ADDRESS_TOOLTIP = "Your Street Number and Name";
export const ADDRESS_LABEL = "Address (optional)";
export const CITY_TOOLTIP = "Your City";
export const CITY_LABEL = "City (optional)";
export const STATE_TOOLTIP = "Your State (Name or Acronym are both validate)";
export const STATE_LABEL = "State (optional)";
export const ZIPCODE_TOOLTIP = "Your ZIP Code (Required)";
export const ZIPCODE_LABEL = "ZIP Code";

export const STUDY_PERIOD_EXPLANATION_TITLE = "Study Period (Analysis Timeframe)";
export const STUDY_PERIOD_EXPLANATION = <p>
    The study period is the timeframe over which you are completing the analysis. The recommended study period is the
    expected life of solar photovoltaic system because it will account for all costs of owning and operating the system.
    The default value is set to 25 years because that is a common warranty period for solar panels.
</p>;
export const STUDY_PERIOD_LABEL = "Study Period (Analysis Timeframe)";
export const STUDY_PERIOD_TOOLTIP = "Study period is the analysis time frame";
export const STUDY_PERIOD_INFO = "Study period is the length of the time period covered by the economic evaluation. " +
    "Can select a study period between 1 year and 40 years. Recommend a study period equal to the solar panel " +
    "warranty length.";

export const CUSTOMIZE_DISCOUNT_RATE_SWITCH = "Customize Discount and/or Inflation Rates";

export const DISCOUNT_RATES_EXPLANATION_TITLE = "Explanation of Time Value of Money and Discount Rates";
export const DISCOUNT_RATES_EXPLANATION = <>
    <p>
        An important factor in evaluating the cost-effectiveness of a long-lived asset (10+ years), such as a solar
        photovoltaic system, is the time value of money. Time value of money means that a dollar received or paid today
        (present value) is worth more than a dollar received or paid in the future (future value).
    </p>
    <p>
        To combine costs that occur at different times, all the costs must be discounted to its value in today's
        (present) value. The discount rate that is used to calculate this present value can be thought of as the return
        on investment or cost of borrowing that makes you indifferent to receiving or paying the present value now or
        the future value later.
    </p>
    <p>
        For example, if you are indifferent to receiving $1.00 now or $1.10 in 1 year, then your discount rate is 10%
        because you require an additional 10% to wait 1 year for the money.
    </p>
    <p>
        A discount rate can either be in real or nominal terms. A nominal discount rate includes general inflation
        while a real discount rate excludes general inflation. General inflation is the rate of increase in all prices
        over time. These three values are necessary to complete the economic analysis. Additional explanation of these
        three terms is provided for each input below as well as in the User Guide.
    </p>
</>;

export const NOMINAL_DISCOUNT_RATE_EXPLANATION_TITLE = "What is the Nominal Discount Rate?";
export const NOMINAL_DISCOUNT_RATE_EXPLANATION = <p>
    A nominal discount rate is the discount rate including general inflation, and is likely to be easier for a user to
    determine. A common nominal discount rate value is either a homeowner's mortgage interest rate
    (3 % to 6 % on 30-year) or the expected average return on investing in the stock market (average of 8 % to 12 %)
    or bond market (currently 3% on 30-year treasury). These are "nominal" because it is the rate earned or paid
    including general inflation of overall prices.
</p>;
export const NOMINAL_DISCOUNT_RATE_LABEL = "Nominal Discount Rate";
export const NOMINAL_DISCOUNT_RATE_TOOLTIP = "Nominal Discount Rate";
export const NOMINAL_DISCOUNT_RATE_INFO = "Nominal Discount Rates reflect Time Value of Money including changes in " +
    "the purchasing power of the dollar (i.e., general inflation)";

export const REAL_DISCOUNT_RATE_EXPLANATION_LABEL = "What is the Real Discount Rate?";
export const REAL_DISCOUNT_RATE_EXPLANATION = <p>
    The real discount rate is the discount rate excluding general rate of inflation. Unless the user directly provides
    it, [PV]<sup>2</sup> calculates the real discount rate using the nominal discount rate and inflation rate. The
    default value is based on the that used for federal energy efficiency projects
</p>;
export const REAL_DISCOUNT_RATE_LABEL = "Real Discount Rate";
export const REAL_DISCOUNT_RATE_TOOLTIP = "Time value of money excluding inflation";
export const REAL_DISCOUNT_RATE_INFO = "Real Discount Rates reflect Time Value of Money excluding from changes in " +
    "the purchasing power of the dollar (i.e., general inflation)";

export const INFLATION_RATE_EXPLANATION_LABEL = "What is the Inflation Rate?";
export const INFLATION_RATE_EXPLANATION = <p>
    Inflation rate is the long-run general rate of inflation in overall prices in the economy. The Federal Reserve
    has a long-run general inflation target of 2 %. Historically, inflation has been below this target with the
    exception of 2021 and 2022 with much higher rates (7 % +). Expectations are that inflation will decrease in the
    future back towards, but slightly higher than the 2 % target.
</p>;
export const INFLATION_RATE_LABEL = "General Inflation Rate";
export const INFLATION_RATE_TOOLTIP = "General rate of price changes over time";
export const INFLATION_RATE_INFO = "General inflation rate is the rate of rise in the general price level, or, " +
    "put another way, a decline in the general purchasing power of the dollar.";

export const RESIDUAL_VALUE_APPROACH_OPTIONS = [
    "Linear Depreciation"
];

export const ELECTRICAL_COMPANY_NAME_LABEL = "Electricity Utility Company (optional)";
export const ELECTRICAL_COMPANY_NAME_TOOLTIP = "Electricity Provider Name";
export const ELECTRICAL_COMPANY_NAME_INFO = "Electricity Provider Name. For informational purposes only.";

export const ELECTRICITY_PRICE_STRUCTURE_LABEL = "Use Advanced Electricity Price Structure";
export const ELECTRICITY_PRICE_STRUCTURE_INFO = "Average Electricity Price is calculated using the total electric " +
    "bill ($) and dividing by total electricity consumption (kWh). Detailed Electricity Rate Schedule requires a " +
    "breakdown of costs as defined in the homeowner's electricity rate schedule (available on their electricity " +
    "providers website). Average Electricity Price is defaulted to state annual average electricity cost."

export const AVERAGE_ELECTRICITY_PRICE_LABEL = "Average Electricity Price";

export const KNOW_ANNUAL_CONSUMPTION_INFO = "If you cannot provide your annual electricity consumption, the tool " +
    "assumes this value equals the solar PV system's initial estimated annual generation. It's common for solar " +
    "installers to size the system to offset consumption.";
export const KNOW_ANNUAL_CONSUMPTION_LABEL = "Do you know your annual electricity consumption?";
export const KNOW_ANNUAL_CONSUMPTION_OPTIONS = [
    "No",
    "Yes"
];

export const ANNUAL_CONSUMPTION_LABEL = "Annual Electricity Consumption";
export const ANNUAL_CONSUMPTION_TOOLTIP = "Annual household electricity consumption (kWh)";
export const ANNUAL_CONSUMPTION_INFO = "Annual consumption of the household. Use previous year’s bills or obtain " +
    "consumption data from the users online account at the electricity provider.";

export const FLAT_RATE_CHARGE_LABEL = "Monthly Flat Rate Charge";
export const FLAT_RATE_CHARGE_TOOLTIP = "Demand charge is a fixed cost for having an account";
export const FLAT_RATE_CHARGE_INFO = "Demand charge is a fixed cost for having an account. Can find this value from " +
    "monthly bills";

export const ELECTRICAL_UNIT_PRICE_LABEL = "Electricity Unit Price";
export const ELECTRICAL_UNIT_PRICE_TOOLTIP = "Price per unit of electricity consumed ($/kWh)";
export const ELECTRICAL_UNIT_PRICE_INFO = "Cost per unit of electricity consumed ($/kWh). This is the sum of all " +
    "costs associated with a unit of electricity, such as generation, transmission, and distribution charges, taxes, " +
    "fees, environmental fund payments.";

export const NET_METERING_FEED_TARIFF_LABEL = "Net Metering or Feed In Tariff (FiT)";
export const NET_METERING_FEED_TARIFF_TOOLTIP = "Net metering or Gross metering (i.e., feed in tariff)";
export const NET_METERING_FEED_TARIFF_INFO = <div>Net metering means that the homeowner is charged (or paid) for the net
    difference in electricity consumption and electricity production. Typically, the price paid for excess
    consumption is different than the price paid to the homeowner for excess production.
    <br/>
    Gross metering (i.e.,
    feed in tariff) means that the homeowner is paid for all production and is charged for all consumption,
    typically at different rates. Most states use Net Metering. Homeowner can obtain this information from the
    solar installer or&nbsp;
    <a href={"https://www.dsireusa.org/resources/detailed-summary-maps/"}>
        DSIREUSA.org
    </a>
    .
</div>
export const NET_METERING_FEED_TARIFF_OPTIONS = [
    "Net Metering Tariff",
    "Feed in Tariff (Gross Metering)"
];

export const EXCESS_GENERATION_UNIT_PRICE_LABEL = "Excess Generation / FiT / PBI Unit Price";
export const EXCESS_GENERATION_UNIT_PRICE_TOOLTIP = "Price per unit of electricity produced ($/kWh). Feed in " +
    "Tarrif (FiT). Production Based Incentive (PBI).";
export const EXCESS_GENERATION_UNIT_PRICE_INFO = "Price per unit of electricity produced ($/kWh), which is typically " +
    "equal to or less than the electricity unit price for consumption and varies by utility. Should be provided in " +
    "your electricity bill or utility rate schedule, on the provider website, or by the solar installer. See User " +
    "Guide for additional guidance.";

export const PV_GRID_CONNECTION_RATE_LABEL = "PV Grid Connection Rate – Annual (Optional)";
export const PV_GRID_CONNECTION_RATE_TOOLTIP = "Annual charge for connecting a solar PV system to the grid";
export const PV_GRID_CONNECTION_RATE_INFO = "Annual charge for connection of solar PV system to the electric grid. " +
    "In most cases, no connection fee exists ($0).";

export const ELECTRICAL_RATE_ADVANCED_LABEL = "Utility Escalation Rates (advanced)";

export const VIEW_ANNUAL_ESCALATION_RATES_LABEL = "Do you want to view/edit annual escalation rates?";
export const VIEW_ANNUAL_ESCALATION_RATES_TOOLTIP = "Annual escalation rates for electricity prices";
export const VIEW_ANNUAL_ESCALATION_RATES_INFO = <div>
    Annual escalation rates for electricity prices. These escalation rates are in real term (exclude inflation). The
    default values are based on EIA projections for each Census Region and published in the&nbsp;
    <a href={"https://nvlpubs.nist.gov/nistpubs/ir/2021/NIST.IR.85-3273-36.pdf"}>
        Annual Supplement to NIST Handbook 135
    </a>
    .
</div>;
export const VIEW_ANNUAL_ESCALATION_RATES_OPTIONS = [
    "Yes",
    "No"
];

export const ESCALATION_RATES_SAME_OR_DIFF_LABEL = "Same escalation rates for consumption and production?";
export const ESCALATION_RATES_SAME_OR_DIFF_OPTIONS = [
    "Same",
    "Different"
];

export const SYSTEM_DESCRIPTION_LABEL = "System Description";
export const SYSTEM_DESCRIPTION_TOOLTIP = "General description of solar PV system being analyzed.";
export const SYSTEM_DESCRIPTION_INFO = "System Description is the phrase used to describe the system being analyzed, " +
    "and will be provided at the beginning of the results report. This phrase will help to differentiate between " +
    "reports created for different systems.";

export const PANEL_EFFICIENCY_LABEL = "Rated Efficiency of Solar Panels";
export const PANEL_EFFICIENCY_TOOLTIP = "Rated efficiency of the solar panels";
export const PANEL_EFFICIENCY_INFO = "Rated efficiency of solar panels is available from the solar contract proposal " +
    "or equipment specification sheet.";

export const INVERTER_TYPE_LABEL = "Inverter Type";
export const INVERTER_TYPE_TOOLTIP = "Type of inverter";
export const INVERTER_TYPE_INFO = <div>
    Inverter type can be:
    <ul>
        <li>Microinverter</li>
        <li>String</li>
        <li>String with Optimizers</li>
    </ul>
    Inverter type is available from the solar contract proposal or equipment specification sheet.
</div>;
export const INVERTER_TYPE_OPTIONS = [
    "String Inverter",
    "String with Optimizers",
    "Microinverters"
];

export const TOTAL_SYSTEM_SIZE_LABEL = "Total System Size";
export const TOTAL_SYSTEM_SIZE_TOOLTIP = "Total rated wattage of system";
export const TOTAL_SYSTEM_SIZE_INFO = "Total rated capacity (W) is available from the solar contract proposal."

export const ANNUAL_PRODUCTION_LABEL = "Estimated Annual Production";
export const ANNUAL_PRODUCTION_TOOLTIP = "Estimated annual production in kWh";
export const ANNUAL_PRODUCTION_INFO = "Estimated annual production in the initial year of operation. Estimated " +
    "annual production (kWh) is available from the solar contract proposal. Calculations account for decreasing " +
    "production due to efficiency degradation of the solar PV system";

export const SOLAR_SYSTEM_ADVANCED_LABEL = "System Lifetime and Degradation (advanced)";

export const PANEL_LIFETIME_LABEL = "Panel Lifetime";
export const PANEL_LIFETIME_TOOLTIP = "Expected service life of solar panels";
export const PANEL_LIFETIME_INFO = "Panel lifetime is the expected service life of the solar panels. Typically use " +
    "25 years or the length of the warranty, which is available from the solar contract proposal or equipment " +
    "specification sheet. Must be 40 years or less.";

export const INVERTER_LIFETIME_LABEL = "Inverter Lifetime";
export const INVERTER_LIFETIME_TOOLTIP = "Expected service life of inverter";
export const INVERTER_LIFETIME_INFO = <div>
    Inverter lifetime is the expected service life of the inverters. Typical
    lifetimes are:
    <ul>
        <li>String: 15 years or length of warranty</li>
        <li>Microinverter: lifetime or warranty length of panels</li>
    </ul>
    Must be 40 years or less. Warranty length is available from the solar contract proposal or equipment specification
    sheet.
</div>

export const DEGRADATION_RATE_LABEL = "System Efficiency Degradation Rate (Year-Over-Year %)";
export const DEGRADATION_RATE_TOOLTIP = "Rate at which the solar production decreases year-over-year";
export const DEGRADATION_RATE_INFO = "Degradation Rate is the rate at which the solar production decreases each year." +
    " Default is 0.5%. Specific system degradation should be in the solar PV system warranty document.";

export const TOTAL_INSTALLATION_COSTS_LABEL = "Total Installation Costs";
export const TOTAL_INSTALLATION_COSTS_TOOLTIP = "Total (gross) costs of installing the system before financial " +
    "incentives";
export const TOTAL_INSTALLATION_COSTS_INFO = "Total (gross) costs of installing the system before financial " +
    "incentives, such as federal tax credits and state/local grants or rebates. User should INCLUDE any up-front " +
    "utility connection fee. User should EXCLUDE any costs for re-roofing.";

export const FEDERAL_TAX_CREDIT_LABEL = `Federal Tax Credit - ${(Constants.FEDERAL_TAX_CREDIT * 100).toFixed(0)}% of Total Installed Cost`;
export const FEDERAL_TAX_CREDIT_TOOLTIP = `Currently ${(Constants.FEDERAL_TAX_CREDIT * 100).toFixed(0)}% of total installation costs`;
export const FEDERAL_TAX_CREDIT_INFO = `Federal tax credit is currently ${(Constants.FEDERAL_TAX_CREDIT * 100).toFixed(0)}% of total installation costs. This ` +
    "credit applies to all costs associated with the installation.";

export const TAX_CRED_OR_REBATE_LABEL = "State/Local Tax Credits/Grants/Rebates";
export const TAX_CRED_OR_REBATE_TOOLTIP = "Financial incentives from state and local programs";
export const TAX_CRED_OR_REBATE_INFO = "State and local financial incentives include grant and rebate programs. Loan " +
    "programs will be addressed under \"Cash or Loan Option\" below.";

export const COST_FORM_ADVANCED_LABEL = "Maintenance, Repair, and Replacement Costs (advanced)";

export const INVERTER_REPLACEMENT_COSTS_LABEL = "Inverter Replacement Costs";
export const INVERTER_REPLACEMENT_COSTS_TOOLTIP = "Costs of replacing only the inverter(s)";
export const INVERTER_REPLACEMENT_COSTS_INFO = "Costs of replacing only the inverters. Should only be provided if " +
    "the inverter expected service life is not the same as the solar panels.";

export const ANNUAL_MAINTENANCE_COSTS_LABEL = "Annual Maintenance Costs";
export const ANNUAL_MAINTENANCE_COSTS_TOOLTIP = "Annual costs of maintaining the solar PV system";
export const ANNUAL_MAINTENANCE_COSTS_INFO = "Annual costs of maintaining the solar PV system, such as annual " +
    "contract with installer to clean panels and check panel performance";

export const PPA_OPTION_LABEL = "Include a Power Purchase Agreement/Lease Options?";
export const PPA_OPTION_TOOLTIP = "Include a PPA/leasing option in the analysis";
export const PPA_OPTION_INFO = "Include a PPA/leasing option in the analysis. Under a PPA/lease, the installer owns " +
    "the system and homeowners sign a contract to pay the installer for the electricity produced by the system. " +
    "Typically, homeowners have a purchase option at the end of the contract.";
export const PPA_OPTIONS = [
    "Yes",
    "No"
];

export const PPA_CONTRACT_LENGTH_LABEL = "PPA/Lease Contract Length";
export const PPA_CONTRACT_LENGTH_TOOLTIP = "Length of PPA/Lease Contract";
export const PPA_CONTRACT_LENGTH_INFO = "Length of PPA/Lease Contract. 40 years or less.";

export const PPA_ELECTRICITY_RATE_LABEL = "PPA/Lease Electricity Rate";
export const PPA_ELECTRICITY_RATE_TOOLTIP = "Price of electricity produced by solar PV system";
export const PPA_ELECTRICITY_RATE_INFO = "Price of electricity produced by solar PV system. Typically this price is " +
    "less than price paid to electricity provider.";

export const PPA_ESCALATION_RATE_LABEL = "PPA/Lease Escalation Rate (constant)";
export const PPA_ESCALATION_RATE_TOOLTIP = "Rate at which the price of electricity from solar PV system increases " +
    "year-over-year";
export const PPA_ESCALATION_RATE_INFO = "Rate at which the price of electricity from solar PV system increases " +
    "year-over-year.";

export const PPA_PURCHASE_PRICE_LABEL = "PPA/Lease Purchase Price";
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
export const LOAN_DOWN_PAYMENT_TOOLTIP = "Amount paid at the start of the loan";
export const LOAN_DOWN_PAYMENT_INFO = "Amount paid at the start of the loan.";

export const LOAN_LENGTH_LABEL = "Loan Length";
export const LOAN_LENGTH_TOOLTIP = "Length of time to pay back loan";
export const LOAN_LENGTH_INFO = "Amount of time to completely pay back the loan.";

export const NOMINAL_INTEREST_RATE_LABEL = "Loan Nominal Interest Rate (optional)";
export const NOMINAL_INTEREST_RATE_TOOLTIP = "Nominal interest rate on the loan";
export const NOMINAL_INTEREST_RATE_INFO = "Nominal interest rate on the loan.";

export const MONTHLY_PAYMENT_LABEL = "Monthly Loan Payment";
export const MONTHLY_PAYMENT_TOOLTIP = "Monthly payment on the loan";
export const MONTHLY_PAYMENT_INFO = "Monthly payment on the loan.";

export const SREC_PAYMENTS_LABEL = "SREC Payment Type";
export const SREC_PAYMENTS_TOOLTIP = "Solar Renewable Energy Credit";
export const SREC_PAYMENTS_INFO = <div>
    A Solar Renewable Energy Credit (SREC) is a certificate that serves as proof that a unit of electricity was
    generated from solar energy. These credits are required in some states to meet renewable-based electricity
    requirements. Homeowners may have the option of receiving an upfront lump sum payment based on capacity (kW) or
    payments over time based on the solar PV system’s electricity production (MWh).<br/>States where SRECs may have value
    (as of August 2022): <ul>
    <li>Connecticut</li>
    <li>Delaware</li>
    <li>District of Columbia</li>
    <li>Illinois</li>
    <li>Indiana</li>
    <li>Kentucky</li>
    <li>Maine</li>
    <li>Maryland</li>
    <li>Massachusetts</li>
    <li>Michigan</li>
    <li>New Hampshire</li>
    <li>New Jersey</li>
    <li>Ohio</li>
    <li>Rhode Island</li>
    <li>Pennsylvania</li>
    <li>Vermont</li>
    <li>Virginia</li>
</ul>
    Information on Solar Markets is available <a
    href={"https://www.srectrade.com/markets/rps/srec/"}>here</a>.
</div>;
export const SREC_PAYMENTS_OPTIONS = [
    "None",
    "Up-front Payment",
    "Production-based Payments",
];

export const SREC_PAYMENTS_UP_FRONT_LABEL = "SREC Payments - Up-front Payment";
export const SREC_PAYMENTS_UP_FRONT_TOOLTIP = "Sell the rights to the SRECs upfront or get paid over time based on " +
    "production";

export const SREC_PAYMENT_YEARS = "Number of Years there will be SREC Payments";

export enum GraphOption {
    NET_VALUE = "Annual Costs - Net Present Value",
    CUMULATIVE = "Cumulative Net Savings",
    ANNUAL_NET_ELECTRICAL_CONSUMPTION = "Annual Net Electricity Consumption",
    CUMULATIVE_ELECTRICAL_REDUCTION = "Cumulative Electricity Reduction"
}

export const RESULT_TOTAL_COST_TOOLTIP = "Total Net Present Value Costs";
export const RESULT_NET_SAVINGS_TOOLTIP = "Net Present Value Savings relative to No Solar System";
export const RESULT_AIRR_TOOLTIP = "Adjusted Internal Rate of Return (AIRR) on Investment. This is a measure of " +
    "return on investment that accounts for reinvestment of the annual savings";
export const RESULT_SPP_TOOLTIP = "Simple Payback Period (SPP) is the number of years it takes for cost savings to " +
    "offset the initial investment costs";
export const RESULT_ELECTRICAL_REDUCTION_TOOLTIP = "Electricity reduction relative to No Solar System";
export const RESULT_CARBON_FOOTPRINT_TOOLTIP = "Carbon footprint includes GHG emissions (normalized to carbon " +
    "dioxide equivalent - CO2e) associated with both electricity consumption and the manufacturing, installation, " +
    "and replacement of the solar photovoltaic equipment over the study period. Excess production leads to negative " +
    "electricity consumption emissions. The carbon footprint from grid-based electricity is based on the average " +
    "emissions for that region of the US. See User Guide for additional details.";
export const RESULT_SCC_TOOLTIP = "Social Cost of Carbon (SCC): The costs to society associated with the carbon " +
    "footprint. A negative SCC is a net savings to society. Defaulted to $51/ton. This value is NOT included in the " +
    "Total Cost calculations. See User Guide for additional details.";
