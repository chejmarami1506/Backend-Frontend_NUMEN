import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/characters',
    headers: {
        'x-api-key': 'super-secreto-dragon-ball'
    }
});

export const getCharacters = () => api.get('/');
export const createCharacter = (character) => api.post('/', character);
export const updateCharacter = (id, character) => api.put(`/${id}`, character);
export const patchCharacter = (id, character) => api.patch(`/${id}`, character);
export const deleteCharacter = (id) => api.delete(`/${id}`);

export default api;