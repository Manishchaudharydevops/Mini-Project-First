import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Board from "./components/Board";
import SprintPanel from "./components/SprintPanel";
import Analytics from "./components/Analytics";
import RiskPanel from "./components/RiskPanel";
import { loadTasks, saveTasks } from "./utils/taskStorage";
import { loadSprints, saveSprints } from "./utils/sprintStorage";
import { sampleTasks, sampleSprints } from "./utils/sampleData";
import "./App.css";

function App() {
  const [page, setPage] = useState("board");
  const [tasks, setTasks] = useState(() => loadTasks());
  const [sprints, setSprints] = useState(() => loadSprints());

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    saveSprints(sprints);
  }, [sprints]);

  function loadSampleData() {
    setTasks(sampleTasks());
    setSprints(sampleSprints());
  }

  function clearData() {
    if (window.confirm("Delete all tasks and sprints?")) {
      setTasks([]);
      setSprints([]);
    }
  }

  return (
    <div>
      <Navbar
        page={page}
        setPage={setPage}
        onLoadSample={loadSampleData}
        onClearData={clearData}
      />
      <div className="container">
        {page === "board" && <Board tasks={tasks} setTasks={setTasks} />}
        {page === "sprint" && (
          <SprintPanel
            tasks={tasks}
            setTasks={setTasks}
            sprints={sprints}
            setSprints={setSprints}
          />
        )}
        {page === "analytics" && <Analytics tasks={tasks} sprints={sprints} />}
        {page === "risk" && <RiskPanel tasks={tasks} sprints={sprints} />}
      </div>
    </div>
  );
}

export default App;
