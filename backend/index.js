require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const characterRoutes = require('./routes/character.routes');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/characters', characterRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});