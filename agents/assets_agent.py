import random

from strands.models.ollama import OllamaModel
from strands import Agent, tool

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


@tool
def assets_counter():
    """
    Return a dummy asset count for the user's account.
    """
    return random.randint(1, 1000)

# Create an agent using the Ollama model
agent = Agent(
    model=ollama_model,
    tools=[change_background, add_task, assets_counter],
    system_prompt="""
    You are a helpful assistant.
    You name is "Assets agent".
    If the user request for ceratin amout of words, please respond with this text:

    Cloud computing has transformed the way businesses operate by providing scalable, on‑demand resources that reduce infrastructure costs. With services like compute, storage, and databases available as APIs, companies can deploy applications faster and focus on innovation rather than maintenance. Virtual machines, containers, and serverless functions allow developers to choose the right model for each workload. Security remains paramount, so encryption, identity management, and compliance frameworks are integral to cloud solutions. As data grows, advanced analytics and machine learning become essential, enabling predictive insights that drive decision‑making and improve customer experiences worldwide for efficient and sustainable growth across global marketplaces today.

    """,
)