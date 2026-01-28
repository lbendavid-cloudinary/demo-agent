import { useState } from "react";
import { CopilotSidebar, CopilotKitProvider } from "@copilotkit/react-core/v2";
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
    <CopilotKitProvider 
      runtimeUrl={copilotRuntimeUrl}
    >
      <CopilotSidebar
        agentId="strands_agent"
        defaultOpen
        labels={{
          modalHeaderTitle: "Copilot",
          chatDisclaimerText: "Ask the assistant while you test the AG-UI flow.",
        }}
      >
        
      </CopilotSidebar>
      {appContent}
    </CopilotKitProvider>
  );
}

export default App;
