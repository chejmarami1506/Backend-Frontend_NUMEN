const express = require('express');
const router = express.Router();
const { getCharacters, getCharacterById, createCharacter, updateCharacter, patchCharacter, deleteCharacter, syncDbzCharacters } = require('../controllers/character.controller');
const { createCharacterValidation } = require('../validation/character.validation');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/sync', syncDbzCharacters);
router.get('/', getCharacters);
router.get('/:id', getCharacterById);

router.post('/', authMiddleware, createCharacterValidation, createCharacter);
router.put('/:id', authMiddleware, createCharacterValidation, updateCharacter);
router.patch('/:id', authMiddleware, patchCharacter);
router.delete('/:id', authMiddleware, deleteCharacter);

module.exports = router;