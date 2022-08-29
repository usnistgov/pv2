import {createTheme} from "@material-ui/core";

const Constants = {
    FEDERAL_TAX_CREDIT: 0.30,
    SOCIAL_COST_OF_CARBON: 51,

    routes: {
        LANDING_PAGE: "/",
        APPLICATION: "/application",
        RESULTS: "/application/results",
        FAQ: "/faq",
    },

    // Material UI theme definition
    theme: createTheme({
        palette: {
            primary: {
                light: '#98ee99',
                main: '#66bb6a',
                dark: '#338a3e',
                contrastText: '#000000',
            },
            secondary: {
                light: '#e57373',
                main: '#f44336',
                dark: '#d32f2f',
                contrastText: '#ffffff',
            },
        }
    }),

    SREC_STATES: ["Illinois", "Ohio", "Virginia", "District of Columbia", "Maryland", "Delaware", "Pennsylvania", "New Jersey", "Massachusetts"],
    ADJACENT_SREC_STATES: ["Indiana", "Kentucky", "West Virginia", "Michigan", "Rhode Island", "Connecticut", "New Hampshire", "Vermont", "Maine"],
}

export default Constants;