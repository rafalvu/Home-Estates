// import fs from "fs";
const express = require("express");
// const fs = require("fs");
const path = require("path");
// import https from "https";
const mime = require("mime-types");

// Inicjalizacja aplikacji Express
const app = express();

// Middleware do obsługi CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware do ustawiania poprawnych typów MIME
app.use((req, res, next) => {
  const type = mime.lookup(req.path);
  if (type) {
    res.setHeader("Content-Type", type);
  }
  next();
});
// Logowanie żądań
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

// Serwowanie plików statycznych
app.use(express.static(path.join(__dirname, "my-frontend-app")));

// Domyślna trasa dla głównego URL
app.get("/", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "my-frontend-app",
      "/index.html",
      "/pages/rynek-pierwotny.html",
      "/pages/rynek-wtorny.html",
      "/extra-page.html"
    )
  );
});

// Trasa proxy
app.get("/api/proxy", async (req, res) => {
  const apiUrl = "https://app.esticrm.pl/apiClient/offer/list";
  const companyId = "8160";
  const token = "4e921a377b";
  const skip = 0;
  const take = 9;
  const status = "3,99";
  const updateDate = "2022-07-09 12:00:00";

  const url = `${apiUrl}?company=${companyId}&token=${token}&skip=${skip}&take=${take}&status=${status}&updateDate=${updateDate}`;

  console.log(`Fetching URL: ${url}`); // Logowanie URL

  return request({ url }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({ type: "error", message: error.message });
    }

    res.json(JSON.parse(body));
  });
});
// try {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(`Network response was not ok: ${response.statusText}`);
//   }
//   const data = await response.json();
//   console.log(`Data fetched: ${JSON.stringify(data)}`); // Logowanie danych
//   res.json(data);
// } catch (error) {
//   console.error(`Error fetching data: ${error.message}`); // Logowanie błędu
//   res.status(500).json({ error: "Something went wrong" });
// }

// Opcje dla HTTPS
// const options = {
//   key: fs.readFileSync("/path/to/your/private.key"),
//   cert: fs.readFileSync("/path/to/your/certificate.crt"),
// };

// Uruchamianie serwera HTTPS
app.listen(443, () => {
  console.log("Server running on port 443 (HTTPS)");
});
