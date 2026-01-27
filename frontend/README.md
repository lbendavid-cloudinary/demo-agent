# CopilotKit + AG-UI Frontend

Vite + React UI that integrates CopilotKit UI components with an AG-UI client.

## Setup

```bash
pnpm install
```

## Backend (uv)

From the repo root:

```bash
uv sync
uv run python -u main.py
```

## Environment

Create a `.env` file in `frontend` with the following variables:

```
VITE_AG_UI_URL=http://localhost:8000/
VITE_COPILOTKIT_RUNTIME_URL=http://localhost:8001/api/copilotkit
VITE_COPILOTKIT_PUBLIC_API_KEY=ck_pub_...
VITE_COPILOTKIT_AGENT=strands_agent
```

Only `VITE_AG_UI_URL` is required. The CopilotKit runtime URL or public API key is optional:
- Use `VITE_COPILOTKIT_RUNTIME_URL` for a self-hosted CopilotKit runtime.
- Use `VITE_COPILOTKIT_PUBLIC_API_KEY` for CopilotKit Cloud.
If you use the runtime with Strands, set `VITE_COPILOTKIT_AGENT=strands_agent`.

## Development

```bash
pnpm dev
```
