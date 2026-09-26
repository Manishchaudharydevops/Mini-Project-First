export default function Navbar({ view, setView }) {
  const tabs = [
    { key: "board", label: "Board" },
    { key: "sprint", label: "Sprint" },
    { key: "analytics", label: "Analytics" },
    { key: "risk", label: "Risk" },
  ];

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="navbar-title">Agile Project & Sprint Analytics Suite</span>
      </div>
      <nav className="navbar-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`navbar-tab ${view === tab.key ? "active" : ""}`}
            onClick={() => setView(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
