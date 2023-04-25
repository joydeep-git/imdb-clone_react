import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
    params: {hl: 'en', gl: 'US'},
    headers: {
        'X-RapidAPI-Key' : process.env.REACT_APP_YOUTUBE_API_KEY,
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
};

export const fetchDataFromApi = async (url) => {
    const {data} = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
}

// const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: 'https://youtube138.p.rapidapi.com/auto-complete/',
//   params: {
//     q: 'desp',
//     hl: 'en',
//     gl: 'US'
//   },
//   headers: {
//     'content-type': 'application/octet-stream',
//     'X-RapidAPI-Key': 'b5d20ff943msh32757c0fc1363d1p13548djsn9c17a5ab058e',
//     'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }