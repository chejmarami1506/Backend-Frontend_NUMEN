const axios = require('axios');

const getCharactersFromApi = async () => {
    try {
        const response = await axios.get('https://dragonball-api.com/api/characters');
        return response.data;
    } catch (error) {
        console.error('Error al obtener datos de la API de Dragon Ball:', error.message);
        return [];
    }
};

module.exports = { getCharactersFromApi };