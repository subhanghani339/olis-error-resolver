const express = require('express');
const router = express.Router();
const {
    getAllResolutions,
    getResolutionById,
    createResolution,
    updateResolution,
    deleteResolution,
    getResolutionStats
} = require('../controllers/resolutionTrackerController');

// GET /api/resolutions - Get all resolution records (with optional query filters)
router.get('/', getAllResolutions);

// GET /api/resolutions/stats - Get resolution statistics
router.get('/stats', getResolutionStats);

// GET /api/resolutions/:orderId/:dateSubmitted - Get specific resolution record
router.get('/:orderId/:dateSubmitted', getResolutionById);

// POST /api/resolutions - Create new resolution record
router.post('/', createResolution);

// PUT /api/resolutions/:orderId/:dateSubmitted - Update resolution record
router.put('/:orderId/:dateSubmitted', updateResolution);

// DELETE /api/resolutions/:orderId/:dateSubmitted - Delete resolution record
router.delete('/:orderId/:dateSubmitted', deleteResolution);

module.exports = router;
