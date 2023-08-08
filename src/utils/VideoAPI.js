const axios = require('axios');

const API_KEY = 'AIzaSyA91W31Qo86BdNQy4cROVmeHvIpaynSlv8';

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