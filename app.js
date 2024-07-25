// import fs from "fs";
const express = require("express");
// const fs = require("fs");
const path = require("path");
// import https from "https";
const mime = require("mime-types");

// Inicjalizacja aplikacji Express
const app = express();

// Middleware do obsługi CORS
app.use((_req, res, next) => {
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
app.use((req, _res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

// Serwowanie plików statycznych

// Ta zmiana powoduje, ze serwer bedzie "serwować" wszystkie pliki js-owe pod relatywną ściezką "/js", wiec w skryptach mozemy zastosowac import relatywny
// typu /js/plik.js
app.use('/js', express.static(path.join(__dirname, 'front', 'js')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/styles', express.static(path.join(__dirname, 'front', 'styles')));

// Przekazywanie odpowiedniego pliku HTML poprzez Express dla wybranego przez uzytkownika route'a

/* 1. Uzytkownik wchodzi na homeestates.pl/sprzedaj-z-nami */
/* 2. Dzięki ponizszej linijce serwer rozpoznaje request o ten route i poprzez res.sendFile wysyła response (odpowiedź) w postaci podania statycznego pliku HTML do przeglądarki -> front-end!  */
app.get('/sprzedaj-z-nami', (_req, res) => {
  res.sendFile(path.join(__dirname, 'front', 'pages', 'sprzedaj-z-nami.html'));
});
app.get('/uslugi-dodatkowe', (_req, res) => {
  res.sendFile(path.join(__dirname, 'front', 'pages', 'uslugi-dodatkowe.html'));
});
app.get('/rynek-wtorny', (_req, res) => {
  res.sendFile(path.join(__dirname, 'front', 'pages', 'rynek-wtorny.html'));
});
app.get('/rynek-pierwotny', (_req, res) => {
  res.sendFile(path.join(__dirname, 'front', 'pages', 'rynek-pierwotny.html'));
});
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

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

  console.log(`Fetching URL: ${url}`); // Logowanie URL\

  request(url).pipe(res);
})

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
  console.log("Server running on port 443");
});
