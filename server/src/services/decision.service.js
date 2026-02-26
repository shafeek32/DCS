const Decision = require('../models/Decision');

/**
 * Create a new decision.
 * @param {Object} data - Decision data
 * @returns {Promise<Decision>}
 */
exports.createDecision = async (data) => {
    const decision = new Decision(data);
    return await decision.save();
};

/**
 * Get a decision by ID.
 * @param {String} id - Decision ID
 * @returns {Promise<Decision>}
 */
exports.getDecisionById = async (id) => {
    return await Decision.findById(id);
};

/**
 * Update a decision.
 * @param {String} id - Decision ID
 * @param {Object} data - Update data
 * @returns {Promise<Decision>}
 */
exports.updateDecision = async (id, data) => {
    return await Decision.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

/**
 * Delete a decision.
 * @param {String} id - Decision ID
 * @returns {Promise<Decision>}
 */
exports.deleteDecision = async (id) => {
    return await Decision.findByIdAndDelete(id);
};
