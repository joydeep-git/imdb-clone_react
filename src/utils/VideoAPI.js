const axios = require('axios');

const API_KEY = 'AIzaSyDpIaPi59bjMYuXCYCpeFWcGQzuNnb2UCQ';

const fetchVideoDetails = async (videoId) => {
    const options = {
        method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/videos',
        params: {
            id: videoId,
            part: 'snippet',
            key: API_KEY,
        },
    };

    try {
        const response = await axios.request(options);
        return response.data.items[0];
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
};

export default fetchVideoDetails;
