import express from 'express';
import {
  registrarUsuario,
  obtenerUsuarios,
  eliminarUsuarios,
} from '../controllers/usuariosController.js';

const router = express.Router();

router.post('/', registrarUsuario);
router.get('/', obtenerUsuarios);
router.delete('/', eliminarUsuarios);

export default router;
