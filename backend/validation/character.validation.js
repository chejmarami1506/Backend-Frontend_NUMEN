const { body } = require('express-validator');

const createCharacterValidation = [
    body('id').notEmpty().withMessage('El ID es requerido').isNumeric().withMessage('El ID debe ser un número'),
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('ki').notEmpty().withMessage('El Ki es requerido'),
    body('race').notEmpty().withMessage('La raza es requerida'),
    body('affiliation').notEmpty().withMessage('La afiliación es requerida')
];

module.exports = { createCharacterValidation };