import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { CopilotRuntime, createCopilotEndpoint } from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const strandsAgentUrl = process.env.STRANDS_AGENT_URL ?? "http://localhost:8000/";

const runtime = new CopilotRuntime({
  agents: {
    strands_agent: new HttpAgent({ url: strandsAgentUrl }),
  },
});

const copilotApp = createCopilotEndpoint({
  runtime,
  basePath: "/api/copilotkit",
});

const port = Number(process.env.PORT ?? 8001);
const app = new Hono();
app.route("/", copilotApp);
app.get("/health", (c) => c.json({ status: "ok" }));

serve({ fetch: app.fetch, port }, () => {
  console.log(`CopilotKit runtime listening on http://localhost:${port}/api/copilotkit`);
});
