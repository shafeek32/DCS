# Decision Companion System — Decision Logic & Architecture Diagram

```mermaid
flowchart TD
    U[User] --> UI[React UI: Decision Wizard + Workspace]
    UI --> API[Express REST API]

    API --> VC[Request Validation Layer]
    VC --> C[Decision Controller]
    C --> DS[Decision Service]
    DS --> EVAL[Evaluation Service\nWeighted Scoring + Explanation]

    DS --> DB[(MongoDB\nDecision, Criteria, Options, Scores)]
    EVAL --> DS
    DS --> C
    C --> API
    API --> UI

    EVAL --> R[Ranked Results\n+ Why Winner]
    R --> UI

    subgraph WSM [Weighted Scoring Model]
        W1[For each option]
        W2[For each criterion]
        W3[Score += weight * rating]
        W4[Sort descending by total score]
        W5[Generate explanation based on top contributors]
        W1 --> W2 --> W3 --> W4 --> W5
    end

    EVAL --- WSM
```

## Notes

- The recommendation is deterministic and explainable.
- AI is optional and non-critical; core ranking does not depend on AI calls.
