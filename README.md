# Agile Project & Sprint Analytics Suite

A frontend-only Agile/Scrum board with sprint management, sprint analytics (burndown chart and velocity), and a transparent rule-based risk prediction score. No backend, no database, and no machine learning — everything runs in the browser and all data is stored using Local Storage.

## Features

- Drag-and-drop Scrum board (Backlog, To Do, In Progress, Review, Done)
- Task management: create, edit, delete tasks with priority, assignee, story points and due date
- Sprint management: create sprints with start/end dates, link tasks to the active sprint
- Sprint analytics: burndown chart, velocity chart, completion percentage, summary cards
- Transparent, rule-based risk score (0–100) with risk level and clear reasons
- Data persistence using the browser's Local Storage
- Responsive UI for desktop and mobile

## Tech Stack

- React.js (Vite)
- JavaScript (ES6+), HTML5, CSS3
- HTML5 Drag-and-Drop API
- Recharts (burndown and velocity charts)
- Browser Local Storage
- Git & GitHub

## Project Structure

```
agile-suite/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── context/
│   │   └── AppContext.jsx
│   ├── utils/
│   │   ├── id.js
│   │   ├── storage.js
│   │   ├── sprintStats.js
│   │   └── riskEngine.js
│   └── components/
│       ├── Layout/Navbar.jsx
│       ├── Board/Board.jsx
│       ├── Board/Column.jsx
│       ├── Board/TaskCard.jsx
│       ├── Board/TaskFormModal.jsx
│       ├── Sprint/SprintPanel.jsx
│       ├── Sprint/SprintFormModal.jsx
│       ├── Analytics/AnalyticsDashboard.jsx
│       ├── Analytics/BurndownChart.jsx
│       ├── Analytics/VelocityChart.jsx
│       └── Risk/RiskPanel.jsx
```

## Run Locally

```bash
npm install
npm run dev
```

Open the printed local URL in your browser.

## Build

```bash
npm run build
```

The production build is written to the `dist/` folder.

## Deploy to GitHub Pages

1. Push this folder to a new GitHub repository.
2. In `vite.config.js`, if you deploy to `https://<username>.github.io/<repo-name>/`, set:
   ```js
   base: "/<repo-name>/"
   ```
3. Build the project: `npm run build`.
4. Deploy the contents of `dist/` to the `gh-pages` branch (for example using the `gh-pages` npm package, or GitHub Actions).
5. Enable GitHub Pages in the repository settings, pointing to that branch.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com), click **New Project**, and import the repository.
3. Vercel will auto-detect the Vite framework:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click **Deploy**. Vercel will give you a live URL once the build finishes.

## Notes

- Risk scoring is a transparent, rule-based heuristic (not machine learning), based on overdue tasks, incomplete high-priority tasks, work-in-progress limits, completion rate versus elapsed sprint time, remaining story points, and deadline proximity.
- All data (tasks, sprints, burndown history) is stored only in the current browser via Local Storage. Clearing browser data will reset the app.
