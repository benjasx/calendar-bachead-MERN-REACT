const express = require('express');
require('dotenv').config();
const cors = require('cors')
const { dbConnection } = require('./database/config');

//* crear el servidor de express
const app = express();

//* Base de datos
dbConnection();

//* Cors
app.use(cors())

//* Directorio publico
app.use(express.static('public'))

//* Letura y parseo del body
app.use(express.json())

//* Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

//* Escuchar Peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servior corriedo en el puerto ${process.env.PORT}`);
})

