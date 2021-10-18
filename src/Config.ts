import {createTheme} from "@material-ui/core";

const Config = {
    FEDERAL_TAX_CREDIT: 0.26,

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
    })
}

export default Config;
