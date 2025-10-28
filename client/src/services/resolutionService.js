import { get, post, put, del } from '../utils/api';
import apiEndpoints from '../utils/api-endpoints';

// Resolution Tracker-specific API calls
export const resolutionService = {
    // Get all resolution records (with optional filters)
    getAllResolutions: async (filters = {}) => {
        const params = new URLSearchParams();

        if (filters.status) params.append('status', filters.status);
        if (filters.errorCode) params.append('errorCode', filters.errorCode);
        if (filters.resolvedBy) params.append('resolvedBy', filters.resolvedBy);

        const queryString = params.toString();
        const endpoint = queryString ? `${apiEndpoints.resolutions.getAll}?${queryString}` : apiEndpoints.resolutions.getAll;

        return await get(endpoint);
    },

    // Get resolution statistics
    getResolutionStats: async () => {
        return await get(apiEndpoints.resolutions.getStats);
    },

    // Get resolution by composite key (orderId and dateSubmitted)
    getResolutionById: async (orderId, dateSubmitted) => {
        // Ensure dateSubmitted is properly encoded for URL
        const encodedDate = encodeURIComponent(dateSubmitted);
        return await get(apiEndpoints.resolutions.getById.replace(':orderId', orderId).replace(':dateSubmitted', encodedDate));
    },

    // Create new resolution record
    createResolution: async (resolutionData) => {
        return await post(apiEndpoints.resolutions.create, resolutionData);
    },

    // Update resolution record
    updateResolution: async (orderId, dateSubmitted, resolutionData) => {
        const encodedDate = encodeURIComponent(dateSubmitted);
        return await put(apiEndpoints.resolutions.update.replace(':orderId', orderId).replace(':dateSubmitted', encodedDate), resolutionData);
    },

    // Delete resolution record
    deleteResolution: async (orderId, dateSubmitted) => {
        const encodedDate = encodeURIComponent(dateSubmitted);
        return await del(apiEndpoints.resolutions.delete.replace(':orderId', orderId).replace(':dateSubmitted', encodedDate));
    },

    // Helper method to resolve a record (shortcut for common update)
    resolveRecord: async (orderId, dateSubmitted, resolvedBy, comments = null) => {
        const updateData = {
            status: 'Resolved',
            resolvedBy: resolvedBy,
            resolvedDate: new Date().toISOString(),
            comments: comments
        };

        return await resolutionService.updateResolution(orderId, dateSubmitted, updateData);
    },

    // Helper method to filter by status only
    getResolvedRecords: async () => {
        return await resolutionService.getAllResolutions({ status: 'Resolved' });
    },

    // Helper method to filter by status only
    getUnresolvedRecords: async () => {
        return await resolutionService.getAllResolutions({ status: 'Unresolved' });
    },

    // Helper method to filter by error code
    getRecordsByErrorCode: async (errorCode) => {
        return await resolutionService.getAllResolutions({ errorCode });
    },

    // Helper method to filter by resolver
    getRecordsByResolver: async (resolvedBy) => {
        return await resolutionService.getAllResolutions({ resolvedBy });
    }
};

export default resolutionService;
