const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const CRMProxy = createProxyMiddleware({
  target: "https://app.esticrm.pl",
  changeOrigin: true,
});

app.use("/api", CRMProxy);

// Serwowanie plików statycznych
// Ta zmiana powoduje, ze serwer bedzie "serwować" wszystkie pliki js-owe pod relatywną ściezką "/js", wiec w skryptach mozemy zastosowac import relatywny
// typu /js/plik.js
app.use("/js", express.static(path.join(__dirname, "front", "js")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/styles", express.static(path.join(__dirname, "front", "styles")));

// Przekazywanie odpowiedniego pliku HTML poprzez Express dla wybranego przez uzytkownika route'a
/* 1. Uzytkownik wchodzi na homeestates.pl/sprzedaj-z-nami */
/* 2. Dzięki ponizszej linijce serwer rozpoznaje request o ten route i poprzez res.sendFile wysyła response (odpowiedź) w postaci podania statycznego pliku HTML do przeglądarki -> front-end!  */
app.get("/sprzedaj-z-nami", (_req, res) => {
  res.sendFile(path.join(__dirname, "front", "pages", "sprzedaj-z-nami.html"));
});
app.get("/uslugi-dodatkowe", (_req, res) => {
  res.sendFile(path.join(__dirname, "front", "pages", "uslugi-dodatkowe.html"));
});
app.get("/rynek-wtorny", (_req, res) => {
  res.sendFile(path.join(__dirname, "front", "pages", "rynek-wtorny.html"));
});
app.get("/rynek-pierwotny", (_req, res) => {
  res.sendFile(path.join(__dirname, "front", "pages", "rynek-pierwotny.html"));
});
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Uruchamianie serwera HTTPS
app.listen(443, () => {
  console.log("Server running on port 443");
});
