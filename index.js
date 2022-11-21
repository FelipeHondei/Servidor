const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const database = require('./src/services/database');

const filmeRoutes = require('./src/routes/main.routes');
const usuarioRoutes = require('./src/routes/usuarios.routes');

//MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
// ROUTES
app.use('/Aulas', filmeRoutes);
app.use('/usuario', usuarioRoutes);

app.listen(8000, () => {
    console.log('server ok');
});