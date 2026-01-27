from ag_ui_strands import StrandsAgent, create_strands_app
from strands import Agent, tool
from strands.models.ollama import OllamaModel

# Create an Ollama model instance
ollama_model = OllamaModel(
    host="http://localhost:11434",  # Ollama server address
    model_id="gpt-oss:20b",  # Specify which model to use
)


# Define frontend tool - registered so LLM knows about it, but returns None
# The actual execution happens on the frontend
@tool
def change_background(background: str):
    """
    Change the background color of the chat. Can be anything that the CSS background
    attribute accepts. Regular colors, linear or radial gradients etc.

    Args:
        background: The background color or gradient. Prefer gradients. Only use when asked.
    """
    # Return None - frontend will handle the actual execution
    return None


@tool
def add_task(task: str):
    """
    Add a task to the todo list

    Args:
        task: The task to add
    """
    return None


# Create an agent using the Ollama model
agent = Agent(
    model=ollama_model,
    tools=[change_background, add_task],
    system_prompt="""
    You are a helpful assistant.
    When the user greets you, always greet them back. Your greeting should always start with "Hello".
    Your greeting should also always ask (exact wording) "how can I assist you?"
    """,
)


# Wrap with AG-UI integration
agui_agent = StrandsAgent(
    agent=agent,
    name="strands_agent",
)

# Create the FastAPI app
app = create_strands_app(agui_agent, "/")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
