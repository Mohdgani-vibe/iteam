import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import { WebSocketServer, WebSocket } from "ws";
import { createServer } from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Database
const db = new Database("it_management.db");

// Create Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS gatepasses (
    id TEXT PRIMARY KEY,
    company TEXT,
    employee_name TEXT,
    employee_id TEXT,
    department TEXT,
    contact TEXT,
    asset_details TEXT,
    asset_tag TEXT,
    purpose TEXT,
    issue_date TEXT,
    return_date TEXT,
    remarks TEXT,
    status TEXT,
    created_at TEXT
  );

  CREATE TABLE IF NOT EXISTS agents (
    device_id TEXT PRIMARY KEY,
    hostname TEXT,
    ip_address TEXT,
    status TEXT,
    last_seen TEXT,
    os_version TEXT,
    security_score INTEGER DEFAULT 100
  );

  CREATE TABLE IF NOT EXISTS alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    device_id TEXT,
    type TEXT,
    severity TEXT,
    message TEXT,
    timestamp TEXT
  );
`);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const wss = new WebSocketServer({ server: httpServer });
  const PORT = 3000;

  app.use(express.json());

  // --- WEBSOCKET LOGIC ---
  const clients = new Set<WebSocket>();

  wss.on("connection", (ws) => {
    clients.add(ws);
    console.log("New WebSocket client connected");

    ws.on("close", () => {
      clients.delete(ws);
      console.log("Client disconnected");
    });
  });

  const broadcast = (data: any) => {
    const message = JSON.stringify(data);
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  };

  // Mock Event Generator (Simulate real-time IT events)
  setInterval(() => {
    const eventTypes = ["SECURITY_ALERT", "DEVICE_STATUS", "GATEPASS_REQUEST"];
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    
    let payload: any = { type };

    if (type === "SECURITY_ALERT") {
      const severities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
      const messages = [
        "Unauthorized login attempt detected",
        "ClamAV found suspicious file in /tmp",
        "Outdated kernel version detected",
        "Large data outbound transfer detected"
      ];
      payload = {
        ...payload,
        severity: severities[Math.floor(Math.random() * severities.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        deviceId: `DEV-${Math.floor(100 + Math.random() * 900)}`,
        timestamp: new Date().toISOString()
      };
      
      // Save alert to DB
      db.prepare("INSERT INTO alerts (device_id, type, severity, message, timestamp) VALUES (?, ?, ?, ?, ?)")
        .run(payload.deviceId, payload.type, payload.severity, payload.message, payload.timestamp);
    } else if (type === "DEVICE_STATUS") {
      payload = {
        ...payload,
        deviceId: `DEV-${Math.floor(100 + Math.random() * 900)}`,
        status: Math.random() > 0.2 ? "online" : "offline",
        timestamp: new Date().toISOString()
      };
    } else if (type === "GATEPASS_REQUEST") {
      payload = {
        ...payload,
        employee: "John Doe",
        asset: "MacBook Pro M3",
        timestamp: new Date().toISOString()
      };
    }

    broadcast(payload);
  }, 10000); // Every 10 seconds

  // --- API ROUTES ---

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString(), db: "connected", ws: "active" });
  });

  // Alerts Endpoint
  app.get("/api/alerts", (req, res) => {
    const rows = db.prepare("SELECT * FROM alerts ORDER BY timestamp DESC LIMIT 50").all();
    res.json(rows);
  });

  // Gatepass Endpoints
  app.post("/api/gatepasses", (req, res) => {
    const { 
      company, employee, id: empId, department, contact, 
      asset, tag, purpose, issueDate, returnDate, remarks 
    } = req.body;
    
    const gpId = `GP-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdAt = new Date().toISOString();
    const status = "Pending Manager Approval";

    const stmt = db.prepare(`
      INSERT INTO gatepasses (
        id, company, employee_name, employee_id, department, contact,
        asset_details, asset_tag, purpose, issue_date, return_date, remarks,
        status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    try {
      stmt.run(
        gpId, company, employee, empId, department, contact,
        asset, tag, purpose, issueDate, returnDate, remarks,
        status, createdAt
      );
      
      broadcast({ type: "GATEPASS_REQUEST", id: gpId, employee, asset, timestamp: createdAt });
      
      res.status(201).json({ id: gpId, status, createdAt });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to save gatepass" });
    }
  });

  app.get("/api/gatepasses", (req, res) => {
    const rows = db.prepare("SELECT * FROM gatepasses ORDER BY created_at DESC").all();
    res.json(rows);
  });

  // Agent Heartbeat
  app.post("/api/agent/heartbeat", (req, res) => {
    const { deviceId, hostname, ip, os } = req.body;
    const now = new Date().toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO agents (device_id, hostname, ip_address, status, last_seen, os_version)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(device_id) DO UPDATE SET
        status = 'online',
        last_seen = excluded.last_seen,
        ip_address = excluded.ip_address
    `);

    try {
      stmt.run(deviceId, hostname, ip, 'online', now, os);
      
      broadcast({ type: "DEVICE_STATUS", deviceId, status: "online", timestamp: now });
      
      res.json({ status: "acknowledged", server_time: now });
    } catch (err) {
      res.status(500).json({ error: "Heartbeat failed" });
    }
  });

  app.get("/api/agents", (req, res) => {
    const rows = db.prepare("SELECT * FROM agents").all();
    res.json(rows);
  });

  // --- VITE MIDDLEWARE ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`
🚀 Zerodha IT Management Server Running
---------------------------------------
Local:            http://localhost:${PORT}
API Health:       http://localhost:${PORT}/api/health
Environment:      ${process.env.NODE_ENV || 'development'}
WebSocket:        Active on port ${PORT}
    `);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
