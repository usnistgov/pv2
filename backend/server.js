const express  = require("express");
const path = require("path");
const { Pool } = require("pg");

const app = express();
const port = 80;
const pool = new Pool({
   connectionString: "postgres://admin:AuTWRecHIFBdg5LJ6WbbUmFVPs3zhCwh@postgres:5432/PV2"
})



function createQuery(query) {
   return async function wrapped(request, response) {
      console.log(`Executing database query: ${query}`);

      const { rows } = await pool.query(query, Object.values(request.params));
      response.send(rows);
   }
}

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get("/api/environment/:zipcode", createQuery("SELECT * FROM environment WHERE zipcode = $1"));

app.get("/api/escalation-rates/:zipcode", createQuery("SELECT array_agg(rate ORDER BY year) rates " +
    "FROM zip_state_mapping " +
    "         INNER JOIN state_info ON zip_state_mapping.state = state_info.full_name " +
    "         INNER JOIN region_escalation_rates rer on state_info.region = rer.region " +
    "WHERE zipcode = $1 " +
    "GROUP BY zipcode;"));

app.get('*', (request, response) => {
   response.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(port, () => {
   console.log(`Server listening on port ${port}`) ;
});
