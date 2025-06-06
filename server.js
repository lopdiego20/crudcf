require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const { MongoClient, ObjectId} = require('mongodb');
//Importar Rutas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const productRoutes = require('./routes/productRoutes');

const mongoClient = new MongoClient(process.env.MONGODB_URI);
(async () => {
    await mongoClient.connect();
    app.set('mongoDb', mongoClient.db());
    console.log('Conexion directa a mongoDB establecida');
})();
const app = express();

//Middlawares

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//conexion a mongo 
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('OK MongoDB'))
.catch(err => console.error('X Error de MongoDB', err));

//rutas
app.use('/api', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/products', productRoutes);

//Inicio de servisdor
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> {
    console.log(`Servidor en http://localhost:${PORT}`);
});
