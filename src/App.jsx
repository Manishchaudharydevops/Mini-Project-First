import { useState } from "react";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Layout/Navbar";
import Board from "./components/Board/Board";
import SprintPanel from "./components/Sprint/SprintPanel";
import AnalyticsDashboard from "./components/Analytics/AnalyticsDashboard";
import RiskPanel from "./components/Risk/RiskPanel";

export default function App() {
  const [view, setView] = useState("board");

  return (
    <AppProvider>
      <div className="app-shell">
        <Navbar view={view} setView={setView} />
        <main className="app-main">
          {view === "board" && <Board />}
          {view === "sprint" && <SprintPanel />}
          {view === "analytics" && <AnalyticsDashboard />}
          {view === "risk" && <RiskPanel />}
        </main>
      </div>
    </AppProvider>
  );
}
