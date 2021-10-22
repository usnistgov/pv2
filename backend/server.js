const express  = require("express");
const path = require("path");
const { Pool } = require("pg");

const app = express();
const port = 80;
const pool = new Pool({
   connectionString: "postgres://admin:AuTWRecHIFBdg5LJ6WbbUmFVPs3zhCwh@postgres:5432/PV2"
})

function query(queryString) {
   return async function wrapped(request, response) {
      let finalQuery = queryString;

      for(let key in request.params) {
         finalQuery = finalQuery.replaceAll(`:${key}`, request.params[key]);
      }

      console.log(`Executing database query: ${finalQuery}`);

      const { rows } = await pool.query(finalQuery);
      response.send(rows);
   }
}

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get("/api/environment/:zipcode", query(`SELECT * FROM environment WHERE zipcode = :zipcode`));

app.get('*', (request, response) => {
   response.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(port, () => {
   console.log(`Server listening on port ${port}`) ;
});
