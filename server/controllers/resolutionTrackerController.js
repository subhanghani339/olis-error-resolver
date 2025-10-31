const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all resolution tracker records
const getAllResolutions = async (req, res) => {
  try {
    const {
      status,
      errorCode,
      resolvedBy,
      orderId,
      startDate,
      endDate,
      errorMessage,
    } = req.query;

    const whereClause = {};
    if (status) whereClause.status = status;
    if (errorCode) {
      const errorCodes = Array.isArray(errorCode) ? errorCode : [errorCode];
      whereClause.errorCode = {
        in: errorCodes,
      };
    }
    if (resolvedBy) whereClause.resolvedBy = { contains: resolvedBy };
    if (orderId) whereClause.orderId = { contains: orderId };
    if (errorMessage) whereClause.errorMessage = { contains: errorMessage };

    // Date range filtering
    if (startDate || endDate) {
      whereClause.dateSubmitted = {};
      if (startDate) whereClause.dateSubmitted.gte = new Date(startDate);
      if (endDate) whereClause.dateSubmitted.lte = new Date(endDate);
    }

    const resolutions = await prisma.oLIS_ORU_ResolutionTracker.findMany({
      where: whereClause,
      orderBy: { dateSubmitted: "desc" },
    });

    res.json({
      status: true,
      message: "Resolution records retrieved successfully",
      data: resolutions,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch resolution records",
      data: null,
    });
  }
};

// Create new resolution record
const createResolution = async (req, res) => {
  try {
    const {
      orderId,
      dateSubmitted,
      errorCode,
      errorMessage,
      hl7Segment,
      status,
      comments,
      resolvedBy,
      resolvedDate,
    } = req.body;

    if (!orderId || !dateSubmitted) {
      return res.status(400).json({
        status: false,
        message: "OrderId and dateSubmitted are required",
        data: null,
      });
    }

    const resolution = await prisma.oLIS_ORU_ResolutionTracker.create({
      data: {
        orderId,
        dateSubmitted: new Date(dateSubmitted),
        errorCode,
        errorMessage,
        hl7Segment,
        status,
        comments,
        resolvedBy,
        resolvedDate: resolvedDate ? new Date(resolvedDate) : null,
      },
    });

    res.status(201).json({
      status: true,
      message: "Resolution record created successfully",
      data: resolution,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        status: false,
        message:
          "Resolution record with this OrderId and DateSubmitted already exists",
        data: null,
      });
    }
    res.status(500).json({
      status: false,
      message: "Failed to create resolution record",
      data: null,
    });
  }
};

// Update resolution record
const updateResolution = async (req, res) => {
  try {
    const { orderId, dateSubmitted } = req.params;
    const {
      errorCode,
      errorMessage,
      hl7Segment,
      status,
      comments,
      resolvedBy,
      resolvedDate,
    } = req.body;

    const resolution = await prisma.oLIS_ORU_ResolutionTracker.update({
      where: {
        orderId_dateSubmitted: {
          orderId: orderId,
          dateSubmitted: new Date(dateSubmitted),
        },
      },
      data: {
        errorCode,
        errorMessage,
        hl7Segment,
        status,
        comments,
        resolvedBy,
        resolvedDate: resolvedDate ? new Date(resolvedDate) : null,
      },
    });

    res.json({
      status: true,
      message: "Resolution record updated successfully",
      data: resolution,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        status: false,
        message: "Resolution record not found",
        data: null,
      });
    }
    res.status(500).json({
      status: false,
      message: "Failed to update resolution record",
      data: null,
    });
  }
};

// Delete resolution record
const deleteResolution = async (req, res) => {
  try {
    const { orderId, dateSubmitted } = req.params;

    await prisma.oLIS_ORU_ResolutionTracker.delete({
      where: {
        orderId_dateSubmitted: {
          orderId: orderId,
          dateSubmitted: new Date(dateSubmitted),
        },
      },
    });

    res.json({
      status: true,
      message: "Resolution record deleted successfully",
      data: null,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        status: false,
        message: "Resolution record not found",
        data: null,
      });
    }
    res.status(500).json({
      status: false,
      message: "Failed to delete resolution record",
      data: null,
    });
  }
};

module.exports = {
  getAllResolutions,
  createResolution,
  updateResolution,
  deleteResolution,
};
