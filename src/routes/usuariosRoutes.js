import express from 'express';
import {
  registrarUsuario,
  obtenerUsuarios,
  eliminarUsuarios,
  login,
} from '../controllers/usuariosController.js';

const router = express.Router();

router.post('/', registrarUsuario);
router.get('/', obtenerUsuarios);
router.delete('/', eliminarUsuarios);
router.post('/login', login);

export default router;
