import "./FAQ.sass";

export default function FAQ() {
    return (
        <div className={"faq"}>
            <h1>Do I need to provide my complete address?</h1>
            <p>
                No. You only need to provide your ZIP code. ZIP code is used to auto-populate both the default price and
                assumed emission rate for electricity. Providing your address is for informational purposes only and
                will
                be included on the report generated from your analysis.
            </p>
            <div className={"divider"}/>
            <h1>What is my discount rate?</h1>
            <p>
                Your discount rate depends on your value of a dollar saved in the future. See the user guide for
                additional details.
            </p>
            <div className={"divider"}/>
            <h1>What is my study period?</h1>
            <p>
                The study period the timeframe over which the analysis is completed. A common study period is the
                expected lifetime of the solar photovoltaic system. This is defaulted to 25 years because it is a
                common warranty for solar panels.
            </p>
            <div className={"divider"}/>
            <h1>Where does [PV]<sup>2</sup> get its electricity price data?</h1>
            <p>
                The default electricity data is the most recent average annual electricity costs per the Energy
                Information Administration (EIA).
            </p>
            <div className={"divider"}/>
            <h1>How do I find my electricity rate schedule?</h1>
            <p>
                Your rate schedule is available from your energy provider. It may be provided as part of your monthly
                electricity bill and/or available for download from the energy provider’s website.
            </p>
            <div className={"divider"}/>
            <h1>What if I cannot find my electricity rate schedule?</h1>
            <p>
                If you cannot find your rate schedule, you can use the simple average electricity cost per kWh. Take
                the total cost of your electricity bill and divide by the total kWh of electricity you consumed.
                Electricity prices may vary over a year. It is recommended that you sum the last 12 months of costs and
                consumption to get an annual average price.
            </p>
            <div className={"divider"}/>
            <h1>If I do not have a solar installation quote yet, can I still use [PV]<sup>2</sup> to evaluate a solar
                photovoltaic system?</h1>
            <p>
                Yes, but you will need to find data for the system production and installation costs. A couple sources
                for cost data by state include&nbsp;
                <a href={"https://emp.lbl.gov/tracking-sun-tool"}>LBL’s Tracking the Sun</a>&nbsp;and&nbsp;
                <a href={"https://www.energysage.com/data"}>EnergySage</a>.
            </p>
            <div className={"divider"}/>
            <h1>What is an SREC?</h1>
            <p>
                An SREC – solar renewable energy credit – is a certificate representing environmental impacts of solar
                energy. The value of the environmental impacts can be separated from the electricity generated and sold
                to energy providers that have requirements to purchase a certain amount of solar energy.
            </p>
            <div className={"divider"}/>
            <h1>How do I find the value (if any) of SRECs in my state?</h1>
            <p>
                One source for SREC market data is SRECTrade:&nbsp;
                <a href={"https://www.srectrade.com/markets/rps/srec/introduction"}>
                    https://www.srectrade.com/markets/rps/srec/introduction
                </a>
            </p>
            <div className={"divider"}/>
            <h1>What is included in the economic calculations?</h1>
            <p>
                The economic calculations (life cycle costs, net savings, etc.) include the costs of installation,
                replacement, maintenance, electricity consumption, and residual value (resale value or disposal value)
                of the system at the end of the study period. The value of the system is assumed to depreciate linearly
                over its lifetime. The value of the environmental impacts (social cost of carbon) is NOT included.
            </p>
            <div className={"divider"}/>
            <h1>What is AIRR?</h1>
            <p>
                AIRR is the adjusted internal rate of return. Internal rate of return (IRR) is the potential annual
                savings of the project after its costs. AIRR adjusts the IRR calculation to include reinvestment of the
                annual savings, which makes it a more accurate measure of returns.
            </p>
            <div className={"divider"}/>
            <h1>What source of Greenhouse Gas (GHG) emissions are included in the estimate?</h1>
            <p>
                GHG emissions are included for both operational and embodied emissions. Operational emissions come from
                electricity consumption from the electric grid. Electricity generation by a solar photovoltaic system
                offsets consumption from the electric grid and, therefore, reduces operational emissions by an
                equivalent amount. Embodied emissions are those associated with the solar photovoltaic system itself,
                which include both the initial installation of the solar panels, inverters, racking system, and
                monitoring system as well as any replacement of the individual equipment or complete system over the
                study period. The embodied emissions are “cradle-to-grave” in that they include all emissions from
                resource extraction and refining to manufacturing and transportation to installation and use to end of
                life (disposal or recycling).
            </p>
            <div className={"divider"}/>
            <h1>What Greenhouse Gas (GHG) emissions are included in the environmental impacts?</h1>
            <p>
                The primary GHGs included in the emissions estimate are carbon dioxide (CO2), methane (CH4), and
                nitrous oxide (N2O). Other emissions are included, such as sulfur hexafluoride (SF6).
            </p>
            <div className={"divider"}/>
            <h1>What is the social cost of carbon?</h1>
            <p>
                Social cost of carbon is an estimate of damages from emitting an additional ton of carbon dioxide into
                the atmosphere.
            </p>
            <div className={"divider"}/>
            <h1>What is the assumed social cost of carbon value?</h1>
            <p>
                The assumed social cost of carbon value is a constant $51/ton.
            </p>
        </div>
    );
}