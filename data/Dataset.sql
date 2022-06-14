CREATE TABLE IF NOT EXISTS state_info
(
    abbreviation char(2),
    full_name    varchar(50),
    region       varchar(10),
    average_electricity_price numeric
);

CREATE TABLE IF NOT EXISTS environment
(
    zipcode                                int,
    frec                                   text,
    ba                                     text,
    state                                  char(2),
    ozone_depletion_potential              numeric,
    global_warming_potential               numeric,
    photochemical_smog_formation_potential numeric,
    acidification_potential                numeric,
    eutrophication_potential               numeric,
    particulate_matter_formation_potential numeric,
    primary_energy_demand                  numeric,
    non_renewable_energy                   numeric,
    renewable_energy                       numeric,
    fossil_fuel_energy                     numeric
);

CREATE TABLE IF NOT EXISTS region_escalation_rates
(
    region varchar(10),
    year   int,
    rate   numeric
);

CREATE TABLE IF NOT EXISTS zip_state_mapping
(
    zipcode int,
    state varchar(50)
);