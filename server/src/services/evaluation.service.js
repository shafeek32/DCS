/**
 * Evaluation Service
 * Implements the Weighted Scoring Model (WSM) logic.
 */

// Helper to calculate score for a single option
const calculateOptionScore = (option, criteriaList) => {
    let totalScore = 0;
    const breakdown = {};

    criteriaList.forEach(criterion => {
        // Get raw score from map (default to 0 if missing)
        // Scores are stored in a Map in Mongoose, so we use .get() if it's a Map, or object access if plain object
        const rawScore = (option.scores instanceof Map)
            ? (option.scores.get(criterion._id.toString()) || 0)
            : (option.scores[criterion._id.toString()] || 0);

        const weightedScore = rawScore * criterion.weight;
        totalScore += weightedScore;

        breakdown[criterion.name] = {
            raw: rawScore,
            weight: criterion.weight,
            contribution: weightedScore
        };
    });

    return { totalScore, breakdown };
};

/**
 * Generates a human-readable explanation for the ranking.
 * @param {Object} winner - The winning option object with score details
 * @param {Object} runnerUp - The second place option (optional)
 * @param {Array} criteria - List of criteria
 */
const generateExplanation = (winner, runnerUp, criteria) => {
    if (!winner) return "No options to evaluate.";

    let explanation = `**${winner.name}** is the recommended choice with a score of **${winner.totalScore.toFixed(2)}**. `;

    // Find top contributing factors
    const contributions = Object.entries(winner.breakdown)
        .map(([name, data]) => ({ name, val: data.contribution }))
        .sort((a, b) => b.val - a.val);

    const topFactor = contributions[0];
    explanation += `It performed best in **${topFactor.name}**, contributing significantly to its score. `;

    if (runnerUp) {
        const diff = winner.totalScore - runnerUp.totalScore;
        explanation += `It beat **${runnerUp.name}** by **${diff.toFixed(2)}** points. `;

        // Comparative analysis
        // Find where winner beat runner up
        // assumption: both have same breakdown keys
        let advantage = null;
        let maxAdvantageVal = -1;

        Object.keys(winner.breakdown).forEach(critName => {
            const winVal = winner.breakdown[critName].contribution;
            const loseVal = runnerUp.breakdown[critName].contribution;
            if ((winVal - loseVal) > maxAdvantageVal) {
                maxAdvantageVal = winVal - loseVal;
                advantage = critName;
            }
        });

        if (advantage) {
            explanation += `Crucially, ${winner.name} had a stronger rating in **${advantage}** compared to ${runnerUp.name}.`;
        }
    }

    return explanation;
}

exports.evaluateDecision = (decision) => {
    if (!decision.options || decision.options.length === 0) {
        return { rankedOptions: [], explanation: "No options provided." };
    }
    if (!decision.criteria || decision.criteria.length === 0) {
        return { rankedOptions: [], explanation: "No criteria defined." };
    }

    // 1. Calculate scores for all options
    const evaluatedOptions = decision.options.map(opt => {
        const { totalScore, breakdown } = calculateOptionScore(opt, decision.criteria);
        return {
            ...opt.toObject(), // Convert mongoose doc to plain object
            totalScore,
            breakdown
        };
    });

    // 2. Rank options (Sort Descending)
    evaluatedOptions.sort((a, b) => b.totalScore - a.totalScore);

    // 3. Generate Explanation
    const explanation = generateExplanation(
        evaluatedOptions[0],
        evaluatedOptions[1],
        decision.criteria
    );

    return {
        rankedOptions: evaluatedOptions,
        explanation
    };
};
