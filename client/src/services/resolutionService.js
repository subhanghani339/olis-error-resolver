import { get, post, put, del } from "../utils/api";
import apiEndpoints from "../utils/api-endpoints";

// Resolution Tracker-specific API calls
export const resolutionService = {
  // Get all resolution records (with optional filters)
  getAllResolutions: async (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.status) params.append("status", filters.status);
    if (filters.errorCode) {
      if (Array.isArray(filters.errorCode)) {
        filters.errorCode.forEach((code) => params.append("errorCode", code));
      } else {
        params.append("errorCode", filters.errorCode);
      }
    }
    if (filters.resolvedBy) params.append("resolvedBy", filters.resolvedBy);
    if (filters.orderId) params.append("orderId", filters.orderId);
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);
    if (filters.errorMessage)
      params.append("errorMessage", filters.errorMessage);

    const queryString = params.toString();
    const endpoint = queryString
      ? `${apiEndpoints.resolutions.getAll}?${queryString}`
      : apiEndpoints.resolutions.getAll;

    return await get(endpoint);
  },

  // Create new resolution record
  createResolution: async (resolutionData) => {
    return await post(apiEndpoints.resolutions.create, resolutionData);
  },

  // Update resolution record
  updateResolution: async (orderId, dateSubmitted, resolutionData) => {
    const encodedDate = encodeURIComponent(dateSubmitted);
    return await put(
      apiEndpoints.resolutions.update
        .replace(":orderId", orderId)
        .replace(":dateSubmitted", encodedDate),
      resolutionData
    );
  },

  // Delete resolution record
  deleteResolution: async (orderId, dateSubmitted) => {
    const encodedDate = encodeURIComponent(dateSubmitted);
    return await del(
      apiEndpoints.resolutions.delete
        .replace(":orderId", orderId)
        .replace(":dateSubmitted", encodedDate)
    );
  },

  // Helper method to resolve a record (shortcut for common update)
  resolveRecord: async (
    orderId,
    dateSubmitted,
    resolvedBy,
    comments = null
  ) => {
    const updateData = {
      status: "Resolved",
      resolvedBy: resolvedBy,
      resolvedDate: new Date().toISOString(),
      comments: comments,
    };

    return await resolutionService.updateResolution(
      orderId,
      dateSubmitted,
      updateData
    );
  },
};

export default resolutionService;
