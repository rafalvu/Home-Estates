const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Handle both www and non-www domains by serving the same content
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}] ${req.method} ${req.url} - Host: ${
      req.headers.host
    } - User-Agent: ${req.headers["user-agent"]?.substring(0, 50)}...`
  );

  // Normalize the host for consistent behavior
  if (req.headers.host && req.headers.host.startsWith("www.")) {
    req.headers.originalHost = req.headers.host;
    req.headers.host = req.headers.host.slice(4);
    console.log(
      `[${timestamp}] Normalized www.${req.headers.host} to ${req.headers.host}`
    );
  }
  next();
});

// Set proper MIME types for static files
express.static.mime.define({ "text/css": ["css"] });

// Serve static files with proper MIME types
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(
  "/js",
  express.static(path.join(__dirname, "front", "js"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

app.use(
  "/styles",
  express.static(path.join(__dirname, "front", "styles"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

// Serve the main directory for other files (like index.html)
app.use(express.static(__dirname));

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

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://app.esticrm.pl",
    changeOrigin: true,
  })
);

// Uruchamianie serwera na porcie 3001 (zamiast 443 dla rozwoju lokalnego)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
