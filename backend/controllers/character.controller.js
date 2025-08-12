const { validationResult } = require('express-validator');
const Character = require('../models/Character');
const { getCharactersFromApi } = require('../services/dbzApi');

// GET
const getCharacters = async (req, res) => {
    try {
        const characters = await Character.find();
        res.status(200).json(characters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET por ID
const getCharacterById = async (req, res) => {
    try {
        const character = await Character.findOne({ id: req.params.id });
        if (!character) {
        return res.status(404).json({ message: 'Personaje no encontrado' });
        }
        res.status(200).json(character);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST
const createCharacter = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const character = new Character(req.body);
    try {
        const newCharacter = await character.save();
        res.status(201).json(newCharacter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT (reemplazo completo)
const updateCharacter = async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const character = await Character.findOneAndUpdate({ id }, req.body, { new: true });
        if (!character) {
        return res.status(404).json({ message: 'Personaje no encontrado' });
        }
        res.status(200).json(character);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PATCH
const patchCharacter = async (req, res) => {
    const { id } = req.params;
    try {
        const character = await Character.findOneAndUpdate({ id }, { $set: req.body }, { new: true });
        if (!character) {
        return res.status(404).json({ message: 'Personaje no encontrado' });
        }
        res.status(200).json(character);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE
const deleteCharacter = async (req, res) => {
    const { id } = req.params;
    try {
        const character = await Character.findOneAndDelete({ id });
        if (!character) {
        return res.status(404).json({ message: 'Personaje no encontrado' });
        }
        res.status(200).json({ message: 'Personaje eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ruta para sincronizar datos de la API externa a la base de datos
const syncDbzCharacters = async (req, res) => {
    try {
        const apiCharacters = await getCharactersFromApi();
        const ops = apiCharacters.map(char => ({
        updateOne: {
            filter: { id: char.id },
            update: char,
            upsert: true
        }
        }));

        const result = await Character.bulkWrite(ops);

        res.status(201).json({
        message: `Sincronización completa. Insertados: ${result.upsertedCount}, Actualizados: ${result.modifiedCount}`,
        data: result
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al sincronizar personajes', error: error.message });
    }
};
module.exports = {
    getCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    patchCharacter,
    deleteCharacter,
    syncDbzCharacters
};