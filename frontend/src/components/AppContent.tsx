import { useFrontendTool } from "@copilotkit/react-core/v2";
import { useState, type FormEventHandler } from "react";
import { z } from "zod";

type AppContentProps = {
    agUiUrl: string;
    copilotRuntimeUrl: string;
    input: string;
    error: string | null;
    onInputChange: (value: string) => void;
    onSubmit: FormEventHandler<HTMLFormElement>;
};

export function AppContent({
    agUiUrl,
    copilotRuntimeUrl,
    input,
    error,
    onInputChange,
    onSubmit,
}: AppContentProps) {
    const [background, setBackground] = useState<string>("--copilot-kit-background-color");
    const [tasks, setTasks] = useState<Array<{ id: string; text: string }>>([]);
    // useCopilotReadable({
    //     description: "Username",
    //     value: username,
    // });
    // useCopilotAdditionalInstructions({
    //     instructions: `The user's username is ${username}. Answer questions about the username using this value.`,
    // });
    // useCopilotReadable({
    //     description: "Current background color",
    //     value: background,
    // });
    // useCopilotReadable({
    //     description: "Current todo list",
    //     value: tasks.map((task) => task.text),
    // });

    useFrontendTool({
        name: "change_background",
        description:
          "Change the background color of the chat. Can be anything that the CSS background attribute accepts. Regular colors, linear of radial gradients etc.",
        parameters: z.object({
          background: z
            .string()
            .describe("The background color or gradient. Prefer gradients. Only use when asked."),
        }),
        handler: async ({ background }) => {
          setBackground(background);
          return `Background changed to ${background}.`;
        },
      });

    useFrontendTool({
        name: "add_task",
        description: "Add a task to the todo list",
        parameters: z.object({
          task: z
            .string()
            .describe("The task to add. If multiple tasks, pass them as a newline-separated list.")
            .optional(),
        }),
        handler: async ({ task }) => {
            console.log("add_task", task);
          const raw = String(task ?? "").split(/\r?\n/);
          const normalized = raw
            .map((entry) => entry.replace(/^[-*\d.\s]+/, "").trim())
            .filter(Boolean);
          const entries = normalized.length ? normalized : [String(task ?? "").trim()].filter(Boolean);

          const newTasks = entries.map((text) => ({ id: crypto.randomUUID(), text }));
          setTasks((prev) => [...prev, ...newTasks]);
          return `Added ${newTasks.length} task${newTasks.length === 1 ? "" : "s"}.`;
        },
      });

    return (
        <div className="app" style={{ background }}>
            <header className="app-header">
                <div>
                    <p className="eyebrow">Frontend UI</p>
                    <h1>CopilotKit + AG-UI</h1>
                    <p className="subtitle">
                        Vite React app wired to CopilotKit UI components and an AG-UI agent endpoint.
                    </p>
                </div>
                <div className="status">
                    <span className="pill">idle</span>
                </div>
            </header>

            <section className="card">
                <h2>Connection</h2>
                <div className="kv">
                    <div>
                        <span>AG-UI URL</span>
                        <code>{agUiUrl}</code>
                    </div>
                    <div>
                        <span>CopilotKit runtime</span>
                        <code>{copilotRuntimeUrl}</code>
                    </div>
                </div>
                <p className="hint">
                    Configure `VITE_AG_UI_URL` and optionally `VITE_COPILOTKIT_RUNTIME_URL` or
                    `VITE_COPILOTKIT_PUBLIC_API_KEY` in a `.env` file.
                </p>
            </section>
            <section className="card">
                <h2>Todo list</h2>
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>{task.text}</li>
                    ))}
                </ul>
            </section>
            <section className="card">
                <h2>Send a message</h2>
                <form className="composer" onSubmit={onSubmit}>
                    <textarea
                        placeholder="Use the Copilot sidebar to chat..."
                        value={input}
                        onChange={(event) => onInputChange(event.target.value)}
                        rows={4}
                    />
                    <div className="actions">
                        <button type="submit" disabled>
                            Use Copilot sidebar
                        </button>
                    </div>
                </form>
                {error ? <p className="error">Error: {error}</p> : null}
            </section>
        </div>
    );
}
