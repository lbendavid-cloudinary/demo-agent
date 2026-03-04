from dotenv import load_dotenv

load_dotenv(override=True)

from ag_ui_strands import StrandsAgent, StrandsAgentConfig, create_strands_app
from fastapi import FastAPI
from strands.models.ollama import OllamaModel

from agents.assets_agent import agent as assets_agent
from agents.taxonomy_agent import agent as taxonomy_agent


def build_context_message(input_data, user_message: str) -> str:
    if not getattr(input_data, "context", None):
        return user_message

    context_lines: list[str] = []
    for ctx in input_data.context:
        description = getattr(ctx, "description", None) or "Context"
        value = getattr(ctx, "value", "")
        if value:
            context_lines.append(f"- {description}: {value}")

    if not context_lines:
        return user_message

    context_block = "Context:\n" + "\n".join(context_lines)
    return f"{context_block}\n\nUser message:\n{user_message}"

# Wrap with AG-UI integration
agui_assets_agent = StrandsAgent(
    agent=assets_agent,
    name="assets_agent",
    config=StrandsAgentConfig(state_context_builder=build_context_message),
)

agui_taxonomy_agent = StrandsAgent(
    agent=taxonomy_agent,
    name="taxonomy_agent",
    config=StrandsAgentConfig(state_context_builder=build_context_message),
)

# Create the FastAPI app
app = FastAPI()
app.mount("/assets", create_strands_app(agui_assets_agent, "/"))
app.mount("/taxonomy", create_strands_app(agui_taxonomy_agent, "/"))

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
