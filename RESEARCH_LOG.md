# RESEARCH_LOG.md

This log captures how external resources (including AI) influenced the build and documentation process.

## 1) AI Prompts Used

### Prompt A (problem framing)
"Design and build a Decision Companion System with multiple options, weighted criteria, ranking, and explainable output. Suggest an architecture that is not AI-dependent."

- **Accepted**:
  - Use a deterministic weighted scoring core.
  - Keep explanation generation explicit and rule-based.
- **Rejected/Modified**:
  - Rejected any design where an LLM decides rankings.
  - Modified architecture suggestions to fit existing MERN stack project.

### Prompt B (explainability)
"How can I generate a plain-English explanation from weighted scores without using an LLM at runtime?"

- **Accepted**:
  - Use top contributing criterion and runner-up comparison narrative.
- **Rejected/Modified**:
  - Rejected overly verbose templates that obscured numeric transparency.

### Prompt C (documentation quality)
"What sections should a strong software assignment README include for architecture and trade-off clarity?"

- **Accepted**:
  - Add assumptions, trade-offs, edge cases, and future improvements.
- **Rejected/Modified**:
  - Dropped non-essential product marketing sections.

## 2) Search Queries / References

### Query 1
"weighted scoring model decision making explainable"

- **Use**: Confirmed suitability of WSM for transparent multi-criteria decisions.

### Query 2
"compare AHP vs weighted scoring"

- **Use**: Helped frame future improvements and trade-offs section.

### Query 3
"mern architecture service layer best practices"

- **Use**: Reinforced controller-service-model separation for maintainability.

## 3) What Was Accepted vs Rejected from AI Outputs

### Accepted
- Deterministic compute core.
- Weighted linear aggregation for clarity.
- Rule-based explanation strategy.
- Explicit documentation of limits and assumptions.

### Rejected
- End-to-end AI-driven recommendation engine.
- Opaque models without decision traceability.
- Over-engineered scoring requiring heavy calibration for a first submission.

## 4) Transparency Notes

- AI was used as a **thinking partner**, not as the runtime decision-maker.
- Final algorithmic behavior is implemented in code and can be manually verified.
- Documentation was expanded to expose reasoning, constraints, and design evolution.
