const express = require("express");
const path = require("path");
const {Pool} = require("pg");
const {expressCspHeader, SELF} = require("express-csp-header");

const app = express();
const port = 80;
const pool = new Pool({
    connectionString: `postgres://${process.env.POSTGRES_USER}:${encodeURIComponent(process.env.POSTGRES_PASSWORD)}@${process.env.POSTGRES_HOSTNAME}:5432/${process.env.POSTGRES_DB}`
})

app.use(expressCspHeader({
    directives: {
        "default-src": [SELF, "https://*.nist.gov"],
        "script-src": [SELF, "'unsafe-eval'", "'unsafe-inline'", "https://pages.nist.gov", "https://dap.digitalgov.gov", "https://www.google-analytics.com", "https://www.youtube.com"],
        "style-src": [SELF, "'unsafe-inline'", "https://pages.nist.gov", "https://unpkg.com"],
        "img-src": [SELF, "data:", "https://pages.nist.gov"],
        "frame-src": ["https://www.google.com"],
        "connect-src": [SELF, "https://*.nist.gov", "https://cdn.jsdelivr.net", "https://www.google-analytics.com"]
    }
}));


function createQuery(query) {
    return async function wrapped(request, response) {
        console.log(`Executing database query: ${query}`);

        const {rows} = await pool.query(query, Object.values(request.params));
        response.send(rows);
    }
}

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get("/api/state/:zipcode", createQuery("SELECT state FROM ((SELECT abs(zipcode - $1) AS diff, * FROM zip_state_mapping WHERE zipcode <= $1 ORDER BY diff, zipcode DESC LIMIT 1) UNION ALL (SELECT abs(zipcode - $1) AS diff, * FROM zip_state_mapping WHERE zipcode >= $1 ORDER BY diff, zipcode LIMIT 1)) AS joined ORDER BY diff, zipcode LIMIT 1;"));

app.get("/api/environment/:zipcode", createQuery("SELECT * FROM ((SELECT abs(zipcode - $1) AS diff, * FROM environment WHERE zipcode <= $1 ORDER BY diff, zipcode DESC LIMIT 1) UNION ALL (SELECT abs(zipcode - $1) AS diff, * FROM environment WHERE zipcode >= $1 ORDER BY diff, zipcode LIMIT 1)) AS joined ORDER BY diff, zipcode LIMIT 1;"));

app.get("/api/escalation-rates/:zipcode", createQuery("SELECT array_agg(rate ORDER BY year) rates FROM (SELECT * FROM ((SELECT abs(zipcode - $1) AS diff, * FROM zip_state_mapping WHERE zipcode <= $1 ORDER BY diff, zipcode DESC LIMIT 1) UNION ALL (SELECT abs(zipcode - $1) AS diff, * FROM zip_state_mapping WHERE zipcode >= $1 ORDER BY diff, zipcode LIMIT 1)) AS difference ORDER BY diff, zipcode LIMIT 1) AS closest INNER JOIN state_info ON closest.state = state_info.full_name INNER JOIN region_escalation_rates rer on state_info.region = rer.region GROUP BY zipcode;"));

app.get("/api/average-electricity-price/zipcode/:zipcode", createQuery("SELECT average_electricity_price FROM ((SELECT abs(zipcode - $1) AS diff, * FROM zip_state_mapping WHERE zipcode <= $1 ORDER BY diff, zipcode DESC LIMIT 1) UNION ALL (SELECT abs(zipcode - $1) AS diff, * FROM zip_state_mapping WHERE zipcode >= $1 ORDER BY diff, zipcode LIMIT 1)) AS joined INNER JOIN state_info ON joined.state = state_info.full_name ORDER BY diff, zipcode LIMIT 1;"))

app.get('*', (request, response) => {
    response.set({"Content-Security_Policy": "default-src"})
    response.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
