const apiEndpoints = {
    users: {
        getAll: '/users',
        getById: '/users/:id',
        create: '/users',
        update: '/users/:id',
        delete: '/users/:id',
    },
    resolutions: {
        getAll: '/resolutions',
        getStats: '/resolutions/stats',
        getById: '/resolutions/:orderId/:dateSubmitted',
        create: '/resolutions',
        update: '/resolutions/:orderId/:dateSubmitted',
        delete: '/resolutions/:orderId/:dateSubmitted',
    },
};

export default apiEndpoints;