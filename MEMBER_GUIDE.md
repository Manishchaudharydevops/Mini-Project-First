# Member 4 Guide - Manas Kumar Singh (2415000923)

Project: Agile Project & Sprint Analytics Suite
Role: Risk Prediction and Risk Analysis
Branch name: feature/risk-score

## Your files (inside the `src` folder of this zip)
- src/utils/riskScore.js
- src/components/RiskPanel.jsx
- src/components/risk.css

## What you have to complete

- calculateRisk(tasks, sprint) in riskScore.js returns { score, level, reasons }
- Rules (easy to explain in the viva):
    Each overdue task: 10 points (max 30)
    Each incomplete high-priority task: 8 points (max 20)
    More than 3 tasks in progress: 10 points
    Half of sprint time over but completion below 40%: 15 points
    More than 15 story points remaining: 10 points
    Deadline within 2 days with work remaining: 20 points
    Deadline passed with work remaining: 25 points
    Total is capped at 100
- Level: below 30 = Low, 30 to 59 = Medium, 60 and above = High
- Risk page with score circle, level, list of reasons and a rules table (RiskPanel.jsx)
- Score updates automatically when tasks change

## How your part connects to the others

- Props received by RiskPanel: `tasks`, `sprints`.
- Uses only tasks whose `sprintId` equals the active sprint id.
- Uses helper functions from `src/utils/dateHelpers.js` (already in the repo).

## Data format used by everyone (do not change it)

Task: { id, title, description, priority ("Low" | "Medium" | "High"), assignee, storyPoints (number), dueDate ("YYYY-MM-DD" or ""), status ("backlog" | "todo" | "inprogress" | "review" | "done"), sprintId (null or sprint id), completedDate ("YYYY-MM-DD" or "") }

Sprint: { id, name, startDate, endDate, status ("active" | "completed"), velocity (null or number) }

App.jsx keeps `tasks` and `sprints` in state and passes them to each page as props.

## Test checklist before you push

- No overdue tasks -> score is low and reasons say no major risk
- Make 3 tasks overdue (set due date in the past) -> score and reasons increase
- Add many story points to the sprint -> "story points remaining" reason shows
- Low completion with sprint half over -> low completion reason shows
- Sprint end date in 1 or 2 days -> deadline approaching reason shows
- Click "Load Sample Data": expected result is 65 / 100, High

## Rules
- Only change your own files. If you need a change in someone else's file, tell that member.
- Do not add new libraries.
- Understand your code fully. The mentor will ask you to explain it in the viva.

## Git steps (do these from YOUR OWN GitHub account)

1. Accept the collaborator invite sent by the repo owner (check your email or github.com/notifications).
2. Clone the repo and install:
   git clone <REPO_URL>
   cd <repo-folder>
   npm install
3. Set your own name and the SAME email you use on GitHub (this is what makes the commits show under your account):
   git config user.name "Your Name"
   git config user.email "your-github-email@example.com"
4. Create your branch:
   git checkout -b feature/risk-score
5. Copy the `src` folder from this zip into the project folder. When Windows asks, choose "Replace the files". Your files will replace the placeholder files.
6. Run `npm run dev` and test your part (checklist below). Click "Load Sample Data" in the navbar to get demo data.
7. Commit in small steps (the mentor can see each one). Suggested commits:
   a) Add risk score calculation    -> git add src/utils/riskScore.js
   b) Add risk panel                -> git add src/components/RiskPanel.jsx
   c) Add risk styling              -> git add src/components/risk.css
   (use git commit -m "message" after each git add)
8. Push your branch:
   git push -u origin feature/risk-score
9. Open GitHub, click "Compare & pull request", write a short description and create the Pull Request. The repo owner merges it using "Create a merge commit" so your commits stay under your name.
10. After others are merged, update your local copy with: git checkout main, then git pull origin main
