import { useState } from "react";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { AppContent } from "./components/AppContent";
import "./App.css";

function App() {
  const agUiUrl = "http://localhost:8000/";
  const copilotRuntimeUrl = "http://localhost:8001/api/copilotkit";

  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRun = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    setError("Direct AG-UI calls are disabled. Use the Copilot sidebar instead.");
    setInput("");
  };

  const appContent = (
    <AppContent
      agUiUrl={agUiUrl}
      copilotRuntimeUrl={copilotRuntimeUrl}
      input={input}
      error={error}
      onInputChange={setInput}
      onSubmit={handleRun}
    />
  );

  return (
    <CopilotKit
      runtimeUrl={copilotRuntimeUrl}
      agent="strands_agent"
      showDevConsole
      enableInspector
    >
      <CopilotSidebar
        hitEscapeToClose
        defaultOpen
        labels={{
          title: "Copilot",
          initial: "Ask the assistant while you test the AG-UI flow.",
        }}
        suggestions={[
          {
            title: "Change background",
            message: "Change the background to something new.",
          },
          {
            title: "Generate sonnet",
            message: "Write a short sonnet about AI.",
          },
        ]}
      >
        {appContent}
      </CopilotSidebar>
    </CopilotKit>
  );
}

export default App;
