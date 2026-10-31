function Navbar({ page, setPage, onLoadSample, onClearData }) {
  const pages = [
    { key: "board", label: "Board" },
    { key: "sprint", label: "Sprint" },
    { key: "analytics", label: "Analytics" },
    { key: "risk", label: "Risk" },
  ];

  return (
    <div className="navbar">
      <h1 className="logo">Agile Sprint Suite</h1>
      <div className="nav-links">
        {pages.map((p) => (
          <button
            key={p.key}
            className={page === p.key ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage(p.key)}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="nav-actions">
        <button className="btn btn-secondary btn-small" onClick={onLoadSample}>
          Load Sample Data
        </button>
        <button className="btn btn-secondary btn-small" onClick={onClearData}>
          Clear Data
        </button>
      </div>
    </div>
  );
}

export default Navbar;
