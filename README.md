# Decision Companion System (DCS)

Decision Companion System is a full-stack decision support application that helps users make explainable, criteria-based choices using a weighted scoring model.

## 1) My Understanding of the Problem

The assignment asks for more than “just code.” The system must:

- accept a variable number of options,
- accept decision criteria with different priorities,
- evaluate options algorithmically,
- return a ranked output,
- and explain the recommendation in human language.

I interpreted this as building an **explainable decision engine** that is interactive (inputs can change) and deterministic (users can verify how results were produced).

## 2) What I Built

A MERN-based application with:

- **Frontend (React + Vite + Tailwind)** for decision setup and workspace-style edits.
- **Backend (Node + Express + MongoDB)** for data persistence and scoring APIs.
- **Evaluation service** implementing a transparent weighted scoring model.
- **Explanation service** that identifies why the winning option ranks highest.

The system is not hard-coded to one scenario. Users can define any decision context (e.g., laptop buying, team selection, travel planning), create custom criteria and weights, and re-evaluate instantly.

## 3) Assumptions

- Each criterion has an explicit numeric weight representing importance.
- Each option receives a numeric rating per criterion.
- Higher weighted score indicates a better recommendation.
- Users provide trustworthy ratings (the tool is a companion, not an oracle).
- Explainability is preferred over highly complex optimization.

## 4) Why This Structure

I chose a layered structure to keep responsibilities clear:

- `routes` for HTTP exposure,
- `controllers` for request/response orchestration,
- `services` for decision logic,
- `models` for persistence.

This improves maintainability and allows the scoring engine to evolve independently from API or UI concerns.

## 5) Decision Logic

The current model uses the **Weighted Scoring Model (WSM)**:

\[
\text{Option Score} = \sum (\text{criterion weight} \times \text{option rating for that criterion})
\]

Recommendation transparency includes:

- winning option score,
- ranked list of alternatives,
- key criterion that most influenced the winner,
- short explanation comparing winner vs. runner-up.

## 6) AI Usage, Role, and Limitations

AI can assist with:

- language polishing of explanations,
- drafting documentation,
- brainstorming architecture alternatives.

AI does **not** decide the winner. Core ranking is deterministic and implemented directly in backend service logic. This avoids a black-box recommendation path and keeps results auditable.

Limitations:

- if user inputs are biased or poor quality, output quality degrades,
- weighted linear scoring may miss non-linear trade-offs,
- no uncertainty/confidence modeling yet.

## 7) Edge Cases Considered

- Missing criteria, options, or scores.
- Mismatched score arrays and criteria definitions.
- Tied scores between options.
- Extremely unbalanced weight distributions.
- Invalid identifiers or malformed payloads.

## 8) Trade-offs

- **Chosen**: weighted linear model for clarity and explainability.
- **Deferred**: pairwise methods (AHP), utility curves, Monte Carlo uncertainty.
- **Chosen**: fast interactive updates rather than complex optimization.
- **Deferred**: collaborative multi-user decisions and historical analytics.

## 9) Design Diagram

A decision logic / component flow diagram is included here:

- [`docs/decision-logic-diagram.md`](docs/decision-logic-diagram.md)

## 10) How to Run

### Prerequisites

- Node.js 18+
- MongoDB local instance or MongoDB Atlas URI

### Backend

```bash
cd server
npm install
cp .env.example .env 2>/dev/null || true
# set at least:
# MONGO_URI=mongodb://localhost:27017/decision-companion
# PORT=5000
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Optional quality checks

```bash
cd client && npm run lint
cd client && npm run build
```

## 11) API Surface (High-level)

- `POST /api/decisions` — create decision skeleton
- `GET /api/decisions/:id` — fetch decision
- `PUT /api/decisions/:id` — update options/criteria/scores
- `POST /api/decisions/:id/evaluate` — compute ranking + explanation

## 12) What I Would Improve with More Time

- Add automated backend tests for scoring and explanation edge cases.
- Add sensitivity analysis (“how much weight change flips the winner?”).
- Add criterion normalization helpers and guided scoring scales.
- Add exportable reports and decision history versions.
- Add optional AI-assisted criterion suggestions with strict human override.

## 13) Repository Deliverables

- Source code (client + server)
- This README
- `BUILD_PROCESS.md`
- `RESEARCH_LOG.md`
- `docs/decision-logic-diagram.md`
