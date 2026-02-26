# BUILD_PROCESS.md

## 1. Starting Point

I started with the core assignment constraints and converted them into minimum capabilities:

1. dynamic input model (options + criteria + weights),
2. explainable scoring logic,
3. ranked output,
4. editable workflow (not hard-coded comparisons),
5. transparent engineering and documentation.

## 2. Initial Architecture Thought Process

I considered three possible implementation styles:

- **Single-file CLI prototype**: fastest to build but weaker UX and persistence.
- **API-only backend**: clean logic but no complete end-user experience.
- **Full-stack app (chosen)**: balanced practical usability + architectural clarity.

I chose a MERN setup because it gives:

- a friendly UI for ambiguous real-world decisions,
- API-level separation of concerns,
- persistence for iterative decision refinement.

## 3. Decision Engine Evolution

### v1 idea
Simple sum of per-criterion scores.

### Why rejected
Does not capture “importance of criteria.”

### v2 (implemented)
Weighted Scoring Model where criterion importance directly affects final ranking.

### Additional refinement
Add explanation generation so the output is not merely numeric but interpretable.

## 4. System Design Decisions

- **Service layer for evaluation logic**: keeps controller thin and testable.
- **Schema-driven decision model**: allows arbitrary criteria/options.
- **Validation before compute**: prevents invalid payloads from silently producing bad rankings.
- **Separate evaluation endpoint**: allows deliberate recomputation after edits.

## 5. Mistakes / Corrections During Development

- **Risk identified**: mixing scoring logic directly in route/controller.
  - **Correction**: moved to dedicated services.
- **Risk identified**: ranking without explainability feels black-box.
  - **Correction**: added explanation engine based on dominant weighted contributors.
- **Risk identified**: documentation too implementation-centric.
  - **Correction**: expanded project docs to include assumptions, trade-offs, and process transparency.

## 6. Refactoring Decisions

- Consolidated business logic into evaluation-focused services.
- Kept API handlers minimal and intention-revealing.
- Improved top-level docs to map product goals to implementation choices.

## 7. Alternatives Considered (Not Implemented Yet)

- **AHP / pairwise comparison** for more structured preference capture.
- **TOPSIS** for distance-based ranking.
- **Constraint solver style** for hard constraints + soft objectives.

These were deferred to preserve explainability and implementation simplicity for this submission.

## 8. How Thinking Evolved

My thinking moved from “build a calculator” to “build a decision companion” with four qualities:

- repeatable,
- explainable,
- editable,
- documentable.

The final design intentionally favors transparent reasoning over algorithmic complexity.
