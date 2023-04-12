import express from 'express';
import morgan from 'morgan';
import usuariosRoutes from './routes/usuariosRoutes.js';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/usuario', usuariosRoutes);

export default app;
