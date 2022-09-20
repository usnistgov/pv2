export const STUDY_PERIOD = 25;
export const REAL_DISCOUNT_RATE = 3;
export const GENERAL_INFLATION = 2.3;
export const NOMINAL_DISCOUNT_RATE = parseFloat((((1.0 + (REAL_DISCOUNT_RATE / 100)) * (1 + (GENERAL_INFLATION / 100)) - 1) * 100).toFixed(2));

export const PANEL_LIFETIME = 25;
export const INVERTER_LIFETIME = 15;
export const DEGRADATION_RATE = 0.5;

export const INVERTER_REPLACEMENT = 0;
export const ANNUAL_MAINTENANCE = 0;

export const SREC_UPFRONT = 0;
export const SREC_CONTRACT_LENGTH = 10;

export const SYSTEM_DESCRIPTION = "My System";
