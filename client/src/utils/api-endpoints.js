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
        create: '/resolutions',
        update: '/resolutions/:orderId/:dateSubmitted',
        delete: '/resolutions/:orderId/:dateSubmitted',
    },
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        logout: '/auth/logout',
        profile: '/auth/profile',
    },
};

export default apiEndpoints;