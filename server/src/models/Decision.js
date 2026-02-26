const mongoose = require('mongoose');

const CriteriaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Criteria name is required'],
        trim: true
    },
    weight: {
        type: Number,
        required: [true, 'Criteria weight is required'],
        min: 0,
        max: 1
    }
});

const OptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Option name is required'],
        trim: true
    },
    // Map of criteria ID to score (0-10)
    scores: {
        type: Map,
        of: Number,
        default: {}
    }
});

const DecisionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Decision title is required'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    criteria: [CriteriaSchema],
    options: [OptionSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Calculate total weight validation before saving
DecisionSchema.pre('save', async function () {
    if (this.criteria && this.criteria.length > 0) {
        const totalWeight = this.criteria.reduce((sum, c) => sum + (c.weight || 0), 0);
        // Allow small floating point error
        if (Math.abs(totalWeight - 1.0) > 0.01) {
            // Log warning but allow for now as per design notes
            console.warn(`Decision "${this.title}" saved with total criteria weight: ${totalWeight}`);
        }
    }
});

module.exports = mongoose.model('Decision', DecisionSchema);
