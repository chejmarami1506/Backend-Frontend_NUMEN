import React, { useState, useEffect } from 'react';
import { getCharacters, createCharacter, updateCharacter, deleteCharacter } from './services/api';
import './App.css';

function App() {
    const [characters, setCharacters] = useState([]);
    const [newCharacter, setNewCharacter] = useState({ id: '', name: '', ki: '', race: '', affiliation: '' });
    const [editingCharacter, setEditingCharacter] = useState(null);

    useEffect(() => {
        fetchCharacters();
    }, []);

    const fetchCharacters = async () => {
        try {
        const response = await getCharacters();
        setCharacters(response.data);
        } catch (error) {
        console.error('Error fetching characters:', error);
        }
    };

    const handleCreate = async () => {
        try {
        await createCharacter(newCharacter);
        setNewCharacter({ id: '', name: '', ki: '', race: '', affiliation: '' });
        fetchCharacters();
        } catch (error) {
        console.error('Error creating character:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
        await deleteCharacter(id);
        fetchCharacters();
        } catch (error) {
        console.error('Error deleting character:', error);
        }
    };

    const handleUpdate = async (id) => {
        try {
        await updateCharacter(id, editingCharacter);
        setEditingCharacter(null);
        fetchCharacters();
        } catch (error) {
        console.error('Error updating character:', error);
        }
    };

    const startEdit = (character) => {
        setEditingCharacter(character);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editingCharacter) {
        setEditingCharacter({ ...editingCharacter, [name]: value });
        } else {
        setNewCharacter({ ...newCharacter, [name]: value });
        }
    };

    return (
        <div className="App">
        <header className="App-header">
            <h1>Dragon Ball Characters</h1>
        </header>
        <div className="form-container">
            <h2>{editingCharacter ? 'Edit Character' : 'Create New Character'}</h2>
            <input
            type="number"
            name="id"
            placeholder="ID"
            value={editingCharacter ? editingCharacter.id : newCharacter.id}
            onChange={handleChange}
            disabled={editingCharacter}
            />
            <input
            type="text"
            name="name"
            placeholder="Name"
            value={editingCharacter ? editingCharacter.name : newCharacter.name}
            onChange={handleChange}
            />
            <input
            type="text"
            name="ki"
            placeholder="Ki"
            value={editingCharacter ? editingCharacter.ki : newCharacter.ki}
            onChange={handleChange}
            />
            <input
            type="text"
            name="race"
            placeholder="Race"
            value={editingCharacter ? editingCharacter.race : newCharacter.race}
            onChange={handleChange}
            />
            <input
            type="text"
            name="affiliation"
            placeholder="Affiliation"
            value={editingCharacter ? editingCharacter.affiliation : newCharacter.affiliation}
            onChange={handleChange}
            />
            {editingCharacter ? (
            <button onClick={() => handleUpdate(editingCharacter.id)}>Update Character</button>
            ) : (
            <button onClick={handleCreate}>Create Character</button>
            )}
        </div>
        <div className="characters-list">
            <h2>Characters</h2>
            {characters.map(character => (
            <div key={character.id} className="character-card">
                <h3>{character.name}</h3>
                <p><strong>ID:</strong> {character.id}</p>
                <p><strong>Ki:</strong> {character.ki}</p>
                <p><strong>Race:</strong> {character.race}</p>
                <p><strong>Affiliation:</strong> {character.affiliation}</p>
                <button onClick={() => startEdit(character)}>Edit</button>
                <button onClick={() => handleDelete(character.id)}>Delete</button>
            </div>
            ))}
        </div>
        </div>
    );
}

export default App;