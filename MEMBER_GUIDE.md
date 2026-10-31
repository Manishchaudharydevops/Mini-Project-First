# Member 2 Guide - Mayank Chaudhary (2415000953)

Project: Agile Project & Sprint Analytics Suite
Role: Drag and Drop and Sprint Management
Branch name: feature/drag-drop-sprint

## Your files (inside the `src` folder of this zip)
- src/utils/dragDrop.js
- src/utils/sprintStorage.js
- src/components/SprintPanel.jsx
- src/components/SprintForm.jsx
- src/components/sprint.css

## What you have to complete

- Drag and drop functions (dragDrop.js): startDrag, allowDrop, getDroppedTaskId, moveTask
- moveTask changes the task status and sets the completed date when a task is moved to Done
- Save and load sprints using Local Storage (sprintStorage.js)
- Sprint page: create a sprint with name, start date and end date (SprintForm.jsx, SprintPanel.jsx)
- Show current sprint info and deadline text (days left, today, passed)
- Add tasks to the sprint and remove tasks from the sprint
- Show Total Tasks, Completed Tasks, Remaining Tasks, Total Story Points, Completed Story Points
- Complete Sprint button: saves the velocity and sends unfinished tasks back to the available list
- List of completed sprints with their velocity

## How your part connects to the others

- Props received by SprintPanel: `tasks`, `setTasks`, `sprints`, `setSprints`.
- Member 1's Board and TaskCard use your dragDrop.js functions. Do not rename the 4 functions.
- Member 3 and Member 4 read the sprint (status "active") and the task `sprintId` that you set.

## Data format used by everyone (do not change it)

Task: { id, title, description, priority ("Low" | "Medium" | "High"), assignee, storyPoints (number), dueDate ("YYYY-MM-DD" or ""), status ("backlog" | "todo" | "inprogress" | "review" | "done"), sprintId (null or sprint id), completedDate ("YYYY-MM-DD" or "") }

Sprint: { id, name, startDate, endDate, status ("active" | "completed"), velocity (null or number) }

App.jsx keeps `tasks` and `sprints` in state and passes them to each page as props.

## Test checklist before you push

- Drag a card to every column and check the status changes
- Refresh the page: the card must stay in the new column
- Create a sprint, add 3 tasks, check the numbers
- Move a task to Done and check Completed Tasks and Completed Story Points increase
- Try an end date before the start date: alert must show
- Complete the sprint and check it appears in Completed Sprints with velocity

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
   git checkout -b feature/drag-drop-sprint
5. Copy the `src` folder from this zip into the project folder. When Windows asks, choose "Replace the files". Your files will replace the placeholder files.
6. Run `npm run dev` and test your part (checklist below). Click "Load Sample Data" in the navbar to get demo data.
7. Commit in small steps (the mentor can see each one). Suggested commits:
   a) Add drag and drop functions   -> git add src/utils/dragDrop.js
   b) Add sprint storage helpers    -> git add src/utils/sprintStorage.js
   c) Add sprint form               -> git add src/components/SprintForm.jsx
   d) Add sprint panel              -> git add src/components/SprintPanel.jsx
   e) Add sprint styling            -> git add src/components/sprint.css
   (use git commit -m "message" after each git add)
8. Push your branch:
   git push -u origin feature/drag-drop-sprint
9. Open GitHub, click "Compare & pull request", write a short description and create the Pull Request. The repo owner merges it using "Create a merge commit" so your commits stay under your name.
10. After others are merged, update your local copy with: git checkout main, then git pull origin main
