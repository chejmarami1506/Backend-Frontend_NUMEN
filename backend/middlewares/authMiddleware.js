const authMiddleware = (req, res, next) => {
    const token = req.headers['x-api-key'];
    if (token === 'super-secreto-dragon-ball') {
        next();
    } else {
        res.status(401).json({ message: 'Acceso no autorizado' });
    }
};

module.exports = authMiddleware;