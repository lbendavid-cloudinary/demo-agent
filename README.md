## Preperations

1. Create AWS credentials:
   - Go to https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-1#/users (AWS Dev)
   - Create a new user and add it to the `Dev_users_cli_group` group.
   - In your user's page, click on "Add permissions", and use "Copy permissions" from "edwin" user to import the aws bedroc credentials
   - In your user's page, click "Create access key" and select "Other".
   - Copy the access key and secret.

2. Create a `.env` file in the repo root with:
   - `AWS_REGION=us-east-1`
   - `AWS_ACCESS_KEY_ID=...`
   - `AWS_SECRET_ACCESS_KEY=...`
   - `AWS_SESSION_TOKEN=...` (if using temporary credentials)

## Running the agent

1. `uv sync`
2. `uv run python -u main.py`


## Running the backend (copilotkit runtime)

1. `cd backend`
2. `pnpm install`
3. `pnpm run dev`

## Running the UI

1. `cd frontend`
2. `pnpm install`
3. `pnpm run dev`