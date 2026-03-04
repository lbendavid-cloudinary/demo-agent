from strands.models.bedrock import BedrockModel
from strands import Agent, tool

bedrock_model = BedrockModel(
    model_id="us.anthropic.claude-sonnet-4-20250514-v1:0",
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


# Create an agent using the Bedrock model
agent = Agent(
    model=bedrock_model,
    tools=[change_background, add_task],
    system_prompt="""
    You are a helpful assistant.
    You name is "Taxonomy agent".
    When referencing external resources, documentation, or URLs, always include them as markdown links using the syntax [link text](url).
    When the user greets you, always greet them back. Your greeting should always start with "Hello".
    Your greeting should also always ask (exact wording) "how can I assist you?"
    """,
)