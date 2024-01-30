import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Update with your API URL

let logoutTimer;

const startLogoutTimer = (logoutCallback, duration) => {
    logoutTimer = setTimeout(() => {
        logoutCallback();
    }, duration);
};

const clearLogoutTimer = () => {
    if (logoutTimer) {
        clearTimeout(logoutTimer);
    }
};

const login = (credentials) => {
    return axios.post(`${API_URL}/api/login`, credentials)
        .then((response) => {
            const data = response.data;

            if (data.success) {
                const token = data.token;

                // Save the token to local storage
                localStorage.setItem('token', token);

                // Include the token in the headers for subsequent requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // Start the logout timer after successful login 
                startLogoutTimer(logout, 240000); // 240,000 milliseconds = 4 minutes
            }

            return data;
        });
};

const logout = () => {
    // Clear the token from local storage on logout
    localStorage.removeItem('token');

    // Clear the logout timer
    clearLogoutTimer();
};

const isAuthenticated = () => {
    // Check if a valid token is present in local storage
    const token = localStorage.getItem('token');
    return !!token;
};

const getUserData = () => {
    const endpoint = `${API_URL}/api/user-data`;

    return axios.get(endpoint, {
        withCredentials: true, // Include credentials if necessary
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    })
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching user data:', error);
            throw error;
        });
};

const getUserDataByEmail = async (email) => {
    try {
        const endpoint = `${API_URL}/api/user-data?email=${encodeURIComponent(email)}`;

        const response = await axios.get(endpoint, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};


export default {
    login,
    logout,
    isAuthenticated,
    clearLogoutTimer,
    getUserData,
    getUserDataByEmail
};