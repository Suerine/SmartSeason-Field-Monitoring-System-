## Testing the System

The database comes pre-loaded with 4 agents, 12 crop types, and 16 fields in various states — some healthy, some overdue, some completed. The scenarios below walk through the core functionality using that data.

> **Note:** The backend runs on Render's free tier, which spins down after inactivity. If the login takes 20–30 seconds on first load, that's normal. It won't happen again during your session.

---

### Scenario 1 — Admin overview and at-risk detection

**Login as:** admin@smartseason.com / admin123

Go to the Dashboard. You should see the KPI cards at the top showing a breakdown across Active, At Risk, and Completed fields. The "Fields Needing Attention" panel below lists every at-risk field and why it's flagged — either the agent has gone quiet, or the field has been stuck in its current stage longer than the crop's expected duration.

Go to the Fields page. Use the Status filter to select "At Risk". You'll see fields like:
- **Njoro Potato Farm** — stuck in Sprouting (expected 15 days, now at 25)
- **Mwea Irrigation Scheme Block 7** — Brian hasn't logged an update in 12 days
- **Taita Hills Coffee Estate** — Berry Development stage is 70 days overdue

Click into any of these fields. You'll see the stage progress bar in red, the reason for the alert, and the full update history at the bottom. As admin you can see everything but cannot advance the stage — that's reserved for the assigned agent.

---

### Scenario 2 — Watching the status engine work

**Still logged in as admin**

Go to Fields and find **Nakuru Maize Block A** (assigned to Jane Wanjiku). Its status is Active, the progress bar shows it mid-way through the Vegetative stage, and the timeline shows it has not yet reached Grain Fill.

Now find **Subukia Bean Plot** (also Jane's). Status is Completed — the full five-stage history is visible in the update log, from Sowing through to Harvest with notes at each step.

These two fields use the same status engine but produce different results because one is mid-cycle and one has reached the Harvested category. Neither status is stored — both are computed fresh from the field's data each time.

---

### Scenario 3 — Agent view and stage progression

**Log out, then login as:** jane@smartseason.com / agent123

Jane has 4 fields assigned to her. The dashboard shows only her fields — she cannot see Brian's, Samuel's, or Fatuma's.

The notification area at the top flags any of her fields that need attention. Click into **Njoro Potato Farm**. You'll see:
- The stage progress bar is red — this field is overdue
- A banner explaining the field should have moved to Tuber Initiation already
- The care instructions for the current stage (Sprouting), pulled from the crop library
- An "Advance to Tuber Initiation" button with a note field

Add an observation note and click the button. The stage advances immediately. Go back to the dashboard — the field's status recalculates on the spot. If the new stage is within its expected window, it will flip from At Risk to Active.

---

### Scenario 4 — Agent without access

**Still logged in as jane@smartseason.com**

Try navigating directly to a field that belongs to Brian:
`/fields/[any field ID from Brian's assignments]`

The API will return a 403 and the field detail page will show an access denied message. Jane can only update fields assigned to her — the restriction is enforced on the backend, not just hidden in the UI.

---

### Scenario 5 — Admin creates a field and assigns it

**Log out, login as:** admin@smartseason.com / admin123

Go to Fields and click **Create Field**. Fill in:
- Name: anything you like
- Crop type: pick Tomatoes from the dropdown
- Planting date: today's date
- Assign to: Fatuma Hassan

Submit. The new field appears immediately in the list with status Active, stage set to the first stage in the Tomato lifecycle (Transplanting), and the progress bar at 0%.

Now log out and log back in as fatuma@smartseason.com / agent123. The new field appears in Fatuma's dashboard. She can open it, see the care instructions for Transplanting, and start logging updates.

---

### Scenario 6 — Crop library (admin only)

**Login as:** admin@smartseason.com / admin123

Go to Crops. You'll see all 12 crop types in the system. Click into Coffee (Arabica). The full lifecycle is listed — Pruning/Maintenance (30 days), Flowering (60 days), Berry Development (150 days), Ripening (30 days), Harvested (10 days).

These durations are what the status engine uses to decide whether a field is on track or overdue. A field planted with Coffee that has been in Berry Development for 160 days will be flagged At Risk because 160 > 150.

The Agents page (admin only) shows all four agents, their email addresses, and their assigned role.

---

### What to verify across all scenarios

| Behaviour | Where to check |
|-----------|---------------|
| Admins see all fields, agents see only theirs | Login as both and compare the Fields page |
| At Risk fires for silent agents (7+ days) | Mwea Block 7 — Brian's last update was 12 days ago |
| At Risk fires for overdue stages | Njoro Potato Farm — Sprouting at day 25, expected 15 |
| Completed fires for harvested fields | Subukia Bean Plot, Kirinyaga Rice Paddy |
| Stage advance is agent-only | Login as admin, open any field — no advance button |
| Care instructions match current stage | Open any field detail — instructions update when stage changes |
| New field starts at first crop stage | Create a field, check the stage and progress bar |
