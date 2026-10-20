// Configura Express: seguridad, CORS, JSON y rutas.
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const env = require('./config/env');
const routes = require('./routes');
const { apiLimiter } = require('./middlewares/rateLimit');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.set('trust proxy', 1); // necesario detrás de Render/Vercel para leer la IP real
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, methods: ['GET', 'POST'] }));
app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));
app.use('/api', apiLimiter, routes);
app.get('/', (req, res) => res.json({ ok: true, mensaje: 'API del portafolio de Rubén Torres Osorio. Usa /api/salud' }));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
