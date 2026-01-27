import http from "node:http";
import { CopilotRuntime, copilotRuntimeNodeHttpEndpoint, ExperimentalEmptyAdapter } from "@copilotkit/runtime";
import { HttpAgent } from "@ag-ui/client";

const strandsAgentUrl = process.env.STRANDS_AGENT_URL ?? "http://localhost:8000/";
const serviceAdapter = new ExperimentalEmptyAdapter();

const runtime = new CopilotRuntime({
  agents: {
    strands_agent: new HttpAgent({ url: strandsAgentUrl }),
  },
});

const runtimeHandler = copilotRuntimeNodeHttpEndpoint({
  runtime,
  serviceAdapter,
  endpoint: "/api/copilotkit",
});

const port = Number(process.env.PORT ?? 8001);
const corsOrigin = process.env.CORS_ORIGIN ?? "*";

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", corsOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.url?.startsWith("/api/copilotkit")) {
    await runtimeHandler(req, res);
    return;
  }

  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  res.statusCode = 404;
  res.end("Not found");
});

server.listen(port, () => {
  console.log(`CopilotKit runtime listening on http://localhost:${port}/api/copilotkit`);
});
