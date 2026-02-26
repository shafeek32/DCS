const express = require('express');
const router = express.Router({ mergeParams: true });
// Actually express.Router() is correct.

const {
    createDecision,
    getDecision,
    updateDecision,
    evaluateDecision
} = require('../controllers/decision.controller');

router.route('/')
    .post(createDecision);

router.route('/:id')
    .get(getDecision)
    .put(updateDecision);

router.route('/:id/evaluate')
    .post(evaluateDecision);

module.exports = router;
