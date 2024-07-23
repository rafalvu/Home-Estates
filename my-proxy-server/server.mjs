import express from "express";
import fetch from "node-fetch";
import path from "path";

const app = express();
const __dirname = path.resolve();

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Serwowanie plików statycznych
app.use(express.static(path.join(__dirname, "my-frontend-app")));

// Domyślna trasa dla głównego URL
app.get("/", (req, res) => {
  res.send("Welcome to the API proxy server!");
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

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(`Data fetched: ${JSON.stringify(data)}`); // Logowanie danych
    res.json(data);
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`); // Logowanie błędu
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
