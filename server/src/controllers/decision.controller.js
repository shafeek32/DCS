const decisionService = require('../services/decision.service');
const evaluationService = require('../services/evaluation.service');

// @desc    Create a new decision
// @route   POST /api/decisions
// @access  Public
exports.createDecision = async (req, res, next) => {
    try {
        const decision = await decisionService.createDecision(req.body);
        res.status(201).json({
            success: true,
            data: decision
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get a decision by ID
// @route   GET /api/decisions/:id
// @access  Public
exports.getDecision = async (req, res, next) => {
    try {
        const decision = await decisionService.getDecisionById(req.params.id);
        if (!decision) {
            return res.status(404).json({ success: false, error: 'Decision not found' });
        }
        res.status(200).json({
            success: true,
            data: decision
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update a decision (add criteria, options, etc)
// @route   PUT /api/decisions/:id
// @access  Public
exports.updateDecision = async (req, res, next) => {
    try {
        const decision = await decisionService.updateDecision(req.params.id, req.body);
        if (!decision) {
            return res.status(404).json({ success: false, error: 'Decision not found' });
        }
        res.status(200).json({
            success: true,
            data: decision
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Evaluate a decision (Run WSM)
// @route   POST /api/decisions/:id/evaluate
// @access  Public
exports.evaluateDecision = async (req, res, next) => {
    try {
        const decision = await decisionService.getDecisionById(req.params.id);
        if (!decision) {
            return res.status(404).json({ success: false, error: 'Decision not found' });
        }

        const result = evaluationService.evaluateDecision(decision);

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (err) {
        next(err);
    }
};
