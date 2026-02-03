import sys

from dotenv import load_dotenv


load_dotenv(override=True)

from agents.assets_agent import agent as assets_agent


def main() -> None:
    prompt = "How are you?"
    if len(sys.argv) > 1:
        prompt = " ".join(sys.argv[1:]).strip() or prompt

    result = assets_agent(prompt)
    print(str(result).strip())


if __name__ == "__main__":
    main()
