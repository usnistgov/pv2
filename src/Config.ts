import {createTheme} from "@material-ui/core";

const Config = {
    FEDERAL_TAX_CREDIT: 0.26,

    routes: {
        LANDING_PAGE: "/",
        APPLICATION: "/application",
        RESULTS: "/results",
    },

    /*
     * "http://localhost/api/v1/analysis/?key=CFXFTKIq.5lAaGLvjWDvh6heyfmZeAsbF2bz0Ow8S"
     * "http://e3test.el.nist.gov/api/v1/analysis/?key=ysSq34WU.xq04WeLQ3qMqLF8mhka839ad7KUqEKRb"
     */
    requestUrl: "http://localhost/api/v1/analysis/?key=CFXFTKIq.5lAaGLvjWDvh6heyfmZeAsbF2bz0Ow8S",

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
