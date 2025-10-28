const express = require('express');
const router = express.Router();
const {
    getAllResolutions,
    createResolution,
    updateResolution,
    deleteResolution
} = require('../controllers/resolutionTrackerController');

// GET /api/resolutions - Get all resolution records (with optional query filters)
router.get('/', getAllResolutions);

// POST /api/resolutions - Create new resolution record
router.post('/', createResolution);

// PUT /api/resolutions/:orderId/:dateSubmitted - Update resolution record
router.put('/:orderId/:dateSubmitted', updateResolution);

// DELETE /api/resolutions/:orderId/:dateSubmitted - Delete resolution record
router.delete('/:orderId/:dateSubmitted', deleteResolution);

module.exports = router;