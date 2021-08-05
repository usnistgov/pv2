import {configureStore, createSlice, CreateSliceOptions, PayloadAction} from "@reduxjs/toolkit";
import {GraphOption} from "./results/ResultData";

const slices: CreateSliceOptions[] = [
    {
        name: "address",
        initialState: "",
        reducers: {
            set: setter
        }
    },
    {
        name: "city",
        initialState: "",
        reducers: {
            set: setter
        }
    },
    {
        name: "state",
        initialState: "",
        reducers: {
            set: setter
        }
    },
    {
        name: "zipcode",
        initialState: "",
        reducers: {
            set: setter
        }
    },
    {
        name: "residualValueApproach",
        initialState: "Linear Depreciation",
        reducers: {
            set: setter
        }
    },
    {
        name: "studyPeriod",
        initialState: 25,
        reducers: {
            set: setter
        }
    },
    {
        name: "realDiscountRate",
        initialState: 20,
        reducers: {
            set: setter
        }
    },
    {
        name: "generalInflation",
        initialState: 10,
        reducers: {
            set: setter
        }
    },
    {
        name: "electricalCompanyName",
        initialState: "",
        reducers: {
            set: setter
        }
    },
    {
        name: "netMeteringFeedTariff",
        initialState: "",
        reducers: {
            set: setter
        }
    },
    {
        name: "annualConsumption",
        initialState: 0,
        reducers: {
            set: setter
        }
    },
    {
        name: "monthlyFlatRateCharge",
        initialState: 0,
        reducers: {
            set: setter
        }
    },
    {
        name: "electricUnitPrice",
        initialState: 0,
        reducers: {
            set: setter
        }
    },
    {
        name: "excessGenerationUnitPrice",
        initialState: 0,
        reducers: {
            set: setter
        }
    },
    {
        name: "pvGridConnectionRate",
        initialState: 0,
        reducers: {
            set: setter
        }
    },
    {
        name: "viewAnnualEscalationRates",
        initialState: "No",
        reducers: {
            set: setter
        }
    },
    {
        name: "escalationRatesSameOrDiff",
        initialState: "Same",
        reducers: {
            set: setter
        }
    },
    {
        name: "escalationRateForYear",
        initialState: [],
        reducers: {
            set: setter
        }
    },
    {
        name: "productionEscalationRateForYear",
        initialState: [],
        reducers: {
            set: setter
        }
    },
    {
        name: "panelEfficiency",
        initialState: "",
        reducers: {
            set: setter
        }
    },
    {
        name: "inverterType",
        initialState: "",
        reducers: {
            set: setter
        }
    },
    {
        name: "totalSystemSize",
        initialState: 0,
        reducers: {
            set: setter
        }
    },
    {
        name: "estimatedAnnualProduction",
        initialState: 0,
        reducers: {
            set: setter
        }
    },
    {
        name: "panelLifetime",
        initialState: 0,
        reducers: {
            set: setter,
        }
    },
    {
        name: "inverterLifetime",
        initialState: 0,
        reducers: {
            set: setter
        }
    },
    {
        name: "degradationRate",
        initialState: 0,
        reducers: {
            set: setter
        }
    },
    {
        name: "totalInstallationCosts",
        initialState: 0,
        reducers: {
            set: setter
        }
    },
    {
        name: "federalTaxCredit",
        initialState: 0,
        reducers: {
            set: setter
        }
    },
    {
        name: "stateOrLocalTaxCreditsOrGrantsOrRebates",
        initialState: 0,
        reducers: {
            set: setter
        }
    },
    {
        name: "inverterReplacementCosts",
        initialState: 0,
        reducers: {
            set: setter
        }
    },
    {
        name: "annualMaintenanceCosts",
        initialState: 0,
        reducers: {
            set: setter
        }
    },
    {
        name: "ppaOption",
        initialState: "No",
        reducers: {
            set: setter
        }
    },
    {
        name: "loanOrCash",
        initialState: "",
        reducers: {
            set: setter
        }
    },
    {
        name: "downPayment",
        initialState: 0,
        reducers: {
            set: setter
        }
    },
    {
        name: "nominalInterestRate",
        initialState: 0,
        reducers: {
            set: setter
        }
    },
    {
        name: "monthlyPayment",
        initialState: 0,
        reducers: {
            set: setter
        }
    },
    {
        name: "srecPayments",
        initialState: "",
        reducers: {
            set: setter
        }
    },
    {
        name: "srecPaymentsUpFront",
        initialState: 0,
        reducers: {
            set: setter
        }
    },
    {
        name: "srecPaymentsProductionBased",
        initialState: [],
        reducers: {
            set: setter
        }
    },
    {
        name: "graphOption",
        initialState: GraphOption.NET_VALUE,
        reducers: {
            set: setter
        }
    }
];

/**
 * Creates a new empty redux store and creates an injectReducer function to add reducers dynamically.
 */
function initializeStore() {
    const reducerOptions = {};
    const actions = {};

    slices.forEach((options: CreateSliceOptions) => {
        let slice = createSlice(options);

        Object.assign(actions, {[options.name]: slice.actions})
        Object.assign(reducerOptions, {[options.name]: createSlice(options).reducer})
    });

    return {
        actions: actions,
        store: configureStore({reducer: reducerOptions})
    }
}

export const {actions, store} = initializeStore();

export type RootState = ReturnType<typeof store.getState>;

function setter<T>(state: any, action: PayloadAction<T>) {
    return action.payload;
}

